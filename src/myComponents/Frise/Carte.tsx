import { Button } from "@/components/ui/button";
import type { CarteType } from "@/types";
import html2canvas from "html2canvas-pro";
import { ChevronDown, ChevronUp, Share2, User } from "lucide-react";
import { useRef, useState } from "react";

interface CarteProps {
  carte: CarteType;
  isActive: boolean;
  index: number;
  total: number;
  reduceMotion?: boolean;
}

export function Carte({
  carte,
  isActive,
  index,
  total,
  reduceMotion,
}: CarteProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // Partager la carte sur les réseaux sociaux
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

        const file = new File([blob], `benin-${carte.id}.png`, {
          type: "image/png",
        });
        const partageTexte = `${carte.titre} (${carte.periode})\n${carte.descriptionCourte}\n\nDécouvre l'histoire du Bénin sur Bénin Tché ! #66ansBenin #BéninTché`;

        try {
          if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: `Bénin Tché — ${carte.titre}`,
              text: partageTexte,
            });
          } else {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `benin-${carte.id}.png`;
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
    <>
      {/* ————— Contenu de la carte (pour l'affichage) ————— */}
      <article>
        {/* Visuel plein cadre */}
        <div className="relative h-65 md:h-80 overflow-hidden">
          {carte.image && (
            <img
              src={carte.image}
              alt={carte.titre}
              className={`w-full h-full object-cover transition-transform ${
                reduceMotion ? "" : "duration-6000 ease-linear"
              } ${isActive && !reduceMotion ? "scale-[1.12]" : "scale-100"}`}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/10 to-black/75" />

          <span className="absolute top-4 left-4 font-mono text-xs text-white border border-white/70 rounded-sm px-2.5 py-1 -rotate-2 bg-black/25">
            {carte.periode}
          </span>

          <span className="absolute top-4.5 right-4 font-mono text-xs text-white/70">
            {String(index + 1).padStart(2, "0")} / {total}
          </span>

          <h3 className="absolute bottom-4 left-5 right-5 font-serif text-xl md:text-2xl font-semibold text-white leading-tight">
            {carte.titre}
          </h3>
        </div>

        {/* Plaque */}
        <div className="p-5 border-t border-gray-100">
          <p className="text-gray-700 text-[14.5px] leading-relaxed mb-3">
            {carte.descriptionCourte}
          </p>

          {carte.acteurPrincipal && (
            <div className="flex items-center gap-2 text-sm text-gray-500 border-t border-gray-100 pt-3 mb-1">
              <User className="w-4 h-4 shrink-0 text-green-500" />
              <span className="font-medium text-gray-700">
                {carte.acteurPrincipal}
              </span>
            </div>
          )}

          {carte.descriptionLongue && (
            <div className="mt-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm font-medium text-green-500 hover:text-green-500/80 transition-colors"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" /> Lire moins
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" /> Lire le développement
                  </>
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                  {carte.descriptionLongue}
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleShare}
            disabled={isSharing}
            variant="ghost"
            size="sm"
            className="mt-4 w-full text-green-500 hover:bg-green-500/10 hover:text-green-500 transition-all disabled:opacity-50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            {isSharing ? "Préparation..." : "Partager cette période"}
          </Button>
        </div>
      </article>

      {/* ————— Conteneur de partage (caché, pour la capture) ————— */}
      <div ref={shareRef} className="fixed left-[9999px] top-0 w-100 bg-white">
        {/* Liseré tricolore */}
        <div className="h-1.5 flex">
          <div className="flex-1 bg-[#1B7A3D]" />
          <div className="flex-1 bg-[#FCD116]" />
          <div className="flex-1 bg-[#E8112D]" />
        </div>

        <div className="relative h-56 overflow-hidden bg-white">
          {carte.image && (
            <img
              src={carte.image}
              alt={carte.titre}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/10 to-black/75" />

          <span className="absolute top-4 left-4 font-mono text-xs text-white border border-white/70 rounded-sm px-2.5 py-1 -rotate-2 bg-black/25">
            {carte.periode}
          </span>

          <h3 className="absolute bottom-4 left-5 right-5 font-serif text-xl font-semibold text-white leading-tight">
            {carte.titre}
          </h3>
        </div>

        <div className="p-5 bg-white">
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            {carte.descriptionCourte}
          </p>

          {carte.acteurPrincipal && (
            <div className="flex items-center gap-2 text-sm text-gray-500 border-t border-gray-100 pt-3">
              <User className="w-4 h-4 shrink-0 text-green-500" />
              <span className="font-medium text-gray-700">
                {carte.acteurPrincipal}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50">
          <span className="font-serif text-sm font-semibold text-[#1B7A3D]">
            Bénin Tché
          </span>
          <span className="font-mono text-[10px] text-gray-400">
            66 ans d'indépendance
          </span>
        </div>
      </div>
    </>
  );
}
