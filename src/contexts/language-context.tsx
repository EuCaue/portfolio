"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { en, type TranslationKeys } from "@/locales/en";
import { ptBR } from "@/locales/pt-BR";

type Language = "en" | "pt-BR";

const translations: Record<string, { en: string; "pt-BR": string }> = {};

// Build translation dictionary dynamically from split locale files
for (const key of Object.keys(en) as TranslationKeys[]) {
  translations[key] = {
    en: en[key],
    "pt-BR": ptBR[key] || en[key],
  };
}

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load saved language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt-BR")) {
      setLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language;
      if (browserLang.startsWith("pt")) {
        setLanguage("pt-BR");
      }
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
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
