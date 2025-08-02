import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { operationName } = await req.json()
    const apiKey = Deno.env.get('GOOGLE_CLOUD_API_KEY')
    
    if (!apiKey) {
      throw new Error('Google Cloud API key not configured')
    }

    if (!operationName) {
      throw new Error('Operation name is required')
    }

    // Check operation status
    const operationUrl = `https://videointelligence.googleapis.com/v1/${operationName}?key=${apiKey}`
    
    console.log('Checking operation status:', operationName)

    const response = await fetch(operationUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Video Intelligence operation check error:', errorText)
      throw new Error(`Operation check error: ${response.status} ${errorText}`)
    }

    const result = await response.json()
    console.log('Operation status response:', result)

    // If operation is done, update the database
    if (result.done) {
      const authHeader = req.headers.get('Authorization')
      if (authHeader) {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? '',
          { global: { headers: { Authorization: authHeader } } }
        )

        const { data: userData } = await supabaseClient.auth.getUser()
        
        if (userData.user) {
          // Find the analysis record with this operation name and update it
          const { data: existingAnalysis } = await supabaseClient
            .from('media_analysis')
            .select('*')
            .eq('user_id', userData.user.id)
            .like('results', `%${operationName}%`)
            .single()

          if (existingAnalysis) {
            await supabaseClient
              .from('media_analysis')
              .update({
                results: {
                  ...result,
                  status: 'completed'
                }
              })
              .eq('id', existingAnalysis.id)
          }
        }
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in check-video-operation function:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to check operation status'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})