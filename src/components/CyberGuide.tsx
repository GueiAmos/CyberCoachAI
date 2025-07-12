import { RotateCcw } from 'lucide-react';
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Smartphone, Globe, Lock, Shield, Eye, ChevronRight, CheckCircle2, MessageCircle, Send, Bot } from 'lucide-react';

interface CyberGuideProps {
  onBack: () => void;
}

interface GuideSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  risks: string[];
  practices: Array<{
    title: string;
    description: string;
    completed: boolean;
  }>;
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
  const [checkedPractices, setCheckedPractices] = useState<Set<string>>(new Set());
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

  const sections: GuideSection[] = [
    {
      id: 'social-media',
      title: 'Réseaux Sociaux',
      icon: Globe,
      description: 'Protégez votre vie privée sur les plateformes sociales',
      risks: [
        'Exposition d\'informations personnelles sensibles',
        'Géolocalisation et traçage de vos activités',
        'Utilisation de vos données à des fins commerciales',
        'Harcèlement et usurpation d\'identité'
      ],
      practices: [
        {
          title: 'Paramètres de confidentialité',
          description: 'Configurez vos comptes en mode privé et limitez qui peut voir vos publications',
          completed: false
        },
        {
          title: 'Informations personnelles',
          description: 'Évitez de partager votre adresse, numéro de téléphone ou informations sensibles',
          completed: false
        },
        {
          title: 'Géolocalisation',
          description: 'Désactivez le partage automatique de votre position',
          completed: false
        },
        {
          title: 'Demandes d\'amis',
          description: 'N\'acceptez que les personnes que vous connaissez réellement',
          completed: false
        }
      ],
      tips: [
        'Vérifiez régulièrement vos paramètres de confidentialité',
        'Réfléchissez avant de publier : cette information peut-elle me nuire ?'
      ]
    },
    {
      id: 'mobile',
      title: 'Sécurité Mobile',
      icon: Smartphone,
      description: 'Sécurisez votre smartphone et vos applications',
      risks: [
        'Accès non autorisé à vos données personnelles',
        'Applications malveillantes et espions',
        'Vol de données bancaires et d\'identité',
        'Écoute et surveillance de vos communications'
      ],
      practices: [
        {
          title: 'Verrouillage d\'écran',
          description: 'Utilisez un code PIN, empreinte ou reconnaissance faciale sécurisé',
          completed: false
        },
        {
          title: 'Source des applications',
          description: 'Téléchargez uniquement depuis les stores officiels (App Store, Google Play)',
          completed: false
        },
        {
          title: 'Permissions d\'applications',
          description: 'Vérifiez et limitez les autorisations accordées à chaque application',
          completed: false
        },
        {
          title: 'Mises à jour',
          description: 'Maintenez votre système et vos applications à jour',
          completed: false
        }
      ],
      tips: [
        'Activez la localisation à distance en cas de perte',
        'Évitez les réseaux WiFi publics pour les données sensibles'
      ]
    },
    {
      id: 'browser',
      title: 'Navigation Web',
      icon: Globe,
      description: 'Naviguez en sécurité sur Internet',
      risks: [
        'Tracking publicitaire et profilage comportemental',
        'Sites web malveillants et téléchargements infectés',
        'Vol de cookies et données de session',
        'Hameçonnage et sites frauduleux'
      ],
      practices: [
        {
          title: 'Navigateur sécurisé',
          description: 'Utilisez un navigateur à jour avec des extensions de sécurité',
          completed: false
        },
        {
          title: 'Bloqueur de publicités',
          description: 'Installez un bloqueur de pubs pour éviter les publicités malveillantes',
          completed: false
        },
        {
          title: 'Mode incognito',
          description: 'Utilisez la navigation privée pour les recherches sensibles',
          completed: false
        },
        {
          title: 'Vérification d\'URL',
          description: 'Vérifiez toujours l\'adresse des sites avant de saisir des informations',
          completed: false
        }
      ],
      tips: [
        'Méfiez-vous des téléchargements automatiques',
        'Utilisez un VPN pour une protection supplémentaire'
      ]
    },
    {
      id: 'passwords',
      title: 'Gestion des Mots de Passe',
      icon: Lock,
      description: 'Créez et gérez des mots de passe sécurisés',
      risks: [
        'Piratage de comptes par force brute',
        'Réutilisation de mots de passe compromis',
        'Accès non autorisé à plusieurs services',
        'Vol d\'identité et fraude financière'
      ],
      practices: [
        {
          title: 'Gestionnaire de mots de passe',
          description: 'Utilisez un gestionnaire réputé comme Bitwarden, 1Password ou LastPass',
          completed: false
        },
        {
          title: 'Mots de passe uniques',
          description: 'Créez un mot de passe différent pour chaque compte',
          completed: false
        },
        {
          title: 'Complexité',
          description: 'Utilisez au moins 12 caractères avec lettres, chiffres et symboles',
          completed: false
        },
        {
          title: 'Authentification 2FA',
          description: 'Activez la double authentification partout où c\'est possible',
          completed: false
        }
      ],
      tips: [
        'Changez immédiatement les mots de passe par défaut',
        'Évitez les informations personnelles dans vos mots de passe'
      ]
    }
  ];

  const handlePracticeToggle = (sectionId: string, practiceIndex: number) => {
    const key = `${sectionId}-${practiceIndex}`;
    const newChecked = new Set(checkedPractices);
    
    if (newChecked.has(key)) {
      newChecked.delete(key);
    } else {
      newChecked.add(key);
    }
    
    setCheckedPractices(newChecked);
  };

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

  const selectedSectionData = selectedSection 
    ? sections.find(s => s.id === selectedSection)
    : null;

  const getCompletionPercentage = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return 0;
    
    const completed = section.practices.filter((_, index) => 
      checkedPractices.has(`${sectionId}-${index}`)
    ).length;
    
    return Math.round((completed / section.practices.length) * 100);
  };

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
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 sm:px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm sm:text-base"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
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
                disabled={isTyping}
                className="text-left p-2 sm:p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors text-xs sm:text-sm"
              >
                {suggestion}
              </button>
            ))}
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
          
          <div className="text-right">
            <div className="text-lg sm:text-2xl font-bold text-blue-400">
              {getCompletionPercentage(selectedSectionData.id)}%
            </div>
            <div className="text-slate-400 text-xs sm:text-sm">Complété</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Risks */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-red-300 flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Risques Identifiés</span>
            </h3>
            
            <div className="space-y-2 sm:space-y-3">
              {selectedSectionData.risks.map((risk, index) => (
                <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3"></div>
                  <p className="text-red-200 text-sm sm:text-base">{risk}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-blue-300 flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Conseils Essentiels</span>
            </h3>
            
            <div className="space-y-2 sm:space-y-3">
              {selectedSectionData.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3"></div>
                  <p className="text-blue-200 text-sm sm:text-base">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Practices Checklist */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2 sm:space-x-3">
            <CheckCircle2 className="h-6 w-6 text-green-400" />
            <span>Checklist des Bonnes Pratiques</span>
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            {selectedSectionData.practices.map((practice, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-3 sm:p-4 transition-all duration-300 cursor-pointer ${
                  checkedPractices.has(`${selectedSectionData.id}-${index}`)
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-slate-600 bg-slate-700/30 hover:border-green-500/50'
                }`}
                onClick={() => handlePracticeToggle(selectedSectionData.id, index)}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center mt-1 transition-all ${
                    checkedPractices.has(`${selectedSectionData.id}-${index}`)
                      ? 'border-green-500 bg-green-500'
                      : 'border-slate-400'
                  }`}>
                    {checkedPractices.has(`${selectedSectionData.id}-${index}`) && (
                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-semibold text-sm sm:text-base ${
                      checkedPractices.has(`${selectedSectionData.id}-${index}`)
                        ? 'text-green-300'
                        : 'text-white'
                    }`}>
                      {practice.title}
                    </h4>
                    <p className="text-slate-300 mt-1 text-sm sm:text-base">{practice.description}</p>
                  </div>
                </div>
              </div>
            ))}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {sections.map((section) => {
            const completion = getCompletionPercentage(section.id);
            
            return (
              <div
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 sm:p-6 hover:border-blue-500/50 transition-all duration-300 h-full">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                        <section.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                      </div>
                      
                      {completion > 0 && (
                        <div className="text-right">
                          <div className="text-xs sm:text-sm font-semibold text-green-400">{completion}%</div>
                          <div className="text-xs text-slate-400">Complété</div>
                        </div>
                      )}
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
                        {section.practices.length} pratiques à découvrir
                      </div>
                      
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>

                    {completion > 0 && (
                      <div className="w-full bg-slate-700 rounded-full h-1.5 sm:h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                          style={{ width: `${completion}%` }}
                        ></div>
                      </div>
                    )}
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