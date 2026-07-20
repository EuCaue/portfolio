"use client";

import { useRouter } from "next/navigation";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { en, type TranslationKeys } from "@/locales/en";
import { ptBR } from "@/locales/pt-BR";

type Language = "en" | "pt-BR";

const translations: Record<string, { en: string; "pt-BR": string }> = {};

for (const key of Object.keys(en) as TranslationKeys[]) {
  translations[key] = {
    en: en[key],
    "pt-BR": ptBR[key] || en[key],
  };
}

const URL_TO_LANG: Record<string, Language> = {
  en: "en",
  "pt-br": "pt-BR",
};

const LANG_TO_URL: Record<Language, string> = {
  en: "en",
  "pt-BR": "pt-br",
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: string;
}) {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>(URL_TO_LANG[initialLocale] ?? "en");

  useEffect(() => {
    const next = URL_TO_LANG[initialLocale];
    if (next && next !== language) {
      setLanguageState(next);
    }
  }, [initialLocale, language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    router.push(`/${LANG_TO_URL[lang]}`);
    // biome-ignore lint/suspicious/noDocumentCookie: persist locale choice for next redirect
    document.cookie = `NEXT_LOCALE=${LANG_TO_URL[lang]}; path=/; max-age=${60 * 60 * 24 * 365}`;
  };

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
