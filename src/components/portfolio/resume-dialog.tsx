"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { useUrlState } from "@/hooks/use-url-state";
import { cn } from "@/lib/utils";

const LANGS = [
  { id: "en", label: "EN" },
  { id: "pt", label: "PT" },
] as const;

export function ResumeDialog() {
  const { t, language } = useLanguage();
  const [state, set] = useUrlState();
  const [lang, setLang] = useState<"en" | "pt">(language === "pt-BR" ? "pt" : "en");
  const [loaded, setLoaded] = useState(false);
  const [canEmbed, setCanEmbed] = useState(true);

  useEffect(() => {
    // Browsers without a built-in PDF viewer (most phones) get open and download buttons instead.
    setCanEmbed(
      navigator.pdfViewerEnabled !== false && window.matchMedia("(min-width: 640px)").matches,
    );
  }, []);

  useEffect(() => {
    setLang(language === "pt-BR" ? "pt" : "en");
  }, [language]);

  const url = `/api/resume/${lang}`;
  const open = state.resume === "open";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && set({ resume: null })}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=open]:fade-in-0 dark:bg-black/70" />
        <DialogPrimitive.Content
          asChild
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLElement | null)?.focus();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 top-3 z-50 mx-auto flex max-w-4xl flex-col overflow-hidden rounded-xl border bg-background shadow-2xl focus:outline-none sm:inset-x-6 sm:bottom-6 sm:top-6"
          >
            <div className="flex shrink-0 flex-wrap items-center gap-2 border-b px-4 py-2.5">
              <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <DialogPrimitive.Title className="text-sm font-semibold">
                {t("resume.title")}
              </DialogPrimitive.Title>
              <fieldset className="ml-2 flex rounded-md border p-0.5">
                <legend className="sr-only">{t("resume.language")}</legend>
                {LANGS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    aria-pressed={lang === l.id}
                    onClick={() => {
                      setLoaded(false);
                      setLang(l.id);
                    }}
                    className={cn(
                      "rounded px-2 py-0.5 font-mono text-xs transition-colors",
                      lang === l.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </fieldset>
              <div className="ml-auto flex items-center gap-1">
                <Button variant="ghost" size="sm" asChild className="hidden gap-2 sm:inline-flex">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    {t("resume.open")}
                  </a>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className={cn("gap-2", !canEmbed && "hidden sm:inline-flex")}
                >
                  <a href={`${url}?download=1`}>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {t("resume.download")}
                  </a>
                </Button>
                <DialogPrimitive.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label={t("project.close")}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </DialogPrimitive.Close>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 bg-muted">
              {canEmbed ? (
                <>
                  {!loaded && (
                    <div aria-hidden="true" className="absolute inset-0 flex justify-center p-6">
                      <div className="w-full max-w-2xl animate-pulse rounded-md bg-background/70 motion-reduce:animate-none" />
                    </div>
                  )}
                  <iframe
                    key={lang}
                    src={`${url}#view=FitH&navpanes=0`}
                    title={t("resume.title")}
                    onLoad={() => setLoaded(true)}
                    className={cn(
                      "h-full w-full transition-opacity",
                      loaded ? "opacity-100" : "opacity-0",
                    )}
                  />
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <FileText
                    className="h-10 w-10 text-muted-foreground"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="max-w-xs text-sm text-muted-foreground">{t("resume.noViewer")}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button variant="outline" asChild className="gap-2">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        {t("resume.open")}
                      </a>
                    </Button>
                    <Button asChild className="gap-2">
                      <a href={`${url}?download=1`}>
                        <Download className="h-4 w-4" aria-hidden="true" />
                        {t("resume.download")}
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
