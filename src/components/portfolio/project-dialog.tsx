"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, useDragControls, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, GripHorizontal, X } from "lucide-react";
import { useRef } from "react";
import { ProjectMedia } from "@/components/portfolio/project-media";
import { ProjectLinks, StatusBadge } from "@/components/portfolio/project-meta";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { projects } from "@/data/projects";
import { useMediaQuery } from "@/hooks/use-media-query";
import { fill } from "@/lib/format";
import { findProjectBySlug, neighbors } from "@/lib/projects";

type Props = {
  slug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
  returnFocus: () => void;
};

export function ProjectDialog({ slug, onClose, onNavigate, returnFocus }: Props) {
  const { t } = useLanguage();
  const project = findProjectBySlug(slug);
  const bounds = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 640px)");
  const canDrag = wide && !reduce;

  if (!project || !slug) return <DialogPrimitive.Root open={false} />;

  const name = t(project.titleKey);
  const near = neighbors(slug);
  const prev = findProjectBySlug(near.prev);
  const next = findProjectBySlug(near.next);

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <div
          ref={bounds}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          <DialogPrimitive.Content
            asChild
            aria-describedby="project-dialog-desc"
            onOpenAutoFocus={(e) => {
              // Focus the dialog itself so screen readers start at the title, not the close button.
              e.preventDefault();
              (e.currentTarget as HTMLElement | null)?.focus();
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              returnFocus();
            }}
          >
            <motion.div
              key={slug}
              drag={canDrag}
              dragControls={controls}
              dragListener={false}
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={bounds}
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto relative flex max-h-[min(92dvh,880px)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border bg-background shadow-2xl focus:outline-none"
            >
              <div
                onPointerDown={(e) => canDrag && controls.start(e)}
                title={canDrag ? t("project.dragHint") : undefined}
                className={`flex h-12 shrink-0 items-center gap-3 border-b px-4 ${canDrag ? "cursor-grab touch-none select-none active:cursor-grabbing" : ""}`}
              >
                {canDrag && (
                  <GripHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                )}
                <DialogPrimitive.Title className="truncate text-sm font-semibold">
                  {name}
                </DialogPrimitive.Title>
                <span className="font-mono text-xs text-muted-foreground">
                  {fill(t("project.position"), { index: near.index, total: projects.length })}
                </span>
                <DialogPrimitive.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-8 w-8"
                    aria-label={t("project.close")}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </DialogPrimitive.Close>
              </div>

              <div className="min-h-0 overflow-y-auto">
                <div className="aspect-video bg-muted">
                  <ProjectMedia
                    key={slug}
                    project={project}
                    title={name}
                    mode="dialog"
                    emptyLabel={t("project.noPreview")}
                  />
                </div>
                <div className="space-y-4 p-5 sm:p-6">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>{t(`platform.${project.platform}`)}</span>
                    <StatusBadge project={project} />
                  </p>
                  <DialogPrimitive.Description
                    id="project-dialog-desc"
                    className="max-w-[65ch] leading-relaxed text-muted-foreground"
                  >
                    {t(project.descriptionKey)}
                  </DialogPrimitive.Description>
                  <div>
                    <h3 className="mb-2 text-xs font-medium text-muted-foreground">
                      {t("project.builtWith")}
                    </h3>
                    <ul className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <ProjectLinks project={project} size="default" />
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-2 border-t px-2 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate(near.prev)}
                  className="min-w-0 gap-1"
                >
                  <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="sr-only">{t("project.prev")}: </span>
                  <span className="truncate">{prev && t(prev.titleKey)}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate(near.next)}
                  className="min-w-0 gap-1"
                >
                  <span className="sr-only">{t("project.next")}: </span>
                  <span className="truncate">{next && t(next.titleKey)}</span>
                  <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Button>
              </div>
            </motion.div>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
