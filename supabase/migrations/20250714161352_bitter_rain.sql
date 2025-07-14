/*
  # Assurer exactement 5 scénarios par catégorie

  1. Vérification et ajout des scénarios manquants
    - Compte les scénarios existants par catégorie
    - Ajoute les scénarios manquants pour atteindre 5 par catégorie
  
  2. Catégories ciblées (7 catégories × 5 scénarios = 35 scénarios total)
    - Phishing
    - Ingénierie sociale  
    - Sécurité Wi-Fi
    - Ransomware
    - Sécurité mobile
    - Malware
    - Réseaux sociaux

  3. Sécurité
    - Tous les scénarios sont actifs par défaut
    - Chaque scénario a 3 choix avec explications détaillées
*/

-- Nettoyer d'abord les doublons potentiels
DELETE FROM scenarios 
WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY title ORDER BY created_at) as rn
    FROM scenarios
  ) t WHERE rn > 1
);

-- Insérer les scénarios pour atteindre exactement 5 par catégorie
-- PHISHING (compléter à 5)
INSERT INTO scenarios (title, description, category, difficulty, choices) 
SELECT * FROM (
  VALUES 
    (
      'Email de livraison suspect',
      'Vous recevez un email prétendant venir de DHL indiquant qu''un colis vous attend, avec un lien pour "suivre votre livraison". L''adresse email est dhl-livraison@gmail.com.',
      'Phishing',
      'Débutant',
      '[
        {
          "id": "1",
          "text": "Je clique sur le lien pour voir où est mon colis",
          "isCorrect": false,
          "explanation": "C''est un piège ! Les vrais services de livraison n''utilisent jamais d''adresses Gmail et vous demandent rarement de cliquer sur des liens.",
          "advice": "Vérifiez toujours l''adresse email de l''expéditeur et allez directement sur le site officiel du transporteur."
        },
        {
          "id": "2", 
          "text": "Je vérifie l''adresse email et vais sur le site officiel de DHL",
          "isCorrect": true,
          "explanation": "Excellente réaction ! Vous avez identifié les signes suspects : adresse Gmail au lieu du domaine officiel.",
          "advice": "Toujours vérifier les expéditeurs et utiliser les sites officiels pour suivre vos colis."
        },
        {
          "id": "3",
          "text": "Je supprime l''email sans rien faire",
          "isCorrect": true,
          "explanation": "Bonne décision ! En cas de doute, mieux vaut supprimer que risquer de tomber dans un piège.",
          "advice": "Si vous attendez vraiment un colis, vérifiez directement sur le site du transporteur avec votre numéro de suivi."
        }
      ]'::jsonb
    ),
    (
      'Fausse alerte PayPal',
      'Vous recevez un email urgent de "PayPal" disant que votre compte sera suspendu dans 24h si vous ne confirmez pas vos informations via le lien fourni.',
      'Phishing',
      'Intermédiaire',
      '[
        {
          "id": "1",
          "text": "Je clique rapidement sur le lien pour éviter la suspension",
          "isCorrect": false,
          "explanation": "C''est exactement ce que veulent les cybercriminels ! L''urgence est une technique classique de manipulation.",
          "advice": "PayPal ne demande jamais de confirmer vos informations par email. Connectez-vous directement sur leur site."
        },
        {
          "id": "2",
          "text": "Je me connecte directement sur PayPal.com pour vérifier",
          "isCorrect": true,
          "explanation": "Parfait ! Vous avez évité le piège en allant directement sur le site officiel pour vérifier l''état de votre compte.",
          "advice": "Toujours se connecter directement sur les sites officiels plutôt que de cliquer sur des liens dans les emails."
        },
        {
          "id": "3",
          "text": "Je transfère l''email à mes amis pour les prévenir",
          "isCorrect": false,
          "explanation": "Attention ! Transférer un email de phishing peut propager la menace. Mieux vaut le signaler aux autorités.",
          "advice": "Signalez les tentatives de phishing à la plateforme concernée et aux autorités, mais ne les transférez pas."
        }
      ]'::jsonb
    ),
    (
      'Faux concours sur les réseaux sociaux',
      'Sur Facebook, vous voyez un post d''une marque connue annonçant un concours pour gagner un iPhone. Il faut cliquer sur un lien externe et donner ses coordonnées.',
      'Phishing',
      'Débutant',
      '[
        {
          "id": "1",
          "text": "Je participe immédiatement, c''est gratuit !",
          "isCorrect": false,
          "explanation": "Piège ! Les faux concours sont très courants sur les réseaux sociaux pour voler des données personnelles.",
          "advice": "Vérifiez toujours l''authenticité des concours en allant sur le site officiel de la marque."
        },
        {
          "id": "2",
          "text": "Je vérifie si le concours existe sur le site officiel de la marque",
          "isCorrect": true,
          "explanation": "Excellente démarche ! Vous avez le réflexe de vérifier l''authenticité avant de donner vos informations.",
          "advice": "Les vraies marques organisent leurs concours sur leurs sites officiels et pages vérifiées."
        },
        {
          "id": "3",
          "text": "Je signale le post comme suspect",
          "isCorrect": true,
          "explanation": "Très bien ! Signaler les faux concours aide à protéger les autres utilisateurs.",
          "advice": "N''hésitez pas à signaler les contenus suspects pour protéger la communauté."
        }
      ]'::jsonb
    )
) AS new_scenarios(title, description, category, difficulty, choices)
WHERE NOT EXISTS (
  SELECT 1 FROM scenarios WHERE category = 'Phishing' AND title = new_scenarios.title
) AND (SELECT COUNT(*) FROM scenarios WHERE category = 'Phishing' AND is_active = true) < 5;

-- INGÉNIERIE SOCIALE (compléter à 5)
INSERT INTO scenarios (title, description, category, difficulty, choices)
SELECT * FROM (
  VALUES
    (
      'Appel du service informatique',
      'Vous recevez un appel d''une personne se présentant comme étant du service informatique de votre entreprise. Elle dit avoir détecté une activité suspecte sur votre compte et demande votre mot de passe pour "sécuriser" votre session.',
      'Ingénierie sociale',
      'Intermédiaire',
      '[
        {
          "id": "1",
          "text": "Je donne mon mot de passe pour résoudre le problème rapidement",
          "isCorrect": false,
          "explanation": "Grave erreur ! Aucun service informatique légitime ne demande jamais votre mot de passe par téléphone.",
          "advice": "Ne donnez jamais vos mots de passe par téléphone. Raccrochez et contactez votre service IT par les canaux officiels."
        },
        {
          "id": "2",
          "text": "Je raccroche et contacte mon service IT par les moyens habituels",
          "isCorrect": true,
          "explanation": "Parfait ! Vous avez identifié une tentative d''ingénierie sociale et réagi correctement.",
          "advice": "Toujours vérifier l''identité des appelants en utilisant les contacts officiels de votre organisation."
        },
        {
          "id": "3",
          "text": "Je demande à rappeler la personne plus tard",
          "isCorrect": true,
          "explanation": "Bonne tactique ! Cela vous donne le temps de vérifier et décourage souvent les fraudeurs.",
          "advice": "Prendre du temps pour réfléchir et vérifier est toujours une bonne stratégie face aux demandes urgentes."
        }
      ]'::jsonb
    ),
    (
      'Faux technicien à domicile',
      'Un technicien sonne à votre porte en prétendant venir de votre fournisseur internet pour une "maintenance urgente". Il demande à accéder à votre ordinateur et à vos équipements réseau.',
      'Ingénierie sociale',
      'Avancé',
      '[
        {
          "id": "1",
          "text": "Je le laisse entrer, il a l''air professionnel",
          "isCorrect": false,
          "explanation": "Dangereux ! Les vrais techniciens sont toujours annoncés à l''avance et ont des identifiants officiels.",
          "advice": "Ne laissez jamais entrer quelqu''un sans rendez-vous préalable, même s''il prétend venir de votre fournisseur."
        },
        {
          "id": "2",
          "text": "Je demande ses identifiants et j''appelle mon fournisseur pour vérifier",
          "isCorrect": true,
          "explanation": "Excellente réaction ! Vous vérifiez l''identité avant d''autoriser l''accès à vos équipements.",
          "advice": "Toujours vérifier l''identité des techniciens en appelant directement votre fournisseur."
        },
        {
          "id": "3",
          "text": "Je refuse poliment et ferme la porte",
          "isCorrect": true,
          "explanation": "Très bien ! En cas de doute, mieux vaut refuser l''accès et vérifier ensuite.",
          "advice": "Vous avez le droit de refuser l''accès à votre domicile. Les vrais techniciens comprendront."
        }
      ]'::jsonb
    )
) AS new_scenarios(title, description, category, difficulty, choices)
WHERE NOT EXISTS (
  SELECT 1 FROM scenarios WHERE category = 'Ingénierie sociale' AND title = new_scenarios.title
) AND (SELECT COUNT(*) FROM scenarios WHERE category = 'Ingénierie sociale' AND is_active = true) < 5;

-- SÉCURITÉ WI-FI (compléter à 5)
INSERT INTO scenarios (title, description, category, difficulty, choices)
SELECT * FROM (
  VALUES
    (
      'Wi-Fi gratuit à l''hôtel',
      'Vous êtes dans un hôtel et voyez plusieurs réseaux Wi-Fi : "Hotel_Guest", "Hotel_WiFi_Free" et "HotelGuest_Secure". Lequel choisir pour vous connecter en sécurité ?',
      'Sécurité Wi-Fi',
      'Débutant',
      '[
        {
          "id": "1",
          "text": "Je choisis "Hotel_WiFi_Free" car il semble officiel",
          "isCorrect": false,
          "explanation": "Attention ! Les cybercriminels créent souvent des réseaux avec des noms similaires aux vrais réseaux.",
          "advice": "Demandez toujours le nom exact du réseau Wi-Fi à la réception de l''hôtel."
        },
        {
          "id": "2",
          "text": "Je demande à la réception quel est le bon réseau et le mot de passe",
          "isCorrect": true,
          "explanation": "Parfait ! C''est la seule façon de s''assurer de se connecter au vrai réseau de l''hôtel.",
          "advice": "Toujours vérifier auprès du personnel les informations de connexion Wi-Fi officielles."
        },
        {
          "id": "3",
          "text": "J''utilise mes données mobiles plutôt que le Wi-Fi",
          "isCorrect": true,
          "explanation": "Excellente alternative ! Vos données mobiles sont plus sécurisées que les Wi-Fi publics.",
          "advice": "Quand c''est possible, préférez vos données mobiles aux Wi-Fi publics pour les activités sensibles."
        }
      ]'::jsonb
    ),
    (
      'Réseau Wi-Fi dans un café',
      'Dans un café, vous voulez vous connecter au Wi-Fi. Vous voyez "CafeLibre_WiFi" sans mot de passe et "Cafe_Secure" avec mot de passe. Que faites-vous ?',
      'Sécurité Wi-Fi',
      'Intermédiaire',
      '[
        {
          "id": "1",
          "text": "Je me connecte à "CafeLibre_WiFi" car c''est plus simple",
          "isCorrect": false,
          "explanation": "Risqué ! Les réseaux ouverts sans mot de passe sont très vulnérables aux attaques.",
          "advice": "Évitez les réseaux Wi-Fi ouverts, surtout pour des activités sensibles comme la banque en ligne."
        },
        {
          "id": "2",
          "text": "Je demande au personnel le mot de passe du réseau sécurisé",
          "isCorrect": true,
          "explanation": "Très bien ! Un réseau avec mot de passe offre une meilleure sécurité de base.",
          "advice": "Préférez toujours les réseaux protégés par mot de passe et vérifiez leur authenticité."
        },
        {
          "id": "3",
          "text": "J''utilise un VPN avant de me connecter",
          "isCorrect": true,
          "explanation": "Excellente pratique ! Un VPN chiffre votre connexion même sur un réseau non sécurisé.",
          "advice": "Un VPN est votre meilleure protection sur les Wi-Fi publics."
        }
      ]'::jsonb
    ),
    (
      'Partage de connexion avec un voisin',
      'Votre voisin vous propose de partager sa connexion Wi-Fi pour économiser sur votre abonnement internet. Il vous donne le mot de passe de sa box.',
      'Sécurité Wi-Fi',
      'Avancé',
      '[
        {
          "id": "1",
          "text": "J''accepte, c''est économique et pratique",
          "isCorrect": false,
          "explanation": "Risqué ! Partager une connexion peut exposer vos données et créer des problèmes légaux.",
          "advice": "Chaque foyer devrait avoir sa propre connexion internet sécurisée et indépendante."
        },
        {
          "id": "2",
          "text": "Je refuse poliment et garde ma propre connexion",
          "isCorrect": true,
          "explanation": "Sage décision ! Votre sécurité et votre vie privée valent plus que les économies potentielles.",
          "advice": "Une connexion internet personnelle vous garantit sécurité, confidentialité et responsabilité."
        },
        {
          "id": "3",
          "text": "J''accepte mais j''utilise un VPN pour tout",
          "isCorrect": false,
          "explanation": "Même avec un VPN, partager une connexion pose des problèmes légaux et de sécurité.",
          "advice": "Un VPN ne résout pas tous les problèmes liés au partage de connexion internet."
        }
      ]'::jsonb
    ),
    (
      'Configuration Wi-Fi domestique',
      'Vous installez une nouvelle box internet chez vous. Elle est configurée avec le réseau "BBOX-A1B2C3" et le mot de passe par défaut "admin123". Que faites-vous ?',
      'Sécurité Wi-Fi',
      'Intermédiaire',
      '[
        {
          "id": "1",
          "text": "Je laisse la configuration par défaut, ça fonctionne",
          "isCorrect": false,
          "explanation": "Très dangereux ! Les configurations par défaut sont connues des pirates et faciles à pirater.",
          "advice": "Changez toujours le nom du réseau et le mot de passe par défaut de votre box."
        },
        {
          "id": "2",
          "text": "Je change le nom du réseau et mets un mot de passe fort",
          "isCorrect": true,
          "explanation": "Parfait ! Personnaliser votre réseau avec un mot de passe fort est essentiel pour votre sécurité.",
          "advice": "Utilisez un nom de réseau unique et un mot de passe d''au moins 12 caractères avec des symboles."
        },
        {
          "id": "3",
          "text": "Je cache juste le nom du réseau",
          "isCorrect": false,
          "explanation": "Insuffisant ! Cacher le nom ne protège pas vraiment, il faut surtout changer le mot de passe.",
          "advice": "Cacher le réseau n''est pas une vraie sécurité. Concentrez-vous sur un mot de passe fort."
        }
      ]'::jsonb
    )
) AS new_scenarios(title, description, category, difficulty, choices)
WHERE NOT EXISTS (
  SELECT 1 FROM scenarios WHERE category = 'Sécurité Wi-Fi' AND title = new_scenarios.title
) AND (SELECT COUNT(*) FROM scenarios WHERE category = 'Sécurité Wi-Fi' AND is_active = true) < 5;

-- RANSOMWARE (compléter à 5)
INSERT INTO scenarios (title, description, category, difficulty, choices)
SELECT * FROM (
  VALUES
    (
      'Fichier suspect dans les téléchargements',
      'Vous trouvez un fichier "Facture_Importante.pdf.exe" dans votre dossier Téléchargements. Vous ne vous souvenez pas l''avoir téléchargé.',
      'Ransomware',
      'Intermédiaire',
      '[
        {
          "id": "1",
          "text": "Je l''ouvre pour voir ce que c''est",
          "isCorrect": false,
          "explanation": "Très dangereux ! Un fichier .exe déguisé en PDF est un signe classique de malware ou ransomware.",
          "advice": "Ne jamais ouvrir des fichiers suspects, surtout avec une double extension comme .pdf.exe."
        },
        {
          "id": "2",
          "text": "Je le supprime immédiatement et vide la corbeille",
          "isCorrect": true,
          "explanation": "Excellente réaction ! Vous avez identifié un fichier potentiellement malveillant et l''avez éliminé.",
          "advice": "Supprimez toujours les fichiers suspects et videz la corbeille pour les éliminer définitivement."
        },
        {
          "id": "3",
          "text": "Je lance un scan antivirus sur le fichier",
          "isCorrect": true,
          "explanation": "Bonne approche ! Scanner avant de décider est une pratique sécurisée.",
          "advice": "Toujours scanner les fichiers suspects avec un antivirus à jour avant toute action."
        }
      ]'::jsonb
    ),
    (
      'Pop-up d''alerte système',
      'Une fenêtre pop-up apparaît soudainement : "ALERTE ! Votre ordinateur est infecté ! Cliquez ici pour nettoyer immédiatement ou vos fichiers seront supprimés dans 5 minutes !"',
      'Ransomware',
      'Débutant',
      '[
        {
          "id": "1",
          "text": "Je clique rapidement pour nettoyer mon ordinateur",
          "isCorrect": false,
          "explanation": "Piège ! Ces fausses alertes sont conçues pour vous faire installer des malwares ou ransomwares.",
          "advice": "Les vraies alertes de sécurité ne viennent jamais de pop-ups web avec des comptes à rebours."
        },
        {
          "id": "2",
          "text": "Je ferme la fenêtre sans cliquer et lance mon antivirus",
          "isCorrect": true,
          "explanation": "Parfait ! Vous avez évité le piège et utilisé votre vrai logiciel de sécurité.",
          "advice": "Fermez toujours les pop-ups suspects et utilisez uniquement vos logiciels de sécurité installés."
        },
        {
          "id": "3",
          "text": "Je redémarre mon ordinateur",
          "isCorrect": true,
          "explanation": "Bonne solution ! Redémarrer peut fermer les pop-ups malveillants et nettoyer la mémoire.",
          "advice": "En cas de pop-ups persistants, redémarrer peut être une solution efficace."
        }
      ]'::jsonb
    ),
    (
      'Clé USB trouvée dans un parking',
      'Vous trouvez une clé USB dans le parking de votre bureau avec une étiquette "Salaires 2024 - Confidentiel". Votre curiosité est piquée.',
      'Ransomware',
      'Avancé',
      '[
        {
          "id": "1",
          "text": "Je la branche sur mon ordinateur pour voir le contenu",
          "isCorrect": false,
          "explanation": "Très dangereux ! C''est une technique classique : laisser des clés USB infectées pour que les gens les branchent.",
          "advice": "Ne jamais brancher une clé USB trouvée ou d''origine inconnue sur votre ordinateur."
        },
        {
          "id": "2",
          "text": "Je la remets au service de sécurité de l''entreprise",
          "isCorrect": true,
          "explanation": "Excellente décision ! Le service de sécurité saura comment traiter cette clé de manière sécurisée.",
          "advice": "Toujours signaler les supports de stockage trouvés aux services de sécurité appropriés."
        },
        {
          "id": "3",
          "text": "Je la jette à la poubelle",
          "isCorrect": true,
          "explanation": "Bonne solution ! Éliminer la menace potentielle protège tout le monde.",
          "advice": "Jeter une clé USB suspecte est préférable à risquer une infection de votre système."
        }
      ]'::jsonb
    ),
    (
      'Email urgent du directeur',
      'Vous recevez un email de votre directeur : "URGENT - Problème avec nos serveurs. Téléchargez ce patch de sécurité immédiatement et exécutez-le sur votre poste." Un fichier .exe est en pièce jointe.',
      'Ransomware',
      'Avancé',
      '[
        {
          "id": "1",
          "text": "J''exécute le fichier immédiatement, c''est urgent",
          "isCorrect": false,
          "explanation": "Piège ! Les cybercriminels usurpent souvent l''identité des dirigeants pour créer un sentiment d''urgence.",
          "advice": "Vérifiez toujours les demandes urgentes par un autre canal, même si elles semblent venir de votre hiérarchie."
        },
        {
          "id": "2",
          "text": "Je contacte le directeur par téléphone pour confirmer",
          "isCorrect": true,
          "explanation": "Parfait ! Vérifier par un autre moyen de communication est la bonne pratique de sécurité.",
          "advice": "Toujours confirmer les demandes inhabituelles par téléphone ou en personne."
        },
        {
          "id": "3",
          "text": "Je transfère l''email au service informatique",
          "isCorrect": true,
          "explanation": "Très bien ! Le service IT peut vérifier l''authenticité et la sécurité du fichier.",
          "advice": "En cas de doute sur un fichier ou email, consultez toujours votre service informatique."
        }
      ]'::jsonb
    )
) AS new_scenarios(title, description, category, difficulty, choices)
WHERE NOT EXISTS (
  SELECT 1 FROM scenarios WHERE category = 'Ransomware' AND title = new_scenarios.title
) AND (SELECT COUNT(*) FROM scenarios WHERE category = 'Ransomware' AND is_active = true) < 5;

-- SÉCURITÉ MOBILE (compléter à 5)
INSERT INTO scenarios (title, description, category, difficulty, choices)
SELECT * FROM (
  VALUES
    (
      'Application lampe avec trop de permissions',
      'Vous téléchargez une simple application lampe de poche qui demande l''accès à vos contacts, votre localisation, votre microphone et vos photos. Que faites-vous ?',
      'Sécurité mobile',
      'Intermédiaire',
      '[
        {
          "id": "1",
          "text": "J''accepte toutes les permissions pour utiliser l''app",
          "isCorrect": false,
          "explanation": "Dangereux ! Une lampe de poche n''a besoin d''aucune de ces permissions. C''est suspect.",
          "advice": "Refusez les applications qui demandent des permissions non nécessaires à leur fonction."
        },
        {
          "id": "2",
          "text": "Je désinstalle l''app et en cherche une autre",
          "isCorrect": true,
          "explanation": "Excellente décision ! Vous avez identifié une application potentiellement malveillante.",
          "advice": "Choisissez des applications qui ne demandent que les permissions strictement nécessaires."
        },
        {
          "id": "3",
          "text": "Je refuse toutes les permissions et utilise l''app",
          "isCorrect": true,
          "explanation": "Bonne approche ! Refuser les permissions inutiles limite les risques.",
          "advice": "Vous pouvez souvent utiliser les apps en refusant les permissions non essentielles."
        }
      ]'::jsonb
    ),
    (
      'SMS de vérification non sollicité',
      'Vous recevez un SMS avec un code de vérification à 6 chiffres pour un service que vous n''avez pas demandé. Le message dit "Votre code : 123456. Ne le partagez avec personne."',
      'Sécurité mobile',
      'Avancé',
      '[
        {
          "id": "1",
          "text": "J''ignore le message, ce n''est pas pour moi",
          "isCorrect": true,
          "explanation": "Bonne réaction ! Ne pas réagir à un code non sollicité est la meilleure approche.",
          "advice": "Les codes de vérification non demandés peuvent indiquer une tentative de piratage de vos comptes."
        },
        {
          "id": "2",
          "text": "Je vérifie mes comptes en ligne pour voir s''il y a des tentatives de connexion",
          "isCorrect": true,
          "explanation": "Excellente idée ! Vérifier vos comptes peut révéler des tentatives de piratage.",
          "advice": "Consultez régulièrement l''historique de connexion de vos comptes importants."
        },
        {
          "id": "3",
          "text": "Je réponds au SMS pour dire que ce n''est pas pour moi",
          "isCorrect": false,
          "explanation": "Évitez de répondre ! Cela confirme que votre numéro est actif et peut encourager plus de spam.",
          "advice": "Ne répondez jamais aux SMS suspects, même pour dire que c''est une erreur."
        }
      ]'::jsonb
    ),
    (
      'Chargeur public à l''aéroport',
      'Votre téléphone est presque déchargé à l''aéroport. Vous voyez une station de charge USB publique gratuite et un café qui vend des chargeurs à 20€.',
      'Sécurité mobile',
      'Intermédiaire',
      '[
        {
          "id": "1",
          "text": "J''utilise la station de charge gratuite",
          "isCorrect": false,
          "explanation": "Risqué ! Les ports USB publics peuvent être piégés pour voler vos données (juice jacking).",
          "advice": "Évitez les ports USB publics. Utilisez une prise électrique avec votre propre chargeur."
        },
        {
          "id": "2",
          "text": "J''achète un chargeur au café et utilise une prise électrique",
          "isCorrect": true,
          "explanation": "Excellent choix ! Votre sécurité vaut plus que 20€. Les prises électriques sont sûres.",
          "advice": "Investir dans votre sécurité est toujours rentable. Préférez les prises électriques aux ports USB publics."
        },
        {
          "id": "3",
          "text": "J''utilise ma batterie externe",
          "isCorrect": true,
          "explanation": "Parfait ! Une batterie externe est la solution la plus sûre pour charger en déplacement.",
          "advice": "Toujours voyager avec une batterie externe pour éviter de dépendre des chargeurs publics."
        }
      ]'::jsonb
    )
) AS new_scenarios(title, description, category, difficulty, choices)
WHERE NOT EXISTS (
  SELECT 1 FROM scenarios WHERE category = 'Sécurité mobile' AND title = new_scenarios.title
) AND (SELECT COUNT(*) FROM scenarios WHERE category = 'Sécurité mobile' AND is_active = true) < 5;

-- MALWARE (compléter à 5)
INSERT INTO scenarios (title, description, category, difficulty, choices)
SELECT * FROM (
  VALUES
    (
      'Logiciel de nettoyage gratuit',
      'Une publicité vous propose un "Super Nettoyeur PC Gratuit" qui promet d''accélérer votre ordinateur de 300%. Le téléchargement se fait sur un site tiers.',
      'Malware',
      'Débutant',
      '[
        {
          "id": "1",
          "text": "Je télécharge le logiciel, c''est gratuit !",
          "isCorrect": false,
          "explanation": "Piège ! Ces logiciels ''gratuits'' contiennent souvent des malwares ou sont des arnaques.",
          "advice": "Méfiez-vous des logiciels gratuits qui promettent des améliorations miraculeuses."
        },
        {
          "id": "2",
          "text": "Je recherche des avis sur ce logiciel avant de télécharger",
          "isCorrect": true,
          "explanation": "Sage décision ! Rechercher des avis peut révéler si un logiciel est légitime ou malveillant.",
          "advice": "Toujours vérifier la réputation d''un logiciel avant de l''installer."
        },
        {
          "id": "3",
          "text": "J''utilise les outils de nettoyage intégrés à Windows",
          "isCorrect": true,
          "explanation": "Excellente alternative ! Les outils intégrés sont sûrs et souvent suffisants.",
          "advice": "Windows a des outils de nettoyage intégrés efficaces et sécurisés."
        }
      ]'::jsonb
    ),
    (
      'Extension de navigateur suspecte',
      'En naviguant, une pop-up vous propose d''installer l''extension "AdBlock Ultra Pro" qui promet de bloquer 99% des publicités. Elle n''est pas sur le Chrome Web Store officiel.',
      'Malware',
      'Intermédiaire',
      '[
        {
          "id": "1",
          "text": "J''installe l''extension, j''en ai marre des pubs",
          "isCorrect": false,
          "explanation": "Dangereux ! Les extensions non officielles peuvent voler vos données de navigation et mots de passe.",
          "advice": "N''installez que des extensions depuis les stores officiels (Chrome Web Store, Firefox Add-ons)."
        },
        {
          "id": "2",
          "text": "Je cherche une extension similaire sur le store officiel",
          "isCorrect": true,
          "explanation": "Parfait ! Les stores officiels vérifient les extensions avant publication.",
          "advice": "Utilisez uniquement les stores d''extensions officiels pour votre sécurité."
        },
        {
          "id": "3",
          "text": "Je ferme la pop-up et continue ma navigation",
          "isCorrect": true,
          "explanation": "Bonne réaction ! Ignorer les propositions d''installation suspectes est sécurisé.",
          "advice": "Fermez toujours les pop-ups qui proposent d''installer des logiciels."
        }
      ]'::jsonb
    ),
    (
      'Mise à jour système suspecte',
      'Votre ordinateur affiche : "Mise à jour critique de sécurité Windows disponible. Cliquez ici pour télécharger maintenant." Mais vous êtes sur un site web, pas dans Windows Update.',
      'Malware',
      'Avancé',
      '[
        {
          "id": "1",
          "text": "Je clique pour installer la mise à jour de sécurité",
          "isCorrect": false,
          "explanation": "Piège ! Les vraies mises à jour Windows ne se font jamais depuis un navigateur web.",
          "advice": "Les mises à jour Windows se font uniquement via Windows Update dans les paramètres système."
        },
        {
          "id": "2",
          "text": "Je vais dans Paramètres > Windows Update pour vérifier",
          "isCorrect": true,
          "explanation": "Excellente réaction ! Vous utilisez le canal officiel pour vérifier les mises à jour.",
          "advice": "Toujours utiliser Windows Update officiel pour les mises à jour système."
        },
        {
          "id": "3",
          "text": "Je ferme le navigateur et lance un scan antivirus",
          "isCorrect": true,
          "explanation": "Bonne précaution ! Ce type de fausse alerte peut indiquer une infection existante.",
          "advice": "Les fausses alertes de mise à jour peuvent signaler la présence de malware."
        }
      ]'::jsonb
    )
) AS new_scenarios(title, description, category, difficulty, choices)
WHERE NOT EXISTS (
  SELECT 1 FROM scenarios WHERE category = 'Malware' AND title = new_scenarios.title
) AND (SELECT COUNT(*) FROM scenarios WHERE category = 'Malware' AND is_active = true) < 5;

-- RÉSEAUX SOCIAUX (compléter à 5)
INSERT INTO scenarios (title, description, category, difficulty, choices)
SELECT * FROM (
  VALUES
    (
      'Demande d''ami suspect',
      'Sur Facebook, vous recevez une demande d''ami d''une personne avec une photo de profil attirante, peu d''amis en commun, et un profil créé récemment. Elle vous envoie immédiatement un message.',
      'Réseaux sociaux',
      'Débutant',
      '[
        {
          "id": "1",
          "text": "J''accepte la demande, elle a l''air sympa",
          "isCorrect": false,
          "explanation": "Risqué ! Les faux profils utilisent souvent des photos attirantes pour piéger leurs victimes.",
          "advice": "Méfiez-vous des profils récents avec peu d''amis en commun qui vous contactent rapidement."
        },
        {
          "id": "2",
          "text": "Je vérifie son profil en détail avant de décider",
          "isCorrect": true,
          "explanation": "Bonne approche ! Examiner les détails d''un profil peut révéler s''il est authentique.",
          "advice": "Vérifiez l''ancienneté du compte, les photos, les amis en commun avant d''accepter."
        },
        {
          "id": "3",
          "text": "Je refuse la demande et signale le profil",
          "isCorrect": true,
          "explanation": "Excellente décision ! Signaler les profils suspects protège toute la communauté.",
          "advice": "N''hésitez pas à signaler les profils qui vous semblent suspects ou frauduleux."
        }
      ]'::jsonb
    ),
    (
      'Quiz de personnalité viral',
      'Un quiz "Découvrez votre personnalité Disney !" devient viral sur Facebook. Il demande votre date de naissance, ville natale, nom de jeune fille de votre mère, et premier animal de compagnie.',
      'Réseaux sociaux',
      'Avancé',
      '[
        {
          "id": "1",
          "text": "Je participe, tous mes amis l''ont fait !",
          "isCorrect": false,
          "explanation": "Piège ! Ces informations sont souvent utilisées comme questions de sécurité pour vos comptes.",
          "advice": "Ne donnez jamais d''informations personnelles dans des quiz, même s''ils semblent amusants."
        },
        {
          "id": "2",
          "text": "Je refuse de donner ces informations personnelles",
          "isCorrect": true,
          "explanation": "Parfait ! Vous avez identifié une tentative de collecte d''informations sensibles.",
          "advice": "Vos informations personnelles valent plus qu''un résultat de quiz amusant."
        },
        {
          "id": "3",
          "text": "Je signale le quiz comme suspect",
          "isCorrect": true,
          "explanation": "Excellente réaction ! Ces quiz peuvent être des tentatives de vol d''identité.",
          "advice": "Signalez les quiz qui demandent trop d''informations personnelles."
        }
      ]'::jsonb
    ),
    (
      'Photo de vacances avec géolocalisation',
      'Vous êtes en vacances dans un hôtel de luxe. Vous voulez poster une photo avec la géolocalisation activée pour montrer où vous êtes à vos amis.',
      'Réseaux sociaux',
      'Intermédiaire',
      '[
        {
          "id": "1",
          "text": "Je poste la photo avec la localisation en temps réel",
          "isCorrect": false,
          "explanation": "Dangereux ! Révéler votre localisation en temps réel peut attirer les cambrioleurs chez vous.",
          "advice": "Ne partagez jamais votre localisation en temps réel, surtout quand vous êtes loin de chez vous."
        },
        {
          "id": "2",
          "text": "J''attends d''être rentré pour poster les photos de vacances",
          "isCorrect": true,
          "explanation": "Sage décision ! Partager après coup évite de signaler que votre domicile est vide.",
          "advice": "Partagez vos souvenirs de vacances après votre retour pour votre sécurité."
        },
        {
          "id": "3",
          "text": "Je poste sans géolocalisation et en mode privé",
          "isCorrect": true,
          "explanation": "Bonne approche ! Limiter la visibilité et supprimer la géolocalisation réduit les risques.",
          "advice": "Désactivez la géolocalisation et utilisez les paramètres de confidentialité."
        }
      ]'::jsonb
    ),
    (
      'Offre d''emploi sur LinkedIn',
      'Vous recevez un message LinkedIn d''un "recruteur" proposant un travail à domicile très bien payé. Il demande vos informations bancaires pour "préparer votre premier salaire".',
      'Réseaux sociaux',
      'Avancé',
      '[
        {
          "id": "1",
          "text": "Je donne mes informations, l''offre est alléchante",
          "isCorrect": false,
          "explanation": "Arnaque ! Aucun employeur légitime ne demande vos informations bancaires avant embauche.",
          "advice": "Ne donnez jamais vos informations bancaires à un ''employeur'' que vous n''avez pas rencontré."
        },
        {
          "id": "2",
          "text": "Je vérifie l''entreprise et demande un entretien en personne",
          "isCorrect": true,
          "explanation": "Excellente approche ! Vérifier l''authenticité de l''entreprise et demander un vrai entretien.",
          "advice": "Les vrais recruteurs acceptent toujours des entretiens et ont des entreprises vérifiables."
        },
        {
          "id": "3",
          "text": "Je signale le profil comme arnaque",
          "isCorrect": true,
          "explanation": "Très bien ! Signaler protège les autres utilisateurs de LinkedIn de cette arnaque.",
          "advice": "Signalez les fausses offres d''emploi pour protéger la communauté professionnelle."
        }
      ]'::jsonb
    )
) AS new_scenarios(title, description, category, difficulty, choices)
WHERE NOT EXISTS (
  SELECT 1 FROM scenarios WHERE category = 'Réseaux sociaux' AND title = new_scenarios.title
) AND (SELECT COUNT(*) FROM scenarios WHERE category = 'Réseaux sociaux' AND is_active = true) < 5;

-- Vérification finale du nombre de scénarios par catégorie
-- Cette requête vous permettra de vérifier que chaque catégorie a bien 5 scénarios
/*
SELECT 
  category,
  COUNT(*) as nombre_scenarios,
  CASE 
    WHEN COUNT(*) = 5 THEN '✅ Complet'
    WHEN COUNT(*) < 5 THEN '⚠️ Manque ' || (5 - COUNT(*)) || ' scénario(s)'
    ELSE '❌ Trop de scénarios (' || COUNT(*) || ')'
  END as statut
FROM scenarios 
WHERE is_active = true 
GROUP BY category 
ORDER BY category;
*/