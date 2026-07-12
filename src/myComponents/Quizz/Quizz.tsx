import { getRandomQuestions } from "@/data/questions";
import type { QuestionType, ReponseUtilisateur } from "@/types";
import { useState } from "react";
import { EcranNom } from "./EcranNom";
import { Question } from "./Question";
import { Resultat } from "./Resultat";

type EcranQuiz = "nom" | "question" | "resultat";

export function Quiz() {
  const [ecran, setEcran] = useState<EcranQuiz>("nom");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [reponses, setReponses] = useState<ReponseUtilisateur[]>([]);
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");

  // Démarrer le quiz
  const demarrerQuiz = (
    nomUtilisateur: string,
    telephoneUtilisateur: string,
  ) => {
    setNom(nomUtilisateur);
    setTelephone(telephoneUtilisateur);
    const questionsAleatoires = getRandomQuestions(10);
    setQuestions(questionsAleatoires);
    setIndexQuestion(0);
    setReponses([]);
    setEcran("question");
  };

  // Répondre à une question
  const repondreQuestion = (reponseChoisie: number) => {
    const questionActuelle = questions[indexQuestion];
    if (!questionActuelle) return;
    const estCorrecte = reponseChoisie === questionActuelle.reponseCorrecte;

    const nouvelleReponse: ReponseUtilisateur = {
      questionId: questionActuelle.id,
      reponseChoisie,
      estCorrecte,
    };

    const nouvellesReponses = [...reponses, nouvelleReponse];
    setReponses(nouvellesReponses);

    // Dernière question ?
    if (indexQuestion === questions.length - 1) {
      // ✅ On passe directement à l'écran résultat
      // Le calcul du score se fera dans le composant Resultat
      setEcran("resultat");
    } else {
      setIndexQuestion(indexQuestion + 1);
    }
  };

  // Déterminer le titre en fonction du score
  const getTitreScore = (score: number, total: number): string => {
    const pourcentage = (score / total) * 100;
    if (pourcentage >= 80) return "🏆 Expert de l'histoire du Bénin";
    if (pourcentage >= 60) return "🌟 Bon citoyen béninois";
    if (pourcentage >= 40) return "📖 Apprenti historien";
    return "📚 À réviser !";
  };

  // Revenir au début
  const rejouer = () => {
    setEcran("nom");
    setQuestions([]);
    setIndexQuestion(0);
    setReponses([]);
  };

  // Calcul du score final
  const scoreFinal = reponses.filter((r) => r.estCorrecte).length;

  return (
    <section
      id="quiz"
      className="py-16 md:py-24 px-4 bg-linear-to-b from-gray-50 to-white"
    >
      <div className="max-w-2xl mx-auto">
        {/* En-tête du quiz */}
        <div className="text-center mb-8">
          <span className="block font-mono text-xs tracking-widest uppercase text-green-500 mb-2">
            Teste tes connaissances
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Le Quiz <span className="text-green-500">Bénin Tché</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-green-500 via-benin-yellow to-red-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Contenu du quiz */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(16,36,26,0.06),0_12px_32px_rgba(16,36,26,0.10)]">
          {ecran === "nom" && <EcranNom onDemarrer={demarrerQuiz} />}

          {ecran === "question" && (
            <Question
              key={questions[indexQuestion]?.id ?? indexQuestion}
              question={questions[indexQuestion]}
              index={indexQuestion}
              total={questions.length}
              onRepondre={repondreQuestion}
            />
          )}

          {ecran === "resultat" && (
            <Resultat
              resultat={{
                score: scoreFinal,
                total: questions.length,
                pourcentage: (scoreFinal / questions.length) * 100,
                titre: getTitreScore(scoreFinal, questions.length),
                reponses,
              }}
              nom={nom}
              telephone={telephone}
              questions={questions}
              onRejouer={rejouer}
            />
          )}
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Participez au quiz et célébrez 66 ans d'indépendance du Bénin !
        </p>
      </div>
    </section>
  );
}
