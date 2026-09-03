"""Create a deterministic, hash-grouped split from class-folder image data."""
import argparse, hashlib, json, shutil
from pathlib import Path
from PIL import Image
from sklearn.model_selection import train_test_split

parser = argparse.ArgumentParser(); parser.add_argument("--source-dir", required=True); parser.add_argument("--output-dir", required=True); parser.add_argument("--config", default="ml/class_config.json"); args = parser.parse_args()
source, output, config = Path(args.source_dir), Path(args.output_dir), json.loads(Path(args.config).read_text())
classes = config["candidate_classes"]; seed = config["split"]["seed"]
records = []
for class_id, label in enumerate(classes):
    class_dir = source / label
    if not class_dir.exists(): print(f"Skipping missing candidate class: {label}"); continue
    for path in sorted(class_dir.iterdir()):
        if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}: continue
        try:
            with Image.open(path) as image: image.verify()
            digest = hashlib.sha256(path.read_bytes()).hexdigest()
        except Exception: continue
        records.append({"path": path, "label": label, "class_id": class_id, "group": digest})
if not records: raise SystemExit("No valid candidate images found. Check the TFDS export/source directory and class_config.json.")
groups = sorted({record["group"] for record in records})
train_groups, held_groups = train_test_split(groups, test_size=config["split"]["validation"] + config["split"]["test"], random_state=seed)
test_ratio = config["split"]["test"] / (config["split"]["validation"] + config["split"]["test"])
valid_groups, test_groups = train_test_split(held_groups, test_size=test_ratio, random_state=seed)
split_groups = {"train": set(train_groups), "validation": set(valid_groups), "test": set(test_groups)}
for split, selected in split_groups.items():
    for record in records:
        if record["group"] in selected:
            destination = output / split / record["label"] / record["path"].name
            destination.parent.mkdir(parents=True, exist_ok=True); shutil.copy2(record["path"], destination)
selected_labels = sorted({record["label"] for record in records})
(output / "class_mapping.json").write_text(json.dumps({"classes": [{"class_id": i, "dataset_label": label, "disease_id": label.lower().replace("___", "_").replace("(", "").replace(")", "").replace(" ", "_")} for i, label in enumerate(selected_labels)]}, indent=2) + "\n")
print(json.dumps({split: sum(record["group"] in selected for record in records) for split, selected in split_groups.items()}, indent=2))
