import type { ScorePayloadType } from "@/types";

// URL de ton Apps Script (à remplacer par ta vraie URL)
const SHEET_ENDPOINT = import.meta.env.VITE_SHEET_ENDPOINT;

export async function submitScore(
  data: ScorePayloadType,
): Promise<{ success: boolean; message?: string }> {
  console.log("📤 Envoi des données vers Google Sheet:", data);

  if (!SHEET_ENDPOINT) {
    console.warn(
      "⚠️ VITE_SHEET_ENDPOINT non défini, la soumission est désactivée",
    );
    return { success: false, message: "Endpoint non configuré" };
  }

  try {
    // Transformer les données pour le Sheet
    const payload = {
      nom: data.nom,
      telephone: data.telephone || "",
      score: data.score,
      total: data.total,
      reponses: data.reponses.map((r) => r.reponseChoisie), // juste les indices
    };

    console.log("📦 Payload envoyé:", payload);

    const response = await fetch(SHEET_ENDPOINT, {
      method: "POST",
      mode: "no-cors", // Important pour contourner les CORS avec Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📬 Réponse reçue:", response);

    // Avec no-cors, on ne peut pas lire la réponse
    // On considère que c'est un succès si la requête est envoyée
    return { success: true, message: "Score envoyé" };
  } catch (error) {
    console.error("❌ Erreur lors de la soumission du score:", error);
    return { success: false, message: "Erreur de soumission" };
  }
}
