import React from 'react';
import { GamepadIcon, ScanLine, BookOpen, Shield, Lock, AlertTriangle, Eye, CheckCircle, ArrowRight, Zap, Users, Clock, Smartphone, Laptop, Globe, TrendingUp, Award, Star } from 'lucide-react';
import { Page } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      <div className="relative">
        <section className="px-4 py-12 sm:py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4 animate-fade-in">
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

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg">
                <Users className="h-5 w-5 text-emerald-400" />
                <span className="text-white font-medium">Pour tous</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg">
                <Clock className="h-5 w-5 text-cyan-400" />
                <span className="text-white font-medium">15 min/jour</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">Résultats rapides</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2">100%</div>
                <div className="text-sm text-slate-300">Gratuit</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">35+</div>
                <div className="text-sm text-slate-300">Scénarios</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-sm text-slate-300">Disponible</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">IA</div>
                <div className="text-sm text-slate-300">Avancée</div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16 bg-slate-800/30">
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
              <div className="bg-slate-800/50 border border-red-500/20 rounded-xl p-6 text-center hover:border-red-500/40 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Vol de compte</h3>
                <p className="text-slate-400 text-sm">
                  Quelqu'un accède à vos réseaux sociaux, emails ou compte bancaire
                </p>
              </div>

              <div className="bg-slate-800/50 border border-orange-500/20 rounded-xl p-6 text-center hover:border-orange-500/40 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Arnaques</h3>
                <p className="text-slate-400 text-sm">
                  Faux emails, faux sites web qui vous demandent de l'argent ou vos données
                </p>
              </div>

              <div className="bg-slate-800/50 border border-yellow-500/20 rounded-xl p-6 text-center hover:border-yellow-500/40 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Espionnage</h3>
                <p className="text-slate-400 text-sm">
                  Vos conversations, photos et activités surveillées sans votre accord
                </p>
              </div>

              <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6 text-center hover:border-cyan-500/40 hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Usurpation</h3>
                <p className="text-slate-400 text-sm">
                  Quelqu'un se fait passer pour vous et utilise votre identité
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border border-emerald-500/30 rounded-2xl p-8 text-center">
              <p className="text-emerald-400 font-semibold text-xl mb-3">
                Bonne nouvelle : vous pouvez facilement vous protéger !
              </p>
              <p className="text-slate-300">
                Avec les bons réflexes et les bonnes connaissances, vous réduisez les risques de 90%
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4">
                <Star className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-cyan-300 font-medium">Nos 3 outils</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Choisissez votre méthode d'apprentissage
              </h2>
              <p className="text-slate-300 text-lg">
                Trois façons différentes et complémentaires de renforcer votre sécurité
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div
                onClick={() => onNavigate('cyberquest-desc')}
                className="group bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 group-hover:scale-110 transition-all duration-300">
                  <GamepadIcon className="h-7 w-7 text-emerald-400" />
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">CyberQuest</h3>
                  <p className="text-emerald-200/80 font-medium mb-4">Apprendre en jouant</p>

                  <div className="flex items-center gap-2 text-sm text-emerald-300 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>5-10 minutes par scénario</span>
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    Testez vos réflexes face à de vraies situations : reconnaître un faux email,
                    créer un bon mot de passe, éviter les pièges sur internet.
                  </p>
                </div>

                <div className="flex items-center text-emerald-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Jouer maintenant</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </div>

              <div
                onClick={() => onNavigate('cyberscan-desc')}
                className="group bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-orange-500/30 rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-105 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/30 group-hover:scale-110 transition-all duration-300">
                  <ScanLine className="h-7 w-7 text-orange-400" />
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">CyberScan</h3>
                  <p className="text-orange-200/80 font-medium mb-4">Faire le point sur ma sécurité</p>

                  <div className="flex items-center gap-2 text-sm text-orange-300 mb-4">
                    <TrendingUp className="h-4 w-4" />
                    <span>Diagnostic en 3 minutes</span>
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    Répondez à quelques questions simples et découvrez où vous êtes vulnérable.
                    Recevez des conseils personnalisés et faciles à appliquer.
                  </p>
                </div>

                <div className="flex items-center text-orange-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Faire le diagnostic</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </div>

              <div
                onClick={() => onNavigate('cyberguide-desc')}
                className="group bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-105 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="h-7 w-7 text-cyan-400" />
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">CyberGuide</h3>
                  <p className="text-cyan-200/80 font-medium mb-4">Poser mes questions</p>

                  <div className="flex items-center gap-2 text-sm text-cyan-300 mb-4">
                    <Zap className="h-4 w-4" />
                    <span>Réponses instantanées</span>
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    Discutez avec une intelligence artificielle qui répond à toutes vos questions
                    sur la sécurité en ligne, avec des mots simples.
                  </p>
                </div>

                <div className="flex items-center text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Commencer la discussion</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ce que vous allez apprendre
              </h2>
              <p className="text-slate-300 text-lg">
                Des compétences pratiques que vous utiliserez tous les jours
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { text: 'Créer des mots de passe vraiment sûrs', icon: Lock },
                { text: 'Repérer les faux emails et messages', icon: AlertTriangle },
                { text: 'Protéger vos données personnelles', icon: Shield },
                { text: 'Sécuriser vos comptes en ligne', icon: CheckCircle },
                { text: 'Naviguer sur internet sans danger', icon: Globe },
                { text: 'Éviter les arnaques courantes', icon: Eye }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-emerald-500/30 hover:bg-slate-800/70 transition-all duration-300">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-slate-200 pt-1.5">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Accessible sur tous vos appareils
              </h2>
              <p className="text-slate-300 text-lg">
                Apprenez où vous voulez, quand vous voulez
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 text-center hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Mobile</h3>
                <p className="text-slate-400 text-sm">
                  Sur votre smartphone, dans le bus ou en pause
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 text-center hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Laptop className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Ordinateur</h3>
                <p className="text-slate-400 text-sm">
                  Sur votre PC ou Mac, confortablement installé
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 text-center hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">En ligne</h3>
                <p className="text-slate-400 text-sm">
                  Aucune installation requise, juste un navigateur
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16 bg-gradient-to-r from-emerald-900/20 via-cyan-900/20 to-blue-900/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Pourquoi CyberCoach AI est différent
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Sans jargon technique</h3>
                    <p className="text-slate-300 text-sm">
                      Tout est expliqué avec des mots simples, comme si vous parliez avec un ami
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Interactif et ludique</h3>
                    <p className="text-slate-300 text-sm">
                      Pas de longs cours ennuyeux, vous apprenez en pratiquant et en jouant
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Adapté à votre niveau</h3>
                    <p className="text-slate-300 text-sm">
                      L'IA s'adapte automatiquement pour vous proposer le contenu le plus pertinent
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Pour tout le monde</h3>
                    <p className="text-slate-300 text-sm">
                      Que vous soyez étudiant, parent, professionnel ou retraité, c'est pour vous
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Prêt à prendre le contrôle de votre sécurité ?
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Commencez dès maintenant, c'est 100% gratuit et accessible à tous
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('cyberquest-desc')}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20"
                >
                  Démarrer avec CyberQuest
                </button>
                <button
                  onClick={() => onNavigate('cyberscan-desc')}
                  className="px-8 py-4 bg-slate-700/50 border border-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700 hover:scale-105 transition-all duration-300"
                >
                  Faire le diagnostic
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="px-4 py-12 border-t border-slate-700/50 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-cyan-400" />
                <span className="text-xl font-bold text-white">CyberCoach AI</span>
              </div>
              <p className="text-slate-400">
                Créé par <span className="text-cyan-400 font-medium">Guei Gnomblehi Amos</span>
              </p>
              <p className="text-slate-500 text-sm">
                Développeur d'applications & Expert en cybersécurité
              </p>
              <div className="pt-6 text-slate-500 text-xs">
                <p>© 2024 CyberCoach AI - Tous droits réservés</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
