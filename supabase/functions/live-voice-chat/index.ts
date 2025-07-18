const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface LiveVoiceChatRequest {
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  isLiveChat?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;
    const conversationHistoryStr = formData.get('conversationHistory') as string;
    const isLiveChat = formData.get('isLiveChat') === 'true';
    
    if (!audioFile) {
      return new Response(
        JSON.stringify({ error: "Fichier audio requis" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const conversationHistory: Array<{role: 'user' | 'assistant'; content: string}> = 
      conversationHistoryStr ? JSON.parse(conversationHistoryStr) : [];

    // Vérifier les clés API
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!geminiApiKey) {
      console.error('Clé API Gemini manquante');
      return new Response(
        JSON.stringify({ error: "Configuration API manquante" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log('Traitement du chat vocal en temps réel...');

    // Convertir le fichier audio en ArrayBuffer
    const audioBuffer = await audioFile.arrayBuffer();
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

    // Construire le contexte de conversation pour le chat vocal
    const systemPrompt = `Tu es CyberGuide AI, l'assistant vocal intelligent de l'application CyberCoach AI. Tu es un expert sympathique en cybersécurité.

IMPORTANT - Instructions pour le chat vocal en temps réel :
- Tu réponds en français de manière conversationnelle et naturelle
- Tes réponses sont courtes et directes (maximum 2-3 phrases)
- Tu utilises un ton amical et accessible
- Tu donnes des conseils pratiques et concrets
- Tu évites les longs développements techniques
- Tu t'adaptes au niveau de l'utilisateur

Domaines d'expertise :
- Mots de passe et authentification
- Phishing et ingénierie sociale
- Protection de la vie privée
- Sécurité mobile et navigation web
- Sauvegardes et mises à jour
- Authentification à deux facteurs`;

    // Construire l'historique de conversation
    let conversationContext = systemPrompt + "\n\n";
    
    // Ajouter l'historique récent (derniers 6 messages pour le chat vocal)
    const recentHistory = conversationHistory.slice(-6);
    for (const msg of recentHistory) {
      if (msg.role === 'user') {
        conversationContext += `Utilisateur: ${msg.content}\n`;
      } else {
        conversationContext += `Assistant: ${msg.content}\n`;
      }
    }

    console.log('Appel à Gemini 2.5 Flash avec audio natif...');

    // Utiliser le modèle Gemini 2.5 Flash avec support audio natif
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-native-audio-dialog:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: conversationContext + "\n\nL'utilisateur vient de dire (audio):"
              },
              {
                inline_data: {
                  mime_type: audioFile.type,
                  data: audioBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512, // Réponses plus courtes pour le vocal
          responseModalities: ["AUDIO", "TEXT"], // Demander audio ET texte
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: "Puck" // Voix Puck comme demandé
              }
            }
          }
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    console.log('Statut de la réponse Gemini:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur Gemini - Statut:', response.status, 'Réponse:', errorText);
      
      let errorMessage = "Erreur lors de l'appel à Gemini";
      
      if (response.status === 400) {
        errorMessage = "Requête invalide. Le modèle audio natif pourrait ne pas être disponible.";
      } else if (response.status === 403) {
        errorMessage = "Clé API Gemini invalide ou quota dépassé.";
      } else if (response.status === 429) {
        errorMessage = "Limite de taux atteinte. Veuillez réessayer.";
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    console.log('Réponse Gemini reçue avec succès');
    
    // Extraire la transcription et la réponse
    let transcription = "";
    let textResponse = "";
    let audioResponse = null;
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const parts = data.candidates[0].content.parts;
      
      for (const part of parts) {
        if (part.text) {
          // La première partie texte contient généralement la transcription
          if (!transcription && part.text.includes("dit:") || part.text.includes("demande:")) {
            // Extraire la transcription de la réponse de Gemini
            const lines = part.text.split('\n');
            for (const line of lines) {
              if (line.includes('dit:') || line.includes('demande:')) {
                transcription = line.split(':').slice(1).join(':').trim();
                break;
              }
            }
          } else if (!textResponse) {
            textResponse = part.text.trim();
          }
        } else if (part.inline_data && part.inline_data.mime_type.startsWith('audio/')) {
          audioResponse = part.inline_data.data;
        }
      }
    }
    
    // Si pas de transcription explicite, essayer d'extraire du texte de réponse
    if (!transcription && textResponse) {
      // Fallback: utiliser une partie de la réponse comme transcription supposée
      transcription = "Message vocal reçu";
    }
    
    // Si pas de réponse texte, utiliser un message par défaut
    if (!textResponse) {
      textResponse = "Je vous écoute, pouvez-vous répéter votre question ?";
    }

    console.log('Transcription:', transcription);
    console.log('Réponse texte:', textResponse);
    console.log('Audio disponible:', !!audioResponse);

    return new Response(
      JSON.stringify({ 
        transcription: transcription,
        response: textResponse,
        audioResponse: audioResponse, // Audio en base64 si disponible
        usage: data.usageMetadata 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error('Erreur dans live-voice-chat:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erreur interne du serveur" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});