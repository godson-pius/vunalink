import { getLabel } from "./labels";
import type { InferenceResult, ModelMetadata } from "./types";
export function postprocess(output: readonly number[], metadata: ModelMetadata): InferenceResult {
  if (!output.length || output.some((value) => !Number.isFinite(value))) return { status: "error", message: "The model returned an invalid result." };
  const classId = output.indexOf(Math.max(...output)); const label = getLabel(classId);
  if (!label) return { status: "unsupported-class", classId };
  return { status: "prediction", prediction: { classId, diseaseId: label.diseaseId, disease: label.disease, crop: label.crop, confidence: output[classId], modelVersion: metadata.version } };
}
