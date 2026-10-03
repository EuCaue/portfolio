import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/common/motion-provider";
import Navbar from "@/components/common/navbar";
import { ThemeProvider } from "@/components/common/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import { PROFILES, SEO, SITE_URL } from "@/lib/site";
import "../globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const LOCALES = ["en", "pt-br"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === "pt-br" ? "pt-br" : "en";
  const seo = SEO[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    keywords: [
      "Cauê Souza",
      seo.role,
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "GNOME",
      "Linux",
      "Python",
      "Rust",
    ],
    authors: [{ name: "Cauê Souza", url: SITE_URL }],
    creator: "Cauê Souza",
    openGraph: {
      type: "profile",
      url: `/${lang}`,
      title: seo.title,
      description: seo.description,
      siteName: "Cauê Souza",
      locale: lang === "pt-br" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt-br" ? "en_US" : "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", "pt-BR": "/pt-br", "x-default": "/en" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale)) notFound();

  const htmlLang = locale === "pt-br" ? "pt-BR" : "en";

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32-light.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32-dark.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16-light.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16-dark.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192-light.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192-dark.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512-light.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512-dark.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon-light.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon-dark.png"
          media="(prefers-color-scheme: dark)"
        />
      </head>

      <body className={`${sans.variable} ${mono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider initialLocale={locale}>
            <MotionProvider>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
              >
                {locale === "pt-br" ? "Pular para o conteúdo" : "Skip to content"}
              </a>
              <script
                type="application/ld+json"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from constants
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    name: "Cauê Souza",
                    jobTitle: SEO[locale === "pt-br" ? "pt-br" : "en"].role,
                    url: `${SITE_URL}/${locale}`,
                    email: "mailto:souzacaue@proton.me",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Salvador",
                      addressCountry: "BR",
                    },
                    sameAs: PROFILES,
                    knowsAbout: [
                      "React",
                      "Next.js",
                      "React Native",
                      "TypeScript",
                      "Python",
                      "GNOME",
                      "GTK",
                      "Rust",
                    ],
                  }),
                }}
              />
              <Navbar />
              {children}
            </MotionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
