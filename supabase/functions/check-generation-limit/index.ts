import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GenerationRequest {
  mediaType: 'image' | 'video'
  prompt?: string
  style?: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      console.error('Authentication error:', userError)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { mediaType, prompt, style }: GenerationRequest = await req.json()

    // Get or create user subscription
    let { data: subscription, error: subError } = await supabaseClient
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (subError && subError.code === 'PGRST116') {
      // No subscription found, create a free one
      const { data: newSub, error: createError } = await supabaseClient
        .from('user_subscriptions')
        .insert({
          user_id: user.id,
          plan_type: 'free',
          status: 'active'
        })
        .select()
        .single()

      if (createError) {
        console.error('Error creating subscription:', createError)
        return new Response(
          JSON.stringify({ error: 'Failed to create subscription' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      subscription = newSub
    }

    // Get today's generation limits
    const today = new Date().toISOString().split('T')[0]
    let { data: limits, error: limitsError } = await supabaseClient
      .from('generation_limits')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()

    if (limitsError && limitsError.code === 'PGRST116') {
      // No limits found for today, create new record
      const { data: newLimits, error: createError } = await supabaseClient
        .from('generation_limits')
        .insert({
          user_id: user.id,
          date: today,
          image_count: 0,
          video_count: 0,
          plan_type: subscription?.plan_type || 'free'
        })
        .select()
        .single()

      if (createError) {
        console.error('Error creating limits:', createError)
        return new Response(
          JSON.stringify({ error: 'Failed to create limits' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      limits = newLimits
    }

    // Define limits based on plan
    const dailyLimits = {
      free: { image: 5, video: 2 },
      pro: { image: 100, video: 50 }
    }

    const planType = subscription?.plan_type || 'free'
    const currentCount = mediaType === 'image' ? limits.image_count : limits.video_count
    const maxCount = dailyLimits[planType][mediaType]

    const canGenerate = currentCount < maxCount

    if (!canGenerate) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Daily generation limit reached',
          canGenerate: false,
          remaining: 0,
          currentCount,
          maxCount,
          planType,
          mediaType
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Increment the count
    const updateField = mediaType === 'image' ? 'image_count' : 'video_count'
    const { error: updateError } = await supabaseClient
      .from('generation_limits')
      .update({ [updateField]: currentCount + 1 })
      .eq('user_id', user.id)
      .eq('date', today)

    if (updateError) {
      console.error('Error updating limits:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to update generation limits' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const remaining = Math.max(0, maxCount - (currentCount + 1))

    return new Response(
      JSON.stringify({
        success: true,
        canGenerate: true,
        remaining,
        currentCount: currentCount + 1,
        maxCount,
        planType,
        mediaType,
        message: 'Generation approved'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in check-generation-limit function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})