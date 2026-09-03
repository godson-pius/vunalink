export type DiagnosisRecord = {
  id: string;
  createdAt: string;
  crop: string;
  disease: string;
  diseaseId: string;
  confidence: number;
  modelVersion: string;
  thumbnail?: Blob;
};
