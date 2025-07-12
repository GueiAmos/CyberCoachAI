import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, RotateCcw, Award, Loader2 } from 'lucide-react';
import { getScenarios, type Scenario } from '../lib/supabase';

interface CyberQuestProps {
  onBack: () => void;
}

export default function CyberQuest({ onBack }: CyberQuestProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredScenarios, setAnsweredScenarios] = useState(0);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      setLoading(true);
      const data = await getScenarios();
      if (data.length === 0) {
        setError('Aucun scénario disponible pour le moment.');
      } else {
        setScenarios(data);
      }
    } catch (err) {
      setError('Erreur lors du chargement des scénarios.');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentScenario = scenarios[currentScenarioIndex];

  const handleChoiceSelect = (choiceId: string) => {
    if (showResult) return;
    
    setSelectedChoice(choiceId);
    setShowResult(true);
    
    const choice = currentScenario.choices.find(c => c.id === choiceId);
    if (choice?.isCorrect) {
      setScore(prev => prev + 1);
    }
    setAnsweredScenarios(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedChoice(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentScenarioIndex(0);
    setSelectedChoice(null);
    setShowResult(false);
    setScore(0);
    setAnsweredScenarios(0);
  };

  const getScoreColor = () => {
    const percentage = (score / answeredScenarios) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const selectedChoiceData = selectedChoice 
    ? currentScenario?.choices.find(c => c.id === selectedChoice)
    : null;

  const isComplete = currentScenarioIndex === scenarios.length - 1 && showResult;

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
            <h1 className="text-2xl sm:text-3xl font-bold text-white">CyberQuest</h1>
            <p className="text-blue-300 text-sm sm:text-base hidden sm:block">Apprenez la cybersécurité en jouant</p>
          </div>
          
          <div className="w-16 sm:w-20"></div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 text-blue-400 animate-spin mx-auto" />
          <p className="text-slate-300 text-sm sm:text-base">Chargement des scénarios...</p>
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
            <h1 className="text-2xl sm:text-3xl font-bold text-white">CyberQuest</h1>
            <p className="text-blue-300 text-sm sm:text-base hidden sm:block">Apprenez la cybersécurité en jouant</p>
          </div>
          
          <div className="w-16 sm:w-20"></div>
        </div>

        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <XCircle className="h-8 w-8 sm:h-12 sm:w-12 text-red-400 mx-auto" />
          <p className="text-red-300 text-sm sm:text-base">{error}</p>
          <button
            onClick={loadScenarios}
            className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white">CyberQuest</h1>
          <p className="text-blue-300 text-sm sm:text-base hidden sm:block">Apprenez la cybersécurité en jouant</p>
        </div>
        
        <div className="text-right">
          <div className={`text-lg sm:text-2xl font-bold ${getScoreColor()}`}>
            Score: {score}/{answeredScenarios}
          </div>
          <div className="text-slate-400 text-xs sm:text-sm">
            Scénario {currentScenarioIndex + 1}/{scenarios.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentScenarioIndex + (showResult ? 1 : 0)) / scenarios.length) * 100}%` }}
        ></div>
      </div>

      {isComplete ? (
        /* Final Results */
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 text-center space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <Award className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-400" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Félicitations ! Quête terminée !
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            <div className={`text-3xl sm:text-4xl font-bold ${getScoreColor()}`}>
              {score}/{scenarios.length}
            </div>
            
            <div className="text-lg sm:text-xl text-slate-300 px-4">
              {score === scenarios.length && "Parfait ! Vous maîtrisez la cybersécurité !"}
              {score >= scenarios.length * 0.8 && score < scenarios.length && "Excellent ! Vous avez de très bonnes bases."}
              {score >= scenarios.length * 0.6 && score < scenarios.length * 0.8 && "Bien joué ! Continuez à vous former."}
              {score < scenarios.length * 0.6 && "Bon début ! La pratique vous aidera à progresser."}
            </div>
          </div>
          
          <button
            onClick={handleRestart}
            className="flex items-center space-x-2 mx-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Recommencer</span>
          </button>
        </div>
      ) : (
        /* Current Scenario */
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-6">
          {/* Scenario Header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs sm:text-sm font-medium">
                {currentScenario.category}
              </span>
              <span className="px-2 sm:px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs sm:text-sm">
                {currentScenario.difficulty}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {currentScenario.title}
            </h2>
            
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              {currentScenario.description}
            </p>
          </div>

          {/* Choices */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Quelle est votre réaction ?
            </h3>
            
            {currentScenario.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoiceSelect(choice.id)}
                disabled={showResult}
                className={`w-full p-3 sm:p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                  selectedChoice === choice.id
                    ? choice.isCorrect
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-red-500 bg-red-500/10'
                    : showResult
                    ? choice.isCorrect
                      ? 'border-green-500/50 bg-green-500/5'
                      : 'border-slate-600 bg-slate-700/30'
                    : 'border-slate-600 bg-slate-700/50 hover:border-blue-500 hover:bg-blue-500/5'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                    selectedChoice === choice.id
                      ? choice.isCorrect
                        ? 'border-green-500 bg-green-500'
                        : 'border-red-500 bg-red-500'
                      : showResult && choice.isCorrect
                      ? 'border-green-500 bg-green-500'
                      : 'border-slate-400'
                  }`}>
                    {((selectedChoice === choice.id) || (showResult && choice.isCorrect)) && (
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    )}
                    {selectedChoice === choice.id && !choice.isCorrect && (
                      <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className={`font-medium text-sm sm:text-base ${
                      selectedChoice === choice.id
                        ? choice.isCorrect ? 'text-green-300' : 'text-red-300'
                        : showResult && choice.isCorrect
                        ? 'text-green-300'
                        : 'text-white'
                    }`}>
                      {choice.text}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Result Explanation */}
          {showResult && selectedChoiceData && (
            <div className="bg-slate-700/50 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mt-1" />
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <h4 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Explication :</h4>
                    <p className="text-slate-300 text-sm sm:text-base">{selectedChoiceData.explanation}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">💡 Conseil :</h4>
                    <p className="text-blue-300 text-sm sm:text-base">{selectedChoiceData.advice}</p>
                  </div>
                </div>
              </div>
              
              {currentScenarioIndex < scenarios.length - 1 && (
                <div className="flex justify-end pt-2 sm:pt-4">
                  <button
                    onClick={handleNext}
                    className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Scénario suivant →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}