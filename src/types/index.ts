// Types pour les cartes de la frise
export interface CarteType {
  id: string;
  image?: string;
  periode: string;
  titre: string;
  descriptionCourte: string;
  descriptionLongue: string;
  acteurPrincipal?: string;
  anchorYear?: number; // pour la timeline proportionnelle
}

// Types pour les questions du quiz
export interface QuestionType {
  id: string;
  question: string;
  options: string[];
  reponseCorrecte: number; // index 0-3
  difficulte?: "facile" | "moyen" | "difficile";
  categorie?: string;
}

// Réponse d'un utilisateur à une question
export interface ReponseUtilisateur {
  questionId: string;
  reponseChoisie: number; // index 0-3
  estCorrecte: boolean;
}

// Payload envoyé au Google Sheet (pour la V1)
export interface ScorePayloadType {
  nom: string;
  telephone: string;
  score: number;
  total: number;
  reponses: ReponseUtilisateur[]; // ✅ On garde le tableau d'objets
  date: string;
}

// Pour la V2 (si on veut envoyer un tableau d'indices)
export interface ScorePayloadV2Type {
  nom: string;
  telephone: string;
  score: number;
  total: number;
  reponses: number[]; // juste les indices des réponses choisies
  date: string;
}

// Résultat complet du quiz pour l'affichage
export interface ResultatQuiz {
  score: number;
  total: number;
  pourcentage: number;
  titre: string;
  reponses: ReponseUtilisateur[];
}
