"""Copy deterministic held-out test images and record predictions from the trained model."""
import argparse, json, shutil
from pathlib import Path
import numpy as np
import tensorflow as tf

parser = argparse.ArgumentParser(); parser.add_argument("--model", required=True); parser.add_argument("--test-dir", required=True); parser.add_argument("--output-dir", required=True); parser.add_argument("--width", type=int, required=True); parser.add_argument("--height", type=int, required=True); parser.add_argument("--seed", type=int, default=42); args = parser.parse_args()
root, output = Path(args.test_dir), Path(args.output_dir); rng = np.random.default_rng(args.seed); output.mkdir(parents=True, exist_ok=True)
model = tf.keras.models.load_model(args.model); rows = []
for class_id, class_dir in enumerate(sorted(path for path in root.iterdir() if path.is_dir())):
    files = sorted(path for path in class_dir.iterdir() if path.suffix.lower() in {".jpg", ".jpeg", ".png"})
    if not files: continue
    path = files[int(rng.integers(len(files)))]; image = tf.keras.utils.load_img(path, target_size=(args.height, args.width)); array = tf.keras.utils.img_to_array(image); scores = model.predict(np.expand_dims(array, 0), verbose=0)[0]; predicted_id = int(np.argmax(scores)); target = output / f"reference_{len(rows):03d}{path.suffix.lower()}"; shutil.copy2(path, target)
    rows.append({"image": target.name, "source_class": class_dir.name, "expectedClass": class_dir.name, "expectedClassId": class_id, "referencePredictionClassId": predicted_id, "referenceScores": [float(score) for score in scores]})
(output / "references.json").write_text(json.dumps({"model": str(args.model), "seed": args.seed, "images": rows, "note": "Generated from the trained model; not a substitute for field validation."}, indent=2) + "\n")
