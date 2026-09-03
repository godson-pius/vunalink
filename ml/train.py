"""Train MobileNetV2 transfer learning model and record reproducibility metadata."""
import argparse, json, os, random
from pathlib import Path
import numpy as np
import tensorflow as tf
from evaluate import evaluate_model

parser = argparse.ArgumentParser(); parser.add_argument("--data-dir", required=True); parser.add_argument("--output-dir", required=True); parser.add_argument("--config", default="ml/class_config.json"); args = parser.parse_args()
config = json.loads(Path(args.config).read_text()); model_config = config["model"]; seed = config["split"]["seed"]
random.seed(seed); np.random.seed(seed); tf.random.set_seed(seed)
size = (model_config["input_height"], model_config["input_width"]); common = {"image_size": size, "batch_size": model_config["batch_size"], "label_mode": "int", "seed": seed}
train = tf.keras.utils.image_dataset_from_directory(os.path.join(args.data_dir, "train"), shuffle=True, **common)
valid = tf.keras.utils.image_dataset_from_directory(os.path.join(args.data_dir, "validation"), shuffle=False, **common)
test = tf.keras.utils.image_dataset_from_directory(os.path.join(args.data_dir, "test"), shuffle=False, **common)
class_names = train.class_names; num_classes = len(class_names)
augment = tf.keras.Sequential([tf.keras.layers.RandomFlip("horizontal"), tf.keras.layers.RandomRotation(0.05)], name="augmentation")
base = tf.keras.applications.MobileNetV2(input_shape=(*size, 3), include_top=False, weights="imagenet"); base.trainable = False
inputs = tf.keras.Input(shape=(*size, 3)); x = augment(inputs); x = tf.keras.applications.mobilenet_v2.preprocess_input(x); x = base(x, training=False); x = tf.keras.layers.GlobalAveragePooling2D()(x); outputs = tf.keras.layers.Dense(num_classes, activation="softmax")(x); model = tf.keras.Model(inputs, outputs)
model.compile(optimizer=tf.keras.optimizers.Adam(model_config["learning_rate"]), loss="sparse_categorical_crossentropy", metrics=["accuracy"])
model.fit(train, validation_data=valid, epochs=model_config["epochs"])
output = Path(args.output_dir); output.mkdir(parents=True, exist_ok=True); model.save(output / "model.keras"); model.export(output / "saved_model")
(output / "class_mapping.json").write_text(json.dumps({"classes": [{"class_id": i, "dataset_label": label} for i, label in enumerate(class_names)]}, indent=2) + "\n")
(output / "evaluation.json").unlink(missing_ok=True); evaluate_model(model, args.data_dir, size, model_config["batch_size"], output / "evaluation.json")
(output / "model_metadata.json").write_text(json.dumps({"name": "VunaLink MobileNetV2", "version": "0.1.0", "format": "saved_model", "input": {"width": size[1], "height": size[0], "channels": 3}, "preprocessing": "tf.keras.applications.mobilenet_v2.preprocess_input", "classes": class_names, "training": config["model"], "dataset": "PlantVillage"}, indent=2) + "\n")
