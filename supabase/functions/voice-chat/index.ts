const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface VoiceChatRequest {
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
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

    console.log('Traitement du fichier audio...');

    // Convertir le fichier audio en ArrayBuffer
    const audioBuffer = await audioFile.arrayBuffer();
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

    // Étape 1: Transcrire l'audio avec Gemini
    console.log('Transcription avec Gemini...');
    
    const transcriptionResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: "Transcris fidèlement ce message audio en français. Réponds uniquement avec le texte transcrit, sans commentaire additionnel."
            },
            {
              inline_data: {
                mime_type: audioFile.type,
                data: audioBase64
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!transcriptionResponse.ok) {
      const errorText = await transcriptionResponse.text();
      console.error('Erreur transcription Gemini:', transcriptionResponse.status, errorText);
      throw new Error('Erreur lors de la transcription');
    }

    const transcriptionData = await transcriptionResponse.json();
    const transcription = transcriptionData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!transcription) {
      throw new Error('Impossible de transcrire l\'audio');
    }

    console.log('Transcription réussie:', transcription);

    // Étape 2: Générer la réponse avec le contexte cybersécurité
    const systemPrompt = `Tu es CyberGuide AI, l'assistant intelligent de l'application CyberCoach AI. Tu es un expert sympathique en cybersécurité et protection des données personnelles.

- Tu réponds en français de manière claire et accessible
- Tu donnes des conseils pratiques et concrets
- Tu utilises des exemples du quotidien
- Tu restes bienveillant et pédagogique
- Tu adaptes tes réponses au niveau de l'utilisateur

Domaines d'expertise :
- Mots de passe et authentification
- Phishing et ingénierie sociale
- Protection de la vie privée sur les réseaux sociaux
- Sécurité mobile (smartphones, tablettes)
- Navigation web sécurisée
- Sauvegardes et protection des données
- Mises à jour de sécurité
- Authentification à deux facteurs (2FA)
- Gestionnaires de mots de passe`;

    // Construire l'historique de conversation
    let conversationText = systemPrompt + "\n\n";
    
    const recentHistory = conversationHistory.slice(-10);
    for (const msg of recentHistory) {
      if (msg.role === 'user') {
        conversationText += `Utilisateur: ${msg.content}\n`;
      } else {
        conversationText += `Assistant: ${msg.content}\n`;
      }
    }
    
    conversationText += `Utilisateur: ${transcription}\nAssistant: `;

    console.log('Génération de la réponse...');

    const chatResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: conversationText
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
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

    if (!chatResponse.ok) {
      const errorText = await chatResponse.text();
      console.error('Erreur chat Gemini:', chatResponse.status, errorText);
      throw new Error('Erreur lors de la génération de la réponse');
    }

    const chatData = await chatResponse.json();
    const aiResponse = chatData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error('Aucune réponse générée');
    }

    console.log('Réponse générée avec succès');

    return new Response(
      JSON.stringify({ 
        transcription: transcription.trim(),
        response: aiResponse,
        usage: {
          transcription: transcriptionData.usageMetadata,
          chat: chatData.usageMetadata
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error('Erreur dans voice-chat:', error);
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