/*
  # Compléter tous les scénarios pour avoir 5 par catégorie

  1. Nouveaux scénarios
    - Ajout de scénarios manquants pour chaque catégorie
    - Répartition équilibrée des niveaux de difficulté
    - Scénarios réalistes et pédagogiques

  2. Catégories complétées
    - Phishing: 5 scénarios
    - Ingénierie sociale: 5 scénarios  
    - Sécurité Wi-Fi: 5 scénarios
    - Ransomware: 5 scénarios
    - Sécurité mobile: 5 scénarios
    - Malware: 5 scénarios
    - Réseaux sociaux: 5 scénarios
*/

-- Scénarios Phishing supplémentaires
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Email de livraison suspect',
  'Vous recevez un email de "DHL" indiquant qu''un colis vous attend, mais vous n''avez rien commandé récemment. L''email contient un lien pour "suivre votre colis" et demande de confirmer vos informations personnelles.',
  'Phishing',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Je clique sur le lien pour vérifier de quel colis il s''agit",
      "isCorrect": false,
      "explanation": "C''est un piège classique ! Les cybercriminels utilisent de faux emails de livraison pour voler vos données personnelles.",
      "advice": "Ne cliquez jamais sur les liens dans des emails non sollicités. Vérifiez directement sur le site officiel du transporteur."
    },
    {
      "id": "choice2", 
      "text": "Je vérifie directement sur le site officiel de DHL avec mon numéro de suivi",
      "isCorrect": true,
      "explanation": "Excellente réaction ! Vous évitez le piège en vérifiant directement auprès de la source officielle.",
      "advice": "Toujours vérifier les informations de livraison directement sur les sites officiels des transporteurs."
    },
    {
      "id": "choice3",
      "text": "Je transfère l''email à mes proches pour leur demander leur avis",
      "isCorrect": false,
      "explanation": "Attention ! En transférant l''email, vous risquez de propager le phishing à vos contacts.",
      "advice": "Ne transférez jamais d''emails suspects. Supprimez-les et vérifiez directement auprès des sources officielles."
    }
  ]'
),
(
  'Fausse alerte PayPal',
  'Vous recevez un email urgent de "PayPal" indiquant que votre compte a été suspendu suite à une activité suspecte. L''email vous demande de cliquer sur un lien pour "réactiver immédiatement" votre compte.',
  'Phishing',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Je clique rapidement sur le lien pour réactiver mon compte",
      "isCorrect": false,
      "explanation": "C''est exactement ce que veulent les cybercriminels ! Ils créent un sentiment d''urgence pour vous pousser à agir sans réfléchir.",
      "advice": "PayPal ne suspend jamais les comptes par email. Connectez-vous toujours directement sur le site officiel."
    },
    {
      "id": "choice2",
      "text": "Je me connecte directement sur PayPal.com pour vérifier l''état de mon compte",
      "isCorrect": true,
      "explanation": "Parfait ! Vous évitez le piège en vérifiant directement sur le site officiel de PayPal.",
      "advice": "Les vraies alertes de sécurité apparaissent dans votre espace client officiel, pas seulement par email."
    },
    {
      "id": "choice3",
      "text": "Je réponds à l''email pour demander plus d''informations",
      "isCorrect": false,
      "explanation": "En répondant, vous confirmez que votre adresse email est active, ce qui peut générer encore plus de spam et de phishing.",
      "advice": "Ne répondez jamais aux emails suspects. Les vraies entreprises ont des canaux de support officiels."
    }
  ]'
),
(
  'Faux concours sur les réseaux sociaux',
  'Sur Facebook, vous voyez un post d''une marque connue annonçant un concours avec des prix attractifs (iPhone, voyage...). Pour participer, il faut cliquer sur un lien externe et remplir un formulaire avec vos informations personnelles.',
  'Phishing',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Je participe immédiatement, les prix sont trop beaux pour les manquer",
      "isCorrect": false,
      "explanation": "Attention ! Les cybercriminels utilisent des concours fictifs pour collecter vos données personnelles et les revendre.",
      "advice": "Méfiez-vous des concours trop beaux pour être vrais. Vérifiez toujours sur les pages officielles des marques."
    },
    {
      "id": "choice2",
      "text": "Je vérifie d''abord si le concours est annoncé sur la page officielle de la marque",
      "isCorrect": true,
      "explanation": "Excellente démarche ! Vous vérifiez la légitimité avant d''agir, c''est la bonne pratique de sécurité.",
      "advice": "Les vraies marques annoncent leurs concours sur leurs pages officielles vérifiées (badge bleu)."
    },
    {
      "id": "choice3",
      "text": "Je partage le concours avec mes amis avant de participer",
      "isCorrect": false,
      "explanation": "En partageant sans vérifier, vous aidez les cybercriminels à propager leur arnaque à vos contacts.",
      "advice": "Ne partagez jamais de contenu suspect. Vérifiez d''abord la légitimité auprès des sources officielles."
    }
  ]'
);

-- Scénarios Ingénierie sociale supplémentaires
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Appel du service informatique',
  'Vous recevez un appel d''une personne se présentant comme étant du service informatique de votre entreprise. Elle dit avoir détecté un problème de sécurité sur votre ordinateur et demande votre mot de passe pour "résoudre le problème à distance".',
  'Ingénierie sociale',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Je donne mon mot de passe pour qu''ils puissent résoudre le problème rapidement",
      "isCorrect": false,
      "explanation": "Grave erreur ! Aucun service informatique légitime ne demande jamais vos mots de passe par téléphone.",
      "advice": "Ne donnez jamais vos identifiants par téléphone. Raccrochez et contactez directement votre service IT."
    },
    {
      "id": "choice2",
      "text": "Je demande à rappeler le service informatique sur leur numéro officiel",
      "isCorrect": true,
      "explanation": "Parfait ! Vous vérifiez l''identité de l''appelant en utilisant un canal de communication sûr.",
      "advice": "Toujours vérifier l''identité des appelants en les rappelant sur leurs numéros officiels."
    },
    {
      "id": "choice3",
      "text": "Je demande le nom complet et le numéro d''employé de la personne",
      "isCorrect": false,
      "explanation": "Même avec ces informations, vous ne pouvez pas vérifier leur authenticité. Les cybercriminels peuvent avoir ces données.",
      "advice": "Les informations données par téléphone ne sont pas fiables. Utilisez toujours les canaux officiels pour vérifier."
    }
  ]'
),
(
  'Faux technicien à domicile',
  'Une personne sonne à votre porte en se présentant comme technicien de votre fournisseur internet. Elle dit qu''il y a un problème sur votre ligne et qu''elle doit vérifier votre équipement et vos paramètres de connexion.',
  'Ingénierie sociale',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Je la laisse entrer car elle porte un uniforme qui semble officiel",
      "isCorrect": false,
      "explanation": "Les uniformes peuvent être facilement falsifiés ! Les cybercriminels utilisent cette technique pour accéder à vos équipements.",
      "advice": "Ne laissez jamais entrer quelqu''un sans rendez-vous préalable, même avec un uniforme officiel."
    },
    {
      "id": "choice2",
      "text": "Je demande à voir sa carte professionnelle et j''appelle mon fournisseur pour vérifier",
      "isCorrect": true,
      "explanation": "Excellente réaction ! Vous vérifiez l''identité avant d''autoriser l''accès à votre domicile et équipements.",
      "advice": "Toujours vérifier l''identité des techniciens en appelant directement votre fournisseur de services."
    },
    {
      "id": "choice3",
      "text": "Je lui demande de revenir plus tard car ce n''est pas le bon moment",
      "isCorrect": false,
      "explanation": "Reporter ne résout pas le problème. Il faut vérifier l''authenticité de la visite auprès de votre fournisseur.",
      "advice": "Ne reportez pas, vérifiez ! Contactez votre fournisseur pour confirmer si une intervention est prévue."
    }
  ]'
);

-- Scénarios Sécurité Wi-Fi supplémentaires
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Wi-Fi gratuit à l''hôtel',
  'Vous êtes en voyage d''affaires dans un hôtel. Vous voyez plusieurs réseaux Wi-Fi disponibles : "Hotel_Guest_WiFi", "FREE_HOTEL_INTERNET" et "Hotel-WiFi-Free". Vous devez vous connecter pour travailler.',
  'Sécurité Wi-Fi',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Je me connecte au réseau qui a le signal le plus fort",
      "isCorrect": false,
      "explanation": "La force du signal ne garantit pas la sécurité ! Des cybercriminels peuvent créer de faux points d''accès avec un signal puissant.",
      "advice": "Ne choisissez jamais un réseau Wi-Fi basé uniquement sur la force du signal."
    },
    {
      "id": "choice2",
      "text": "Je demande à la réception quel est le nom exact du réseau Wi-Fi officiel",
      "isCorrect": true,
      "explanation": "Parfait ! Vous vérifiez auprès d''une source fiable le nom du réseau légitime avant de vous connecter.",
      "advice": "Toujours demander le nom exact du réseau Wi-Fi officiel au personnel de l''établissement."
    },
    {
      "id": "choice3",
      "text": "Je me connecte à \"FREE_HOTEL_INTERNET\" car le nom semble le plus clair",
      "isCorrect": false,
      "explanation": "Les noms évidents comme \"FREE\" sont souvent utilisés par les cybercriminels pour attirer les victimes !",
      "advice": "Méfiez-vous des noms de réseaux trop génériques ou alléchants comme \"FREE\" ou \"GRATUIT\"."
    }
  ]'
),
(
  'Réseau Wi-Fi dans un café',
  'Vous travaillez dans un café et avez besoin d''internet. Vous voyez les réseaux "CafeLibre_WiFi", "Free_Internet_Here" et "Cafe-Guest". Le serveur vous dit que le Wi-Fi est gratuit mais ne précise pas le nom du réseau.',
  'Sécurité Wi-Fi',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Je me connecte à \"Free_Internet_Here\" car c''est le plus explicite",
      "isCorrect": false,
      "explanation": "Les noms génériques comme \"Free_Internet\" sont des pièges classiques ! Les cybercriminels les utilisent pour attirer les victimes.",
      "advice": "Évitez les réseaux aux noms trop génériques. Demandez toujours le nom exact du réseau officiel."
    },
    {
      "id": "choice2",
      "text": "Je retourne demander au serveur le nom exact du réseau Wi-Fi du café",
      "isCorrect": true,
      "explanation": "Excellente démarche ! Vous obtenez l''information officielle avant de vous connecter à un réseau.",
      "advice": "Toujours demander le nom exact du réseau Wi-Fi au personnel de l''établissement."
    },
    {
      "id": "choice3",
      "text": "J''utilise mes données mobiles plutôt que le Wi-Fi public",
      "isCorrect": true,
      "explanation": "Très bonne alternative ! Les données mobiles sont généralement plus sécurisées que les Wi-Fi publics.",
      "advice": "Quand c''est possible, préférez vos données mobiles aux Wi-Fi publics pour plus de sécurité."
    }
  ]'
),
(
  'Partage de connexion avec un voisin',
  'Votre voisin vous propose de partager sa connexion Wi-Fi pour économiser sur vos factures internet. Il vous donne le mot de passe de son réseau "Maison_Martin" et vous dit que vous pouvez l''utiliser quand vous voulez.',
  'Sécurité Wi-Fi',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "J''accepte, c''est une bonne façon d''économiser de l''argent",
      "isCorrect": false,
      "explanation": "Partager une connexion Wi-Fi pose des risques de sécurité et de responsabilité légale. Votre activité peut être liée à son compte.",
      "advice": "Évitez de partager des connexions Wi-Fi. Chacun doit avoir sa propre connexion sécurisée."
    },
    {
      "id": "choice2",
      "text": "Je décline poliment et garde ma propre connexion internet",
      "isCorrect": true,
      "explanation": "Sage décision ! Avoir sa propre connexion garantit votre sécurité et votre responsabilité légale.",
      "advice": "Maintenez toujours votre propre connexion internet pour éviter les risques de sécurité et légaux."
    },
    {
      "id": "choice3",
      "text": "J''accepte mais seulement pour les usages non sensibles",
      "isCorrect": false,
      "explanation": "Il n''y a pas d''\"usage non sensible\" sur internet. Toute votre activité peut être surveillée ou vous être attribuée.",
      "advice": "Toute activité internet peut avoir des conséquences. Utilisez toujours votre propre connexion sécurisée."
    }
  ]'
),
(
  'Configuration Wi-Fi domestique',
  'Vous installez une nouvelle box internet chez vous. L''installateur configure le Wi-Fi avec le nom "BBOX-A1B2C3" et le mot de passe "admin123". Il vous dit que vous pouvez changer ces paramètres plus tard si vous voulez.',
  'Sécurité Wi-Fi',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Je garde ces paramètres, ils fonctionnent bien",
      "isCorrect": false,
      "explanation": "Les paramètres par défaut sont peu sécurisés ! Le nom révèle votre modèle de box et le mot de passe est trop simple.",
      "advice": "Changez toujours les paramètres Wi-Fi par défaut pour des valeurs personnalisées et sécurisées."
    },
    {
      "id": "choice2",
      "text": "Je change immédiatement le nom du réseau et le mot de passe",
      "isCorrect": true,
      "explanation": "Parfait ! Personnaliser vos paramètres Wi-Fi améliore considérablement votre sécurité domestique.",
      "advice": "Utilisez un nom de réseau neutre et un mot de passe fort d''au moins 12 caractères."
    },
    {
      "id": "choice3",
      "text": "Je change seulement le mot de passe mais garde le nom du réseau",
      "isCorrect": false,
      "explanation": "Le nom par défaut révèle des informations sur votre équipement. Il faut aussi le changer pour plus de sécurité.",
      "advice": "Changez à la fois le nom du réseau et le mot de passe pour une sécurité optimale."
    }
  ]'
);

-- Scénarios Ransomware supplémentaires
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Fichier suspect dans les téléchargements',
  'En nettoyant votre dossier Téléchargements, vous trouvez un fichier "Facture_EDF_Mars2024.exe" que vous ne vous souvenez pas avoir téléchargé. Votre curiosité vous pousse à vouloir l''ouvrir pour voir ce que c''est.',
  'Ransomware',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "J''ouvre le fichier pour voir ce que c''est",
      "isCorrect": false,
      "explanation": "Très dangereux ! Les fichiers .exe suspects peuvent contenir des ransomwares qui chiffreront tous vos fichiers.",
      "advice": "Ne jamais ouvrir de fichiers exécutables (.exe) suspects. Supprimez-les immédiatement."
    },
    {
      "id": "choice2",
      "text": "Je supprime immédiatement le fichier sans l''ouvrir",
      "isCorrect": true,
      "explanation": "Excellente réaction ! Vous évitez un potentiel ransomware en supprimant le fichier suspect.",
      "advice": "Supprimez toujours les fichiers suspects sans les ouvrir. Videz ensuite la corbeille."
    },
    {
      "id": "choice3",
      "text": "Je le scanne avec mon antivirus avant de l''ouvrir",
      "isCorrect": false,
      "explanation": "Même si le scan peut aider, certains ransomwares récents échappent aux antivirus. Mieux vaut supprimer directement.",
      "advice": "Pour les fichiers très suspects, la suppression directe est plus sûre qu''un scan antivirus."
    }
  ]'
),
(
  'Pop-up d''alerte système',
  'Pendant que vous naviguez, une pop-up apparaît avec le logo Windows indiquant "ALERTE SÉCURITÉ : Votre ordinateur est infecté ! Cliquez ici pour nettoyer immédiatement". Un compte à rebours de 5 minutes s''affiche.',
  'Ransomware',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Je clique rapidement pour nettoyer avant la fin du compte à rebours",
      "isCorrect": false,
      "explanation": "C''est un faux ! Ces pop-ups utilisent l''urgence pour vous pousser à installer des malwares ou ransomwares.",
      "advice": "Windows n''affiche jamais d''alertes de sécurité via le navigateur. Fermez immédiatement ces pop-ups."
    },
    {
      "id": "choice2",
      "text": "Je ferme immédiatement la pop-up et le navigateur",
      "isCorrect": true,
      "explanation": "Parfait ! Vous reconnaissez une fausse alerte et réagissez correctement en fermant tout.",
      "advice": "Les vraies alertes Windows apparaissent dans le système, pas dans le navigateur web."
    },
    {
      "id": "choice3",
      "text": "J''attends la fin du compte à rebours pour voir ce qui se passe",
      "isCorrect": false,
      "explanation": "Attendre peut déclencher automatiquement le téléchargement de malwares. Il faut fermer immédiatement.",
      "advice": "N''attendez jamais avec les pop-ups suspectes. Fermez-les immédiatement."
    }
  ]'
),
(
  'Clé USB trouvée dans un parking',
  'En sortant de votre voiture, vous trouvez une clé USB par terre dans le parking de votre entreprise. Elle porte une étiquette "Salaires 2024 - Confidentiel". Vous vous demandez si vous devez la brancher pour voir ce qu''elle contient.',
  'Ransomware',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Je la branche sur mon ordinateur professionnel pour voir le contenu",
      "isCorrect": false,
      "explanation": "Très dangereux ! C''est une technique classique : les cybercriminels laissent des clés USB infectées pour que les victimes les branchent.",
      "advice": "Ne branchez jamais de clés USB trouvées. Elles peuvent contenir des ransomwares automatiques."
    },
    {
      "id": "choice2",
      "text": "Je la remets au service de sécurité de l''entreprise",
      "isCorrect": true,
      "explanation": "Excellente décision ! Le service de sécurité a les outils pour analyser la clé en toute sécurité.",
      "advice": "Remettez toujours les supports trouvés aux services de sécurité qui peuvent les analyser sans risque."
    },
    {
      "id": "choice3",
      "text": "Je la branche sur mon ordinateur personnel à la maison",
      "isCorrect": false,
      "explanation": "Changer d''ordinateur ne change rien au risque ! La clé peut infecter n''importe quel système avec un ransomware.",
      "advice": "Le lieu d''utilisation ne change pas le risque. Ne branchez jamais de supports inconnus."
    }
  ]'
),
(
  'Email urgent du directeur',
  'Vous recevez un email de votre directeur (ou qui semble venir de lui) marqué "URGENT - CONFIDENTIEL". Il demande de télécharger et ouvrir immédiatement un fichier joint "Restructuration_2024.pdf.exe" pour une réunion dans 30 minutes.',
  'Ransomware',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "J''ouvre immédiatement le fichier pour ne pas être en retard à la réunion",
      "isCorrect": false,
      "explanation": "Piège ! L''extension .exe révèle que ce n''est pas un PDF mais un programme malveillant. L''urgence est utilisée pour vous presser.",
      "advice": "Méfiez-vous des fichiers avec double extension (.pdf.exe). Vérifiez toujours par un autre moyen."
    },
    {
      "id": "choice2",
      "text": "J''appelle ou je vais voir directement le directeur pour confirmer",
      "isCorrect": true,
      "explanation": "Parfait ! Vous vérifiez l''authenticité par un canal différent avant d''ouvrir un fichier suspect.",
      "advice": "Toujours vérifier les demandes urgentes par téléphone ou en personne, surtout avec des fichiers joints."
    },
    {
      "id": "choice3",
      "text": "Je réponds à l''email pour demander confirmation avant d''ouvrir",
      "isCorrect": false,
      "explanation": "Si l''email est frauduleux, le cybercriminel confirmera pour vous pousser à ouvrir le ransomware.",
      "advice": "Ne confirmez pas par email. Utilisez un canal de communication différent (téléphone, face à face)."
    }
  ]'
);

-- Scénarios Sécurité mobile supplémentaires
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Application lampe de poche avec permissions étendues',
  'Vous téléchargez une application "Lampe de poche" gratuite sur le Play Store. Lors de l''installation, elle demande l''accès à vos contacts, votre localisation, votre microphone et vos photos. L''application a 4,5 étoiles et 10 000 téléchargements.',
  'Sécurité mobile',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "J''accepte toutes les permissions, l''app a de bonnes notes",
      "isCorrect": false,
      "explanation": "Attention ! Une simple lampe n''a pas besoin d''accéder à vos contacts ou photos. Ces permissions excessives sont suspectes.",
      "advice": "Vérifiez toujours que les permissions demandées correspondent à la fonction de l''application."
    },
    {
      "id": "choice2",
      "text": "Je refuse l''installation et cherche une autre application lampe",
      "isCorrect": true,
      "explanation": "Excellente décision ! Vous reconnaissez que les permissions demandées sont excessives pour une simple lampe.",
      "advice": "Privilégiez les applications qui demandent uniquement les permissions nécessaires à leur fonction."
    },
    {
      "id": "choice3",
      "text": "J''installe mais je refuse certaines permissions dans les paramètres",
      "isCorrect": false,
      "explanation": "Même en refusant certaines permissions, l''application reste suspecte. Mieux vaut en choisir une autre plus respectueuse.",
      "advice": "Si une app demande trop de permissions, c''est qu''elle n''est pas fiable. Cherchez une alternative."
    }
  ]'
),
(
  'SMS de vérification non sollicité',
  'Vous recevez un SMS avec un code de vérification à 6 chiffres pour un service que vous n''avez pas demandé. Le message dit "Votre code de vérification Instagram : 847392. Ne le partagez avec personne." Mais vous n''avez rien demandé.',
  'Sécurité mobile',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "J''ignore le SMS, ce doit être une erreur",
      "isCorrect": false,
      "explanation": "Ne pas ignorer ! Quelqu''un essaie peut-être d''accéder à votre compte Instagram. Il faut vérifier et sécuriser.",
      "advice": "Les codes de vérification non sollicités indiquent souvent une tentative de piratage de votre compte."
    },
    {
      "id": "choice2",
      "text": "Je vérifie immédiatement mon compte Instagram et change mon mot de passe",
      "isCorrect": true,
      "explanation": "Parfait ! Vous réagissez rapidement pour sécuriser votre compte face à une tentative de piratage probable.",
      "advice": "Changez immédiatement vos mots de passe quand vous recevez des codes non sollicités."
    },
    {
      "id": "choice3",
      "text": "Je réponds au SMS pour dire que ce n''est pas pour moi",
      "isCorrect": false,
      "explanation": "Ne répondez jamais aux SMS suspects ! Cela confirme que votre numéro est actif et peut générer plus de spam.",
      "advice": "Ne répondez jamais aux SMS de vérification non sollicités. Vérifiez plutôt vos comptes directement."
    }
  ]'
),
(
  'Chargeur public à l''aéroport',
  'Votre téléphone est presque déchargé à l''aéroport. Vous voyez une station de charge publique avec des câbles USB disponibles. Votre vol est dans 2 heures et vous avez besoin de votre téléphone pour l''embarquement électronique.',
  'Sécurité mobile',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "J''utilise directement le câble USB de la station publique",
      "isCorrect": false,
      "explanation": "Risqué ! Les ports USB publics peuvent être piégés pour voler vos données (juice jacking) ou installer des malwares.",
      "advice": "Évitez les câbles USB publics. Ils peuvent être utilisés pour accéder à vos données personnelles."
    },
    {
      "id": "choice2",
      "text": "J''utilise mon propre câble avec un adaptateur secteur ou une prise électrique",
      "isCorrect": true,
      "explanation": "Excellente précaution ! Utiliser votre propre câble et une prise électrique évite les risques de piratage par USB.",
      "advice": "Toujours utiliser vos propres câbles et privilégier les prises électriques aux ports USB publics."
    },
    {
      "id": "choice3",
      "text": "J''utilise le câble public mais j''éteins mon téléphone pendant la charge",
      "isCorrect": false,
      "explanation": "Éteindre le téléphone ne protège pas complètement. Certaines attaques peuvent fonctionner même téléphone éteint.",
      "advice": "Même éteint, votre téléphone peut être vulnérable aux attaques par USB. Utilisez vos propres câbles."
    }
  ]'
);

-- Scénarios Malware supplémentaires
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Logiciel de nettoyage gratuit',
  'Votre ordinateur semble lent. Vous trouvez en ligne un logiciel gratuit "PC Cleaner Pro" qui promet de "nettoyer et accélérer votre PC en 5 minutes". Le site web semble professionnel et le téléchargement est gratuit.',
  'Malware',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "Je télécharge et installe le logiciel pour nettoyer mon PC",
      "isCorrect": false,
      "explanation": "Attention ! Beaucoup de faux logiciels de nettoyage contiennent des malwares. Ils ralentissent plus qu''ils n''accélèrent.",
      "advice": "Méfiez-vous des logiciels de nettoyage gratuits inconnus. Utilisez les outils intégrés à Windows."
    },
    {
      "id": "choice2",
      "text": "J''utilise l''outil de nettoyage intégré à Windows",
      "isCorrect": true,
      "explanation": "Parfait ! Les outils intégrés au système sont sûrs et efficaces pour le nettoyage de base.",
      "advice": "Windows a des outils de nettoyage intégrés sûrs : Nettoyage de disque, Défragmenteur, etc."
    },
    {
      "id": "choice3",
      "text": "Je demande conseil à un ami avant de télécharger",
      "isCorrect": false,
      "explanation": "Demander conseil c''est bien, mais votre ami n''est peut-être pas expert en sécurité. Mieux vaut utiliser les outils officiels.",
      "advice": "Pour la sécurité, fiez-vous aux outils officiels plutôt qu''aux conseils d''amis non experts."
    }
  ]'
),
(
  'Extension de navigateur suspecte',
  'En naviguant, une pop-up vous propose d''installer l''extension "AdBlock Ultimate Pro" qui promet de "bloquer 100% des publicités et accélérer votre navigation". L''installation se fait en un clic depuis la pop-up.',
  'Malware',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "J''installe directement depuis la pop-up, ça semble utile",
      "isCorrect": false,
      "explanation": "Piège ! Les vraies extensions ne s''installent pas via des pop-ups. C''est probablement un malware déguisé.",
      "advice": "N''installez jamais d''extensions depuis des pop-ups. Utilisez uniquement les stores officiels."
    },
    {
      "id": "choice2",
      "text": "Je ferme la pop-up et cherche l''extension sur le Chrome Web Store officiel",
      "isCorrect": true,
      "explanation": "Excellente réaction ! Vous vérifiez sur la source officielle avant d''installer une extension.",
      "advice": "Toujours installer les extensions depuis les stores officiels (Chrome Web Store, Firefox Add-ons)."
    },
    {
      "id": "choice3",
      "text": "Je clique pour voir plus d''informations avant d''installer",
      "isCorrect": false,
      "explanation": "Même cliquer pour plus d''infos peut déclencher l''installation automatique. Mieux vaut fermer la pop-up.",
      "advice": "Ne cliquez sur rien dans les pop-ups suspectes. Fermez-les et vérifiez sur les sites officiels."
    }
  ]'
),
(
  'Mise à jour système suspecte',
  'Pendant que vous travaillez, une notification apparaît : "Mise à jour critique de sécurité Windows disponible. Cliquez ici pour installer maintenant." La notification ne ressemble pas exactement aux notifications Windows habituelles.',
  'Malware',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Je clique pour installer la mise à jour de sécurité",
      "isCorrect": false,
      "explanation": "Attention ! Les vraies mises à jour Windows passent par Windows Update, pas par des notifications suspectes.",
      "advice": "Les mises à jour Windows légitimes se font via Paramètres > Windows Update, pas par des pop-ups."
    },
    {
      "id": "choice2",
      "text": "Je vais dans Paramètres > Windows Update pour vérifier les vraies mises à jour",
      "isCorrect": true,
      "explanation": "Parfait ! Vous utilisez le canal officiel pour vérifier et installer les mises à jour Windows.",
      "advice": "Toujours vérifier les mises à jour via les paramètres officiels du système d''exploitation."
    },
    {
      "id": "choice3",
      "text": "Je ferme la notification et redémarre l''ordinateur",
      "isCorrect": false,
      "explanation": "Fermer c''est bien, mais redémarrer ne résout pas le problème. Il faut vérifier les vraies mises à jour.",
      "advice": "Après avoir fermé une fausse notification, vérifiez les vraies mises à jour via les canaux officiels."
    }
  ]'
);

-- Scénarios Réseaux sociaux supplémentaires
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Demande d''ami suspect sur Facebook',
  'Vous recevez une demande d''ami de "Sophie Martin" avec une photo de profil attirante. Vous avez 15 amis en commun, mais vous ne vous souvenez pas de cette personne. Son profil semble récent avec peu de publications.',
  'Réseaux sociaux',
  'Débutant',
  '[
    {
      "id": "choice1",
      "text": "J''accepte car nous avons beaucoup d''amis en commun",
      "isCorrect": false,
      "explanation": "Attention ! Les cybercriminels créent de faux profils et ajoutent d''abord vos amis pour paraître légitimes.",
      "advice": "Les amis en commun ne garantissent pas l''authenticité. Vérifiez toujours l''identité réelle."
    },
    {
      "id": "choice2",
      "text": "Je demande à mes amis communs s''ils connaissent vraiment cette personne",
      "isCorrect": true,
      "explanation": "Excellente démarche ! Vérifier auprès de vos amis permet de confirmer l''identité de la personne.",
      "advice": "Toujours vérifier l''identité des inconnus auprès de vos amis communs avant d''accepter."
    },
    {
      "id": "choice3",
      "text": "J''accepte mais je limite ce qu''elle peut voir de mon profil",
      "isCorrect": false,
      "explanation": "Limiter la visibilité ne suffit pas. Un faux profil peut utiliser vos informations publiques pour d''autres arnaques.",
      "advice": "Ne pas accepter d''inconnus, même avec des restrictions. Vérifiez d''abord leur identité."
    }
  ]'
),
(
  'Quiz de personnalité viral',
  'Vos amis partagent massivement un quiz "Découvrez quel personnage Disney vous êtes !" qui demande votre date de naissance, ville natale, nom de votre premier animal et école primaire pour "personnaliser les résultats".',
  'Réseaux sociaux',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Je participe, tous mes amis l''ont fait et c''est amusant",
      "isCorrect": false,
      "explanation": "Piège ! Ces informations sont souvent utilisées comme questions de sécurité pour récupérer vos comptes.",
      "advice": "Méfiez-vous des quiz qui demandent des informations personnelles utilisées pour la sécurité des comptes."
    },
    {
      "id": "choice2",
      "text": "Je refuse de participer car les questions sont trop personnelles",
      "isCorrect": true,
      "explanation": "Parfait ! Vous reconnaissez que ces informations peuvent compromettre la sécurité de vos comptes.",
      "advice": "Ne donnez jamais d''informations utilisées comme questions de sécurité, même pour des jeux."
    },
    {
      "id": "choice3",
      "text": "Je participe mais je donne de fausses informations",
      "isCorrect": false,
      "explanation": "Même avec de fausses infos, vous encouragez ces pratiques douteuses et risquez d''oublier ce que vous avez dit.",
      "advice": "Mieux vaut ne pas participer du tout aux quiz suspects plutôt que de donner de fausses informations."
    }
  ]'
),
(
  'Photo de vacances avec géolocalisation',
  'Vous êtes en vacances dans un lieu magnifique. Vous voulez partager une photo sur Instagram avec la géolocalisation activée pour montrer où vous êtes. Votre profil est public pour avoir plus de followers.',
  'Réseaux sociaux',
  'Intermédiaire',
  '[
    {
      "id": "choice1",
      "text": "Je publie avec la géolocalisation, mes followers vont adorer",
      "isCorrect": false,
      "explanation": "Dangereux ! Publier votre localisation en temps réel avec un profil public révèle que votre domicile est vide.",
      "advice": "Ne partagez jamais votre localisation en temps réel, surtout avec un profil public."
    },
    {
      "id": "choice2",
      "text": "Je publie la photo sans géolocalisation et j''attendrai d''être rentré",
      "isCorrect": true,
      "explanation": "Excellente précaution ! Vous protégez votre sécurité en ne révélant pas votre absence de domicile.",
      "advice": "Partagez vos photos de vacances après votre retour pour ne pas signaler votre absence."
    },
    {
      "id": "choice3",
      "text": "Je publie avec géolocalisation mais je rends mon profil privé temporairement",
      "isCorrect": false,
      "explanation": "Même en privé, vos amis peuvent partager ou commenter, révélant indirectement votre localisation.",
      "advice": "La géolocalisation en temps réel reste risquée même avec un profil privé. Attendez votre retour."
    }
  ]'
),
(
  'Offre d''emploi sur LinkedIn',
  'Vous recevez un message privé sur LinkedIn d''un "recruteur" proposant un poste très bien payé dans votre domaine. Il demande de télécharger et remplir un "formulaire de candidature confidentiel" depuis un lien externe.',
  'Réseaux sociaux',
  'Avancé',
  '[
    {
      "id": "choice1",
      "text": "Je télécharge le formulaire, l''offre semble parfaite pour moi",
      "isCorrect": false,
      "explanation": "Attention ! Les vrais recruteurs utilisent les outils LinkedIn ou leurs sites officiels, pas des liens externes suspects.",
      "advice": "Méfiez-vous des offres d''emploi qui demandent de télécharger des fichiers depuis des liens externes."
    },
    {
      "id": "choice2",
      "text": "Je vérifie d''abord le profil du recruteur et l''entreprise avant de répondre",
      "isCorrect": true,
      "explanation": "Excellente démarche ! Vérifier l''authenticité du recruteur et de l''entreprise est essentiel.",
      "advice": "Toujours vérifier l''identité des recruteurs et l''existence réelle de l''entreprise avant de répondre."
    },
    {
      "id": "choice3",
      "text": "Je réponds en demandant plus d''informations sur l''entreprise",
      "isCorrect": false,
      "explanation": "Si c''est une arnaque, le cybercriminel vous donnera de fausses informations convaincantes. Mieux vaut vérifier indépendamment.",
      "advice": "Ne vous fiez pas aux informations données par des contacts suspects. Vérifiez indépendamment."
    }
  ]'
);