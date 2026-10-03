"use client";

import { ProjectMedia } from "@/components/portfolio/project-media";
import { ProjectLinks, StatusBadge } from "@/components/portfolio/project-meta";
import { useLanguage } from "@/contexts/language-context";
import type { Project } from "@/data/projects";
import { projectSlug } from "@/lib/projects";

export function ProjectRow({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (slug: string) => void;
}) {
  const { t } = useLanguage();
  const name = t(project.titleKey);

  return (
    <div className="group relative grid grid-cols-[96px_minmax(0,1fr)] gap-x-4 gap-y-3 px-4 py-4 transition-colors hover:bg-muted/50 focus-within:bg-muted/50 sm:grid-cols-[128px_minmax(0,1fr)_auto] sm:items-center sm:px-5">
      <div className="aspect-video overflow-hidden rounded-md border bg-muted">
        <ProjectMedia project={project} title={name} mode="card" emptyLabel="" />
      </div>
      <div className="min-w-0">
        <h4 className="font-medium tracking-tight">
          <button
            type="button"
            onClick={() => onOpen(projectSlug(project))}
            data-open={projectSlug(project)}
            aria-haspopup="dialog"
            aria-label={t("project.open").replace("{name}", name)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none after:focus-visible:ring-2 after:focus-visible:ring-inset after:focus-visible:ring-ring"
          >
            {name}
          </button>
        </h4>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
          <span>{t(`platform.${project.platform}`)}</span>
          <StatusBadge project={project} />
        </p>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {t(project.descriptionKey)}
        </p>
      </div>
      <div className="relative z-10 col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:justify-end">
        <ProjectLinks project={project} />
      </div>
    </div>
  );
}
