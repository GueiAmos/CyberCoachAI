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

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    console.log('OpenAI API Key présente:', !!openaiApiKey);
    
    if (!openaiApiKey) {
      console.error('Clé API OpenAI manquante');
      return new Response(
        JSON.stringify({ error: "Clé API OpenAI non configurée. Veuillez configurer OPENAI_API_KEY dans les variables d'environnement Supabase." }),
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

    // Construire l'historique de conversation pour OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10), // Garder les 10 derniers messages pour le contexte
      { role: 'user', content: message }
    ];

    console.log('Tentative d\'appel à OpenAI...');

    // Appel à l'API OpenAI avec timeout et gestion d'erreurs améliorée
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes timeout

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('Statut de la réponse OpenAI:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur OpenAI - Statut:', response.status, 'Réponse:', errorText);
        
        let errorMessage = "Erreur lors de l'appel à OpenAI";
        
        if (response.status === 401) {
          errorMessage = "Clé API OpenAI invalide. Veuillez vérifier votre clé API.";
        } else if (response.status === 429) {
          errorMessage = "Limite de taux OpenAI atteinte. Veuillez réessayer dans quelques instants.";
        } else if (response.status === 500) {
          errorMessage = "Erreur serveur OpenAI. Veuillez réessayer plus tard.";
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
      console.log('Réponse OpenAI reçue avec succès');
      
      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        console.error('Aucune réponse dans les données OpenAI:', data);
        return new Response(
          JSON.stringify({ error: "Aucune réponse générée par l'IA" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          response: aiResponse,
          usage: data.usage 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );

    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error('Erreur lors de l\'appel fetch à OpenAI:', fetchError);
      
      let errorMessage = "Erreur de connexion à OpenAI";
      
      if (fetchError.name === 'AbortError') {
        errorMessage = "Timeout lors de l'appel à OpenAI. Veuillez réessayer.";
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