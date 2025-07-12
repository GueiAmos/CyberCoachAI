/*
  # Création des tables pour scénarios et questions

  1. Nouvelles Tables
    - `scenarios`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `difficulty` (text)
      - `choices` (jsonb) - array des choix avec explications
      - `created_at` (timestamp)
      - `is_active` (boolean)
    
    - `scan_questions`
      - `id` (uuid, primary key)
      - `question_text` (text)
      - `options` (jsonb) - array des options avec scores
      - `order_index` (integer)
      - `created_at` (timestamp)
      - `is_active` (boolean)

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Add policy pour lecture publique
*/

-- Table des scénarios CyberQuest
CREATE TABLE IF NOT EXISTS scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'Débutant',
  choices jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Table des questions CyberScan
CREATE TABLE IF NOT EXISTS scan_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_questions ENABLE ROW LEVEL SECURITY;

-- Policies pour lecture publique
CREATE POLICY "Scenarios are publicly readable"
  ON scenarios
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Scan questions are publicly readable"
  ON scan_questions
  FOR SELECT
  TO public
  USING (is_active = true);

-- Insertion des données de test pour CyberQuest
INSERT INTO scenarios (title, description, category, difficulty, choices) VALUES
(
  'Email suspect',
  'Vous recevez un email de votre banque vous demandant de cliquer sur un lien pour ''vérifier votre compte'' suite à une activité suspecte. Que faites-vous ?',
  'Phishing',
  'Débutant',
  '[
    {
      "id": "a",
      "text": "Je clique immédiatement sur le lien pour vérifier",
      "isCorrect": false,
      "explanation": "C''est probablement un email de phishing. Les banques ne demandent jamais de cliquer sur des liens par email.",
      "advice": "Connectez-vous toujours directement sur le site officiel de votre banque via votre navigateur."
    },
    {
      "id": "b",
      "text": "Je vérifie l''adresse email de l''expéditeur et contacte ma banque",
      "isCorrect": true,
      "explanation": "Excellente réaction ! Vérifier la source et contacter directement l''organisme est la bonne méthode.",
      "advice": "Toujours vérifier l''authenticité des emails suspects en contactant directement l''organisme concerné."
    },
    {
      "id": "c",
      "text": "Je supprime l''email sans rien faire",
      "isCorrect": false,
      "explanation": "Bien que prudent, il vaut mieux vérifier auprès de votre banque s''il y a vraiment un problème.",
      "advice": "En cas de doute, contactez votre banque pour confirmer s''il y a réellement une activité suspecte."
    }
  ]'::jsonb
),
(
  'WiFi public gratuit',
  'Vous êtes dans un café et voyez un WiFi gratuit appelé ''WiFi_Gratuit_Cafe''. Vous devez envoyer des documents importants par email. Que faites-vous ?',
  'Réseaux',
  'Intermédiaire',
  '[
    {
      "id": "a",
      "text": "Je me connecte et envoie mes documents rapidement",
      "isCorrect": false,
      "explanation": "Les réseaux WiFi publics sont dangereux pour les données sensibles. Vos informations peuvent être interceptées.",
      "advice": "Évitez de transmettre des données sensibles sur les réseaux WiFi publics non sécurisés."
    },
    {
      "id": "b",
      "text": "J''utilise mes données mobiles ou un VPN",
      "isCorrect": true,
      "explanation": "Parfait ! Utiliser vos données mobiles ou un VPN protège vos communications.",
      "advice": "Utilisez toujours un VPN ou vos données mobiles pour les communications importantes sur des réseaux publics."
    }
  ]'::jsonb
),
(
  'Mot de passe oublié',
  'Vous avez oublié le mot de passe d''un compte important. Un ami vous propose d''utiliser un générateur de mots de passe en ligne gratuit qu''il a trouvé. Que faites-vous ?',
  'Mots de passe',
  'Débutant',
  '[
    {
      "id": "a",
      "text": "J''utilise le générateur qu''il me recommande",
      "isCorrect": false,
      "explanation": "Les générateurs en ligne inconnus peuvent stocker vos mots de passe. C''est risqué pour votre sécurité.",
      "advice": "Utilisez uniquement des gestionnaires de mots de passe reconnus et sécurisés."
    },
    {
      "id": "b",
      "text": "J''utilise un gestionnaire de mots de passe réputé",
      "isCorrect": true,
      "explanation": "Excellent choix ! Les gestionnaires reconnus offrent sécurité et commodité.",
      "advice": "Les gestionnaires de mots de passe réputés sont la meilleure solution pour créer et stocker des mots de passe sécurisés."
    },
    {
      "id": "c",
      "text": "Je crée un mot de passe simple que je peux retenir",
      "isCorrect": false,
      "explanation": "Les mots de passe simples sont facilement devinables par les pirates informatiques.",
      "advice": "Privilégiez des mots de passe complexes et uniques pour chaque compte, stockés dans un gestionnaire sécurisé."
    }
  ]'::jsonb
);

-- Insertion des données de test pour CyberScan
INSERT INTO scan_questions (question_text, options, order_index) VALUES
(
  'Comment gérez-vous vos mots de passe ?',
  '[
    {
      "text": "J''utilise le même mot de passe partout",
      "score": 0,
      "risk": "high"
    },
    {
      "text": "J''ai quelques mots de passe différents que je réutilise",
      "score": 1,
      "risk": "medium"
    },
    {
      "text": "J''utilise un gestionnaire de mots de passe",
      "score": 3,
      "risk": "low"
    }
  ]'::jsonb,
  1
),
(
  'Activez-vous l''authentification à deux facteurs (2FA) ?',
  '[
    {
      "text": "Jamais, je ne sais pas ce que c''est",
      "score": 0,
      "risk": "high"
    },
    {
      "text": "Parfois, sur les comptes importants",
      "score": 2,
      "risk": "medium"
    },
    {
      "text": "Toujours, sur tous mes comptes possibles",
      "score": 3,
      "risk": "low"
    }
  ]'::jsonb,
  2
),
(
  'Comment vous comportez-vous avec les emails suspects ?',
  '[
    {
      "text": "Je clique souvent sur les liens sans vérifier",
      "score": 0,
      "risk": "high"
    },
    {
      "text": "Je suis parfois prudent mais pas toujours",
      "score": 1,
      "risk": "medium"
    },
    {
      "text": "Je vérifie toujours la source avant de cliquer",
      "score": 3,
      "risk": "low"
    }
  ]'::jsonb,
  3
),
(
  'À quelle fréquence mettez-vous à jour vos logiciels ?',
  '[
    {
      "text": "Rarement, seulement quand j''y pense",
      "score": 0,
      "risk": "high"
    },
    {
      "text": "De temps en temps, quelques fois par mois",
      "score": 1,
      "risk": "medium"
    },
    {
      "text": "Dès que les mises à jour sont disponibles",
      "score": 3,
      "risk": "low"
    }
  ]'::jsonb,
  4
),
(
  'Comment utilisez-vous les réseaux WiFi publics ?',
  '[
    {
      "text": "Je me connecte sans précaution particulière",
      "score": 0,
      "risk": "high"
    },
    {
      "text": "J''évite les activités sensibles mais je m''y connecte",
      "score": 2,
      "risk": "medium"
    },
    {
      "text": "J''utilise un VPN ou évite complètement",
      "score": 3,
      "risk": "low"
    }
  ]'::jsonb,
  5
),
(
  'Partagez-vous des informations personnelles sur les réseaux sociaux ?',
  '[
    {
      "text": "Oui, je partage beaucoup de détails de ma vie",
      "score": 0,
      "risk": "high"
    },
    {
      "text": "Parfois, selon mon humeur",
      "score": 1,
      "risk": "medium"
    },
    {
      "text": "Non, je limite au maximum les informations partagées",
      "score": 3,
      "risk": "low"
    }
  ]'::jsonb,
  6
),
(
  'Sauvegardez-vous régulièrement vos données importantes ?',
  '[
    {
      "text": "Non, je n''y pense jamais",
      "score": 0,
      "risk": "high"
    },
    {
      "text": "De temps en temps, pas de façon régulière",
      "score": 1,
      "risk": "medium"
    },
    {
      "text": "Oui, j''ai un système de sauvegarde automatique",
      "score": 3,
      "risk": "low"
    }
  ]'::jsonb,
  7
);