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
    const { imageUrl, analysisType = 'LABEL_DETECTION' } = await req.json()
    const apiKey = Deno.env.get('GOOGLE_CLOUD_API_KEY')
    
    if (!apiKey) {
      throw new Error('Google Cloud API key not configured')
    }

    if (!imageUrl) {
      throw new Error('Image URL is required')
    }

    // Prepare Google Cloud Vision API request
    const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`
    
    const requestBody = {
      requests: [{
        image: {
          source: {
            imageUri: imageUrl
          }
        },
        features: [{
          type: analysisType,
          maxResults: 10
        }]
      }]
    }

    console.log('Calling Google Vision API with:', { imageUrl, analysisType })

    const response = await fetch(visionApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Vision API error:', errorText)
      throw new Error(`Google Vision API error: ${response.status} ${errorText}`)
    }

    const result = await response.json()
    console.log('Google Vision API response:', result)

    // Save to database
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
            media_type: 'image',
            media_url: imageUrl,
            analysis_type: analysisType,
            results: result
          })
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in analyze-image function:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to analyze image'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})