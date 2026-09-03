import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VunaLink",
    short_name: "VunaLink",
    description: "Offline crop disease detection for Rwandan farmers.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#166534",
    lang: "rw",
    icons: [
      {
        src: "/vunalink-icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/vunalink-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
