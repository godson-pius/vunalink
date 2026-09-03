import * as ort from "onnxruntime-web";
import type { ModelStatus } from "./types";
export const MODEL_PATH = "/models/vunalink-mobilenet-v2.onnx";
let sessionPromise: Promise<ort.InferenceSession> | null = null; let status: ModelStatus = "unavailable";
export function getModelStatus(): ModelStatus { return status; }
export function loadModel(): Promise<ort.InferenceSession> { if (!sessionPromise) { status = "loading"; sessionPromise = ort.InferenceSession.create(MODEL_PATH, { executionProviders: ["wasm"] }).then((session) => { status = "ready"; return session; }).catch((error) => { status = "error"; sessionPromise = null; throw error; }); } return sessionPromise; }
