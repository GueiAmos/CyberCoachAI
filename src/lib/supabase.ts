import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour les données
export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  choices: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    advice: string;
  }>;
  created_at: string;
  is_active: boolean;
}

export interface ScanQuestion {
  id: string;
  question_text: string;
  options: Array<{
    text: string;
    score: number;
    risk: 'low' | 'medium' | 'high';
  }>;
  order_index: number;
  created_at: string;
  is_active: boolean;
}

// Fonctions pour récupérer les données
export const getScenarios = async (): Promise<Scenario[]> => {
  const { data, error } = await supabase
    .from('scenarios')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Erreur lors de la récupération des scénarios:', error);
    return [];
  }

  return data || [];
};

export const getScanQuestions = async (): Promise<ScanQuestion[]> => {
  const { data, error } = await supabase
    .from('scan_questions')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Erreur lors de la récupération des questions:', error);
    return [];
  }

  return data || [];
};