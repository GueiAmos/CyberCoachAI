import React from 'react';
import { GamepadIcon, ScanLine, BookOpen, Shield, Lock, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { Page } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const modules = [
    {
      id: 'cyberquest-desc' as Page,
      title: 'CyberQuest',
      subtitle: 'Jeu éducatif interactif',
      description: 'Apprenez à identifier et contrer les cybermenaces à travers des scénarios réalistes et immersifs.',
      icon: GamepadIcon,
      gradient: 'bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600',
      glowColor: 'shadow-emerald-500/50',
      bgPattern: 'bg-emerald-500/5'
    },
    {
      id: 'cyberscan-desc' as Page,
      title: 'CyberScan',
      subtitle: 'Audit de sécurité',
      description: 'Analysez votre niveau de protection numérique et obtenez un plan d\'action personnalisé.',
      icon: ScanLine,
      gradient: 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500',
      glowColor: 'shadow-orange-500/50',
      bgPattern: 'bg-orange-500/5'
    },
    {
      id: 'cyberguide-desc' as Page,
      title: 'CyberGuide',
      subtitle: 'Assistant IA intelligent',
      description: 'Votre mentor virtuel pour maîtriser les bonnes pratiques de cybersécurité au quotidien.',
      icon: BookOpen,
      gradient: 'bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600',
      glowColor: 'shadow-blue-500/50',
      bgPattern: 'bg-blue-500/5'
    }
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative space-y-20 px-4 py-8">
        <section className="text-center space-y-8 max-w-5xl mx-auto pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-full backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Plateforme de sensibilisation nouvelle génération
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            <span className="block text-white mb-2">Votre protection</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              commence ici
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Formez-vous à la cybersécurité de manière interactive et personnalisée grâce à l'intelligence artificielle
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl">
              <Lock className="h-5 w-5 text-cyan-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-400">Gratuit</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl">
              <Zap className="h-5 w-5 text-emerald-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs text-slate-400">Modules IA</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl">
              <Shield className="h-5 w-5 text-amber-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-slate-400">Disponible</div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Découvrez nos modules
            </h2>
            <p className="text-slate-400 text-lg">
              Choisissez votre parcours d'apprentissage
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <div
                key={module.id}
                onClick={() => onNavigate(module.id)}
                className="group relative cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 ${module.bgPattern} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative border border-slate-700/50 group-hover:border-slate-600 rounded-3xl p-8 space-y-6 backdrop-blur-sm transition-all duration-500">
                  <div className={`w-16 h-16 ${module.gradient} rounded-2xl flex items-center justify-center shadow-lg ${module.glowColor} group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                    <module.icon className="h-8 w-8 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm font-medium text-cyan-400">
                      {module.subtitle}
                    </p>
                    <p className="text-slate-300 leading-relaxed min-h-[60px]">
                      {module.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-4 transition-all duration-300">
                    <span>Découvrir</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <Shield className="h-5 w-5 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Pourquoi CyberCoach AI ?</span>
            </div>

            <h3 className="text-3xl font-bold text-white">
              Une approche innovante de la formation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-6">
              {[
                { icon: GamepadIcon, title: 'Gamification', desc: 'Apprentissage par le jeu', color: 'emerald' },
                { icon: Sparkles, title: 'IA Avancée', desc: 'Assistance intelligente', color: 'cyan' },
                { icon: Shield, title: 'Sécurité', desc: 'Pratiques certifiées', color: 'blue' },
                { icon: Zap, title: 'Rapidité', desc: 'Résultats immédiats', color: 'amber' }
              ].map((feature, idx) => (
                <div key={idx} className="space-y-3 group">
                  <div className={`w-14 h-14 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-${feature.color}-500/20 transition-colors duration-300`}>
                    <feature.icon className={`h-7 w-7 text-${feature.color}-400`} />
                  </div>
                  <h4 className="font-bold text-white text-lg">{feature.title}</h4>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto text-center py-8">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 space-y-4">
            <p className="text-slate-300">
              Développé par <span className="text-cyan-400 font-semibold">Guei Gnomblehi Amos</span>
            </p>
            <p className="text-slate-500 text-sm">
              Développeur d'applications & Expert en cybersécurité
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}