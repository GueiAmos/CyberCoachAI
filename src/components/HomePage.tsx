import React from 'react';
import { GamepadIcon, ScanLine, BookOpen, Shield, Target, Brain, Star } from 'lucide-react';
import { Page } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto pt-16 sm:pt-24">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white/90 font-medium">Votre coach cybersécurité personnel</span>
              </div>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 leading-none">
              <span className="block text-white">Protégez</span>
              <span className="block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                  votre monde
                </span>
              </span>
              <span className="block text-white mt-2">numérique</span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Maîtrisez la cybersécurité avec des outils interactifs propulsés par l'IA
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <div className="group">
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-400/40 transition-all duration-300">
                  <Target className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">35+</div>
                  <div className="text-sm text-slate-400">Scénarios</div>
                </div>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300">
                  <Brain className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">IA</div>
                  <div className="text-sm text-slate-400">Avancée</div>
                </div>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 hover:border-blue-400/40 transition-all duration-300">
                  <Shield className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-slate-400">Sécurisé</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div
              onClick={() => onNavigate('cyberquest-desc')}
              className="group relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 opacity-90" />
              <div className="absolute inset-0 bg-black/20 rounded-3xl" />

              <div className="relative p-10 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-300">
                    <GamepadIcon className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-3">CyberQuest</h2>
                  <p className="text-emerald-100 font-medium mb-4">Jeu interactif de formation</p>
                </div>
                <p className="text-white/90 text-lg leading-relaxed flex-grow">
                  Affrontez des cybermenaces réelles dans des scénarios immersifs. Apprenez en jouant.
                </p>
                <div className="mt-6 flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-lg">Commencer l'aventure</span>
                  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              onClick={() => onNavigate('cyberscan-desc')}
              className="group relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 opacity-90" />
              <div className="absolute inset-0 bg-black/20 rounded-3xl" />

              <div className="relative p-10 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-300">
                    <ScanLine className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-3">CyberScan</h2>
                  <p className="text-orange-100 font-medium mb-4">Diagnostic personnalisé</p>
                </div>
                <p className="text-white/90 text-lg leading-relaxed flex-grow">
                  Évaluez vos pratiques de sécurité et recevez des recommandations sur mesure.
                </p>
                <div className="mt-6 flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-lg">Analyser maintenant</span>
                  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              onClick={() => onNavigate('cyberguide-desc')}
              className="group relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 opacity-90" />
              <div className="absolute inset-0 bg-black/20 rounded-3xl" />

              <div className="relative p-10 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-300">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-3">CyberGuide</h2>
                  <p className="text-blue-100 font-medium mb-4">Assistant IA intelligent</p>
                </div>
                <p className="text-white/90 text-lg leading-relaxed flex-grow">
                  Posez vos questions et obtenez des conseils d'expert en cybersécurité instantanément.
                </p>
                <div className="mt-6 flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-lg">Discuter avec l'IA</span>
                  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                Pourquoi choisir CyberCoach AI ?
              </h3>
              <p className="text-xl text-slate-300 leading-relaxed">
                Une expérience d'apprentissage immersive qui transforme la cybersécurité en aventure captivante.
                Formez-vous à votre rythme avec l'intelligence artificielle comme guide.
              </p>
              <div className="pt-6 border-t border-white/10">
                <p className="text-slate-400">
                  Conçu par <span className="text-cyan-400 font-semibold">Guei Gnomblehi Amos</span>
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Expert en cybersécurité & développement d'applications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}