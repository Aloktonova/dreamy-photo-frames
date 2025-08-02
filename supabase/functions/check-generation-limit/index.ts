import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Verify JWT token
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    const { generation_type, prompt, style, metadata } = await req.json()
    
    if (!generation_type || !['image', 'video'].includes(generation_type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid generation type' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check generation limits
    const { data: limitData, error: limitError } = await supabase
      .rpc('check_generation_limit', {
        p_user_id: user.id,
        p_generation_type: generation_type
      })

    if (limitError) {
      console.error('Error checking generation limit:', limitError)
      return new Response(
        JSON.stringify({ error: 'Failed to check generation limits' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // If user can't generate, return limit info
    if (!limitData.can_generate) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Generation limit exceeded',
          limits: limitData
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Record the generation attempt
    const { data: generationId, error: recordError } = await supabase
      .rpc('record_generation', {
        p_user_id: user.id,
        p_generation_type: generation_type,
        p_prompt: prompt || null,
        p_style: style || null,
        p_metadata: metadata || {}
      })

    if (recordError) {
      console.error('Error recording generation:', recordError)
      return new Response(
        JSON.stringify({ error: 'Failed to record generation' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Return success with updated limits
    return new Response(
      JSON.stringify({
        success: true,
        generation_id: generationId,
        limits: limitData,
        message: 'Generation started successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
}) 