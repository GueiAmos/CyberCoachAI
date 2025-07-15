/*
  # Ajouter des questions CyberScan pour atteindre 10 questions

  1. Nouvelles questions
    - Questions 6 à 10 pour compléter l'évaluation CyberScan
    - Couvrent différents aspects de la sécurité numérique
    - Options avec scores et niveaux de risque appropriés

  2. Sécurité
    - Questions publiquement lisibles si actives
    - Ordre défini par order_index
*/

-- Ajouter les questions 6 à 10 pour CyberScan
INSERT INTO scan_questions (question_text, options, order_index, is_active) VALUES

-- Question 6: Sauvegardes
('À quelle fréquence sauvegardez-vous vos données importantes ?', 
'[
  {"text": "Jamais, je ne fais pas de sauvegardes", "score": 0, "risk": "high"},
  {"text": "Rarement, quand j''y pense", "score": 1, "risk": "high"},
  {"text": "De temps en temps, quelques fois par an", "score": 2, "risk": "medium"},
  {"text": "Régulièrement, au moins une fois par mois", "score": 3, "risk": "low"}
]'::jsonb, 6, true),

-- Question 7: Réseaux sociaux
('Comment gérez-vous vos paramètres de confidentialité sur les réseaux sociaux ?', 
'[
  {"text": "Je n''ai jamais vérifié mes paramètres", "score": 0, "risk": "high"},
  {"text": "J''utilise les paramètres par défaut", "score": 1, "risk": "high"},
  {"text": "J''ai ajusté quelques paramètres de base", "score": 2, "risk": "medium"},
  {"text": "Je vérifie et ajuste régulièrement tous mes paramètres", "score": 3, "risk": "low"}
]'::jsonb, 7, true),

-- Question 8: Logiciels antivirus
('Utilisez-vous un logiciel antivirus sur vos appareils ?', 
'[
  {"text": "Non, je n''en utilise pas", "score": 0, "risk": "high"},
  {"text": "Oui, mais il n''est pas à jour", "score": 1, "risk": "high"},
  {"text": "Oui, avec des mises à jour occasionnelles", "score": 2, "risk": "medium"},
  {"text": "Oui, toujours à jour avec protection en temps réel", "score": 3, "risk": "low"}
]'::jsonb, 8, true),

-- Question 9: Informations personnelles en ligne
('Que partagez-vous comme informations personnelles en ligne ?', 
'[
  {"text": "Toutes mes informations sans restriction", "score": 0, "risk": "high"},
  {"text": "La plupart de mes informations personnelles", "score": 1, "risk": "high"},
  {"text": "Quelques informations de base seulement", "score": 2, "risk": "medium"},
  {"text": "Le minimum nécessaire, je fais très attention", "score": 3, "risk": "low"}
]'::jsonb, 9, true),

-- Question 10: Formation en cybersécurité
('À quelle fréquence vous informez-vous sur les nouvelles menaces cybersécurité ?', 
'[
  {"text": "Jamais, ce n''est pas ma priorité", "score": 0, "risk": "high"},
  {"text": "Rarement, seulement si j''entends parler d''un problème", "score": 1, "risk": "high"},
  {"text": "De temps en temps, quand j''ai le temps", "score": 2, "risk": "medium"},
  {"text": "Régulièrement, je me tiens informé(e) des nouvelles menaces", "score": 3, "risk": "low"}
]'::jsonb, 10, true);