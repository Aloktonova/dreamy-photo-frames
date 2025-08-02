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
    const { videoUrl, features = ['LABEL_DETECTION'] } = await req.json()
    const apiKey = Deno.env.get('GOOGLE_CLOUD_API_KEY')
    
    if (!apiKey) {
      throw new Error('Google Cloud API key not configured')
    }

    if (!videoUrl) {
      throw new Error('Video URL is required')
    }

    // Prepare Google Cloud Video Intelligence API request
    const videoApiUrl = `https://videointelligence.googleapis.com/v1/videos:annotate?key=${apiKey}`
    
    const requestBody = {
      inputUri: videoUrl,
      features: features,
      videoContext: {
        labelDetectionConfig: {
          labelDetectionMode: 'SHOT_AND_FRAME_MODE'
        }
      }
    }

    console.log('Calling Google Video Intelligence API with:', { videoUrl, features })

    const response = await fetch(videoApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Video Intelligence API error:', errorText)
      throw new Error(`Google Video Intelligence API error: ${response.status} ${errorText}`)
    }

    const result = await response.json()
    console.log('Google Video Intelligence API response:', result)

    // The Video Intelligence API returns an operation that needs to be polled
    // For this demo, we'll return the operation info and let the frontend handle polling
    const operationName = result.name
    
    if (operationName) {
      // Save operation to database for tracking
      const authHeader = req.headers.get('Authorization')
      if (authHeader) {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? '',
          { global: { headers: { Authorization: authHeader } } }
        )

        const { data: userData } = await supabaseClient.auth.getUser()
        
        if (userData.user) {
          await supabaseClient
            .from('media_analysis')
            .insert({
              user_id: userData.user.id,
              media_type: 'video',
              media_url: videoUrl,
              analysis_type: features.join(','),
              results: { 
                operation: result,
                status: 'processing'
              }
            })
        }
      }
    }

    return new Response(JSON.stringify({
      operation: result,
      message: 'Video analysis started. This may take several minutes to complete.',
      operationName
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in analyze-video function:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to analyze video'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})