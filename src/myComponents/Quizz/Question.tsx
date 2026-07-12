import { Button } from "@/components/ui/button";
import type { QuestionType } from "@/types";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface QuestionProps {
  question: QuestionType;
  index: number;
  total: number;
  onRepondre: (reponse: number) => void;
}

export function Question({
  question,
  index,
  total,
  onRepondre,
}: QuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!question) return null;

  const handleSubmit = () => {
    if (selectedOption === null) {
      return;
    }

    setIsSubmitted(true);

    // Petit délai pour montrer la sélection avant de passer à la suivante
    setTimeout(() => {
      onRepondre(selectedOption);
    }, 1000);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedOption(null);
    setIsSubmitted(false);
  }, [question]);

  const progress = (index / total) * 100;

  return (
    <div className="p-6 md:p-8">
      {/* En-tête avec progression */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-sm text-gray-400">
          Question {index + 1} / {total}
        </span>
        {question?.categorie && (
          <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full font-mono">
            {question.categorie}
          </span>
        )}
      </div>

      {/* Barre de progression */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-linear-to-r from-green-500 to-yellow-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <h3 className="text-lg md:text-xl font-serif font-semibold text-gray-900 mb-6">
        {question?.question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question?.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === question.reponseCorrecte;
          const showResult = isSubmitted;

          let borderColor = "border-gray-200";
          let bgColor = "hover:bg-gray-50";

          if (showResult) {
            if (isCorrect) {
              borderColor = "border-green-500";
              bgColor = "bg-green-500/5";
            } else if (isSelected && !isCorrect) {
              borderColor = "border-red-500";
              bgColor = "bg-red-500/5";
              // eslint-disable-next-line no-dupe-else-if
            } else if (isSelected && isCorrect) {
              borderColor = "border-green-500";
              bgColor = "bg-green-500/5";
            }
          } else if (isSelected) {
            borderColor = "border-green-500";
            bgColor = "bg-green-500/5";
          }

          return (
            <button
              type="button"
              key={idx}
              onClick={() => {
                console.log("🖱️ Clic sur option", idx);
                if (!isSubmitted) {
                  setSelectedOption(idx);
                }
              }}
              disabled={isSubmitted}
              className={`w-full text-left p-3.5 border-2 rounded-xl transition-all flex items-start gap-3 ${borderColor} ${bgColor} ${
                !isSubmitted && "hover:border-green-500/50"
              } ${isSelected ? "shadow-sm" : ""}`}
            >
              <span className="shrink-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs font-medium text-gray-500 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-sm text-gray-700">{option}</span>
              {showResult && isCorrect && (
                <CheckCircle2 className="ml-auto w-5 h-5 text-green-500 shrink-0" />
              )}
              {showResult && isSelected && !isCorrect && (
                <span className="ml-auto text-red-500 text-sm font-medium shrink-0">
                  ✕
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bouton de validation */}
      <Button
        onClick={handleSubmit}
        disabled={selectedOption === null || isSubmitted}
        className="w-full mt-6 bg-green-500 hover:bg-green-500/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        size="lg"
      >
        {isSubmitted ? "✓ Réponse enregistrée" : "Valider ma réponse"}
      </Button>

      {/* Indicateur de sélection */}
      {selectedOption !== null && !isSubmitted && (
        <p className="text-xs text-gray-400 text-center mt-3">
          <HelpCircle className="inline w-3 h-3 mr-1" />
          Cliquez sur "Valider" pour confirmer votre réponse
        </p>
      )}
    </div>
  );
}
