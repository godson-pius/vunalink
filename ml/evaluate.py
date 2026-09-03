"""Evaluate a trained Keras classifier without inventing a confidence threshold."""
import argparse, json, os
from pathlib import Path
import numpy as np
import tensorflow as tf
from sklearn.metrics import accuracy_score, confusion_matrix, precision_recall_fscore_support

def evaluate_model(model, data_dir, image_size, batch_size, output_path=None):
    dataset = tf.keras.utils.image_dataset_from_directory(os.path.join(data_dir, "test"), image_size=image_size, batch_size=batch_size, label_mode="int", shuffle=False)
    labels = np.concatenate([y.numpy() for _, y in dataset])
    probabilities = model.predict(dataset, verbose=0)
    predictions = np.argmax(probabilities, axis=1)
    names = dataset.class_names
    precision, recall, f1, support = precision_recall_fscore_support(labels, predictions, labels=range(len(names)), zero_division=0)
    result = {"dataset": "PlantVillage", "metrics": {"accuracy": float(accuracy_score(labels, predictions)), "precision_macro": float(precision.mean()), "recall_macro": float(recall.mean()), "f1_macro": float(f1.mean())}, "per_class": [{"class_id": i, "label": name, "precision": float(precision[i]), "recall": float(recall[i]), "f1": float(f1[i]), "support": int(support[i])} for i, name in enumerate(names)], "confusion_matrix": confusion_matrix(labels, predictions, labels=range(len(names))).tolist(), "poorest_by_f1": [names[i] for i in np.argsort(f1).tolist()], "note": "PlantVillage test metrics are not representative of real-world Rwanda field accuracy."}
    if output_path: Path(output_path).write_text(json.dumps(result, indent=2) + "\n")
    return result

if __name__ == "__main__":
    parser = argparse.ArgumentParser(); parser.add_argument("--model", required=True); parser.add_argument("--data-dir", required=True); parser.add_argument("--output", required=True); parser.add_argument("--width", type=int, required=True); parser.add_argument("--height", type=int, required=True); parser.add_argument("--batch-size", type=int, default=32); args = parser.parse_args()
    evaluate_model(tf.keras.models.load_model(args.model), args.data_dir, (args.height, args.width), args.batch_size, args.output)
