import { RotateCcw } from 'lucide-react';
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Smartphone, Globe, Lock, Shield, Eye, ChevronRight, CheckCircle2, MessageCircle, Send, Bot, AlertTriangle, Users, Wifi, Grid3X3, Mic, MicOff, Phone, PhoneOff, Volume2 } from 'lucide-react';

interface CyberGuideProps {
  onBack: () => void;
}

interface GuideSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  risks: string[];
  tips: string[];
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function CyberGuide({ onBack }: CyberGuideProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Salut ! 👋 Je suis CyberGuide IA, votre assistant cybersécurité.\n\nJe peux vous aider avec :\n- Des questions sur la sécurité numérique\n- Des conseils pratiques et directs\n\nQue puis-je faire pour vous ? 🔐',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
  }>>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isLiveChat, setIsLiveChat] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [liveMediaRecorder, setLiveMediaRecorder] = useState<MediaRecorder | null>(null);
  const [liveAudioChunks, setLiveAudioChunks] = useState<Blob[]>([]);
  const [isListening, setIsListening] = useState(false);

  const sections: GuideSection[] = [
    {
      id: 'phishing',
      title: 'Phishing',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      description: 'Apprenez à reconnaître les tentatives de phishing par email et SMS',
      risks: [
        'Vol d\'identifiants de connexion (email, banque, réseaux sociaux)',
        'Installation de logiciels malveillants via des liens piégés',
        'Usurpation d\'identité et fraude financière',
        'Compromission de comptes professionnels et personnels',
        'Détournement de fonds via de fausses factures ou virements',
        'Chantage et extorsion basés sur des informations volées',
        'Propagation du phishing à vos contacts via votre compte compromis',
        'Vol de données clients si vous êtes entrepreneur ou freelance',
        'Accès non autorisé à vos comptes cloud (Google Drive, Dropbox)',
        'Compromission de votre identité numérique sur plusieurs plateformes',
        'Utilisation de vos comptes pour des activités illégales',
        'Perte de contrôle de vos comptes de messagerie professionnelle',
        'Accès à vos conversations privées et informations sensibles',
        'Utilisation de vos données pour cibler vos proches et collègues'
      ],
      tips: [
        'Les banques ne demandent jamais vos codes par email',
        'Méfiez-vous des fautes d\'orthographe dans les emails officiels',
        'Vérifiez toujours l\'adresse email de l\'expéditeur en détail',
        'Survolez les liens sans cliquer pour voir la vraie destination',
        'Les vrais services ne demandent jamais d\'agir "immédiatement"',
        'Connectez-vous directement sur le site officiel plutôt que via un lien',
        'Méfiez-vous des emails avec des pièces jointes inattendues',
        'Les entreprises légitimes utilisent votre nom, pas "Cher client"',
        'Vérifiez les certificats SSL (cadenas vert) sur les sites web',
        'Ne donnez jamais d\'informations sensibles par email ou SMS',
        'Utilisez un gestionnaire de mots de passe qui détecte les faux sites',
        'Activez les notifications de connexion sur vos comptes importants',
        'Signalez les tentatives de phishing aux autorités compétentes',
        'Formez votre entourage à reconnaître ces tentatives',
        'Méfiez-vous des offres trop belles pour être vraies',
        'Vérifiez les numéros de téléphone officiels avant de rappeler'
      ]
    },
    {
      id: 'ingenierie-sociale',
      title: 'Ingénierie Sociale',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      description: 'Découvrez les techniques de manipulation psychologique des cybercriminels',
      risks: [
        'Manipulation psychologique pour obtenir des informations sensibles',
        'Usurpation d\'identité par téléphone ou en personne',
        'Accès non autorisé aux locaux ou systèmes d\'entreprise',
        'Divulgation involontaire de données confidentielles',
        'Chantage émotionnel pour extorquer de l\'argent ou des informations',
        'Création de faux profils pour établir une relation de confiance',
        'Exploitation de votre présence sur les réseaux sociaux',
        'Utilisation d\'informations publiques pour paraître légitime',
        'Manipulation lors d\'appels se faisant passer pour le support technique',
        'Exploitation de situations d\'urgence ou de stress',
        'Utilisation de votre nom pour tromper vos contacts',
        'Infiltration de groupes professionnels ou personnels',
        'Exploitation de votre générosité ou empathie',
        'Création de fausses urgences familiales ou médicales'
      ],
      tips: [
        'Un vrai technicien ne demande jamais vos mots de passe',
        'Méfiez-vous des appels "de votre banque" non sollicités',
        'Demandez toujours une preuve d\'identité avant de partager des informations',
        'Ne partagez que les informations strictement nécessaires',
        'Prenez le temps de vérifier les demandes pressantes',
        'Sensibilisez votre famille et collègues aux techniques de manipulation',
        'Méfiez-vous des personnes trop insistantes ou pressantes',
        'Vérifiez l\'identité par un canal de communication différent',
        'Ne donnez jamais d\'informations par téléphone si vous n\'avez pas appelé',
        'Méfiez-vous des compliments excessifs ou de la flatterie',
        'Établissez des procédures de vérification avec votre famille',
        'Ne cliquez jamais sur des liens dans des messages suspects',
        'Méfiez-vous des demandes d\'aide urgente par message',
        'Vérifiez les informations auprès de sources officielles',
        'Ne partagez pas trop d\'informations personnelles en ligne',
        'Soyez prudent avec les inconnus qui semblent tout savoir sur vous'
      ]
    },
    {
      id: 'securite-wifi',
      title: 'Sécurité Wi-Fi',
      icon: Wifi,
      color: 'from-blue-500 to-blue-600',
      description: 'Maîtrisez les bonnes pratiques pour les connexions Wi-Fi publiques',
      risks: [
        'Interception de données sur les réseaux Wi-Fi non sécurisés',
        'Attaques "Man-in-the-Middle" sur les hotspots publics',
        'Vol de cookies et données de session',
        'Accès non autorisé à vos appareils connectés',
        'Création de faux points d\'accès Wi-Fi pour piéger les utilisateurs',
        'Injection de malwares via des réseaux compromis',
        'Surveillance de votre activité de navigation en temps réel',
        'Vol d\'identifiants de connexion transmis en clair',
        'Accès à vos fichiers partagés sur le réseau local',
        'Détournement de vos communications (emails, messages)',
        'Installation à distance de logiciels espions',
        'Utilisation de votre connexion pour des activités illégales',
        'Accès à vos comptes automatiquement connectés',
        'Compromission de vos appareils IoT (objets connectés)'
      ],
      tips: [
        'Configurez votre Wi-Fi domestique en WPA3 ou WPA2',
        'Changez le mot de passe par défaut de votre box internet',
        'Privilégiez votre connexion mobile pour les données sensibles',
        'Activez un VPN fiable sur les réseaux publics',
        'Méfiez-vous des noms de Wi-Fi suspects ou trop génériques',
        'Désactivez le partage de fichiers sur les réseaux publics',
        'Utilisez uniquement des sites HTTPS sur les Wi-Fi publics',
        'Désactivez la connexion automatique aux réseaux Wi-Fi',
        'Vérifiez le nom exact du réseau auprès du personnel',
        'Évitez les opérations bancaires sur les Wi-Fi publics',
        'Activez le pare-feu de votre appareil',
        'Déconnectez-vous complètement quand vous partez',
        'Utilisez l\'authentification à deux facteurs sur vos comptes',
        'Mettez à jour régulièrement vos appareils',
        'Surveillez les appareils connectés à votre réseau domestique',
        'Créez un réseau invité séparé chez vous'
      ]
    },
    {
      id: 'ransomware',
      title: 'Ransomware',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      description: 'Protégez-vous contre les logiciels de rançon et leurs techniques',
      risks: [
        'Chiffrement de vos fichiers personnels et professionnels',
        'Demande de rançon en cryptomonnaie pour récupérer vos données',
        'Perte définitive de données importantes (photos, documents)',
        'Propagation du ransomware sur le réseau d\'entreprise',
        'Vol de données avant chiffrement pour double extorsion',
        'Publication de vos données privées sur le dark web',
        'Arrêt complet de votre activité professionnelle',
        'Coûts de récupération et de remise en état très élevés',
        'Perte de confiance de vos clients et partenaires',
        'Sanctions légales en cas de données clients compromises',
        'Infection des sauvegardes connectées au réseau',
        'Destruction malveillante des données même après paiement',
        'Utilisation de vos systèmes pour attaquer d\'autres victimes',
        'Compromission de votre réputation professionnelle'
      ],
      tips: [
        'Ne payez jamais la rançon, cela encourage les criminels',
        'Testez régulièrement vos sauvegardes pour vérifier qu\'elles fonctionnent',
        'Effectuez des sauvegardes automatiques sur supports déconnectés',
        'Maintenez votre OS et logiciels à jour pour corriger les failles',
        'Utilisez un antivirus avec protection temps réel activée',
        'Ne jamais ouvrir de pièces jointes suspectes ou inattendues',
        'Appliquez la règle 3-2-1 : 3 copies, 2 supports, 1 hors site',
        'Isolez immédiatement un appareil infecté du réseau',
        'Formez vos employés à reconnaître les tentatives d\'infection',
        'Utilisez des comptes avec privilèges limités au quotidien',
        'Activez la protection contre les macros dans Office',
        'Surveillez les extensions de fichiers inhabituelles',
        'Mettez en place une politique de sécurité stricte',
        'Utilisez des solutions de détection comportementale',
        'Préparez un plan de réponse aux incidents',
        'Contactez immédiatement les autorités en cas d\'attaque'
      ]
    },
    {
      id: 'securite-mobile',
      title: 'Sécurité Mobile',
      icon: Smartphone,
      color: 'from-green-500 to-green-600',
      description: 'Sécurisez vos appareils mobiles et applications',
      risks: [
        'Accès non autorisé à vos données personnelles en cas de vol',
        'Applications malveillantes espionnant vos activités',
        'Vol de données bancaires via des apps frauduleuses',
        'Géolocalisation et surveillance de vos déplacements',
        'Interception de vos communications (appels, SMS, messages)',
        'Accès à vos photos et vidéos privées',
        'Vol d\'identité via les informations stockées sur l\'appareil',
        'Utilisation de votre appareil pour des attaques sur d\'autres systèmes',
        'Accès à vos comptes email et réseaux sociaux',
        'Surveillance de vos habitudes et création de profils détaillés',
        'Chantage basé sur vos données personnelles',
        'Utilisation frauduleuse de vos applications de paiement',
        'Accès à vos contacts et harcèlement de votre entourage',
        'Installation de logiciels espions à votre insu'
      ],
      tips: [
        'Activez la localisation à distance pour retrouver votre appareil',
        'Configurez l\'effacement automatique après plusieurs tentatives échouées',
        'Utilisez un code PIN fort, empreinte ou reconnaissance faciale',
        'Téléchargez uniquement depuis App Store ou Google Play Store',
        'Vérifiez et limitez les autorisations accordées aux applications',
        'Activez le chiffrement complet de votre appareil',
        'Mettez à jour régulièrement votre système d\'exploitation',
        'Évitez les réseaux Wi-Fi publics pour les données sensibles',
        'Utilisez des applications de messagerie chiffrées',
        'Désactivez la géolocalisation pour les apps non essentielles',
        'Vérifiez régulièrement les applications installées',
        'Utilisez un gestionnaire de mots de passe mobile',
        'Activez les notifications de connexion suspecte',
        'Ne stockez pas de mots de passe dans les navigateurs mobiles',
        'Méfiez-vous des QR codes inconnus',
        'Sauvegardez régulièrement vos données importantes'
      ]
    },
    {
      id: 'malware',
      title: 'Malware',
      icon: AlertTriangle,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Identifiez et évitez les logiciels malveillants',
      risks: [
        'Vol de données personnelles et professionnelles',
        'Prise de contrôle à distance de votre ordinateur',
        'Utilisation de votre machine pour des attaques (botnet)',
        'Ralentissement et instabilité du système',
        'Enregistrement secret de vos frappes clavier (keylogger)',
        'Capture d\'écran et surveillance de vos activités',
        'Vol de mots de passe et informations bancaires',
        'Installation d\'autres malwares plus dangereux',
        'Utilisation de votre ordinateur pour miner des cryptomonnaies',
        'Corruption ou suppression de vos fichiers importants',
        'Désactivation de vos protections antivirus',
        'Ouverture de portes dérobées pour les cybercriminels',
        'Spam et envoi de malwares à vos contacts',
        'Chantage et extorsion basés sur vos données volées'
      ],
      tips: [
        'Un ordinateur qui ralentit soudainement peut être infecté',
        'Méfiez-vous des pop-ups qui prétendent nettoyer votre PC',
        'Installez un antivirus réputé et maintenez-le à jour',
        'Téléchargez les logiciels uniquement depuis les sites officiels',
        'Programmez des analyses complètes hebdomadaires',
        'Évitez les logiciels piratés qui contiennent souvent des malwares',
        'Méfiez-vous des clés USB trouvées ou d\'origine inconnue',
        'Activez le pare-feu de votre système d\'exploitation',
        'Ne cliquez jamais sur des publicités suspectes',
        'Vérifiez les certificats numériques des logiciels',
        'Utilisez un compte utilisateur standard, pas administrateur',
        'Surveillez l\'utilisation de votre processeur et réseau',
        'Méfiez-vous des emails avec pièces jointes exécutables',
        'Maintenez tous vos logiciels à jour',
        'Utilisez des extensions de navigateur pour bloquer les publicités',
        'Effectuez des sauvegardes régulières de vos données importantes'
      ]
    },
    {
      id: 'reseaux-sociaux',
      title: 'Réseaux Sociaux',
      icon: Globe,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Protégez votre vie privée sur les plateformes sociales',
      risks: [
        'Exposition d\'informations personnelles à des inconnus',
        'Usurpation d\'identité via vos photos et informations',
        'Géolocalisation et traçage de vos activités quotidiennes',
        'Harcèlement et chantage basés sur vos publications',
        'Utilisation de vos données pour des arnaques ciblées',
        'Création de faux profils utilisant votre identité',
        'Surveillance de vos habitudes par des employeurs potentiels',
        'Exploitation de vos relations pour des attaques d\'ingénierie sociale',
        'Vol d\'informations pour répondre à vos questions de sécurité',
        'Ciblage publicitaire excessif et manipulation',
        'Exposition de vos proches et famille aux cybercriminels',
        'Utilisation de vos photos pour des deepfakes',
        'Chantage basé sur vos activités en ligne',
        'Discrimination basée sur vos opinions ou activités'
      ],
      tips: [
        'Réfléchissez avant de publier : cette information peut-elle me nuire ?',
        'Vérifiez régulièrement qui peut voir vos publications',
        'Configurez vos comptes en mode privé et limitez la visibilité',
        'Ne partagez pas d\'adresse, numéro de téléphone ou informations sensibles',
        'Désactivez le partage automatique de votre position',
        'N\'acceptez que les personnes que vous connaissez réellement',
        'Utilisez des pseudonymes plutôt que votre vrai nom si possible',
        'Évitez de publier vos horaires et habitudes quotidiennes',
        'Ne partagez jamais de photos de documents officiels',
        'Méfiez-vous des quiz et jeux qui demandent trop d\'informations',
        'Vérifiez les paramètres de confidentialité après chaque mise à jour',
        'Limitez les informations visibles sur votre profil public',
        'Ne géolocalisez pas votre domicile ou lieu de travail',
        'Supprimez régulièrement vos anciennes publications',
        'Méfiez-vous des demandes d\'amis de personnes inconnues',
        'Utilisez l\'authentification à deux facteurs sur tous vos comptes'
      ]
    }
  ];


  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    
    // Ajouter à l'historique de conversation
    const newHistory = [
      ...conversationHistory,
      { role: 'user' as const, content: currentMessage }
    ];
    setConversationHistory(newHistory);
    
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Appeler l'API Gemini via notre edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-ai`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          conversationHistory: newHistory.slice(-10) // Garder les 10 derniers messages
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la communication avec l\'IA');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      
      // Ajouter la réponse à l'historique
      setConversationHistory(prev => [
        ...prev,
        { role: 'assistant', content: data.response }
      ]);
      
    } catch (error) {
      console.error('Erreur:', error);
      
      // Gestion d'erreur améliorée avec message spécifique
      let errorContent = "Désolé, je rencontre un problème technique. Pouvez-vous réessayer ? 🔐";
      
      if (error instanceof Error) {
        if (error.message.includes('Gemini')) {
          errorContent = "Problème de connexion avec l'assistant IA. Vérifiez que la clé API Gemini est configurée dans Supabase. En attendant, voici quelques conseils : utilisez des mots de passe uniques et forts, activez la double authentification ! 🔐";
        } else if (error.message.includes('fetch')) {
          errorContent = "Problème de réseau. Vérifiez votre connexion internet et réessayez. 🌐";
        }
      }
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: errorContent,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const startLiveChat = async () => {
    try {
      setIsConnecting(true);
      
      // Demander permission microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Initialiser l'enregistrement continu
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = async () => {
        if (chunks.length > 0) {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          await processLiveVoiceMessage(audioBlob);
        }
        chunks.length = 0; // Vider les chunks
      };
      
      setLiveMediaRecorder(recorder);
      setLiveAudioChunks(chunks);
      setIsLiveChat(true);
      setIsConnecting(false);
      
      // Message de bienvenue vocal
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: '🎙️ Discussion vocale activée ! Parlez-moi, je vous écoute et vous répondrai vocalement.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, welcomeMessage]);
      
      // Commencer l'écoute
      startListening();
      
    } catch (error) {
      console.error('Erreur lors du démarrage du chat vocal:', error);
      setIsConnecting(false);
      alert('Impossible d\'accéder au microphone. Vérifiez les permissions de votre navigateur.');
    }
  };
  
  const stopLiveChat = () => {
    if (liveMediaRecorder) {
      liveMediaRecorder.stream.getTracks().forEach(track => track.stop());
      setLiveMediaRecorder(null);
    }
    setIsLiveChat(false);
    setIsListening(false);
    setIsAISpeaking(false);
    
    const endMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'ai',
      content: '🔇 Discussion vocale terminée. Vous pouvez continuer par écrit.',
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, endMessage]);
  };
  
  const startListening = () => {
    if (liveMediaRecorder && !isAISpeaking) {
      setIsListening(true);
      liveAudioChunks.length = 0; // Vider les anciens chunks
      liveMediaRecorder.start();
      
      // Arrêter l'enregistrement après 5 secondes de silence détecté
      // ou 30 secondes maximum
      setTimeout(() => {
        if (liveMediaRecorder && liveMediaRecorder.state === 'recording') {
          liveMediaRecorder.stop();
          setIsListening(false);
        }
      }, 10000); // 10 secondes max par message
    }
  };
  
  const processLiveVoiceMessage = async (audioBlob: Blob) => {
    if (audioBlob.size < 1000) { // Ignorer les enregistrements trop courts
      if (isLiveChat && !isAISpeaking) {
        setTimeout(startListening, 1000); // Recommencer à écouter après 1 seconde
      }
      return;
    }
    
    try {
      setIsAISpeaking(true);
      
      // Créer FormData pour envoyer l'audio
      const formData = new FormData();
      formData.append('audio', audioBlob, 'live-voice.webm');
      formData.append('conversationHistory', JSON.stringify(conversationHistory.slice(-10)));
      formData.append('isLiveChat', 'true');
      
      // Appeler notre edge function pour le chat vocal en temps réel
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-voice-chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors du traitement vocal en temps réel');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Ajouter le message utilisateur (transcrit)
      if (data.transcription && data.transcription.trim()) {
        const userMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'user',
          content: data.transcription,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, userMessage]);
        
        // Ajouter la réponse IA
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: data.response + ' 🔊',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, aiMessage]);
        
        // Mettre à jour l'historique
        setConversationHistory(prev => [
          ...prev,
          { role: 'user', content: data.transcription },
          { role: 'assistant', content: data.response }
        ]);
        
        // Jouer la réponse audio de l'IA
        if (data.audioResponse) {
          const audioBlob = new Blob([Uint8Array.from(atob(data.audioResponse), c => c.charCodeAt(0))], { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            setIsAISpeaking(false);
            // Recommencer à écouter après que l'IA ait fini de parler
            if (isLiveChat) {
              setTimeout(startListening, 500);
            }
          };
          
          audio.onerror = () => {
            URL.revokeObjectURL(audioUrl);
            setIsAISpeaking(false);
            if (isLiveChat) {
              setTimeout(startListening, 500);
            }
          };
          
          await audio.play();
        } else {
          // Si pas d'audio, recommencer à écouter après un délai
          setIsAISpeaking(false);
          if (isLiveChat) {
            setTimeout(startListening, 1000);
          }
        }
      } else {
        // Pas de transcription valide, recommencer à écouter
        setIsAISpeaking(false);
        if (isLiveChat) {
          setTimeout(startListening, 1000);
        }
      }
      
    } catch (error) {
      console.error('Erreur lors du traitement vocal en temps réel:', error);
      setIsAISpeaking(false);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Désolé, je n'ai pas pu traiter votre message vocal. Pouvez-vous répéter ? 🎤",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
      
      // Recommencer à écouter après une erreur
      if (isLiveChat) {
        setTimeout(startListening, 2000);
      }
    }
  };

  const handleResetChat = () => {
    setChatMessages([
      {
        id: '1',
        type: 'ai',
        content: 'Salut ! 👋 Je suis CyberGuide IA, votre assistant cybersécurité.\n\nJe peux vous aider avec :\n- Des questions sur la sécurité numérique\n- Des conseils pratiques et directs\n\nQue puis-je faire pour vous ? 🔐',
        timestamp: new Date()
      }
    ]);
    setConversationHistory([]);
    setCurrentMessage('');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        await processVoiceMessage(audioBlob);
        
        // Nettoyer le stream
        stream.getTracks().forEach(track => track.stop());
      };

      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      setIsRecording(true);
      recorder.start();
    } catch (error) {
      console.error('Erreur lors de l\'accès au microphone:', error);
      alert('Impossible d\'accéder au microphone. Vérifiez les permissions de votre navigateur.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const processVoiceMessage = async (audioBlob: Blob) => {
    try {
      setIsTyping(true);
      
      // Créer FormData pour envoyer l'audio
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice-message.webm');
      formData.append('conversationHistory', JSON.stringify(conversationHistory.slice(-10)));
      formData.append('isLiveChat', 'true');

      // Appeler notre edge function pour traiter l'audio
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-voice-chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors du traitement vocal');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Ajouter le message utilisateur (transcrit)
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: data.transcription,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, userMessage]);
      
      // Ajouter la réponse IA
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      
      // Mettre à jour l'historique
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: data.transcription },
        { role: 'assistant', content: data.response }
      ]);
      
      // Jouer la réponse audio si disponible
      if (data.audioResponse) {
        try {
          const audioBlob = new Blob([Uint8Array.from(atob(data.audioResponse), c => c.charCodeAt(0))], { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new HTMLAudioElement(audioUrl);
          
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
          };
          
          await audio.play();
        } catch (audioError) {
          console.error('Erreur lors de la lecture audio:', audioError);
        }
      }
      
    } catch (error) {
      console.error('Erreur lors du traitement vocal:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Désolé, je n'ai pas pu traiter votre message vocal. Vous pouvez réessayer ou taper votre question. 🎤",
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const selectedSectionData = selectedSection 
    ? sections.find(s => s.id === selectedSection)
    : null;


  // Vue Chat IA
  if (showChat) {
    return (
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={() => setShowChat(false)}
            className="flex items-center space-x-1 sm:space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Retour aux guides</span>
            <span className="sm:hidden">Retour</span>
          </button>
          
          <div className="text-center">
            <div className="flex items-center space-x-2 sm:space-x-3 justify-center">
              <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Assistant IA</h1>
            </div>
            <p className="text-blue-300 text-sm sm:text-base hidden sm:block">Posez vos questions sur la sécurité numérique</p>
          </div>
          
          <button
            onClick={handleResetChat}
            className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-xs sm:text-sm"
          >
            <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Live Chat Controls */}
        <div className="flex justify-center mb-4 sm:mb-6">
          {!isLiveChat ? (
            <button
              onClick={startLiveChat}
              disabled={isConnecting}
              className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Discussion Vocale Live</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : isAISpeaking ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`}></div>
                <span className="text-green-300 text-sm">
                  {isListening ? 'Vous écoute...' : isAISpeaking ? 'IA parle...' : 'En attente'}
                </span>
                {isAISpeaking && <Volume2 className="h-4 w-4 text-blue-400 animate-pulse" />}
              </div>
              
              <button
                onClick={stopLiveChat}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
              >
                <PhoneOff className="h-4 w-4" />
                <span>Terminer</span>
              </button>
            </div>
          )}
        </div>

        {/* Chat Container */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
          {/* Messages */}
          <div className="h-80 sm:h-96 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs sm:max-w-sm lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-100'
                }`}>
                  {message.type === 'ai' && (
                    <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                      <Bot className="h-4 w-4 text-blue-400" />
                      <span className="text-xs text-blue-400 font-medium">CyberGuide IA</span>
                    </div>
                  )}
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-100 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-blue-400" />
                    <span className="text-xs text-blue-400 font-medium">CyberGuide IA</span>
                  </div>
                  <div className="flex space-x-1 mt-1 sm:mt-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-700/50 p-3 sm:p-4">
            <div className="flex space-x-2 sm:space-x-3">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question à CyberGuide IA..."
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 sm:px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm sm:text-base disabled:opacity-50"
                disabled={isTyping || isLiveChat}
              />
              
              {/* Bouton vocal */}
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTyping || isLiveChat}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                    : 'bg-green-600 hover:bg-green-700'
                } disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 text-white`}
                title={isRecording ? 'Arrêter l\'enregistrement' : 'Enregistrer un message vocal'}
              >
                {isRecording ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping || isLiveChat}
                className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 text-white rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            {/* Indicateur d'enregistrement */}
            {isRecording && (
              <div className="mt-2 flex items-center justify-center space-x-2 text-red-400">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Enregistrement en cours... Cliquez sur le micro pour arrêter</span>
              </div>
            )}
            
            {/* Indicateur chat vocal */}
            {isLiveChat && (
              <div className="mt-2 text-center text-green-400 text-sm">
                💬 Mode discussion vocale activé - Parlez naturellement, l'IA vous répondra vocalement
              </div>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Questions fréquentes :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {[
              "Comment créer un mot de passe sécurisé ?",
              "Comment sécuriser mon WiFi à la maison ?",
              "Comment reconnaître un phishing ?",
              "Qu'est-ce que le phishing et comment l'éviter ?",
              "Comment protéger ma vie privée sur les réseaux sociaux ?",
              "Pourquoi les mises à jour sont-elles importantes ?",
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setCurrentMessage(suggestion)}
                disabled={isTyping || isRecording}
                className="text-left p-2 sm:p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors text-xs sm:text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          {/* Instructions vocales */}
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="flex items-center space-x-2 text-slate-400 text-xs sm:text-sm">
              <Mic className="h-4 w-4" />
              <span>Cliquez sur le micro pour un message vocal ou sur "Discussion Vocale Live" pour une conversation en temps réel</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vue détail d'une section
  if (selectedSectionData) {
    return (
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={() => setSelectedSection(null)}
            className="flex items-center space-x-1 sm:space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Retour aux guides</span>
            <span className="sm:hidden">Retour</span>
          </button>
          
          <div className="text-center">
            <div className="flex items-center space-x-2 sm:space-x-3 justify-center">
              <selectedSectionData.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{selectedSectionData.title}</h1>
            </div>
            <p className="text-blue-300 text-sm sm:text-base hidden sm:block">{selectedSectionData.description}</p>
          </div>
          
          <div className="w-16 sm:w-20"></div>
        </div>

        {/* Hero Section avec gradient de la catégorie */}
        <div className={`bg-gradient-to-r ${selectedSectionData.color} rounded-2xl p-6 sm:p-8 text-center space-y-4 mb-6`}>
          <selectedSectionData.icon className="h-12 w-12 sm:h-16 sm:w-16 text-white mx-auto" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedSectionData.title}</h2>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto">{selectedSectionData.description}</p>
          
          <div className="flex items-center justify-center pt-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{selectedSectionData.risks.length + selectedSectionData.tips.length}</div>
              <div className="text-white/80 text-xs sm:text-sm">Conseils et risques</div>
            </div>
          </div>
        </div>

        {/* Sections en accordéon moderne */}
        <div className="space-y-4 sm:space-y-6">
          {/* Risques */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border-b border-red-500/30 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-red-300 flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span>Risques à Connaître</span>
              </h3>
              <p className="text-red-200/80 text-sm mt-2">Comprenez les dangers pour mieux vous protéger</p>
            </div>
            
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {selectedSectionData.risks.map((risk, index) => (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs mt-1">
                    {index + 1}
                  </div>
                  <p className="text-red-200 text-sm sm:text-base leading-relaxed">{risk}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conseils */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-b border-blue-500/30 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-blue-300 flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span>Conseils d'Expert</span>
              </h3>
              <p className="text-blue-200/80 text-sm mt-2">Appliquez ces bonnes pratiques au quotidien</p>
            </div>
            
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {selectedSectionData.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-blue-200 text-sm sm:text-base leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Vue principale avec option chat
  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-1 sm:space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Retour</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">CyberGuide</h1>
          <p className="text-blue-300 text-sm sm:text-base hidden sm:block">Guides pratiques de confidentialité</p>
        </div>
        
        <button
          onClick={() => setShowChat(true)}
          className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm sm:text-base"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Chat IA</span>
          <span className="sm:hidden">IA</span>
        </button>
      </div>

      {/* Guide Sections */}
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Choisissez un domaine à sécuriser
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Explorez nos guides détaillés pour améliorer votre confidentialité et sécurité dans chaque aspect de votre vie numérique, ou posez directement vos questions à notre assistant IA.
          </p>
        </div>

        {/* Chat IA Card */}
        <div
          onClick={() => setShowChat(true)}
          className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
        >
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-2xl p-4 sm:p-6 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-green-300 transition-colors">
                  <span>CyberGuide IA - Assistant Intelligent</span>
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  Posez directement vos questions à CyberGuide IA et obtenez des réponses personnalisées sur la cybersécurité et l'application.
                </p>
              </div>
              
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 group-hover:text-green-300 transition-colors" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sections.map((section) => {
            return (
              <div
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 sm:p-6 hover:border-blue-500/50 transition-all duration-300 h-full">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}>
                        <section.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs sm:text-sm font-semibold text-blue-400">{section.risks.length + section.tips.length}</div>
                        <div className="text-xs text-slate-400">Conseils</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-300 transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                        {section.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-1 sm:pt-2">
                      <div className="text-sm text-slate-400">
                        {section.risks.length} risques • {section.tips.length} conseils
                      </div>
                      
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}