import React from 'react';
import { ArrowLeft, ArrowRight, GamepadIcon, ScanLine, BookOpen, Target, Award, Brain, Shield, Users, Clock, CheckCircle } from 'lucide-react';

interface ModuleDescriptionProps {
  module: 'cyberquest' | 'cyberscan' | 'cyberguide';
  onBack: () => void;
  onStart: () => void;
}

export default function ModuleDescription({ module, onBack, onStart }: ModuleDescriptionProps) {
  const moduleData = {
    cyberquest: {
      title: 'CyberQuest',
      subtitle: 'Jeu éducatif interactif',
      icon: GamepadIcon,
      color: 'from-green-500 to-emerald-600',
      description: 'Apprenez la cybersécurité de manière ludique à travers des scénarios réalistes et interactifs.',
      longDescription: 'CyberQuest vous plonge dans des situations concrètes de cybersécurité que vous pourriez rencontrer au quotidien. Chaque scénario vous présente un défi réel avec plusieurs choix de réaction.',
      whatYouWillDo: [
        'Analyser des situations de cybermenaces réelles',
        'Choisir la meilleure réaction face aux dangers',
        'Découvrir les explications détaillées de chaque choix',
        'Progresser à travers différents niveaux de difficulté'
      ],
      benefits: [
        'Développer vos réflexes de sécurité',
        'Apprendre de vos erreurs sans risque',
        'Mémoriser les bonnes pratiques par la pratique',
        'Gagner en confiance face aux cybermenaces'
      ],
      features: [
        { icon: Target, text: 'Scénarios réalistes basés sur de vraies menaces' },
        { icon: Brain, text: 'Apprentissage par la pratique et l\'expérience' },
        { icon: Award, text: 'Système de score pour suivre vos progrès' },
        { icon: CheckCircle, text: 'Explications détaillées après chaque choix' }
      ],
      duration: '15-20 minutes',
      difficulty: 'Tous niveaux'
    },
    cyberscan: {
      title: 'CyberScan',
      subtitle: 'Auto-diagnostic de sécurité',
      icon: ScanLine,
      color: 'from-orange-500 to-red-600',
      description: 'Évaluez votre niveau de sécurité numérique et recevez des conseils personnalisés.',
      longDescription: 'CyberScan analyse vos habitudes numériques actuelles pour identifier vos points forts et vos vulnérabilités. Vous obtiendrez un diagnostic complet avec des recommandations sur mesure.',
      whatYouWillDo: [
        'Répondre à des questions sur vos pratiques actuelles',
        'Évaluer vos habitudes de sécurité numérique',
        'Découvrir vos points forts et axes d\'amélioration',
        'Recevoir un rapport détaillé avec votre score'
      ],
      benefits: [
        'Connaître précisément votre niveau de sécurité',
        'Identifier vos vulnérabilités prioritaires',
        'Recevoir des conseils adaptés à votre profil',
        'Suivre votre évolution dans le temps'
      ],
      features: [
        { icon: Target, text: 'Questions adaptées à votre profil utilisateur' },
        { icon: Brain, text: 'Analyse intelligente de vos réponses' },
        { icon: Award, text: 'Score de sécurité détaillé et explicite' },
        { icon: CheckCircle, text: 'Recommandations personnalisées et prioritaires' }
      ],
      duration: '10-15 minutes',
      difficulty: 'Débutant'
    },
    cyberguide: {
      title: 'CyberGuide',
      subtitle: 'Assistant intelligent et guides pratiques',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      description: 'Découvrez comment mieux protéger votre vie privée en ligne avec des guides pratiques et un assistant IA.',
      longDescription: 'CyberGuide combine des guides pratiques détaillés avec un assistant IA intelligent pour vous accompagner dans l\'amélioration de votre sécurité numérique au quotidien.',
      whatYouWillDo: [
        'Explorer des guides détaillés par domaine de sécurité',
        'Suivre des checklists de bonnes pratiques',
        'Poser vos questions à l\'assistant IA CyberGuide',
        'Appliquer concrètement les conseils dans votre quotidien'
      ],
      benefits: [
        'Maîtriser les fondamentaux de la cybersécurité',
        'Avoir des réponses immédiates à vos questions',
        'Suivre votre progression avec les checklists',
        'Bénéficier de conseils adaptés à vos besoins'
      ],
      features: [
        { icon: Target, text: 'Guides spécialisés par domaine (mobile, web, etc.)' },
        { icon: Brain, text: 'Assistant IA disponible 24h/24 pour vos questions' },
        { icon: Award, text: 'Checklists interactives pour suivre vos progrès' },
        { icon: CheckCircle, text: 'Conseils pratiques et immédiatement applicables' }
      ],
      duration: 'À votre rythme',
      difficulty: 'Tous niveaux'
    }
  };

  const data = moduleData[module];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 px-4">
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
          <div className="flex items-center space-x-2 sm:space-x-3 justify-center">
            <data.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{data.title}</h1>
          </div>
          <p className="text-blue-300 text-sm sm:text-base">{data.subtitle}</p>
        </div>
        
        <div className="w-16 sm:w-20"></div>
      </div>

      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${data.color} rounded-2xl p-6 sm:p-8 text-center space-y-4`}>
        <data.icon className="h-12 w-12 sm:h-16 sm:w-16 text-white mx-auto" />
        <h2 className="text-xl sm:text-2xl font-bold text-white">{data.description}</h2>
        <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto">{data.longDescription}</p>
        
        <div className="flex items-center justify-center pt-4">
          <div className="flex items-center space-x-2 text-white/80">
            <Users className="h-4 w-4" />
            <span className="text-sm">{data.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Ce que vous allez faire */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-400" />
            <span>Ce que vous allez faire</span>
          </h3>
          
          <div className="space-y-3">
            {data.whatYouWillDo.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5">
                  {index + 1}
                </div>
                <p className="text-slate-300 text-sm sm:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ce que vous allez apprendre */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Brain className="h-5 w-5 text-green-400" />
            <span>Ce que vous allez apprendre</span>
          </h3>
          
          <div className="space-y-3">
            {data.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white text-center flex items-center justify-center space-x-2">
          <Shield className="h-6 w-6 text-purple-400" />
          <span>Fonctionnalités principales</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {data.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-xl">
              <feature.icon className="h-5 w-5 text-purple-400 mt-1" />
              <p className="text-slate-300 text-sm sm:text-base">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white">Prêt à commencer ?</h3>
          <p className="text-slate-300 text-sm sm:text-base">
            Lancez-vous dans cette expérience d'apprentissage interactive !
          </p>
        </div>
        
        <button
          onClick={onStart}
          className={`inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${data.color} hover:opacity-90 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base`}
        >
          <span>Commencer {data.title}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}