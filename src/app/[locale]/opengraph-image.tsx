import { ImageResponse } from "next/og";
import { SEO } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Cauê Souza, Full Stack Developer";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt-br" }];
}

// The link preview: name, role and what I build, in the site's neutral palette.
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const seo = SEO[locale === "pt-br" ? "pt-br" : "en"];
  const stack =
    locale === "pt-br"
      ? "Web e mobile, extensões do GNOME e ferramentas para Linux"
      : "Web and mobile, GNOME extensions and Linux tools";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#ffffff",
        color: "#09090b",
      }}
    >
      <div style={{ fontSize: 28, color: "#52525b" }}>portfolio.eucaue.online</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
          Cauê Souza
        </div>
        <div style={{ fontSize: 44, marginTop: 24 }}>{seo.role}</div>
        <div style={{ fontSize: 30, marginTop: 16, color: "#52525b" }}>{stack}</div>
      </div>
      <div
        style={{ display: "flex", height: 8, width: 120, background: "#09090b", borderRadius: 4 }}
      />
    </div>,
    size,
  );
}
