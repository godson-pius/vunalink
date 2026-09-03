export type LocalAiExplanationRequest = { diseaseId: string; prediction: string; language: string };
export interface LocalAiProvider { generateExplanation(request: LocalAiExplanationRequest): Promise<string>; answerQuestion(question: string, context: string): Promise<string>; }
