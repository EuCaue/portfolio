"use client";

import { FileDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {currentYear} Cauê Souza. {t("footer.rights")}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <a
                href="https://eucaue.online"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                eucaue.online
              </a>
              <span className="text-muted-foreground/40">·</span>
              <a
                href="https://blog.eucaue.online"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                blog
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <a
                href={t("nav.resumeUrl")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.resume")}
              >
                <FileDown className="h-4 w-4" />
                <span className="hidden sm:inline">{t("footer.resume")}</span>
              </a>
            </Button>
            <a
              href="mailto:souzacaue@proton.me"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={t("contact.info.email")}
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/EuCaue"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/caue-souza"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
