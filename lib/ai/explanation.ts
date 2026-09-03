import type { Recommendation } from "@/lib/recommendations/types";
import type { LocalAiProvider } from "./types";

export type ExplanationResult = { text: string; source: "knowledge-base" | "local-ai" };

export async function explainGuidance(guidance: Recommendation, provider?: LocalAiProvider): Promise<ExplanationResult> {
  if (provider) {
    try {
      const text = await provider.generateExplanation({ diseaseId: guidance.diseaseId, prediction: guidance.explanation, language: "rw" });
      return { text, source: "local-ai" };
    } catch { /* Verified guidance remains the safe fallback. */ }
  }
  return { text: guidance.explanation, source: "knowledge-base" };
}
