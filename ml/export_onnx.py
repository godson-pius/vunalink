import argparse, json, numpy as np
if not hasattr(np, "cast"):  # tf2onnx 1.16 supports NumPy <2; requirements enforce that for fresh envs.
    class _Cast:
        def __getitem__(self, dtype): return lambda value: np.asarray(value, dtype=dtype)
    np.cast = _Cast()
import onnxruntime as ort, tf2onnx, tensorflow as tf
parser = argparse.ArgumentParser(); parser.add_argument("--saved-model", required=True); parser.add_argument("--output", required=True); args = parser.parse_args()
model = tf.keras.models.load_model(args.saved_model)
spec = (tf.TensorSpec(model.inputs[0].shape, tf.float32, name="input"),)
tf2onnx.convert.from_keras(model, input_signature=spec, output_path=args.output, opset=13)
sample_shape = [1 if dimension is None else int(dimension) for dimension in model.inputs[0].shape]
sample = np.random.default_rng(42).random(sample_shape, dtype=np.float32)
keras_output = model(sample, training=False).numpy()
onnx_session = ort.InferenceSession(args.output, providers=["CPUExecutionProvider"])
onnx_output = onnx_session.run(None, {onnx_session.get_inputs()[0].name: sample})[0]
max_difference = float(np.max(np.abs(keras_output - onnx_output)))
if max_difference > 1e-4: raise SystemExit(f"ONNX parity check failed; maximum output difference was {max_difference}.")
metadata_path = args.output.rsplit(".", 1)[0] + ".onnx.metadata.json"
metadata = {"format": "onnx", "onnx_version": "opset-13", "input": {"shape": list(model.inputs[0].shape), "dtype": "float32"}, "output": {"shape": list(model.outputs[0].shape), "dtype": "float32"}, "preprocessing": "MobileNetV2 preprocess_input: (pixel / 127.5) - 1", "source_model": args.saved_model, "verification": {"method": "fixed random tensor compared with Keras model", "max_absolute_difference": max_difference, "passed": True}}
open(metadata_path, "w").write(json.dumps(metadata, indent=2) + "\n")
print(f"Exported ONNX model to {args.output} and metadata to {metadata_path}.")
