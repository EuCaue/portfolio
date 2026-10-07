"use client";

import { ExternalLink, Github, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import type { Project } from "@/data/projects";
import { fill } from "@/lib/format";
import { hostOf, previewKind } from "@/lib/projects";

export function StatusBadge({ project }: { project: Project }) {
  const { t } = useLanguage();
  if (!project.preview) return null;
  const store = previewKind(project.preview) === "store";
  return (
    <Badge variant="success" className="px-0">
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {store
        ? fill(t("project.published"), { host: hostOf(project.preview) })
        : t("project.online")}
    </Badge>
  );
}

export function ProjectLinks({
  project,
  size = "sm",
}: {
  project: Project;
  size?: "sm" | "default";
}) {
  const { t } = useLanguage();
  if (!project.github && !project.preview) {
    return <span className="text-xs text-muted-foreground">{t("project.sourcePrivate")}</span>;
  }
  const kind = project.preview ? previewKind(project.preview) : "demo";
  const label =
    kind === "store"
      ? t("project.store")
      : kind === "site"
        ? t("project.visit")
        : t("project.demo");
  return (
    <>
      {project.github && (
        <Button
          variant="outline"
          size={size}
          asChild
          className={size === "sm" ? "h-8 gap-1.5 px-3 text-xs" : "gap-2"}
        >
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            {t("project.source")}
          </a>
        </Button>
      )}
      {project.site && (
        <Button
          variant="outline"
          size={size}
          asChild
          className={size === "sm" ? "h-8 gap-1.5 px-3 text-xs" : "gap-2"}
        >
          <a href={project.site} target="_blank" rel="noopener noreferrer">
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            {t("project.visit")}
          </a>
        </Button>
      )}
      {project.preview && (
        <Button
          size={size}
          asChild
          className={size === "sm" ? "h-8 gap-1.5 px-3 text-xs" : "gap-2"}
        >
          <a href={project.preview} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
          </a>
        </Button>
      )}
    </>
  );
}
