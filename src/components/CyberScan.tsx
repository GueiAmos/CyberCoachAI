import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, RotateCcw, Target, Loader2 } from 'lucide-react';
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

    if (percentage >= 80) {
      return {
        score: Math.round(percentage),
        level: 'Élevé',
        color: 'text-green-400',
        icon: CheckCircle,
        recommendations: [
          "Excellent ! Continuez à maintenir ces bonnes pratiques de sécurité.",
          "Restez informé des nouvelles menaces et techniques de protection.",
          "Partagez vos connaissances avec votre entourage pour les sensibiliser."
        ]
      };
    } else if (percentage >= 50) {
      return {
        score: Math.round(percentage),
        level: 'Moyen',
        color: 'text-yellow-400',
        icon: AlertTriangle,
        recommendations: [
          "Activez l'authentification à deux facteurs sur tous vos comptes importants.",
          "Utilisez un gestionnaire de mots de passe pour créer des mots de passe uniques.",
          "Soyez plus vigilant avec les emails suspects et vérifiez toujours la source."
        ]
      };
    } else {
      return {
        score: Math.round(percentage),
        level: 'Faible',
        color: 'text-red-400',
        icon: XCircle,
        recommendations: [
          "Commencez par installer un gestionnaire de mots de passe et créez des mots de passe uniques.",
          "Activez immédiatement l'authentification à deux facteurs sur vos comptes sensibles.",
          "Méfiez-vous des emails suspects et ne cliquez jamais sur des liens douteux."
        ]
      };
    }
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

          {/* Recommendations */}
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