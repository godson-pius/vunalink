export type DiseaseLabel = { diseaseId: string; crop: string; disease: string };
// Populated when the trained model's exported class order is available.
export const MODEL_LABELS: readonly DiseaseLabel[] = [];
export function getLabel(classId: number): DiseaseLabel | undefined { return MODEL_LABELS[classId]; }
