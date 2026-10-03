"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

export const EMAIL = "souzacaue@proton.me";

export function CopyEmail({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <a
        href={`mailto:${EMAIL}`}
        className="inline-flex items-center gap-2 rounded-md py-1 transition-colors hover:text-foreground"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={t("contact.copy")}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-foreground"
      >
        {copied ? (
          <Check className="h-4 w-4 text-success" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <span role="status" className="sr-only">
        {copied ? t("contact.copied") : ""}
      </span>
    </span>
  );
}
