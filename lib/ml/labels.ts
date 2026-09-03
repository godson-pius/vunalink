export type DiseaseLabel = { diseaseId: string; crop: string; disease: string };
// Populated when the trained model's exported class order is available.
export const MODEL_LABELS: readonly DiseaseLabel[] = [
  { diseaseId: "potato_early_blight", crop: "Potato", disease: "Early blight" },
  { diseaseId: "potato_late_blight", crop: "Potato", disease: "Late blight" },
  { diseaseId: "potato_healthy", crop: "Potato", disease: "Healthy" },
  { diseaseId: "tomato_early_blight", crop: "Tomato", disease: "Early blight" },
  { diseaseId: "tomato_late_blight", crop: "Tomato", disease: "Late blight" },
  { diseaseId: "tomato_healthy", crop: "Tomato", disease: "Healthy" },
];
export function getLabel(classId: number): DiseaseLabel | undefined { return MODEL_LABELS[classId]; }
