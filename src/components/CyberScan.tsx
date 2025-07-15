import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, RotateCcw, Target, Loader2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getScanQuestions, type ScanQuestion } from '../lib/supabase';

interface CyberScanProps {
  onBack: () => void;
}

interface ScanResult {
  score: number;
  level: 'Faible' | 'Moyen' | 'Élevé';
  color: string;
  icon: React.ComponentType<any>;
  recommendations: string[];
  detailedAnalysis: Array<{
    category: string;
    score: number;
    maxScore: number;
    status: 'good' | 'warning' | 'danger';
    advice: string;
  }>;
}

export default function CyberScan({ onBack }: CyberScanProps) {
  const [questions, setQuestions] = useState<ScanQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await getScanQuestions();
      if (data.length === 0) {
        setError('Aucune question disponible pour le moment.');
      } else {
        setQuestions(data);
      }
    } catch (err) {
      setError('Erreur lors du chargement des questions.');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = (): ScanResult => {
    const totalScore = answers.reduce((sum, answerIndex, questionIndex) => {
      return sum + questions[questionIndex].options[answerIndex].score;
    }, 0);

    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;

    // Analyse détaillée par catégorie
    const categoryAnalysis = questions.map((question, index) => {
      const userScore = questions[index].options[answers[index]].score;
      const category = getCategoryFromQuestion(question.question_text);
      
      let status: 'good' | 'warning' | 'danger' = 'good';
      let advice = '';

      if (userScore === 3) {
        status = 'good';
        advice = `Excellent ! Continuez sur cette voie pour ${category.toLowerCase()}.`;
      } else if (userScore === 2) {
        status = 'warning';
        advice = `Bien, mais vous pouvez améliorer vos pratiques en ${category.toLowerCase()}.`;
      } else if (userScore === 1) {
        status = 'warning';
        advice = `Attention ! Vos pratiques en ${category.toLowerCase()} nécessitent des améliorations.`;
      } else {
        status = 'danger';
        advice = `Critique ! Vous devez immédiatement améliorer vos pratiques en ${category.toLowerCase()}.`;
      }

      return {
        category,
        score: userScore,
        maxScore: 3,
        status,
        advice
      };
    });

    // Générer des recommandations personnalisées basées sur les réponses
    const recommendations = generatePersonalizedRecommendations(answers, questions);

    if (percentage >= 80) {
      return {
        score: Math.round(percentage),
        level: 'Élevé',
        color: 'text-green-400',
        icon: CheckCircle,
        recommendations,
        detailedAnalysis: categoryAnalysis
      };
    } else if (percentage >= 50) {
      return {
        score: Math.round(percentage),
        level: 'Moyen',
        color: 'text-yellow-400',
        icon: AlertTriangle,
        recommendations,
        detailedAnalysis: categoryAnalysis
      };
    } else {
      return {
        score: Math.round(percentage),
        level: 'Faible',
        color: 'text-red-400',
        icon: XCircle,
        recommendations,
        detailedAnalysis: categoryAnalysis
      };
    }
  };

  const getCategoryFromQuestion = (questionText: string): string => {
    if (questionText.includes('mot de passe')) return 'Gestion des mots de passe';
    if (questionText.includes('authentification') || questionText.includes('2FA')) return 'Authentification à deux facteurs';
    if (questionText.includes('mise à jour')) return 'Mises à jour de sécurité';
    if (questionText.includes('email') || questionText.includes('phishing')) return 'Protection contre le phishing';
    if (questionText.includes('Wi-Fi') || questionText.includes('réseau')) return 'Sécurité des réseaux';
    if (questionText.includes('sauvegarde')) return 'Sauvegarde des données';
    if (questionText.includes('réseaux sociaux')) return 'Confidentialité réseaux sociaux';
    if (questionText.includes('antivirus')) return 'Protection antivirus';
    if (questionText.includes('informations personnelles')) return 'Protection des données personnelles';
    if (questionText.includes('formation') || questionText.includes('veille')) return 'Formation continue';
    return 'Sécurité générale';
  };

  const generatePersonalizedRecommendations = (userAnswers: number[], questionsList: ScanQuestion[]): string[] => {
    const recommendations: string[] = [];
    const priorities: Array<{ priority: number; text: string }> = [];

    userAnswers.forEach((answerIndex, questionIndex) => {
      const question = questionsList[questionIndex];
      const userScore = question.options[answerIndex].score;
      const questionText = question.question_text;

      // Recommandations spécifiques basées sur les réponses
      if (questionText.includes('mot de passe') && userScore < 3) {
        if (userScore === 0) {
          priorities.push({
            priority: 1,
            text: "🚨 URGENT : Installez immédiatement un gestionnaire de mots de passe (Bitwarden, 1Password) et créez des mots de passe uniques pour tous vos comptes."
          });
        } else if (userScore === 1) {
          priorities.push({
            priority: 2,
            text: "🔐 Améliorez vos mots de passe : utilisez au moins 12 caractères avec lettres, chiffres et symboles, et évitez la réutilisation."
          });
        } else {
          priorities.push({
            priority: 3,
            text: "✅ Continuez à utiliser des mots de passe forts et envisagez un gestionnaire pour plus de sécurité."
          });
        }
      }

      if (questionText.includes('authentification') && userScore < 3) {
        if (userScore === 0) {
          priorities.push({
            priority: 1,
            text: "🚨 CRITIQUE : Activez immédiatement l'authentification à deux facteurs (2FA) sur tous vos comptes sensibles (email, banque, réseaux sociaux)."
          });
        } else if (userScore === 1) {
          priorities.push({
            priority: 2,
            text: "🔒 Étendez la 2FA à tous vos comptes importants, pas seulement les plus sensibles."
          });
        }
      }

      if (questionText.includes('mise à jour') && userScore < 2) {
        priorities.push({
          priority: userScore === 0 ? 1 : 2,
          text: "🔄 Activez les mises à jour automatiques pour votre système d'exploitation et vos applications critiques."
        });
      }

      if (questionText.includes('email') && userScore < 2) {
        priorities.push({
          priority: 2,
          text: "📧 Soyez plus vigilant avec les emails : vérifiez l'expéditeur, ne cliquez pas sur les liens suspects, et méfiez-vous des demandes urgentes."
        });
      }

      if (questionText.includes('Wi-Fi') && userScore < 2) {
        priorities.push({
          priority: 2,
          text: "📶 Évitez les Wi-Fi publics pour les données sensibles, utilisez un VPN ou votre connexion mobile."
        });
      }

      if (questionText.includes('sauvegarde') && userScore < 2) {
        priorities.push({
          priority: 2,
          text: "💾 Mettez en place une stratégie de sauvegarde régulière (règle 3-2-1 : 3 copies, 2 supports différents, 1 hors site)."
        });
      }

      if (questionText.includes('réseaux sociaux') && userScore < 2) {
        priorities.push({
          priority: 3,
          text: "🌐 Révisez vos paramètres de confidentialité sur les réseaux sociaux et limitez les informations publiques."
        });
      }

      if (questionText.includes('antivirus') && userScore < 2) {
        priorities.push({
          priority: 2,
          text: "🛡️ Installez et maintenez à jour un antivirus réputé, et effectuez des analyses régulières."
        });
      }

      if (questionText.includes('informations personnelles') && userScore < 2) {
        priorities.push({
          priority: 2,
          text: "🔒 Limitez le partage d'informations personnelles en ligne et vérifiez les paramètres de confidentialité de vos comptes."
        });
      }

      if (questionText.includes('formation') && userScore < 2) {
        priorities.push({
          priority: 3,
          text: "📚 Restez informé des nouvelles menaces en suivant des sources fiables de cybersécurité."
        });
      }
    });

    // Trier par priorité et prendre les 5 plus importantes
    priorities.sort((a, b) => a.priority - b.priority);
    return priorities.slice(0, 5).map(item => item.text);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = showResult ? calculateResult() : null;

  // État de chargement
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-1 sm:space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Retour</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">CyberScan</h1>
            <p className="text-blue-300 text-sm sm:text-base hidden sm:block">Évaluez votre sécurité numérique</p>
          </div>
          
          <div className="w-16 sm:w-20"></div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 text-orange-400 animate-spin mx-auto" />
          <p className="text-slate-300 text-sm sm:text-base">Chargement des questions...</p>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-1 sm:space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Retour</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">CyberScan</h1>
            <p className="text-blue-300 text-sm sm:text-base hidden sm:block">Évaluez votre sécurité numérique</p>
          </div>
          
          <div className="w-16 sm:w-20"></div>
        </div>

        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <XCircle className="h-8 w-8 sm:h-12 sm:w-12 text-red-400 mx-auto" />
          <p className="text-red-300 text-sm sm:text-base">{error}</p>
          <button
            onClick={loadQuestions}
            className="px-4 sm:px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl sm:text-3xl font-bold text-white">CyberScan</h1>
          <p className="text-blue-300 text-sm sm:text-base hidden sm:block">Évaluez votre sécurité numérique</p>
        </div>
        
        <div className="text-right">
          <div className="text-slate-400 text-xs sm:text-sm">
            Question {showResult ? questions.length : currentQuestionIndex + 1}/{questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((showResult ? questions.length : currentQuestionIndex) / questions.length) * 100}%` }}
        ></div>
      </div>

      {showResult && result ? (
        /* Results */
        <div className="space-y-4 sm:space-y-6">
          {/* Score Display */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 text-center space-y-4 sm:space-y-6">
            <div className="flex justify-center">
              <result.icon className={`h-12 w-12 sm:h-16 sm:w-16 ${result.color}`} />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Votre Niveau de Sécurité
            </h2>
            
            <div className="space-y-1 sm:space-y-2">
              <div className={`text-4xl sm:text-5xl font-bold ${result.color}`}>
                {result.score}%
              </div>
              <div className={`text-xl sm:text-2xl font-semibold ${result.color}`}>
                Niveau {result.level}
              </div>
            </div>
          </div>


          {/* Personalized Recommendations */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">
                Recommandations Personnalisées
              </h3>
            </div>
            
            <div className="space-y-4">
              {result.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm mt-1">
                    {index + 1}
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{recommendation}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center pt-2 sm:pt-4">
              <button
                onClick={handleRestart}
                className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm sm:text-base"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Refaire le diagnostic</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Current Question */
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {currentQuestion.question_text}
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base">
              Choisissez la réponse qui correspond le mieux à vos habitudes :
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-3 sm:p-4 text-left rounded-xl border-2 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/5 border-slate-600 bg-slate-700/50`}
              >
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    option.risk === 'low' ? 'bg-green-500' :
                    option.risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm sm:text-base">
                      {option.text}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}