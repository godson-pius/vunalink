import argparse, tf2onnx, tensorflow as tf
parser = argparse.ArgumentParser(); parser.add_argument("--saved-model", required=True); parser.add_argument("--output", required=True); args = parser.parse_args()
model = tf.keras.models.load_model(args.saved_model)
tf2onnx.convert.from_keras(model, output_path=args.output, opset=13)
print(f"Exported ONNX model to {args.output}; review metadata before using it in the PWA.")
