import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cauê Souza | Portfolio",
    short_name: "Cauê Souza",
    description:
      "Personal portfolio showcasing my projects and skills. Software Engineer with hands-on experience across web, mobile, desktop, and system-integrated applications.",
    start_url: "/en",
    display: "standalone",
    background_color: "#020817",
    theme_color: "#020817",
    icons: [
      { src: "/android-chrome-192x192-light.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512-light.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
