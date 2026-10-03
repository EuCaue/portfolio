import type { MetadataRoute } from "next";
import { SEO } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cauê Souza",
    short_name: "Cauê Souza",
    description: SEO.en.description,
    start_url: "/en",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      { src: "/android-chrome-192x192-light.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512-light.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
