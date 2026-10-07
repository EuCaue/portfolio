"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, GripHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProjectMedia } from "@/components/portfolio/project-media";
import { ProjectLinks, StatusBadge } from "@/components/portfolio/project-meta";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { projects } from "@/data/projects";
import { useMediaQuery } from "@/hooks/use-media-query";
import { fill } from "@/lib/format";
import { findProjectBySlug, neighbors } from "@/lib/projects";

// Smallest size the panel can be resized to, and the gap kept from the viewport edge (sm:p-6).
const MIN_WIDTH = 420;
const MIN_HEIGHT = 320;
const EDGE = 24;

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
  const wide = useMediaQuery("(min-width: 640px)");
  // Dragging is started by the visitor, so it stays available with reduced motion.
  const canDrag = wide;
  const panel = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const width = useMotionValue<number | "auto">("auto");
  const height = useMotionValue<number | "auto">("auto");
  const [resized, setResized] = useState(false);
  // While resizing, framer's drag would rescale the position against its constraints on every size
  // change and fight the corner anchoring below, so the constraints are dropped until it settles.
  const [resizing, setResizing] = useState(false);

  const resetSize = () => {
    x.set(0);
    y.set(0);
    width.set("auto");
    height.set("auto");
    setResized(false);
  };

  // Each time the dialog opens it starts centered at its natural size.
  // biome-ignore lint/correctness/useExhaustiveDependencies: resetSize only touches stable motion values and state.
  useEffect(() => {
    if (!slug) resetSize();
  }, [slug]);

  const startResize = (e: React.PointerEvent) => {
    const el = panel.current;
    const area = bounds.current;
    if (!el || !area) return;
    e.preventDefault();
    const rect = el.getBoundingClientRect();
    const box = area.getBoundingClientRect();
    const start = {
      px: e.clientX,
      py: e.clientY,
      w: rect.width,
      h: rect.height,
      x: x.get(),
      y: y.get(),
    };
    const maxW = Math.max(MIN_WIDTH, box.right - EDGE - rect.left);
    const maxH = Math.max(MIN_HEIGHT, box.bottom - EDGE - rect.top);
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
    setResized(true);
    setResizing(true);
    const move = (ev: PointerEvent) => {
      const w = clamp(start.w + ev.clientX - start.px, MIN_WIDTH, maxW);
      const h = clamp(start.h + ev.clientY - start.py, MIN_HEIGHT, maxH);
      width.set(w);
      height.set(h);
      // The panel is centered, so growing it moves its top-left corner; shift it back to keep that corner still.
      x.set(start.x + (w - start.w) / 2);
      y.set(start.y + (h - start.h) / 2);
    };
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      requestAnimationFrame(() => requestAnimationFrame(() => setResizing(false)));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
  };

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
              ref={panel}
              style={{ x, y, width, height }}
              drag={canDrag}
              dragControls={controls}
              dragListener={false}
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={resizing ? undefined : bounds}
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`pointer-events-auto relative flex w-full flex-col ${resized ? "" : "max-h-[min(92dvh,880px)] max-w-3xl"} overflow-hidden rounded-xl border bg-background shadow-2xl focus:outline-none`}
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

              <motion.div
                key={slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`min-h-0 overflow-y-auto ${resized ? "flex-1" : ""}`}
              >
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
              </motion.div>

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

              {canDrag && (
                <div
                  aria-hidden="true"
                  onPointerDown={startResize}
                  onDoubleClick={resetSize}
                  title={t("project.resizeHint")}
                  className="group absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize touch-none"
                >
                  <span className="absolute bottom-[3px] right-[3px] h-2 w-2 rounded-br-[7px] border-b-2 border-r-2 border-muted-foreground/40 transition-colors group-hover:border-muted-foreground" />
                </div>
              )}
            </motion.div>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
