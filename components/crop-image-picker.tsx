"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon, Camera01Icon, Cancel01Icon, Image01Icon, Upload01Icon } from "@hugeicons/core-free-icons";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_IMAGE_EDGE = 1600;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type SelectedImage = { fileName: string; url: string };

async function prepareImage(file: File): Promise<SelectedImage> {
  const sourceUrl = URL.createObjectURL(file);
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(bitmap.width, bitmap.height));
    let preparedFile = file;

    if (scale < 1) {
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("image-processing");
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
      if (!blob) throw new Error("image-processing");
      preparedFile = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" });
      canvas.width = 1;
      canvas.height = 1;
    }

    bitmap.close();
    return { fileName: preparedFile.name, url: URL.createObjectURL(preparedFile) };
  } catch {
    throw new Error("invalid-image");
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

export function CropImagePicker() {
  const [image, setImage] = useState<SelectedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (image) URL.revokeObjectURL(image.url); }, [image]);

  const selectFile = async (file?: File) => {
    setError(null);
    if (!file) { setError("No image selected. Choose a crop photo to continue."); return; }
    if (!ACCEPTED_TYPES.includes(file.type)) { setError("Choose a JPG, PNG, or WebP image."); return; }
    if (file.size > MAX_FILE_SIZE) { setError("That image is too large. Choose one smaller than 10 MB."); return; }

    setIsPreparing(true);
    try {
      const prepared = await prepareImage(file);
      setImage((current) => { if (current) URL.revokeObjectURL(current.url); return prepared; });
    } catch {
      setError("This image cannot be opened. Choose a different crop photo.");
    } finally {
      setIsPreparing(false);
    }
  };

  const removeImage = () => {
    if (image) URL.revokeObjectURL(image.url);
    setImage(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return <section className="mt-8" aria-label="Crop image selection">
    <input ref={inputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={(event) => void selectFile(event.target.files?.[0])} />
    <input id="crop-gallery" className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void selectFile(event.target.files?.[0])} />
    {isPreparing ? <div className="flex min-h-64 items-center justify-center rounded-2xl border border-stone-200 bg-white text-sm text-stone-600">Preparing your image…</div> : image ? <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"><div className="relative aspect-4/3 bg-stone-100"><Image src={image.url} alt="Selected crop" fill unoptimized className="object-cover" onError={() => { removeImage(); setError("This image cannot be displayed. Choose a different crop photo."); }} /><button type="button" onClick={removeImage} aria-label="Remove selected image" className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-stone-700 shadow-sm"><HugeiconsIcon icon={Cancel01Icon} size={22} /></button></div><div className="flex items-center justify-between gap-3 p-4"><div className="flex min-w-0 items-center gap-2"><HugeiconsIcon icon={Image01Icon} size={20} className="shrink-0 text-emerald-700" /><p className="truncate text-sm font-medium text-stone-700">{image.fileName}</p></div><button type="button" onClick={removeImage} className="shrink-0 text-sm font-semibold text-emerald-800">Reselect</button></div></div> : <div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => inputRef.current?.click()} className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-4 text-white shadow-sm hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-emerald-700"><HugeiconsIcon icon={Camera01Icon} size={30} /><span className="font-semibold">Take a photo</span><span className="text-xs text-emerald-100">Use your camera</span></button><label htmlFor="crop-gallery" className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 text-stone-800 shadow-sm focus-within:outline-2 focus-within:outline-emerald-700"><HugeiconsIcon icon={Upload01Icon} size={28} className="text-emerald-800" /><span className="font-semibold">Choose an image</span><span className="text-xs text-stone-500">From your phone</span></label></div>}
    {error && <p role="alert" className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800"><HugeiconsIcon icon={Alert02Icon} size={18} className="mt-0.5 shrink-0" />{error}</p>}
    <p className="mt-4 text-center text-xs text-stone-500">JPG, PNG, or WebP · Maximum 10 MB</p>
    <button type="button" disabled={!image || isPreparing} className="mt-6 flex min-h-14 w-full items-center justify-center rounded-2xl bg-stone-200 px-5 font-semibold text-stone-500 disabled:cursor-not-allowed">Analyze Crop <span className="ml-2 text-xs font-normal">Coming soon</span></button>
  </section>;
}
