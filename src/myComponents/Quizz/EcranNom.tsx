import { Button } from "@/components/ui/button";
import { Award, ChevronRight, Phone, User } from "lucide-react";
import { useState } from "react";

interface EcranNomProps {
  onDemarrer: (nom: string, telephone: string) => void;
}

export function EcranNom({ onDemarrer }: EcranNomProps) {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [erreur, setErreur] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) {
      setErreur("Veuillez indiquer votre nom pour participer");
      return;
    }
    setErreur("");
    onDemarrer(nom.trim(), telephone.trim());
  };

  return (
    <div className="bg-[#FBFBF8]">
      {/* Liseré tricolore — cohérent avec la carte de résultat */}
      <div className="h-1.5 flex">
        <div className="flex-1 bg-green-500" />
        <div className="flex-1 bg-yellow-500" />
        <div className="flex-1 bg-red-500" />
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        <div className="text-center mb-8">
          <span className="block font-mono text-[11px] tracking-wider uppercase text-gray-400 mb-4">
            Quiz · 66 ans d'indépendance
          </span>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-green-500/70 -rotate-3 text-green-500 mb-4">
            <Award className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-gray-900">
            Prêt à tester tes connaissances ?
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            10 questions sur l'histoire du Bénin
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="nom"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Nom complet <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex : Fifamè Adjovi"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
                required
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5">
              Ce nom sera utilisé pour vous identifier en cas de gain.
            </p>
          </div>

          <div>
            <label
              htmlFor="telephone"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Téléphone / WhatsApp
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="telephone"
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="+229 XX XX XX XX"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5">
              Optionnel — uniquement pour vous contacter en cas de gain.
            </p>
          </div>

          {erreur && (
            <p className="text-sm text-red-500 bg-red-500/5 rounded-lg px-3 py-2">
              {erreur}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-500/90 text-white group"
            size="lg"
          >
            Commencer le quiz
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-[10px] text-center text-gray-400 mt-2">
            Vos informations sont confidentielles et ne seront pas partagées.
          </p>
        </div>
      </form>
    </div>
  );
}
