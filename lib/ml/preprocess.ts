export type PreprocessingOptions = { width: number; height: number; mean: readonly number[]; standardDeviation: readonly number[]; channelOrder?: "rgb" | "bgr" };
export type PreprocessedImage = { data: Float32Array; width: number; height: number; channels: 3 };
export function imageDataToTensorData(image: ImageData, options: PreprocessingOptions): PreprocessedImage {
  if (options.width !== image.width || options.height !== image.height) throw new Error("Image dimensions do not match the model input.");
  if (options.mean.length !== 3 || options.standardDeviation.length !== 3) throw new Error("Model normalization must define three channels.");
  const data = new Float32Array(3 * image.width * image.height); const channels = options.channelOrder === "bgr" ? [2, 1, 0] : [0, 1, 2];
  for (let pixel = 0; pixel < image.width * image.height; pixel += 1) for (let channel = 0; channel < 3; channel += 1) data[channel * image.width * image.height + pixel] = (image.data[pixel * 4 + channels[channel]] / 255 - options.mean[channel]) / options.standardDeviation[channel];
  return { data, width: image.width, height: image.height, channels: 3 };
}
