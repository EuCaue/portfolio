"use client";

import { ProjectMedia } from "@/components/portfolio/project-media";
import { ProjectLinks, StatusBadge } from "@/components/portfolio/project-meta";
import { useLanguage } from "@/contexts/language-context";
import type { Project } from "@/data/projects";
import { projectSlug } from "@/lib/projects";

const VISIBLE_TAGS = 4;

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (slug: string) => void;
}) {
  const { t } = useLanguage();
  const name = t(project.titleKey);
  const extra = project.tags.length - VISIBLE_TAGS;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-[border-color,box-shadow] duration-200 hover:border-foreground/20 hover:shadow-[0_8px_24px_-12px_rgb(0_0_0/0.18)] focus-within:border-foreground/30">
      <div className="aspect-video overflow-hidden border-b bg-muted">
        <ProjectMedia
          project={project}
          title={name}
          mode="card"
          emptyLabel={t("project.noPreview")}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>{t(`platform.${project.platform}`)}</span>
          <StatusBadge project={project} />
        </p>
        <h3 className="text-lg font-semibold tracking-tight">
          <button
            type="button"
            onClick={() => onOpen(projectSlug(project))}
            aria-haspopup="dialog"
            aria-label={t("project.open").replace("{name}", name)}
            className="text-left after:absolute after:inset-0 after:z-0 after:content-[''] focus-visible:outline-none after:focus-visible:rounded-xl after:focus-visible:ring-2 after:focus-visible:ring-ring"
          >
            {name}
          </button>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {t(project.descriptionKey)}
        </p>
        <ul className="mt-1 flex flex-wrap gap-1.5" aria-label={t("project.builtWith")}>
          {project.tags.slice(0, VISIBLE_TAGS).map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </li>
          ))}
          {extra > 0 && <li className="px-1 py-0.5 text-xs text-muted-foreground">+{extra}</li>}
        </ul>
        <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-4">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
