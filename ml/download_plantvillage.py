"""Download PlantVillage through TensorFlow Datasets and export class folders."""
import argparse
from pathlib import Path
from PIL import Image
import tensorflow_datasets as tfds

parser = argparse.ArgumentParser()
parser.add_argument("--data-dir", default="ml/data/tfds")
parser.add_argument("--output-dir", default="ml/data/plant_village")
args = parser.parse_args()
dataset, info = tfds.load("plant_village", data_dir=args.data_dir, download=True, split="train", as_supervised=True, with_info=True)
output = Path(args.output_dir)
for index, (image, label) in enumerate(tfds.as_numpy(dataset)):
    class_name = info.features["label"].int2str(int(label))
    destination = output / class_name / f"{index:06d}.jpg"
    destination.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(image).save(destination, format="JPEG", quality=95)
print(f"Exported {index + 1} images to {output}.")
