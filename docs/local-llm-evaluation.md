# Optional local LLM evaluation

## Decision

No local LLM is selected or bundled yet. VunaLink disease classification and
verified agricultural guidance work without one. A local LLM may later rewrite
that verified guidance into a more conversational explanation, but it must
never diagnose an image or add unsupported treatment advice.

## Candidate comparison

| Concern | WebLLM | Transformers.js |
|---|---|---|
| Browser execution | WebGPU required for local inference | WASM/CPU by default; WebGPU is optional |
| Android | Depends on supported Chrome/WebGPU and device GPU | Broader fallback through WASM; performance still needs device testing |
| Model format | MLC-compiled model artifacts | ONNX model artifacts |
| Offline operation | Possible after model assets are cached locally (OPFS) | Possible after model/tokenizer/WASM assets are cached locally |
| Integration | Additional runtime and worker/model setup | Familiar ONNX Runtime Web ecosystem, but adds a dependency |
| Kinyarwanda quality | Not established for any candidate model | Not established for any candidate model |
| Size/RAM/startup | Model-specific; must be measured | Model-specific; quantized models are advised for constrained devices |

WebLLM is not suitable as VunaLink's baseline because WebGPU cannot be
mandatory for the target farmer-device range. Transformers.js is the more
promising candidate to benchmark later because it has a WASM fallback, but no
model has been selected until Kinyarwanda quality, size, RAM, startup time,
and Android performance are measured on target devices.

Sources: [WebLLM local inference](https://webllm.io/docs/guides/local-inference/),
[WebLLM FAQ](https://webllm.io/docs/faq/), and
[Transformers.js documentation](https://huggingface.co/docs/transformers.js/en/index).

## Required future benchmark

Test an explicitly licensed, small quantized candidate on representative
Android phones and record model size, quantization, context length, peak RAM,
first-load time, warm inference speed, offline reload behavior, and
Kinyarwanda explanation quality. Do not use remote model URLs in the shipped
PWA.
