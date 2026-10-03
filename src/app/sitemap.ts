import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${SITE_URL}/en`,
          "pt-BR": `${SITE_URL}/pt-br`,
        },
      },
    },
    {
      url: `${SITE_URL}/pt-br`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${SITE_URL}/en`,
          "pt-BR": `${SITE_URL}/pt-br`,
        },
      },
    },
  ];
}
