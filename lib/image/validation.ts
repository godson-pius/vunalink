export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const MAX_IMAGE_FILE_SIZE = 10 * 1024 * 1024;

export function validateImageFile(file?: Pick<File, "type" | "size">): string | null {
  if (!file) return "No image selected. Choose a crop photo to continue.";
  if (!(ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type)) return "Choose a JPG, PNG, or WebP image.";
  if (file.size > MAX_IMAGE_FILE_SIZE) return "That image is too large. Choose one smaller than 10 MB.";
  return null;
}
