import { Button } from "@/components/ui/button";
import { ChevronDown, Clock, Trophy } from "lucide-react";

interface HeroProps {
  onScrollToFrise: () => void;
  onScrollToQuiz: () => void;
}

export function Hero({ onScrollToFrise, onScrollToQuiz }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Fond avec dégradé patriotique */}
      <div className="absolute inset-0 bg-linear-to-br from-green-500/5 via-yellow-500/10 to-benin-red/5" />

      {/* Décoration : bandes du drapeau */}
      <div className="absolute top-0 left-0 w-full h-2 flex">
        <div className="w-1/3 h-full bg-green-500" />
        <div className="w-1/3 h-full bg-yellow-500" />
        <div className="w-1/3 h-full bg-red-500" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge année */}
        <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full mb-6">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">1960 – 2026</span>
        </div>

        {/* Titre principal */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
          <span className="text-green-500">Bénin</span>
          <span className="text-yellow-500"> Tché</span>
        </h1>
        <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-700 mb-2">
          66 ans d'indépendance
        </p>

        {/* Sous-titre */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Redécouvrez l'histoire du Bénin, des royaumes précoloniaux à nos
          jours. Testez vos connaissances et célébrez 66 ans de fierté
          nationale.
        </p>

        {/* Boutons CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onScrollToFrise}
            size="lg"
            className="bg-green-500 hover:bg-benin-green/90 text-white group"
          >
            Découvrir l'histoire
            <ChevronDown className="ml-2 w-4 h-4 group-hover:animate-bounce" />
          </Button>
          <Button
            onClick={onScrollToQuiz}
            size="lg"
            variant="outline"
            className="border-yellow-500 text-green-500 hover:bg-yellow-500/10"
          >
            <Trophy className="mr-2 w-4 h-4" />
            Tester mes connaissances
          </Button>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
}
