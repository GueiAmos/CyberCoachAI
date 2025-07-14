/*
  # Compléter les scénarios pour avoir 5 par catégorie

  1. Nouveaux scénarios
    - Phishing : 3 nouveaux scénarios
    - Ingénierie sociale : 2 nouveaux scénarios  
    - Sécurité Wi-Fi : 4 nouveaux scénarios
    - Ransomware : 4 nouveaux scénarios
    - Sécurité mobile : 3 nouveaux scénarios
    - Malware : 3 nouveaux scénarios
    - Réseaux sociaux : 4 nouveaux scénarios

  2. Objectif
    - Chaque catégorie aura exactement 5 scénarios
    - Couvrir différents niveaux de difficulté
    - Situations variées et réalistes
*/

-- PHISHING (3 nouveaux scénarios)
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Email de livraison suspect',
  'Vous recevez un email de "DHL" indiquant qu''un colis vous attend, mais vous n''avez rien commandé récemment. L''email contient un lien pour "suivre votre colis" et demande de confirmer vos informations personnelles.',
  'Phishing',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Cliquer sur le lien pour vérifier s''il y a vraiment un colis",
      "isCorrect": false,
      "explanation": "C''est un piège classique ! Les vrais transporteurs n''envoient pas d''emails non sollicités avec des liens suspects.",
      "advice": "Connectez-vous directement sur le site officiel du transporteur ou appelez-les pour vérifier."
    },
    {
      "id": "choice2",
      "text": "Supprimer l''email et vérifier sur le site officiel de DHL",
      "isCorrect": true,
      "explanation": "Excellente réaction ! Vous évitez le piège en vérifiant par un canal officiel.",
      "advice": "Toujours vérifier les informations de livraison directement sur les sites officiels des transporteurs."
    },
    {
      "id": "choice3",
      "text": "Transférer l''email à vos proches pour leur demander conseil",
      "isCorrect": false,
      "explanation": "Transférer un email de phishing peut exposer vos contacts au même danger.",
      "advice": "Ne transférez jamais d''emails suspects. Supprimez-les et vérifiez par vous-même sur les sites officiels."
    }
  ]'
),
(
  'Fausse alerte de sécurité PayPal',
  'Vous recevez un email urgent de "PayPal Sécurité" indiquant qu''une activité suspecte a été détectée sur votre compte. L''email vous demande de cliquer immédiatement sur un lien pour "sécuriser votre compte".',
  'Phishing',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Cliquer rapidement sur le lien par peur de perdre mon compte",
      "isCorrect": false,
      "explanation": "La peur et l''urgence sont des tactiques classiques des cybercriminels pour vous faire agir sans réfléchir.",
      "advice": "Prenez toujours le temps de vérifier. Les vraies alertes de sécurité peuvent attendre quelques minutes."
    },
    {
      "id": "choice2",
      "text": "Vérifier l''adresse email de l''expéditeur et me connecter directement sur PayPal",
      "isCorrect": true,
      "explanation": "Parfait ! Vérifier l''expéditeur et se connecter directement est la meilleure approche.",
      "advice": "PayPal ne demande jamais de cliquer sur des liens dans les emails pour des problèmes de sécurité."
    },
    {
      "id": "choice3",
      "text": "Répondre à l''email pour demander plus d''informations",
      "isCorrect": false,
      "explanation": "Répondre confirme aux cybercriminels que votre adresse email est active et vous expose à plus d''attaques.",
      "advice": "Ne répondez jamais aux emails suspects. Utilisez les canaux officiels pour contacter les services."
    }
  ]'
),
(
  'Faux concours sur les réseaux sociaux',
  'Sur Facebook, vous voyez un post d''une marque connue annonçant un concours avec des prix incroyables. Pour participer, il faut cliquer sur un lien externe et saisir ses informations personnelles.',
  'Phishing',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Participer immédiatement avant que le concours se termine",
      "isCorrect": false,
      "explanation": "Les faux concours sont très répandus sur les réseaux sociaux pour voler des données personnelles.",
      "advice": "Vérifiez toujours l''authenticité des concours sur les sites officiels des marques."
    },
    {
      "id": "choice2",
      "text": "Vérifier si le compte est certifié et chercher le concours sur le site officiel",
      "isCorrect": true,
      "explanation": "Excellente approche ! Vérifier la certification et les sources officielles est essentiel.",
      "advice": "Les vraies marques ont des comptes certifiés et annoncent leurs concours sur leurs sites officiels."
    },
    {
      "id": "choice3",
      "text": "Partager le concours avec mes amis pour qu''ils puissent aussi gagner",
      "isCorrect": false,
      "explanation": "Partager un faux concours expose vos amis au même piège et aide les cybercriminels à se propager.",
      "advice": "Ne partagez jamais de contenu suspect, même avec de bonnes intentions."
    }
  ]'
);

-- INGÉNIERIE SOCIALE (2 nouveaux scénarios)
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Appel du service informatique de l''entreprise',
  'Vous recevez un appel de quelqu''un se présentant comme étant du service informatique de votre entreprise. Il dit qu''il y a un problème de sécurité et qu''il a besoin de votre mot de passe pour "vérifier votre compte".',
  'Ingénierie sociale',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Donner mon mot de passe puisque c''est le service informatique",
      "isCorrect": false,
      "explanation": "Le vrai service informatique ne demande JAMAIS les mots de passe par téléphone.",
      "advice": "Aucun service informatique légitime ne vous demandera votre mot de passe. C''est toujours une arnaque."
    },
    {
      "id": "choice2",
      "text": "Raccrocher et appeler directement le service informatique",
      "isCorrect": true,
      "explanation": "Parfait ! Vérifier l''identité de l''appelant par un canal indépendant est la bonne réaction.",
      "advice": "Toujours vérifier l''identité des appelants en les rappelant sur un numéro officiel."
    },
    {
      "id": "choice3",
      "text": "Demander à l''appelant de me rappeler plus tard",
      "isCorrect": false,
      "explanation": "Cela ne résout pas le problème et donne une nouvelle opportunité au cybercriminel.",
      "advice": "Ne remettez pas à plus tard, vérifiez immédiatement l''authenticité de l''appel."
    }
  ]'
),
(
  'Faux technicien à domicile',
  'Quelqu''un sonne à votre porte en se présentant comme technicien de votre fournisseur internet. Il dit qu''il doit vérifier votre connexion et demande à accéder à votre ordinateur pour "des tests de sécurité".',
  'Ingénierie sociale',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Le laisser entrer puisqu''il connaît mon fournisseur internet",
      "isCorrect": false,
      "explanation": "Les informations sur votre fournisseur sont faciles à deviner ou obtenir. Un vrai technicien a une intervention programmée.",
      "advice": "Les vrais techniciens ont toujours un rendez-vous programmé et une carte professionnelle officielle."
    },
    {
      "id": "choice2",
      "text": "Demander sa carte professionnelle et appeler mon fournisseur pour vérifier",
      "isCorrect": true,
      "explanation": "Excellente réaction ! Vérifier l''identité et confirmer l''intervention est indispensable.",
      "advice": "Toujours vérifier l''identité des techniciens et confirmer les interventions auprès de votre fournisseur."
    },
    {
      "id": "choice3",
      "text": "Lui dire de revenir quand mon conjoint sera là",
      "isCorrect": false,
      "explanation": "Cela ne résout pas le problème de vérification d''identité et peut mettre votre conjoint en danger aussi.",
      "advice": "Le problème n''est pas d''être seul, mais de vérifier l''authenticité de la visite."
    }
  ]'
);

-- SÉCURITÉ WI-FI (4 nouveaux scénarios)
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Wi-Fi gratuit dans un hôtel',
  'Vous êtes en voyage et votre hôtel propose un Wi-Fi gratuit. Vous voyez plusieurs réseaux disponibles : "Hotel_Guest", "Hotel_WiFi_Free" et "FREE_INTERNET". Lequel choisir ?',
  'Sécurité Wi-Fi',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Choisir "FREE_INTERNET" car il semble le plus rapide",
      "isCorrect": false,
      "explanation": "Les réseaux avec des noms génériques comme "FREE_INTERNET" sont souvent des pièges créés par des cybercriminels.",
      "advice": "Méfiez-vous des noms de réseaux trop génériques ou trop attractifs."
    },
    {
      "id": "choice2",
      "text": "Demander à la réception quel est le vrai réseau de l''hôtel",
      "isCorrect": true,
      "explanation": "Parfait ! Vérifier auprès du personnel de l''hôtel est la meilleure approche.",
      "advice": "Toujours confirmer le nom exact du réseau Wi-Fi auprès du personnel de l''établissement."
    },
    {
      "id": "choice3",
      "text": "Utiliser mes données mobiles plutôt que le Wi-Fi",
      "isCorrect": false,
      "explanation": "Bien que sécurisé, ce n''est pas nécessaire si vous pouvez identifier le bon réseau.",
      "advice": "Les données mobiles sont sûres, mais vous pouvez utiliser le Wi-Fi en prenant les bonnes précautions."
    }
  ]'
),
(
  'Réseau Wi-Fi public au café',
  'Dans un café, vous vous connectez au Wi-Fi public. Vous voulez consulter votre compte bancaire en ligne. Que faites-vous ?',
  'Sécurité Wi-Fi',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Me connecter normalement, le site de ma banque est sécurisé",
      "isCorrect": false,
      "explanation": "Même avec HTTPS, les réseaux publics peuvent être compromis et vos données interceptées.",
      "advice": "Évitez toujours les opérations sensibles (banque, achats) sur les réseaux Wi-Fi publics."
    },
    {
      "id": "choice2",
      "text": "Utiliser un VPN avant de me connecter à ma banque",
      "isCorrect": true,
      "explanation": "Excellent ! Un VPN chiffre votre connexion et protège vos données sur les réseaux publics.",
      "advice": "Utilisez toujours un VPN fiable pour les opérations sensibles sur Wi-Fi public."
    },
    {
      "id": "choice3",
      "text": "Attendre d''être chez moi pour consulter mon compte",
      "isCorrect": false,
      "explanation": "C''est sécurisé mais pas nécessaire si vous avez un VPN ou pouvez utiliser vos données mobiles.",
      "advice": "Avec les bonnes précautions (VPN, données mobiles), vous pouvez accéder à vos comptes en sécurité."
    }
  ]'
),
(
  'Partage de connexion suspect',
  'Votre voisin vous propose de partager sa connexion Wi-Fi pour économiser sur votre abonnement internet. Il vous donne le mot de passe de son réseau personnel.',
  'Sécurité Wi-Fi',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Accepter, c''est pratique et économique",
      "isCorrect": false,
      "explanation": "Partager une connexion Wi-Fi peut exposer vos appareils aux autres utilisateurs du réseau.",
      "advice": "Évitez de partager des connexions Wi-Fi, même avec des personnes de confiance."
    },
    {
      "id": "choice2",
      "text": "Décliner poliment et garder ma propre connexion",
      "isCorrect": true,
      "explanation": "Sage décision ! Avoir sa propre connexion sécurisée est toujours préférable.",
      "advice": "Votre propre connexion internet vous garantit sécurité et contrôle total."
    },
    {
      "id": "choice3",
      "text": "Accepter mais seulement pour les usages non sensibles",
      "isCorrect": false,
      "explanation": "Il est difficile de contrôler quelles données transitent et le risque reste présent.",
      "advice": "Même pour des usages \"non sensibles\", vos données personnelles peuvent être exposées."
    }
  ]'
),
(
  'Configuration de votre propre Wi-Fi',
  'Vous installez une nouvelle box internet chez vous. Quelle configuration Wi-Fi choisissez-vous pour votre réseau domestique ?',
  'Sécurité Wi-Fi',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Laisser les paramètres par défaut de la box",
      "isCorrect": false,
      "explanation": "Les paramètres par défaut sont souvent peu sécurisés et connus des cybercriminels.",
      "advice": "Changez toujours les paramètres par défaut : nom du réseau, mot de passe administrateur, etc."
    },
    {
      "id": "choice2",
      "text": "Changer le nom du réseau, utiliser WPA3 et un mot de passe fort",
      "isCorrect": true,
      "explanation": "Parfait ! WPA3 est le protocole le plus sécurisé et un mot de passe fort protège votre réseau.",
      "advice": "Utilisez toujours WPA3 (ou WPA2 minimum), changez le nom par défaut et créez un mot de passe complexe."
    },
    {
      "id": "choice3",
      "text": "Désactiver la sécurité pour que mes invités puissent se connecter facilement",
      "isCorrect": false,
      "explanation": "Un réseau sans sécurité expose tous vos appareils et données aux intrusions.",
      "advice": "Ne désactivez jamais la sécurité Wi-Fi. Créez plutôt un réseau invité séparé."
    }
  ]'
);

-- RANSOMWARE (4 nouveaux scénarios)
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Fichier suspect dans les téléchargements',
  'Vous trouvez un fichier "facture_urgente.pdf.exe" dans votre dossier de téléchargements. Vous ne vous souvenez pas l''avoir téléchargé.',
  'Ransomware',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "L''ouvrir pour voir ce que c''est",
      "isCorrect": false,
      "explanation": "L''extension .exe après .pdf est un signe classique de malware déguisé !",
      "advice": "Méfiez-vous des fichiers avec double extension, surtout .exe. Supprimez-les immédiatement."
    },
    {
      "id": "choice2",
      "text": "Le supprimer immédiatement et vider la corbeille",
      "isCorrect": true,
      "explanation": "Excellente réaction ! Ce type de fichier est très probablement un ransomware.",
      "advice": "Supprimez toujours les fichiers suspects et videz la corbeille pour éviter toute exécution accidentelle."
    },
    {
      "id": "choice3",
      "text": "Le déplacer sur le bureau pour l''examiner plus tard",
      "isCorrect": false,
      "explanation": "Garder un fichier suspect augmente le risque de l''ouvrir accidentellement.",
      "advice": "Ne gardez jamais de fichiers suspects. Supprimez-les immédiatement."
    }
  ]'
),
(
  'Pop-up de fausse alerte système',
  'Une fenêtre pop-up apparaît soudainement : "ALERTE ! Votre ordinateur est infecté ! Téléchargez immédiatement notre antivirus pour nettoyer votre système !"',
  'Ransomware',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Télécharger le logiciel proposé pour nettoyer mon PC",
      "isCorrect": false,
      "explanation": "C''est exactement ce que veulent les cybercriminels ! Ces faux antivirus sont souvent des ransomwares.",
      "advice": "Les vraies alertes de sécurité viennent de votre antivirus installé, pas de pop-ups web."
    },
    {
      "id": "choice2",
      "text": "Fermer la pop-up et lancer un scan avec mon vrai antivirus",
      "isCorrect": true,
      "explanation": "Parfait ! Ignorer les fausses alertes et utiliser votre antivirus légitime est la bonne approche.",
      "advice": "Fermez toujours les pop-ups d''alerte suspectes et utilisez uniquement votre antivirus de confiance."
    },
    {
      "id": "choice3",
      "text": "Redémarrer l''ordinateur pour faire disparaître l''alerte",
      "isCorrect": false,
      "explanation": "Redémarrer ne résout pas le problème et la pop-up peut réapparaître.",
      "advice": "Fermez la pop-up, ne cliquez sur rien et vérifiez avec votre antivirus légitime."
    }
  ]'
),
(
  'Clé USB trouvée dans le parking',
  'Vous trouvez une clé USB dans le parking de votre entreprise avec une étiquette "Salaires 2024 - Confidentiel". Vous êtes curieux de voir ce qu''elle contient.',
  'Ransomware',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "La brancher sur mon ordinateur professionnel pour voir le contenu",
      "isCorrect": false,
      "explanation": "C''est un piège classique ! Les cybercriminels laissent volontairement des clés USB infectées.",
      "advice": "Ne branchez jamais de clés USB inconnues. C''est une méthode courante de propagation de ransomwares."
    },
    {
      "id": "choice2",
      "text": "La remettre au service de sécurité de l''entreprise",
      "isCorrect": true,
      "explanation": "Excellente décision ! Le service de sécurité peut l''analyser en toute sécurité.",
      "advice": "Remettez toujours les supports de stockage trouvés aux services de sécurité appropriés."
    },
    {
      "id": "choice3",
      "text": "La tester d''abord sur mon ordinateur personnel",
      "isCorrect": false,
      "explanation": "Votre ordinateur personnel est tout aussi vulnérable aux ransomwares que celui du bureau.",
      "advice": "Aucun ordinateur n''est \"sacrifiable\". Ne testez jamais de supports inconnus."
    }
  ]'
),
(
  'Email urgent du directeur',
  'Vous recevez un email urgent de votre directeur demandant d''ouvrir immédiatement la pièce jointe "budget_confidentiel.zip" pour une réunion dans 10 minutes.',
  'Ransomware',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Ouvrir rapidement la pièce jointe pour ne pas être en retard",
      "isCorrect": false,
      "explanation": "L''urgence est une tactique pour vous faire agir sans réfléchir. Les fichiers .zip peuvent contenir des ransomwares.",
      "advice": "Prenez toujours le temps de vérifier, même sous pression. L''urgence est souvent artificielle."
    },
    {
      "id": "choice2",
      "text": "Appeler ou voir le directeur pour confirmer qu''il a envoyé cet email",
      "isCorrect": true,
      "explanation": "Parfait ! Vérifier par un autre canal est essentiel, surtout pour des demandes urgentes.",
      "advice": "Vérifiez toujours les demandes urgentes par téléphone ou en personne, même venant de votre hiérarchie."
    },
    {
      "id": "choice3",
      "text": "Transférer l''email à un collègue pour qu''il l''ouvre à ma place",
      "isCorrect": false,
      "explanation": "Transférer un email suspect expose votre collègue au même danger.",
      "advice": "Ne transférez jamais d''emails suspects. Vérifiez plutôt leur authenticité."
    }
  ]'
);

-- SÉCURITÉ MOBILE (3 nouveaux scénarios)
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Application de lampe de poche suspecte',
  'Vous téléchargez une application de lampe de poche gratuite. Lors de l''installation, elle demande l''accès à vos contacts, votre localisation, et votre appareil photo.',
  'Sécurité mobile',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Accepter toutes les permissions pour utiliser l''application",
      "isCorrect": false,
      "explanation": "Une simple lampe de poche n''a pas besoin d''accéder à vos contacts ou votre localisation !",
      "advice": "Vérifiez toujours que les permissions demandées correspondent à la fonction de l''application."
    },
    {
      "id": "choice2",
      "text": "Désinstaller l''application et en chercher une plus respectueuse",
      "isCorrect": true,
      "explanation": "Excellente décision ! Des permissions excessives sont un signe d''application malveillante.",
      "advice": "Privilégiez les applications qui demandent uniquement les permissions nécessaires à leur fonction."
    },
    {
      "id": "choice3",
      "text": "Accepter seulement l''accès à l''appareil photo",
      "isCorrect": false,
      "explanation": "Même l''accès à l''appareil photo n''est pas nécessaire pour une lampe de poche.",
      "advice": "Une lampe de poche utilise seulement le flash LED, pas l''appareil photo complet."
    }
  ]'
),
(
  'SMS de vérification non sollicité',
  'Vous recevez un SMS avec un code de vérification à 6 chiffres pour un service que vous n''avez pas demandé. Le message dit "Votre code : 123456. Ne le partagez avec personne."',
  'Sécurité mobile',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Ignorer le SMS et le supprimer",
      "isCorrect": true,
      "explanation": "Parfait ! Les codes de vérification non sollicités peuvent indiquer une tentative de piratage.",
      "advice": "Ne répondez jamais aux codes de vérification que vous n''avez pas demandés."
    },
    {
      "id": "choice2",
      "text": "Répondre au SMS pour dire que ce n''est pas pour moi",
      "isCorrect": false,
      "explanation": "Répondre confirme que votre numéro est actif et peut générer plus de spam.",
      "advice": "Ne répondez jamais aux SMS suspects, même pour dire que c''est une erreur."
    },
    {
      "id": "choice3",
      "text": "Utiliser le code pour voir à quel service il correspond",
      "isCorrect": false,
      "explanation": "Utiliser un code non sollicité peut donner accès à vos comptes à des cybercriminels.",
      "advice": "N''utilisez jamais de codes de vérification que vous n''avez pas demandés."
    }
  ]'
),
(
  'Chargeur public dans un aéroport',
  'Votre téléphone est presque déchargé dans un aéroport. Vous voyez une station de charge USB publique gratuite.',
  'Sécurité mobile',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Utiliser la station de charge, c''est pratique et gratuit",
      "isCorrect": false,
      "explanation": "Les ports USB publics peuvent être piégés pour voler vos données (juice jacking).",
      "advice": "Évitez les ports USB publics. Ils peuvent être compromis pour voler vos données."
    },
    {
      "id": "choice2",
      "text": "Utiliser ma batterie externe portable",
      "isCorrect": true,
      "explanation": "Excellente solution ! Une batterie externe est sûre et vous garde indépendant.",
      "advice": "Voyagez toujours avec une batterie externe pour éviter les ports USB publics."
    },
    {
      "id": "choice3",
      "text": "Chercher une prise électrique pour utiliser mon chargeur",
      "isCorrect": false,
      "explanation": "Bien que plus sûr que l''USB public, ce n''est pas toujours disponible.",
      "advice": "Les prises électriques sont plus sûres, mais une batterie externe reste la meilleure solution."
    }
  ]'
);

-- MALWARE (3 nouveaux scénarios)
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Logiciel de nettoyage gratuit',
  'Votre ordinateur semble lent. Vous trouvez en ligne un logiciel gratuit "PC Cleaner Pro" qui promet de nettoyer et accélérer votre ordinateur.',
  'Malware',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Télécharger et installer le logiciel immédiatement",
      "isCorrect": false,
      "explanation": "Les faux logiciels de nettoyage sont souvent des malwares déguisés !",
      "advice": "Méfiez-vous des logiciels gratuits qui promettent des améliorations miraculeuses."
    },
    {
      "id": "choice2",
      "text": "Rechercher des avis sur ce logiciel et vérifier sa réputation",
      "isCorrect": true,
      "explanation": "Excellente approche ! Toujours vérifier la réputation avant d''installer un logiciel.",
      "advice": "Recherchez toujours des avis fiables et utilisez des logiciels de sources reconnues."
    },
    {
      "id": "choice3",
      "text": "Utiliser l''outil de nettoyage intégré à Windows",
      "isCorrect": false,
      "explanation": "C''est sécurisé mais peut ne pas résoudre tous les problèmes de lenteur.",
      "advice": "Les outils intégrés sont sûrs, mais parfois insuffisants. Privilégiez des logiciels réputés."
    }
  ]'
),
(
  'Extension de navigateur suspecte',
  'En naviguant, une pop-up vous propose d''installer une extension "AdBlock Ultra" qui promet de bloquer toutes les publicités et d''accélérer votre navigation.',
  'Malware',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Installer l''extension depuis la pop-up",
      "isCorrect": false,
      "explanation": "Les extensions proposées par des pop-ups sont souvent malveillantes et peuvent voler vos données.",
      "advice": "N''installez jamais d''extensions depuis des pop-ups. Utilisez les stores officiels."
    },
    {
      "id": "choice2",
      "text": "Chercher une extension similaire sur le Chrome Web Store officiel",
      "isCorrect": true,
      "explanation": "Parfait ! Les stores officiels vérifient les extensions avant publication.",
      "advice": "Installez toujours les extensions depuis les stores officiels (Chrome Web Store, Firefox Add-ons)."
    },
    {
      "id": "choice3",
      "text": "Fermer la pop-up et continuer sans bloqueur de pub",
      "isCorrect": false,
      "explanation": "C''est sécurisé mais vous privez d''une fonctionnalité utile disponible légitimement.",
      "advice": "Vous pouvez utiliser des bloqueurs de pub légitimes depuis les stores officiels."
    }
  ]'
),
(
  'Mise à jour système suspecte',
  'Une notification apparaît : "Mise à jour critique de sécurité Windows disponible. Cliquez ici pour télécharger maintenant." Mais vous avez les mises à jour automatiques activées.',
  'Malware',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Cliquer sur la notification pour installer la mise à jour",
      "isCorrect": false,
      "explanation": "Les vraies mises à jour Windows ne se présentent pas ainsi. C''est probablement un malware.",
      "advice": "Windows Update ne propose jamais de mises à jour via des notifications web ou pop-ups."
    },
    {
      "id": "choice2",
      "text": "Aller dans les paramètres Windows pour vérifier les vraies mises à jour",
      "isCorrect": true,
      "explanation": "Excellente réaction ! Toujours vérifier les mises à jour via les canaux officiels.",
      "advice": "Utilisez toujours Paramètres > Mise à jour et sécurité pour les vraies mises à jour Windows."
    },
    {
      "id": "choice3",
      "text": "Redémarrer l''ordinateur pour voir si la notification disparaît",
      "isCorrect": false,
      "explanation": "Redémarrer ne résout pas le problème et la fausse notification peut réapparaître.",
      "advice": "Ne redémarrez pas en espérant que le problème disparaisse. Vérifiez plutôt la source."
    }
  ]'
);

-- RÉSEAUX SOCIAUX (4 nouveaux scénarios)
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Demande d''ami suspect sur Facebook',
  'Vous recevez une demande d''ami de quelqu''un avec une photo de profil attirante, peu d''amis en commun, et un profil récemment créé. Cette personne vous envoie immédiatement un message flirteur.',
  'Réseaux sociaux',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Accepter la demande et répondre au message",
      "isCorrect": false,
      "explanation": "C''est probablement un faux profil créé pour de l''arnaque sentimentale ou du chantage.",
      "advice": "Méfiez-vous des profils récents avec peu d''amis qui vous contactent directement."
    },
    {
      "id": "choice2",
      "text": "Ignorer la demande et signaler le profil comme suspect",
      "isCorrect": true,
      "explanation": "Parfait ! Les signaux d''alarme sont clairs : profil récent, peu d''amis, approche directe.",
      "advice": "Signalez toujours les profils suspects pour protéger les autres utilisateurs."
    },
    {
      "id": "choice3",
      "text": "Accepter mais ne pas répondre aux messages",
      "isCorrect": false,
      "explanation": "Accepter donne accès à vos informations personnelles et liste d''amis au cybercriminel.",
      "advice": "N''acceptez jamais de demandes d''amis de personnes que vous ne connaissez pas réellement."
    }
  ]'
),
(
  'Quiz de personnalité viral',
  'Un quiz viral "Découvrez votre personnalité Disney !" circule sur Facebook. Il demande votre date de naissance, ville natale, nom de votre premier animal, etc.',
  'Réseaux sociaux',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Faire le quiz, ça semble amusant et mes amis l''ont fait",
      "isCorrect": false,
      "explanation": "Ces informations sont souvent utilisées comme questions de sécurité pour vos comptes !",
      "advice": "Les quiz qui demandent des informations personnelles collectent vos données de sécurité."
    },
    {
      "id": "choice2",
      "text": "Éviter le quiz et sensibiliser mes amis aux risques",
      "isCorrect": true,
      "explanation": "Excellente décision ! Ces quiz collectent des informations pour pirater vos comptes.",
      "advice": "Éduquez votre entourage sur les risques des quiz qui demandent des informations personnelles."
    },
    {
      "id": "choice3",
      "text": "Faire le quiz mais donner de fausses informations",
      "isCorrect": false,
      "explanation": "Même avec de fausses infos, vous donnez des données à des tiers non fiables.",
      "advice": "Évitez complètement ces quiz plutôt que de donner de fausses informations."
    }
  ]'
),
(
  'Photo de vacances géolocalisée',
  'Vous êtes en vacances dans un lieu paradisiaque. Vous voulez partager une belle photo sur Instagram avec la géolocalisation activée pour montrer où vous êtes.',
  'Réseaux sociaux',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Publier la photo avec la géolocalisation en temps réel",
      "isCorrect": false,
      "explanation": "Révéler votre localisation en temps réel peut attirer les cambrioleurs chez vous !",
      "advice": "Ne partagez jamais votre localisation en temps réel, surtout quand vous êtes absent de chez vous."
    },
    {
      "id": "choice2",
      "text": "Publier la photo sans géolocalisation et attendre le retour pour mentionner le lieu",
      "isCorrect": true,
      "explanation": "Sage décision ! Partager vos voyages après coup évite les risques de cambriolage.",
      "advice": "Partagez vos aventures après votre retour pour ne pas signaler votre absence."
    },
    {
      "id": "choice3",
      "text": "Publier avec géolocalisation mais en mode privé seulement",
      "isCorrect": false,
      "explanation": "Même en privé, vos amis peuvent partager l''info et les paramètres peuvent changer.",
      "advice": "Évitez la géolocalisation en temps réel même avec des comptes privés."
    }
  ]'
),
(
  'Offre d''emploi sur LinkedIn',
  'Vous recevez un message privé sur LinkedIn d''un "recruteur" proposant un travail à domicile très bien payé. Il demande vos informations bancaires pour "préparer votre premier salaire".',
  'Réseaux sociaux',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Donner mes informations bancaires pour sécuriser le poste",
      "isCorrect": false,
      "explanation": "Aucun employeur légitime ne demande vos informations bancaires avant embauche !",
      "advice": "Les vrais employeurs demandent vos coordonnées bancaires seulement après signature du contrat."
    },
    {
      "id": "choice2",
      "text": "Vérifier l''entreprise et demander un entretien vidéo officiel",
      "isCorrect": true,
      "explanation": "Parfait ! Vérifier l''entreprise et demander un processus officiel expose les arnaques.",
      "advice": "Vérifiez toujours l''existence de l''entreprise et exigez un processus de recrutement standard."
    },
    {
      "id": "choice3",
      "text": "Demander plus d''informations sur le poste par email",
      "isCorrect": false,
      "explanation": "Continuer la conversation donne l''impression que vous êtes intéressé et vulnérable.",
      "advice": "Ne prolongez pas les échanges avec des offres suspectes. Vérifiez d''abord leur légitimité."
    }
  ]'
);