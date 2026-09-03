# VunaLink model training

This directory contains the reproducible training pipeline for a lightweight
MobileNetV2 classifier. It is intentionally separate from the Next.js app.

## Current status

There is no trained VunaLink model or evaluation result in this repository.
The pipeline uses the legitimate TensorFlow Datasets `plant_village` source;
run `download_plantvillage.py` to obtain it. The configured classes are
candidate classes only and must be reviewed against Rwanda field data before
being treated as a final product scope.

PlantVillage is mostly curated/controlled imagery. Its metrics must not be
reported as accuracy on real Rwandan farm images. Field validation is required.

## Reproduce

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python ml/download_plantvillage.py --data-dir ml/data/tfds --output-dir ml/data/plant_village
python ml/prepare_dataset.py --source-dir ml/data/plant_village --output-dir ml/data/split
python ml/train.py --data-dir ml/data/split --output-dir ml/artifacts
```

The exact class list is in `class_config.json`. Edit it before preparing data.
The scripts write `class_mapping.json`, `model_metadata.json`,
`evaluation.json`, and a SavedModel/checkpoint. ONNX export is optional and
requires `tf2onnx`:

```bash
python ml/export_onnx.py --saved-model ml/artifacts/saved_model --output ml/artifacts/vunalink-mobilenet-v2.onnx
```

The exported model must be copied to `public/models/` only after its input
shape, preprocessing, labels, and evaluation have been reviewed. The PWA does
not consume this training output automatically.
