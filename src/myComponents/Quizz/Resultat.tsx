import { Button } from "@/components/ui/button";
import { submitScore } from "@/lib/submitScore";
import type { QuestionType, ResultatQuiz } from "@/types";
import html2canvas from "html2canvas-pro";
import {
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  RotateCcw,
  Share2,
  Trophy,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ResultatProps {
  resultat: ResultatQuiz;
  nom: string;
  telephone: string;
  questions: QuestionType[];
  onRejouer: () => void;
}

// Retire les emojis en tête de chaîne
function stripLeadingEmoji(text: string): string {
  return text.replace(/^\p{Extended_Pictographic}\s*/u, "").trim();
}

// Choisit une icône de tampon selon le niveau
function getSealName(pourcentage: number) {
  if (pourcentage >= 80) return "trophy";
  if (pourcentage >= 60) return "award";
  if (pourcentage >= 40) return "book";
  return "graduation";
}

function referenceCode(date: Date): string {
  const y = date.getFullYear();
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `N° 66-${y}-${d}${m}`;
}

export function Resultat({
  resultat,
  nom,
  telephone,
  questions,
  onRejouer,
}: ResultatProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  // ✅ Utiliser useRef pour éviter les doubles soumissions
  const hasSubmitted = useRef(false);

  const pourcentageArrondi = Math.round(resultat.pourcentage);
  const titre = stripLeadingEmoji(resultat.titre);
  const sealName = getSealName(pourcentageArrondi);
  const reference = referenceCode(new Date());

  // ✅ Soumission automatique vers Google Sheet (une seule fois)
  useEffect(() => {
    if (hasSubmitted.current) {
      console.log("⏭️ Score déjà soumis, on ignore");
      return;
    }

    console.log("📤 Soumission du score vers Google Sheet...");
    hasSubmitted.current = true;

    submitScore({
      nom,
      telephone,
      score: resultat.score,
      total: resultat.total,
      reponses: resultat.reponses,
      date: new Date().toISOString(),
    }).catch((error) => {
      console.error("❌ Erreur de soumission:", error);
      hasSubmitted.current = false;
    });
  }, [nom, telephone, resultat]);

  // ✅ Partager le score
  const handleShare = async () => {
    if (!shareRef.current || isSharing) return;
    setIsSharing(true);

    try {
      const canvas = await html2canvas(shareRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FFFFFF",
        logging: false,
        allowTaint: true,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsSharing(false);
          return;
        }

        const file = new File([blob], "mon-score-independance-benin.png", {
          type: "image/png",
        });
        const partageTexte = `🏆 J'ai obtenu ${resultat.score}/${resultat.total} au quiz de l'indépendance du Bénin ! Et toi ? #66ansBenin #BéninTché`;

        try {
          if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: "Quiz Indépendance — Bénin Tché",
              text: partageTexte,
            });
          } else {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "mon-score-independance-benin.png";
            link.click();

            setTimeout(() => {
              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(partageTexte)}`;
              if (confirm("Ouvrir WhatsApp pour partager l'image ?")) {
                window.open(whatsappUrl, "_blank");
              }
            }, 500);
          }
        } catch (error) {
          console.log((error as string) || "Partage annulé");
        } finally {
          setIsSharing(false);
        }
      }, "image/png");
    } catch (error) {
      console.error("Erreur lors de la génération de l'image :", error);
      setIsSharing(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      {/* ————— Carte de résultat (pour l'affichage) ————— */}
      <div
        ref={cardRef}
        className="relative bg-[#FBFBF8] border border-[#E3E6DE] rounded-2xl overflow-hidden"
      >
        {/* Liseré tricolore */}
        <div className="h-1.5 flex">
          <div className="flex-1 bg-[#1B7A3D]" />
          <div className="flex-1 bg-[#FCD116]" />
          <div className="flex-1 bg-[#E8112D]" />
        </div>

        <div className="px-6 py-8 md:px-8 md:py-10">
          {/* En-tête */}
          <div className="flex items-start justify-between mb-8">
            <span className="font-mono text-[11px] tracking-wider uppercase text-gray-400">
              Bénin Tché · Édition indépendance
            </span>
            <span className="font-mono text-[11px] text-gray-400">
              {reference}
            </span>
          </div>

          {/* Tampon / sceau */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full border-2 border-[#1B7A3D]/70 flex items-center justify-center -rotate-3 text-[#1B7A3D]">
              {sealName === "trophy" && <Trophy className="w-9 h-9" />}
              {sealName === "award" && <Award className="w-9 h-9" />}
              {sealName === "book" && <BookOpen className="w-9 h-9" />}
              {sealName === "graduation" && (
                <GraduationCap className="w-9 h-9" />
              )}
            </div>
          </div>

          {/* Score */}
          <div className="text-center mb-2">
            <span className="font-serif text-6xl md:text-7xl font-semibold text-gray-900">
              {resultat.score}
            </span>
            <span className="font-serif text-3xl text-gray-400">
              /{resultat.total}
            </span>
          </div>
          <p className="text-center font-mono text-xs text-gray-400 mb-6">
            {pourcentageArrondi}% de bonnes réponses
          </p>

          {/* Titre + nom */}
          <div className="text-center border-t border-dashed border-gray-200 pt-6">
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-1">
              {titre}
            </h3>
            <p className="font-mono text-sm text-gray-500 uppercase tracking-wide">
              {nom}
            </p>
          </div>
        </div>

        {/* Pied de carte */}
        <div className="flex items-center justify-between px-6 md:px-8 py-3 border-t border-[#E3E6DE] bg-[#F4F5F0]">
          <span className="font-serif text-sm font-semibold text-[#1B7A3D]">
            Bénin Tché
          </span>
          <span className="font-mono text-[10px] text-gray-400">
            66 ans d'indépendance · 1er août 2026
          </span>
        </div>
      </div>

      {/* ————— Conteneur de partage (caché, pour la capture) ————— */}
      <div ref={shareRef} className="fixed left-[9999px] top-0 w-100 bg-white">
        {/* Liseré tricolore */}
        <div className="h-1.5 flex">
          <div className="flex-1 bg-[#1B7A3D]" />
          <div className="flex-1 bg-[#FCD116]" />
          <div className="flex-1 bg-[#E8112D]" />
        </div>

        <div className="px-6 py-8 bg-white">
          {/* En-tête */}
          <div className="flex items-start justify-between mb-6">
            <span className="font-mono text-[10px] tracking-wider uppercase text-gray-400">
              Bénin Tché
            </span>
            <span className="font-mono text-[10px] text-gray-400">
              {reference}
            </span>
          </div>

          {/* Tampon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full border-2 border-[#1B7A3D]/70 flex items-center justify-center -rotate-3 text-[#1B7A3D]">
              {sealName === "trophy" && <Trophy className="w-7 h-7" />}
              {sealName === "award" && <Award className="w-7 h-7" />}
              {sealName === "book" && <BookOpen className="w-7 h-7" />}
              {sealName === "graduation" && (
                <GraduationCap className="w-7 h-7" />
              )}
            </div>
          </div>

          {/* Score */}
          <div className="text-center mb-1">
            <span className="font-serif text-5xl font-semibold text-gray-900">
              {resultat.score}
            </span>
            <span className="font-serif text-2xl text-gray-400">
              /{resultat.total}
            </span>
          </div>
          <p className="text-center font-mono text-xs text-gray-400 mb-4">
            {pourcentageArrondi}% de bonnes réponses
          </p>

          {/* Titre + nom */}
          <div className="text-center border-t border-dashed border-gray-200 pt-4">
            <h3 className="font-serif text-lg font-semibold text-gray-900 mb-1">
              {titre}
            </h3>
            <p className="font-mono text-xs text-gray-500 uppercase tracking-wide">
              {nom}
            </p>
          </div>
        </div>

        {/* Pied */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#E3E6DE] bg-[#F4F5F0]">
          <span className="font-serif text-sm font-semibold text-[#1B7A3D]">
            Bénin Tché
          </span>
          <span className="font-mono text-[10px] text-gray-400">
            66 ans d'indépendance
          </span>
        </div>
      </div>

      {/* ————— Contrôles interactifs (hors capture) ————— */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full text-sm text-green-500 font-medium hover:underline mt-6 mb-4"
      >
        {showDetails ? "Cacher les détails" : "Voir le détail des réponses"}
      </button>

      {showDetails && (
        <div className="space-y-2 max-h-48 overflow-y-auto mb-6">
          {questions.map((q, idx) => {
            const reponse = resultat.reponses.find(
              (r) => r.questionId === q.id,
            );
            const estCorrecte = reponse?.estCorrecte || false;
            return (
              <div
                key={q.id}
                className="flex items-center gap-3 text-sm p-2 rounded-lg bg-gray-50"
              >
                <span className="shrink-0">
                  {estCorrecte ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </span>
                <span className="text-gray-600 flex-1 line-clamp-1">
                  {q.question}
                </span>
                <span className="text-xs font-mono text-gray-400 shrink-0">
                  {idx + 1}/{resultat.total}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-3">
        <Button
          onClick={handleShare}
          disabled={isSharing}
          className="w-full bg-[#25D366] hover:bg-[#1DA85C] text-white group disabled:opacity-60"
          size="lg"
        >
          <Share2 className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
          {isSharing ? "Préparation de l'image..." : "Partager mon score"}
        </Button>

        <Button
          onClick={onRejouer}
          variant="outline"
          className="w-full border-green-500/30 text-green-500 hover:bg-green-500/10"
          size="lg"
        >
          <RotateCcw className="mr-2 w-4 h-4" />
          Rejouer
        </Button>
      </div>

      <p className="text-[10px] text-center text-gray-400 mt-4">
        Votre score a été enregistré. Merci de votre participation !
      </p>
    </div>
  );
}
