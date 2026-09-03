import type { LocalAiProvider } from "./types";
export const localAi: LocalAiProvider = { async generateExplanation() { throw new Error("Local AI is not configured."); }, async answerQuestion() { throw new Error("Local AI is not configured."); } };
