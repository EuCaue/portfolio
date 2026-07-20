import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "@/components/common/navbar";
import { ThemeProvider } from "@/components/common/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const LOCALES = ["en", "pt-br"];

const SITE_URL = "https://www.eucaue.online";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const urlPath = locale === "pt-br" ? "pt-br" : "en";
  const isPT = locale === "pt-br";

  return {
    metadataBase: new URL(SITE_URL),
    title: isPT ? "Cauê Souza | Desenvolvedor de Software" : "Cauê Souza | Software Engineer",
    description: isPT
      ? "Portfólio pessoal mostrando meus projetos e habilidades. Software Engineer com experiência em web, mobile, desktop e integrações de sistema."
      : "Personal portfolio showcasing my projects and skills. Software Engineer with hands-on experience across web, mobile, desktop, and system-integrated applications.",
    keywords: isPT
      ? [
          "Cauê Souza",
          "Desenvolvedor de Software",
          "Software Engineer",
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "Python",
          "React Native",
          "GNOME",
          "Portfólio",
        ]
      : [
          "Cauê Souza",
          "Software Engineer",
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "Python",
          "React Native",
          "GNOME",
          "Portfolio",
        ],
    authors: [{ name: "Cauê Souza", url: SITE_URL }],
    creator: "Cauê Souza",
    openGraph: {
      type: "website",
      url: `/${urlPath}`,
      title: isPT ? "Cauê Souza | Desenvolvedor de Software" : "Cauê Souza | Software Engineer",
      description: isPT
        ? "Portfólio pessoal mostrando meus projetos e habilidades."
        : "Personal portfolio showcasing my projects and skills.",
      siteName: "Cauê Souza",
      locale: isPT ? "pt_BR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: isPT ? "Cauê Souza | Desenvolvedor de Software" : "Cauê Souza | Software Engineer",
      description: isPT
        ? "Portfólio pessoal mostrando meus projetos e habilidades."
        : "Personal portfolio showcasing my projects and skills.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/${urlPath}`,
      languages: {
        en: "/en",
        "pt-BR": "/pt-br",
        "x-default": "/en",
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
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
        <script
          defer
          src="https://umami-w117k4faahzuioue6p3dkq8f.25122003.xyz/script.js"
          data-website-id="9aeb97a1-de4a-416b-bfd3-ac4ce0b6bca4"
        ></script>
      </head>

      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider initialLocale={locale}>
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
