import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, RotateCcw, Award, Loader2, Grid3X3, Users, Smartphone, Wifi, Shield, Globe, AlertTriangle } from 'lucide-react';
import { getScenarios, type Scenario } from '../lib/supabase';

interface CyberQuestProps {
  onBack: () => void;
}

interface CategoryInfo {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  count: number;
}

export default function CyberQuest({ onBack }: CyberQuestProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  // Obtenir les catégories uniques avec leurs informations
  const getCategories = (): CategoryInfo[] => {
    const categoryMap = new Map<string, number>();
    
    scenarios.forEach(scenario => {
      const count = categoryMap.get(scenario.category) || 0;
      categoryMap.set(scenario.category, count + 1);
    });

    const categoryIcons: Record<string, { icon: React.ComponentType<any>; color: string; description: string }> = {
      'Phishing': { 
        icon: AlertTriangle, 
        color: 'from-red-500 to-red-600', 
        description: 'Apprenez à reconnaître les tentatives de phishing par email et SMS' 
      },
      'Ingénierie sociale': { 
        icon: Users, 
        color: 'from-purple-500 to-purple-600', 
        description: 'Découvrez les techniques de manipulation psychologique des cybercriminels' 
      },
      'Sécurité Wi-Fi': { 
        icon: Wifi, 
        color: 'from-blue-500 to-blue-600', 
        description: 'Maîtrisez les bonnes pratiques pour les connexions Wi-Fi publiques' 
      },
      'Ransomware': { 
        icon: Shield, 
        color: 'from-orange-500 to-orange-600', 
        description: 'Protégez-vous contre les logiciels de rançon et leurs techniques' 
      },
      'Sécurité mobile': { 
        icon: Smartphone, 
        color: 'from-green-500 to-green-600', 
        description: 'Sécurisez vos appareils mobiles et applications' 
      },
      'Malware': { 
        icon: AlertTriangle, 
        color: 'from-yellow-500 to-yellow-600', 
        description: 'Identifiez et évitez les logiciels malveillants' 
      },
      'Réseaux sociaux': { 
        icon: Globe, 
        color: 'from-indigo-500 to-indigo-600', 
        description: 'Protégez votre vie privée sur les plateformes sociales' 
      }
    };

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
      icon: categoryIcons[name]?.icon || Grid3X3,
      color: categoryIcons[name]?.color || 'from-gray-500 to-gray-600',
      description: categoryIcons[name]?.description || 'Scénarios de cybersécurité'
    }));
  };

  const filteredScenarios = selectedCategory 
    ? scenarios.filter(s => s.category === selectedCategory)
    : scenarios;

  const currentScenario = filteredScenarios[currentScenarioIndex];

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
    if (currentScenarioIndex < filteredScenarios.length - 1) {
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

  const handleBackToCategories = () => {
    setSelectedCategory(null);
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

  const isComplete = currentScenarioIndex === filteredScenarios.length - 1 && showResult;

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

  // Vue de sélection des catégories
  if (!selectedCategory) {
    const categories = getCategories();
    
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
            <p className="text-blue-300 text-sm sm:text-base hidden sm:block">Choisissez votre catégorie</p>
          </div>
          
          <div className="w-16 sm:w-20"></div>
        </div>

        {/* Introduction */}
        <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Choisissez votre domaine de formation
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Sélectionnez la catégorie de cybersécurité que vous souhaitez explorer. 
            Chaque catégorie contient des scénarios spécialisés pour approfondir vos connaissances.
          </p>
        </div>

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 sm:p-6 hover:border-blue-500/50 transition-all duration-300 h-full">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}>
                      <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg sm:text-xl font-bold text-blue-400">{category.count}</div>
                      <div className="text-xs sm:text-sm text-slate-400">scénarios</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-300 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-1 sm:pt-2">
                    <div className="text-sm text-slate-400">
                      Niveau mixte
                    </div>
                    
                    <div className="text-blue-400 group-hover:text-blue-300 transition-colors font-medium text-sm">
                      Commencer →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques globales */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 sm:p-6">
          <div className="text-center space-y-2 sm:space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-white">Statistiques globales</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-400">{scenarios.length}</div>
                <div className="text-xs sm:text-sm text-slate-400">Scénarios total</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-400">{categories.length}</div>
                <div className="text-xs sm:text-sm text-slate-400">Catégories</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-purple-400">3</div>
                <div className="text-xs sm:text-sm text-slate-400">Niveaux</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-orange-400">∞</div>
                <div className="text-xs sm:text-sm text-slate-400">Rejouabilité</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vue du jeu (scénarios)
  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <button
          onClick={handleBackToCategories}
          className="flex items-center space-x-1 sm:space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Catégories</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white">{selectedCategory}</h1>
          <p className="text-blue-300 text-sm sm:text-base hidden sm:block">CyberQuest</p>
        </div>
        
        <div className="text-right">
          <div className={`text-lg sm:text-2xl font-bold ${getScoreColor()}`}>
            Score: {score}/{answeredScenarios}
          </div>
          <div className="text-slate-400 text-xs sm:text-sm">
            Scénario {currentScenarioIndex + 1}/{filteredScenarios.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentScenarioIndex + (showResult ? 1 : 0)) / filteredScenarios.length) * 100}%` }}
        ></div>
      </div>

      {isComplete ? (
        /* Final Results */
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 text-center space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <Award className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-400" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Catégorie {selectedCategory} terminée !
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            <div className={`text-3xl sm:text-4xl font-bold ${getScoreColor()}`}>
              {score}/{filteredScenarios.length}
            </div>
            
            <div className="text-lg sm:text-xl text-slate-300 px-4">
              {score === filteredScenarios.length && "Parfait ! Vous maîtrisez cette catégorie !"}
              {score >= filteredScenarios.length * 0.8 && score < filteredScenarios.length && "Excellent ! Vous avez de très bonnes bases."}
              {score >= filteredScenarios.length * 0.6 && score < filteredScenarios.length * 0.8 && "Bien joué ! Continuez à vous former."}
              {score < filteredScenarios.length * 0.6 && "Bon début ! La pratique vous aidera à progresser."}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Recommencer</span>
            </button>
            
            <button
              onClick={handleBackToCategories}
              className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              <Grid3X3 className="h-5 w-5" />
              <span>Autres catégories</span>
            </button>
          </div>
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
              
              {currentScenarioIndex < filteredScenarios.length - 1 && (
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