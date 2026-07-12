import { Button } from "@/components/ui/button";
import cartesData from "@/data/cartes.json";
import type { CarteType } from "@/types";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Carte } from "./Carte";

// Extrait une année de référence pour positionner la carte sur la ligne
// chronologique. Utilise `anchorYear` si présent dans le JSON, sinon prend
// la première année à 4 chiffres trouvée dans le champ `periode`.
function getAnchorYear(carte: CarteType): number {
  if (carte.anchorYear) return carte.anchorYear;
  const match = carte.periode.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

// Calcule la position (en %) de chaque carte sur la frise, proportionnelle
// aux années réelles plutôt qu'espacée uniformément — l'écart visuel entre
// deux points reflète l'écart réel entre deux périodes.
function computeRailPositions(cartes: CarteType[]): number[] {
  const years = cartes.map(getAnchorYear);
  const min = Math.min(...years);
  const max = Math.max(...years);
  const span = max - min || 1;
  const positions = years.map((y) => ((y - min) / span) * 100);
  // Garantit un écart minimum lisible entre deux points consécutifs
  for (let i = 1; i < positions.length; i++) {
    if (positions[i] - positions[i - 1] < 8)
      positions[i] = positions[i - 1] + 8;
  }
  const scale = 100 / (positions[positions.length - 1] || 100);
  return positions.map((p) => p * scale * 0.94 + 3);
}

export function Frise() {
  const [cartes, setCartes] = useState<CarteType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartes(cartesData);
  }, []);

  const totalCartes = cartes.length;
  const railPositions = useMemo(() => computeRailPositions(cartes), [cartes]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalCartes - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalCartes - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // Auto-play (désactivé si l'utilisateur préfère moins d'animation)
  useEffect(() => {
    if (!isAutoPlay || prefersReducedMotion || totalCartes === 0) return;
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoPlay, currentIndex, totalCartes, prefersReducedMotion]);

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, totalCartes]);

  // Support tactile (swipe)
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      diff > 0 ? goToNext() : goToPrevious();
    }
  };

  if (totalCartes === 0) {
    return (
      <section className="py-16 md:py-24 px-4 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">Chargement de la frise...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="frise"
      className="py-16 md:py-24 px-4 bg-linear-to-b from-white to-gray-50"
    >
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <span className="block font-mono text-xs tracking-widest uppercase text-green-500 mb-2">
            Voyage à travers le temps
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            L'histoire du <span className="text-green-500">Bénin</span>
          </h2>
        </div>

        {/* Carte unique + navigation */}
        <div className="relative rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(16,36,26,0.06),0_12px_32px_rgba(16,36,26,0.10)] bg-white">
          <Button
            onClick={() => {
              goToPrevious();
            }}
            size="icon"
            variant="outline"
            aria-label="Période précédente"
            className="absolute left-3 top-32.5 md:top-37.5 -translate-y-1/2 bg-white/85 backdrop-blur-sm border-white/40 hover:bg-white shadow-md z-20 rounded-full w-9 h-9"
          >
            <ChevronLeft className="w-5 h-5 text-green-500" />
          </Button>
          <Button
            onClick={() => {
              goToNext();
            }}
            size="icon"
            variant="outline"
            aria-label="Période suivante"
            className="absolute right-3 top-32.5 md:top-37.5 -translate-y-1/2 bg-white/85 backdrop-blur-sm border-white/40 hover:bg-white shadow-md z-20 rounded-full w-9 h-9"
          >
            <ChevronRight className="w-5 h-5 text-green-500" />
          </Button>

          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex transition-transform duration-600 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cartes.map((carte, index) => (
                <div key={carte.id} className="shrink-0 w-full">
                  <Carte
                    carte={carte}
                    isActive={index === currentIndex}
                    index={index}
                    total={totalCartes}
                    reduceMotion={prefersReducedMotion}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ligne chronologique — positions proportionnelles aux années réelles */}
        <div className="flex items-center gap-4 mt-6 px-1">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            aria-label={
              isAutoPlay
                ? "Mettre en pause"
                : "Reprendre la lecture automatique"
            }
            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-green-500 hover:bg-gray-50 shrink-0"
          >
            {isAutoPlay ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>

          <div className="relative flex-1 h-7">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200" />
            {cartes.map((carte, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={carte.id}
                  onClick={() => goToIndex(index)}
                  aria-label={`Aller à : ${carte.titre}`}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${railPositions[index]}%` }}
                >
                  {isActive && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-red-500 whitespace-nowrap">
                      {getAnchorYear(carte)}
                    </span>
                  )}
                  <span
                    className={`block rounded-full border-2 border-white transition-all ${
                      isActive
                        ? "w-3 h-3 bg-red-500"
                        : "w-2 h-2 bg-gray-300 group-hover:bg-gray-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <span className="font-mono text-xs text-gray-400 shrink-0">
            {String(currentIndex + 1).padStart(2, "0")} / {totalCartes}
          </span>
        </div>

        <p className="text-xs text-gray-400 mt-3 px-1">
          Glissez, utilisez les flèches, ou touchez un point de la ligne
          chronologique.
        </p>
      </div>
    </section>
  );
}
