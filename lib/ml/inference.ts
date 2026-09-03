import * as ort from "onnxruntime-web";
import { loadModel } from "./model";
import { postprocess } from "./postprocess";
import type { InferenceResult, ModelMetadata } from "./types";
export async function runInference(input: Float32Array, metadata: ModelMetadata): Promise<InferenceResult> { try { const session = await loadModel(); const shape = metadata.input; if (!shape) return { status: "error", message: "Model input metadata is not available." }; const tensor = new ort.Tensor("float32", input, [1, shape.channels, shape.height, shape.width]); const output = await session.run({ [session.inputNames[0]]: tensor }); return postprocess(Array.from(output[session.outputNames[0]].data as Float32Array), metadata); } catch { return { status: "error", message: "The crop could not be analyzed on this device." }; } }
