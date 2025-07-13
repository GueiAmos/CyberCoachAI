/*
  # Ajout de nouveaux scénarios de cybersécurité

  1. Nouveaux scénarios
    - Scénario de phishing par SMS (smishing)
    - Scénario de faux support technique
    - Scénario de Wi-Fi public piégé
    - Scénario de ransomware par email
    - Scénario de fausse application mobile
    - Scénario d'ingénierie sociale par téléphone
    - Scénario de fausse mise à jour logicielle
    - Scénario de vol d'identité sur réseaux sociaux

  2. Catégories couvertes
    - Phishing/Smishing
    - Ingénierie sociale
    - Sécurité mobile
    - Sécurité Wi-Fi
    - Ransomware
    - Réseaux sociaux

  3. Niveaux de difficulté
    - Débutant à Avancé selon la complexité du scénario
*/

-- Scénario 1: Phishing par SMS (Smishing)
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES (
  'SMS suspect de votre banque',
  'Vous recevez un SMS de votre banque vous demandant de cliquer sur un lien pour "vérifier votre compte suite à une activité suspecte". Le message semble urgent et mentionne que votre compte sera bloqué dans 24h si vous ne réagissez pas.',
  'Phishing/Smishing',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Je clique immédiatement sur le lien pour vérifier mon compte",
      "isCorrect": false,
      "explanation": "C''est un piège ! Les banques n''envoient jamais de liens par SMS pour vérifier des comptes. Ce type d''attaque s''appelle le ''smishing'' (SMS + phishing).",
      "advice": "Ne cliquez jamais sur des liens reçus par SMS, même s''ils semblent venir de votre banque. Contactez directement votre banque par téléphone."
    },
    {
      "id": "choice2",
      "text": "Je contacte ma banque directement par téléphone pour vérifier",
      "isCorrect": true,
      "explanation": "Excellente réaction ! Vous avez identifié une tentative de smishing. Contacter directement votre banque est la bonne démarche.",
      "advice": "Toujours vérifier les messages suspects en contactant l''organisme par un canal officiel (téléphone, site web officiel)."
    },
    {
      "id": "choice3",
      "text": "Je supprime le SMS sans rien faire",
      "isCorrect": false,
      "explanation": "Supprimer le SMS est bien, mais il serait utile de le signaler à votre banque pour les aider à lutter contre ces fraudes.",
      "advice": "En plus de supprimer le SMS, signalez-le à votre banque et aux autorités compétentes (3117 en France)."
    }
  ]'
);

-- Scénario 2: Faux support technique
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES (
  'Appel du support technique Microsoft',
  'Vous recevez un appel d''une personne se présentant comme technicien Microsoft. Elle vous dit que votre ordinateur est infecté par un virus et propose de vous aider à le nettoyer en prenant le contrôle à distance de votre machine.',
  'Ingénierie sociale',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "J''accepte l''aide et je donne accès à mon ordinateur",
      "isCorrect": false,
      "explanation": "Attention ! Microsoft ne contacte jamais les utilisateurs par téléphone de manière non sollicitée. C''est une arnaque classique du faux support technique.",
      "advice": "Microsoft et autres grandes entreprises ne vous appellent jamais spontanément. Raccrochez immédiatement."
    },
    {
      "id": "choice2",
      "text": "Je demande des preuves de son identité et le rappelle sur le numéro officiel",
      "isCorrect": true,
      "explanation": "Parfait ! Vous avez eu le bon réflexe de vérifier l''identité de l''appelant. Un vrai technicien comprendra cette précaution.",
      "advice": "Toujours vérifier l''identité des personnes qui vous contactent en les rappelant sur un numéro officiel."
    },
    {
      "id": "choice3",
      "text": "Je raccroche immédiatement",
      "isCorrect": true,
      "explanation": "Bonne réaction ! Raccrocher est la meilleure défense contre ce type d''arnaque. Microsoft ne contacte jamais les clients de cette façon.",
      "advice": "En cas de doute, raccrochez toujours. Les vrais services techniques ne vous en voudront pas."
    }
  ]'
);

-- Scénario 3: Wi-Fi public piégé
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES (
  'Wi-Fi gratuit dans un café',
  'Vous êtes dans un café et voyez plusieurs réseaux Wi-Fi disponibles : "Cafe_Guest", "WiFi_Gratuit" et "Free_Internet_Here". Vous devez envoyer des emails professionnels importants.',
  'Sécurité Wi-Fi',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Je me connecte au réseau avec le nom le plus attractif",
      "isCorrect": false,
      "explanation": "Dangereux ! Les cybercriminels créent souvent des réseaux Wi-Fi avec des noms attractifs pour piéger les utilisateurs.",
      "advice": "Méfiez-vous des réseaux Wi-Fi aux noms génériques ou trop attractifs. Ils peuvent être des pièges."
    },
    {
      "id": "choice2",
      "text": "Je demande au personnel du café quel est leur réseau officiel",
      "isCorrect": true,
      "explanation": "Excellente approche ! Vérifier auprès du personnel est le moyen le plus sûr de s''assurer de la légitimité du réseau.",
      "advice": "Toujours demander au personnel le nom exact du réseau Wi-Fi officiel et le mot de passe."
    },
    {
      "id": "choice3",
      "text": "J''utilise mes données mobiles plutôt que le Wi-Fi",
      "isCorrect": true,
      "explanation": "Très prudent ! Utiliser vos données mobiles est plus sûr que de risquer un Wi-Fi public non sécurisé.",
      "advice": "Pour des données sensibles, préférez toujours vos données mobiles ou un VPN sur Wi-Fi public."
    }
  ]'
);

-- Scénario 4: Email de ransomware
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES (
  'Facture urgente en pièce jointe',
  'Vous recevez un email d''un expéditeur inconnu avec pour objet "Facture impayée - Action en justice". Le message contient une pièce jointe PDF nommée "Facture_Urgente.pdf.exe".',
  'Ransomware',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "J''ouvre la pièce jointe pour voir de quoi il s''agit",
      "isCorrect": false,
      "explanation": "Très dangereux ! L''extension .exe indique un fichier exécutable, pas un PDF. C''est probablement un ransomware qui chiffrerait vos fichiers.",
      "advice": "Ne jamais ouvrir des pièces jointes suspectes, surtout avec des doubles extensions comme .pdf.exe"
    },
    {
      "id": "choice2",
      "text": "Je supprime l''email et le signale comme spam",
      "isCorrect": true,
      "explanation": "Parfait ! Vous avez identifié les signaux d''alarme : expéditeur inconnu, urgence artificielle, et extension suspecte .exe.",
      "advice": "Toujours vérifier l''extension des fichiers. Un vrai PDF n''aura jamais d''extension .exe"
    },
    {
      "id": "choice3",
      "text": "Je contacte l''expéditeur pour vérifier l''authenticité",
      "isCorrect": false,
      "explanation": "Risqué ! Contacter l''expéditeur pourrait confirmer que votre adresse email est active et vous exposer à plus d''attaques.",
      "advice": "Ne répondez jamais aux emails suspects. Cela confirme que votre adresse est active."
    }
  ]'
);

-- Scénario 5: Fausse application mobile
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES (
  'Application bancaire sur un site web',
  'En cherchant l''application de votre banque, vous trouvez un site web qui propose de télécharger l''app directement sans passer par Google Play ou App Store. Le site promet une "version premium avec plus de fonctionnalités".',
  'Sécurité mobile',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Je télécharge l''application depuis ce site pour avoir la version premium",
      "isCorrect": false,
      "explanation": "Très risqué ! Les applications légitimes ne sont distribuées que via les stores officiels. Cette app pourrait voler vos données bancaires.",
      "advice": "Ne téléchargez jamais d''applications bancaires en dehors des stores officiels (Google Play, App Store)."
    },
    {
      "id": "choice2",
      "text": "Je vais sur Google Play/App Store pour télécharger l''app officielle",
      "isCorrect": true,
      "explanation": "Excellent choix ! Les stores officiels vérifient les applications et offrent une sécurité bien supérieure.",
      "advice": "Toujours utiliser les stores officiels pour télécharger des applications, surtout pour les services financiers."
    },
    {
      "id": "choice3",
      "text": "J''utilise directement le site web de ma banque sur mon navigateur",
      "isCorrect": true,
      "explanation": "Bonne alternative ! Utiliser le site web officiel de votre banque est sûr et évite les risques d''applications malveillantes.",
      "advice": "Le site web officiel de votre banque est toujours une option sûre si vous préférez éviter les applications."
    }
  ]'
);

-- Scénario 6: Ingénierie sociale par téléphone
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES (
  'Appel pour un sondage avec prix à gagner',
  'Vous recevez un appel d''une personne très sympathique qui dit faire un sondage rapide. Elle vous annonce que vous avez gagné un prix et demande vos informations personnelles pour "valider votre identité" et vous envoyer le prix.',
  'Ingénierie sociale',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Je donne mes informations car j''ai vraiment gagné quelque chose",
      "isCorrect": false,
      "explanation": "Attention ! C''est une technique classique d''ingénierie sociale. Vous n''avez probablement rien gagné et vos données seront utilisées à des fins malveillantes.",
      "advice": "Méfiez-vous des gains inattendus. Si c''était réel, vous auriez été contacté par courrier officiel."
    },
    {
      "id": "choice2",
      "text": "Je demande à recevoir les informations par courrier postal officiel",
      "isCorrect": true,
      "explanation": "Très bon réflexe ! Les vrais concours et prix sont toujours confirmés par courrier officiel avec en-tête de l''entreprise.",
      "advice": "Les gains légitimes sont toujours confirmés par courrier officiel. Exigez cette procédure."
    },
    {
      "id": "choice3",
      "text": "Je raccroche poliment en disant que je ne participe pas à des sondages",
      "isCorrect": true,
      "explanation": "Parfait ! Raccrocher est la meilleure défense contre ce type d''arnaque par téléphone.",
      "advice": "Vous avez le droit de raccrocher. Les vrais sondages respectent votre choix de ne pas participer."
    }
  ]'
);

-- Scénario 7: Fausse mise à jour logicielle
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES (
  'Pop-up de mise à jour urgente',
  'En naviguant sur internet, une pop-up apparaît vous avertissant que votre navigateur est obsolète et qu''une mise à jour de sécurité critique est disponible. Un bouton "Mettre à jour maintenant" clignote en rouge.',
  'Malware',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Je clique sur le bouton pour mettre à jour immédiatement",
      "isCorrect": false,
      "explanation": "Piège ! Les vraies mises à jour ne se font jamais via des pop-ups sur des sites web. C''est probablement un malware déguisé.",
      "advice": "Les mises à jour légitimes se font via les paramètres du logiciel ou le site officiel de l''éditeur."
    },
    {
      "id": "choice2",
      "text": "Je ferme la pop-up et vérifie les mises à jour dans les paramètres de mon navigateur",
      "isCorrect": true,
      "explanation": "Excellente réaction ! Vous avez évité un piège et utilisé la méthode sûre pour vérifier les mises à jour.",
      "advice": "Toujours vérifier les mises à jour via les paramètres officiels du logiciel, jamais via des pop-ups."
    },
    {
      "id": "choice3",
      "text": "Je vais sur le site officiel du navigateur pour télécharger la mise à jour",
      "isCorrect": true,
      "explanation": "Très bien ! Aller directement sur le site officiel est une méthode sûre pour obtenir les vraies mises à jour.",
      "advice": "Le site officiel de l''éditeur est toujours la source la plus fiable pour les mises à jour."
    }
  ]'
);

-- Scénario 8: Vol d'identité sur réseaux sociaux
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES (
  'Demande d''ami suspect sur Facebook',
  'Vous recevez une demande d''ami de quelqu''un qui prétend être un ancien collègue. Son profil a peu de photos, peu d''amis, et il vous envoie immédiatement un message demandant des nouvelles et vos coordonnées actuelles.',
  'Réseaux sociaux',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "J''accepte la demande et partage mes informations car je me souviens de lui",
      "isCorrect": false,
      "explanation": "Attention ! C''est probablement un faux profil créé pour voler des informations. Les vrais amis n''ont pas besoin de redemander vos coordonnées.",
      "advice": "Méfiez-vous des profils avec peu d''historique qui demandent immédiatement des informations personnelles."
    },
    {
      "id": "choice2",
      "text": "Je vérifie son profil en détail et contacte d''autres collègues pour confirmer",
      "isCorrect": true,
      "explanation": "Très prudent ! Vérifier auprès de sources tierces est un excellent moyen de démasquer les faux profils.",
      "advice": "Toujours vérifier l''identité des personnes suspectes en contactant des connaissances communes."
    },
    {
      "id": "choice3",
      "text": "Je refuse la demande et signale le profil comme suspect",
      "isCorrect": true,
      "explanation": "Bonne décision ! Signaler les profils suspects aide à protéger toute la communauté des réseaux sociaux.",
      "advice": "N''hésitez pas à signaler les profils suspects. C''est un service rendu à toute la communauté."
    }
  ]'
);