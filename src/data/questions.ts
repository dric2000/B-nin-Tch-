import type { QuestionType } from "@/types";

export const questions: QuestionType[] = [
  // Période pré-coloniale
  {
    id: "q1",
    question:
      "Quel était le nom du puissant royaume qui existait sur le territoire du Bénin actuel avant la colonisation ?",
    options: [
      "Le Royaume du Dahomey",
      "L'Empire du Mali",
      "Le Royaume du Kongo",
      "L'Empire Songhaï",
    ],
    reponseCorrecte: 0,
    difficulte: "facile",
    categorie: "Pré-coloniale",
  },
  {
    id: "q2",
    question: "Quelles étaient les célèbres guerrières du Royaume du Dahomey ?",
    options: [
      "Les Amazones",
      "Les Valkyries",
      "Les Samouraïs",
      "Les Mousquetaires",
    ],
    reponseCorrecte: 0,
    difficulte: "facile",
    categorie: "Pré-coloniale",
  },
  {
    id: "q3",
    question:
      "Quel roi du Dahomey a résisté à la colonisation française jusqu'en 1894 ?",
    options: ["Roi Béhanzin", "Roi Ghezo", "Roi Glélé", "Roi Agoli-Agbo"],
    reponseCorrecte: 0,
    difficulte: "moyen",
    categorie: "Pré-coloniale",
  },
  {
    id: "q4",
    question: "Quelle était la capitale du Royaume du Dahomey ?",
    options: ["Abomey", "Porto-Novo", "Ouidah", "Cotonou"],
    reponseCorrecte: 0,
    difficulte: "facile",
    categorie: "Pré-coloniale",
  },
  {
    id: "q5",
    question:
      "Quelle religion traditionnelle était pratiquée au Royaume du Dahomey ?",
    options: ["Le Vodun", "Le Christianisme", "L'Islam", "L'Animisme"],
    reponseCorrecte: 0,
    difficulte: "moyen",
    categorie: "Pré-coloniale",
  },

  // Colonisation
  {
    id: "q6",
    question:
      "En quelle année le Dahomey est-il devenu une colonie française ?",
    options: ["1884", "1894", "1904", "1914"],
    reponseCorrecte: 1,
    difficulte: "facile",
    categorie: "Colonisation",
  },
  {
    id: "q7",
    question:
      "Quel était le principal produit d'exportation du Dahomey colonial ?",
    options: ["L'huile de palme", "Le coton", "Le cacao", "Le café"],
    reponseCorrecte: 0,
    difficulte: "moyen",
    categorie: "Colonisation",
  },
  {
    id: "q8",
    question:
      "La ville de Ouidah était célèbre pour quoi sous la colonisation ?",
    options: [
      "Le commerce des esclaves",
      "Le commerce de l'or",
      "Le commerce des épices",
      "Le commerce du sel",
    ],
    reponseCorrecte: 0,
    difficulte: "facile",
    categorie: "Colonisation",
  },
  {
    id: "q9",
    question:
      "Quelle loi-cadre a accordé l'autonomie interne au Dahomey en 1956 ?",
    options: [
      "Loi-cadre Defferre",
      "Loi-cadre Houphouët",
      "Loi-cadre Senghor",
      "Loi-cadre Mitterrand",
    ],
    reponseCorrecte: 0,
    difficulte: "difficile",
    categorie: "Colonisation",
  },

  // Indépendance
  {
    id: "q10",
    question: "Quelle est la date de l'indépendance du Bénin ?",
    options: [
      "1er janvier 1960",
      "1er août 1960",
      "1er janvier 1961",
      "1er août 1961",
    ],
    reponseCorrecte: 1,
    difficulte: "facile",
    categorie: "Indépendance",
  },
  {
    id: "q11",
    question: "Qui a été le premier président du Dahomey indépendant ?",
    options: [
      "Mathieu Kérékou",
      "Hubert Maga",
      "Nicéphore Soglo",
      "Émile Zinsou",
    ],
    reponseCorrecte: 1,
    difficulte: "facile",
    categorie: "Indépendance",
  },
  {
    id: "q12",
    question:
      "En quelle année le Dahomey est-il devenu la République Populaire du Bénin ?",
    options: ["1972", "1975", "1980", "1990"],
    reponseCorrecte: 1,
    difficulte: "moyen",
    categorie: "Indépendance",
  },

  // République Populaire
  {
    id: "q13",
    question: "Qui a instauré le régime marxiste-léniniste au Bénin ?",
    options: [
      "Mathieu Kérékou",
      "Hubert Maga",
      "Nicéphore Soglo",
      "Patrice Talon",
    ],
    reponseCorrecte: 0,
    difficulte: "facile",
    categorie: "République Populaire",
  },
  {
    id: "q14",
    question:
      "Quelle idéologie politique a été adoptée par le Bénin entre 1972 et 1990 ?",
    options: [
      "Marxisme-léninisme",
      "Social-démocratie",
      "Libéralisme",
      "Conservatisme",
    ],
    reponseCorrecte: 0,
    difficulte: "moyen",
    categorie: "République Populaire",
  },

  // Conférence Nationale et Démocratie
  {
    id: "q15",
    question: "Quel événement majeur a eu lieu au Bénin en 1990 ?",
    options: [
      "L'indépendance",
      "La Conférence Nationale",
      "Le coup d'État",
      "La création de la CEDEAO",
    ],
    reponseCorrecte: 1,
    difficulte: "facile",
    categorie: "Démocratie",
  },
  {
    id: "q16",
    question: "Qui a présidé la Conférence Nationale de 1990 ?",
    options: [
      "Mgr Isidore de Souza",
      "Mathieu Kérékou",
      "Nicéphore Soglo",
      "Hubert Maga",
    ],
    reponseCorrecte: 0,
    difficulte: "difficile",
    categorie: "Démocratie",
  },
  {
    id: "q17",
    question: "Quel président a succédé à Mathieu Kérékou en 1991 ?",
    options: [
      "Nicéphore Soglo",
      "Thomas Boni Yayi",
      "Patrice Talon",
      "Émile Zinsou",
    ],
    reponseCorrecte: 0,
    difficulte: "moyen",
    categorie: "Démocratie",
  },
  {
    id: "q18",
    question: "Qui a été président du Bénin de 2006 à 2016 ?",
    options: [
      "Thomas Boni Yayi",
      "Patrice Talon",
      "Nicéphore Soglo",
      "Mathieu Kérékou",
    ],
    reponseCorrecte: 0,
    difficulte: "facile",
    categorie: "Démocratie",
  },
  {
    id: "q19",
    question: "Qui est l'actuel président du Bénin (2026) ?",
    options: [
      "Patrice Talon",
      "Thomas Boni Yayi",
      "Nicéphore Soglo",
      "Mathieu Kérékou",
    ],
    reponseCorrecte: 0,
    difficulte: "facile",
    categorie: "Démocratie",
  },
  {
    id: "q20",
    question: "Quelle est la capitale officielle du Bénin ?",
    options: ["Porto-Novo", "Cotonou", "Abomey", "Ouidah"],
    reponseCorrecte: 0,
    difficulte: "facile",
    categorie: "Géographie",
  },
];

// Fonction pour mélanger un tableau
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Fonction pour sélectionner 10 questions aléatoires
export function getRandomQuestions(nb: number = 10): QuestionType[] {
  return shuffleArray(questions).slice(0, nb);
}
