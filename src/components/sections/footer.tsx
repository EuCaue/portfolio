"use client";

import { ResumeLink } from "@/components/portfolio/resume-link";
import { useLanguage } from "@/contexts/language-context";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const link = "rounded-sm transition-colors hover:text-foreground";

  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} Cauê Souza. {t("footer.rights")}
        </p>
        <nav aria-label={t("nav.label.footer")} className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href="https://eucaue.online"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            eucaue.online
          </a>
          <a
            href="https://blog.eucaue.online"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            {t("nav.blog")}
          </a>
          <ResumeLink className={link}>{t("footer.resume")}</ResumeLink>
        </nav>
      </div>
    </footer>
  );
}
