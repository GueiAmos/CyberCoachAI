import React from 'react';
import { GamepadIcon, ScanLine, BookOpen, Shield, Lock, AlertTriangle, Eye, CheckCircle, ArrowRight } from 'lucide-react';
import { Page } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50 pointer-events-none" />

      <div className="relative">
        <section className="px-4 py-12 sm:py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-300 font-medium">Formation gratuite en cybersécurité</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Protégez-vous en ligne,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                c'est plus simple que vous ne le pensez
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Apprenez les bons réflexes pour sécuriser vos comptes, vos données personnelles
              et votre vie privée sur internet. Sans jargon technique.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 bg-slate-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Pourquoi la cybersécurité vous concerne
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Chaque jour, des millions de personnes sont victimes de piratage. Voici ce qui pourrait vous arriver.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-slate-800/50 border border-red-500/20 rounded-xl p-6 text-center hover:border-red-500/40 transition-colors">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Vol de compte</h3>
                <p className="text-slate-400 text-sm">
                  Quelqu'un accède à vos réseaux sociaux, emails ou compte bancaire
                </p>
              </div>

              <div className="bg-slate-800/50 border border-orange-500/20 rounded-xl p-6 text-center hover:border-orange-500/40 transition-colors">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Arnaques</h3>
                <p className="text-slate-400 text-sm">
                  Faux emails, faux sites web qui vous demandent de l'argent ou vos données
                </p>
              </div>

              <div className="bg-slate-800/50 border border-yellow-500/20 rounded-xl p-6 text-center hover:border-yellow-500/40 transition-colors">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Espionnage</h3>
                <p className="text-slate-400 text-sm">
                  Vos conversations, photos et activités surveillées sans votre accord
                </p>
              </div>

              <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6 text-center hover:border-cyan-500/40 transition-colors">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Usurpation</h3>
                <p className="text-slate-400 text-sm">
                  Quelqu'un se fait passer pour vous et utilise votre identité
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-emerald-400 font-medium text-lg">
                Bonne nouvelle : vous pouvez facilement vous protéger !
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                3 outils pour devenir incassable
              </h2>
              <p className="text-slate-300 text-lg">
                Choisissez comment vous voulez apprendre
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div
                onClick={() => onNavigate('cyberquest-desc')}
                className="group bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-colors">
                  <GamepadIcon className="h-7 w-7 text-emerald-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">CyberQuest</h3>
                <p className="text-emerald-200/80 font-medium mb-4">Apprendre en jouant</p>

                <p className="text-slate-300 leading-relaxed mb-6">
                  Testez vos réflexes face à de vraies situations : reconnaître un faux email,
                  créer un bon mot de passe, éviter les pièges sur internet.
                </p>

                <div className="flex items-center text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Jouer maintenant</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </div>

              <div
                onClick={() => onNavigate('cyberscan-desc')}
                className="group bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-orange-500/30 rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-orange-400/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/30 transition-colors">
                  <ScanLine className="h-7 w-7 text-orange-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">CyberScan</h3>
                <p className="text-orange-200/80 font-medium mb-4">Faire le point sur ma sécurité</p>

                <p className="text-slate-300 leading-relaxed mb-6">
                  Répondez à quelques questions simples et découvrez où vous êtes vulnérable.
                  Recevez des conseils personnalisés et faciles à appliquer.
                </p>

                <div className="flex items-center text-orange-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Faire le diagnostic</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </div>

              <div
                onClick={() => onNavigate('cyberguide-desc')}
                className="group bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 transition-colors">
                  <BookOpen className="h-7 w-7 text-cyan-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">CyberGuide</h3>
                <p className="text-cyan-200/80 font-medium mb-4">Poser mes questions</p>

                <p className="text-slate-300 leading-relaxed mb-6">
                  Discutez avec une intelligence artificielle qui répond à toutes vos questions
                  sur la sécurité en ligne, avec des mots simples.
                </p>

                <div className="flex items-center text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Commencer la discussion</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ce que vous allez apprendre
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Créer des mots de passe vraiment sûrs',
                'Repérer les faux emails et messages',
                'Protéger vos données personnelles',
                'Sécuriser vos comptes en ligne',
                'Naviguer sur internet sans danger',
                'Éviter les arnaques courantes'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Prêt à prendre le contrôle de votre sécurité ?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Commencez dès maintenant, c'est gratuit et accessible à tous
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('cyberquest-desc')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Démarrer avec CyberQuest
              </button>
              <button
                onClick={() => onNavigate('cyberscan-desc')}
                className="px-8 py-4 bg-slate-700/50 border border-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all duration-300"
              >
                Faire le diagnostic
              </button>
            </div>
          </div>
        </section>

        <footer className="px-4 py-8 border-t border-slate-700/50">
          <div className="max-w-4xl mx-auto text-center space-y-2">
            <p className="text-slate-400">
              Créé par <span className="text-cyan-400 font-medium">Guei Gnomblehi Amos</span>
            </p>
            <p className="text-slate-500 text-sm">
              Développeur & Expert en cybersécurité
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}