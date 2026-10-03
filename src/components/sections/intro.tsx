"use client";

import { FileDown, Github, Linkedin, MapPin } from "lucide-react";
import { CopyEmail } from "@/components/portfolio/copy-email";
import BlurText from "@/components/react-bits/blur-text";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export default function Intro() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="hero-title" className="pb-16 pt-14 md:pb-20 md:pt-24">
      <div className="container">
        <div className="max-w-3xl">
          <h1
            id="hero-title"
            className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl"
          >
            <span className="sr-only">Cauê Souza</span>
            <BlurText text="Cauê Souza" />
          </h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-lg">
            <span>{t("intro.role")}</span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {t("intro.location")}
            </span>
          </p>
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-muted-foreground">
            {t("intro.description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild className="gap-2 px-6">
              <a href={t("nav.resumeUrl")} target="_blank" rel="noopener noreferrer">
                <FileDown className="h-4 w-4" aria-hidden="true" />
                {t("intro.downloadCv")}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-6">
              <a href="#contact">{t("intro.getInTouch")}</a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-6 text-sm text-muted-foreground">
            <CopyEmail />
            <a
              href="https://github.com/EuCaue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-1 transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/caue-souza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-1 transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
