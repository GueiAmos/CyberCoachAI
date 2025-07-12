const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface ChatRequest {
  message: string;
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
    const { message, conversationHistory = [] }: ChatRequest = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message requis" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    console.log('Gemini API Key présente:', !!geminiApiKey);
    
    if (!geminiApiKey) {
      console.error('Clé API Gemini manquante');
      return new Response(
        JSON.stringify({ error: "Clé API Gemini non configurée. Veuillez configurer GEMINI_API_KEY dans les variables d'environnement Supabase." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Système de prompt spécialisé en cybersécurité
    const systemPrompt = `Tu es un assistant IA expert en cybersécurité et protection des données personnelles. Tu aides les utilisateurs à comprendre et améliorer leur sécurité numérique.

Tes caractéristiques :
- Tu réponds en français de manière claire et accessible
- Tu donnes des conseils pratiques et concrets
- Tu utilises des exemples du quotidien
- Tu restes bienveillant et pédagogique
- Tu adaptes tes réponses au niveau de l'utilisateur
- Tu peux utiliser des emojis pour rendre tes réponses plus engageantes

Domaines d'expertise :
- Mots de passe et authentification
- Phishing et ingénierie sociale
- Sécurité des réseaux WiFi
- Protection de la vie privée sur les réseaux sociaux
- Sécurité mobile (smartphones, tablettes)
- Navigation web sécurisée
- Sauvegardes et protection des données
- Mises à jour de sécurité
- Authentification à deux facteurs (2FA)
- Gestionnaires de mots de passe

Si une question sort de ton domaine d'expertise en cybersécurité, redirige poliment vers ton domaine de compétence.`;

    // Construire l'historique de conversation pour Gemini
    let conversationText = systemPrompt + "\n\n";
    
    // Ajouter l'historique récent (derniers 10 messages)
    const recentHistory = conversationHistory.slice(-10);
    for (const msg of recentHistory) {
      if (msg.role === 'user') {
        conversationText += `Utilisateur: ${msg.content}\n`;
      } else {
        conversationText += `Assistant: ${msg.content}\n`;
      }
    }
    
    // Ajouter le message actuel
    conversationText += `Utilisateur: ${message}\nAssistant: `;

    console.log('Tentative d\'appel à Gemini...');

    // Appel à l'API Gemini avec timeout et gestion d'erreurs améliorée
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes timeout

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
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
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('Statut de la réponse Gemini:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur Gemini - Statut:', response.status, 'Réponse:', errorText);
        
        let errorMessage = "Erreur lors de l'appel à Gemini";
        
        if (response.status === 400) {
          errorMessage = "Requête invalide envoyée à Gemini. Veuillez réessayer.";
        } else if (response.status === 403) {
          errorMessage = "Clé API Gemini invalide ou quota dépassé. Veuillez vérifier votre clé API.";
        } else if (response.status === 429) {
          errorMessage = "Limite de taux Gemini atteinte. Veuillez réessayer dans quelques instants.";
        } else if (response.status === 500) {
          errorMessage = "Erreur serveur Gemini. Veuillez réessayer plus tard.";
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
      
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        console.error('Aucune réponse dans les données Gemini:', data);
        return new Response(
          JSON.stringify({ error: "Aucune réponse générée par Gemini" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          response: aiResponse,
          usage: data.usageMetadata 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );

    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error('Erreur lors de l\'appel fetch à Gemini:', fetchError);
      
      let errorMessage = "Erreur de connexion à Gemini";
      
      if (fetchError.name === 'AbortError') {
        errorMessage = "Timeout lors de l'appel à Gemini. Veuillez réessayer.";
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

  } catch (error) {
    console.error('Erreur générale dans chat-ai:', error);
    return new Response(
      JSON.stringify({ error: "Erreur interne du serveur" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});