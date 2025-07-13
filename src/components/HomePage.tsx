import React from 'react';
import { GamepadIcon, ScanLine, BookOpen, Shield, Users, Award } from 'lucide-react';
import { Page } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const modules = [
    {
      id: 'cyberquest-desc' as Page,
      title: 'CyberQuest',
      subtitle: 'Jeu éducatif',
      description: 'Apprenez à repérer les cybermenaces à travers des scénarios réalistes et interactifs.',
      icon: GamepadIcon,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700'
    },
    {
      id: 'cyberscan-desc' as Page,
      title: 'CyberScan',
      subtitle: 'Auto-diagnostic',
      description: 'Évaluez votre niveau de sécurité numérique et recevez des conseils personnalisés.',
      icon: ScanLine,
      color: 'from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-600 hover:to-red-700'
    },
    {
      id: 'cyberguide-desc' as Page,
      title: 'CyberGuide',
      subtitle: 'Assistant intelligent',
      description: 'Découvrez comment mieux protéger votre vie privée en ligne avec des guides pratiques.',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700'
    }
  ];

  const stats = [
    { icon: Users, label: 'Utilisateurs formés', value: '100+' },
    { icon: Shield, label: 'Scénarios disponibles', value: '20+' },
    { icon: Award, label: 'Taux de réussite', value: '90%' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 sm:space-y-6 px-4">
        <div className="inline-flex items-center space-x-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
          <span className="text-blue-300 font-medium text-sm sm:text-base">Sensibilisation Cybersécurité Interactive</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Maîtrisez la <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Cybersécurité</span><br />
          avec l'Intelligence Artificielle
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto px-4">
          Une plateforme complète pour sensibiliser, évaluer et améliorer vos pratiques en cybersécurité 
          et protection des données personnelles.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-6 text-center">
            <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mx-auto mb-2 sm:mb-3" />
            <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm sm:text-base text-slate-300">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div className="space-y-6 sm:space-y-8 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
          Explorez nos modules de sensibilisation
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {modules.map((module) => (
            <div
              key={module.id}
              onClick={() => onNavigate(module.id)}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300 w-full"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 h-full">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300`}>
                  <module.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {module.title}
                </h3>
                
                <p className="text-blue-300 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                  {module.subtitle}
                </p>
                
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {module.description}
                </p>
                
                <div className="mt-4 sm:mt-6 flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors text-sm sm:text-base">
                  <span>Commencer →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 mx-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
          Pourquoi choisir CyberCoach AI ?
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <GamepadIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
            </div>
            <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Apprentissage Ludique</h4>
            <p className="text-slate-300 text-sm">Des scénarios interactifs et engageants</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <ScanLine className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
            </div>
            <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Diagnostic Personnalisé</h4>
            <p className="text-slate-300 text-sm">Évaluation adaptée à votre profil</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
            </div>
            <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Guides Pratiques</h4>
            <p className="text-slate-300 text-sm">Conseils concrets et applicables</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
            </div>
            <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">IA Pédagogique</h4>
            <p className="text-slate-300 text-sm">Explications simples et claires</p>
          </div>
        </div>
        
        {/* Developer Credit */}
        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
          <p className="text-slate-400 text-sm">
            Développé avec ❤️ par <span className="text-blue-400 font-medium">Guei Gnomblehi Amos</span>
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Expert en développement web et cybersécurité
          </p>
        </div>
      </div>
    </div>
  );
}