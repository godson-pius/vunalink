import "fake-indexeddb/auto";
import { describe, expect, it } from "vitest";
import { getDiseaseInfoRw } from "@/lib/localization/disease-info";
import { postprocess } from "@/lib/ml/postprocess";
import { getRecommendation } from "@/lib/recommendations/knowledge-base";
import { clearDiagnoses, getDiagnoses, saveDiagnosis } from "@/lib/history/storage";
import { validateImageFile } from "@/lib/image/validation";

const metadata = { name: "test", version: "0.1.0", format: "onnx" as const };

describe("critical offline behavior", () => {
  it("validates image selection, type, and size", () => {
    expect(validateImageFile()).toContain("No image");
    expect(validateImageFile({ type: "image/gif", size: 10 })).toContain("JPG");
    expect(validateImageFile({ type: "image/jpeg", size: 11 * 1024 * 1024 })).toContain("too large");
    expect(validateImageFile({ type: "image/jpeg", size: 100 })).toBeNull();
  });

  it("maps the highest model output index to the correct disease", () => {
    const result = postprocess([0.01, 0.02, 0.03, 0.8, 0.1, 0.04], metadata);
    expect(result).toMatchObject({ status: "prediction", prediction: { classId: 3, diseaseId: "tomato_early_blight", crop: "Tomato" } });
  });

  it("returns safe Kinyarwanda fallback content", () => {
    expect(getDiseaseInfoRw("potato_late_blight").name).toContain("Late blight");
    expect(getDiseaseInfoRw("unknown").warning).toBeTruthy();
  });

  it("finds verified local recommendations", () => {
    expect(getRecommendation("tomato_early_blight")?.actions.length).toBeGreaterThan(0);
    expect(getRecommendation("unknown")).toBeUndefined();
  });

  it("persists and clears diagnosis history locally", async () => {
    await clearDiagnoses();
    await saveDiagnosis({ id: "test-1", createdAt: "2026-01-01T00:00:00.000Z", crop: "Potato", disease: "Early blight", diseaseId: "potato_early_blight", confidence: 0.9, modelVersion: "0.1.0" });
    expect((await getDiagnoses()).map((record) => record.id)).toEqual(["test-1"]);
    await clearDiagnoses();
    expect(await getDiagnoses()).toEqual([]);
  });
});
