"use client";

import type { PointerEvent } from "react";
import { ProjectMedia } from "@/components/portfolio/project-media";
import { ProjectLinks, StatusBadge } from "@/components/portfolio/project-meta";
import CountUp from "@/components/react-bits/count-up";
import { useLanguage } from "@/contexts/language-context";
import type { Project } from "@/data/projects";
import { projectSlug } from "@/lib/projects";

// Glow that follows the pointer, from React Bits "SpotlightCard". It writes CSS variables on
// the element instead of React state, so moving the mouse never re-renders the card.
const track = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
};

export function Spotlight({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (slug: string) => void;
}) {
  const { t, language } = useLanguage();
  const name = t(project.titleKey);
  const slug = projectSlug(project);

  return (
    <article
      onPointerMove={track}
      className="group relative isolate grid overflow-hidden rounded-2xl border bg-card md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), hsl(var(--foreground) / 0.07), transparent 70%)",
        }}
      />
      <div className="aspect-video overflow-hidden border-b bg-muted md:aspect-auto md:border-b-0 md:border-r">
        <ProjectMedia
          project={project}
          title={name}
          mode="card"
          emptyLabel={t("project.noPreview")}
        />
      </div>
      <div className="flex flex-col gap-3 p-6 sm:p-8">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>{t(`platform.${project.platform}`)}</span>
          <StatusBadge project={project} />
        </p>
        <h3 className="text-2xl font-semibold tracking-tight">
          <button
            type="button"
            onClick={() => onOpen(slug)}
            data-open={slug}
            aria-haspopup="dialog"
            aria-label={t("project.open").replace("{name}", name)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none after:focus-visible:rounded-2xl after:focus-visible:ring-2 after:focus-visible:ring-ring"
          >
            {name}
          </button>
        </h3>
        <p className="mt-2">
          <span className="block text-5xl font-semibold tabular-nums tracking-[-0.04em]">
            <CountUp to={10000} locale={language} />+
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            {t("spotlight.downloads")}
          </span>
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">{t("spotlight.summary")}</p>
        <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-3">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
