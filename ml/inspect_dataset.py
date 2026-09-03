"""Inspect an exported PlantVillage class-folder dataset without changing it."""
import argparse, json
from pathlib import Path
from PIL import Image

parser = argparse.ArgumentParser(); parser.add_argument("--source-dir", required=True); parser.add_argument("--output", default="ml/data/dataset_inventory.json"); args = parser.parse_args()
root = Path(args.source_dir); inventory = []
for class_dir in sorted(path for path in root.iterdir() if path.is_dir()):
    files = [path for path in class_dir.iterdir() if path.suffix.lower() in {".jpg", ".jpeg", ".png"}]
    valid = 0
    for path in files:
        try:
            with Image.open(path) as image: image.verify()
            valid += 1
        except Exception: pass
    crop, _, disease = class_dir.name.partition("___")
    inventory.append({"dataset_label": class_dir.name, "crop": crop, "disease": disease or "healthy/unspecified", "image_count": valid})
result = {"dataset": "PlantVillage", "class_count": len(inventory), "classes": inventory, "note": "Counts reflect this local dataset copy."}
Path(args.output).parent.mkdir(parents=True, exist_ok=True); Path(args.output).write_text(json.dumps(result, indent=2) + "\n"); print(json.dumps(result, indent=2))
