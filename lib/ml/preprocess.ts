export type PreprocessingOptions = { width: number; height: number; mean: readonly number[]; standardDeviation: readonly number[]; channelOrder?: "rgb" | "bgr" };
export type PreprocessedImage = { data: Float32Array; width: number; height: number; channels: 3 };

export async function imageToModelInput(file: Blob, options: Pick<PreprocessingOptions, "width" | "height">): Promise<PreprocessedImage> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas"); canvas.width = options.width; canvas.height = options.height;
  const context = canvas.getContext("2d"); if (!context) { bitmap.close(); throw new Error("Canvas unavailable"); }
  context.drawImage(bitmap, 0, 0, options.width, options.height); bitmap.close();
  const pixels = context.getImageData(0, 0, options.width, options.height).data;
  const data = new Float32Array(options.width * options.height * 3);
  for (let i = 0; i < options.width * options.height; i += 1) { data[i * 3] = pixels[i * 4]; data[i * 3 + 1] = pixels[i * 4 + 1]; data[i * 3 + 2] = pixels[i * 4 + 2]; }
  canvas.width = 1; canvas.height = 1;
  return { data, width: options.width, height: options.height, channels: 3 };
}
export function imageDataToTensorData(image: ImageData, options: PreprocessingOptions): PreprocessedImage {
  if (options.width !== image.width || options.height !== image.height) throw new Error("Image dimensions do not match the model input.");
  if (options.mean.length !== 3 || options.standardDeviation.length !== 3) throw new Error("Model normalization must define three channels.");
  const data = new Float32Array(3 * image.width * image.height); const channels = options.channelOrder === "bgr" ? [2, 1, 0] : [0, 1, 2];
  for (let pixel = 0; pixel < image.width * image.height; pixel += 1) for (let channel = 0; channel < 3; channel += 1) data[channel * image.width * image.height + pixel] = (image.data[pixel * 4 + channels[channel]] / 255 - options.mean[channel]) / options.standardDeviation[channel];
  return { data, width: image.width, height: image.height, channels: 3 };
}
