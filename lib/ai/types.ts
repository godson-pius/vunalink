export type LocalAiExplanationRequest = { diseaseId: string; prediction: string; language: "rw" | "en" };
export interface LocalAiProvider { generateExplanation(request: LocalAiExplanationRequest): Promise<string>; answerQuestion(question: string, context: string): Promise<string>; }
