import * as ort from "onnxruntime-web";
import type { ModelStatus } from "./types";
ort.env.wasm.wasmPaths = "/onnxruntime/";
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
export const MODEL_PATH = "/models/vunalink-mobilenet-v2.onnx";
export const MODEL_METADATA = { name: "VunaLink MobileNetV2", version: "0.1.0", format: "onnx" as const, input: { width: 224, height: 224, channels: 3 }, trainingDataset: "PlantVillage" };
let sessionPromise: Promise<ort.InferenceSession> | null = null; let status: ModelStatus = "unavailable";
export function getModelStatus(): ModelStatus { return status; }
export function loadModel(): Promise<ort.InferenceSession> { if (!sessionPromise) { status = "loading"; sessionPromise = ort.InferenceSession.create(MODEL_PATH, { executionProviders: ["wasm"] }).then((session) => { status = "ready"; return session; }).catch((error) => { status = "error"; sessionPromise = null; throw error; }); } return sessionPromise; }
