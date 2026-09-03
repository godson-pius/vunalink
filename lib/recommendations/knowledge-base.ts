import type { Recommendation } from "./types";
const recommendations: Readonly<Record<string, Recommendation>> = {};
export function getRecommendation(diseaseId: string): Recommendation | undefined { return recommendations[diseaseId]; }
