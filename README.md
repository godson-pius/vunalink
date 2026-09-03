This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Local ML architecture

VunaLink is prepared for local browser inference using:

```text
MobileNetV2 → ONNX → ONNX Runtime Web → WebAssembly/CPU → local inference
```

The ONNX Runtime Web dependency is installed, and the model loader expects the trained model at:

```text
public/models/vunalink-mobilenet-v2.onnx
```

That real trained model is not included yet. Until it is supplied, model labels, input dimensions, normalization values, accuracy, and confidence thresholds remain intentionally undefined. The Scan screen therefore does not produce predictions.

Preprocessing, model loading, inference, postprocessing, and labels are separated under `lib/ml/`. Recommendations have a separate interface under `lib/recommendations/`, and local LLM integration is intentionally deferred. Any future LLM must remain an optional explanation layer after classification, not the disease detector.

For complete offline inference, the PWA will also need the tested ONNX model and ONNX Runtime Web/WASM assets cached locally. This has not been claimed or validated until the real model is integrated and tested with networking disabled.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
