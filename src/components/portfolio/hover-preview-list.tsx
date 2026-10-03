"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { type PointerEvent, useState } from "react";
import { ProjectRow } from "@/components/portfolio/project-row";
import { useLanguage } from "@/contexts/language-context";
import type { Project } from "@/data/projects";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { projectSlug } from "@/lib/projects";

const W = 288;
const OFFSET = 24;
const previewOf = (p: Project) => p.image ?? p.video?.poster;

// The "More projects" list with a small surprise: hovering a row floats that project's preview
// next to the cursor, trailing it on a spring and leaning into the movement. Pointer position lives
// in motion values, so moving the mouse never re-renders the list. Touch screens keep thumbnails.
export function HoverPreviewList({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (slug: string) => void;
}) {
  const { t } = useLanguage();
  const canHover = useMediaQuery("(hover: hover) and (min-width: 640px)");
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState<Project | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 28, mass: 0.6 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const rotate = useTransform(useVelocity(sx), [-1600, 0, 1600], [-7, 0, 7], { clamp: true });

  const move = (e: PointerEvent) => {
    // Flip to the left of the cursor near the right edge so the card never leaves the screen.
    const right = e.clientX + OFFSET + W < window.innerWidth;
    x.set(right ? e.clientX + OFFSET : e.clientX - OFFSET - W);
    y.set(e.clientY - 90);
  };

  const shown = canHover && active && previewOf(active) ? active : null;

  return (
    <>
      <ul
        className="divide-y overflow-hidden rounded-xl border"
        onPointerMove={canHover ? move : undefined}
        onPointerLeave={() => setActive(null)}
      >
        {projects.map((p) => (
          <li key={projectSlug(p)} onPointerEnter={() => setActive(p)}>
            <ProjectRow project={p} onOpen={onOpen} />
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {shown && (
          <motion.div
            key="preview"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: reduce ? x : sx,
              y: reduce ? y : sy,
              rotate: reduce ? 0 : rotate,
              width: W,
            }}
            className="pointer-events-none fixed left-0 top-0 z-40 overflow-hidden rounded-xl border bg-card shadow-[0_24px_48px_-20px_rgb(0_0_0/0.35)]"
          >
            <img src={previewOf(shown)} alt="" className="aspect-video w-full object-cover" />
            <p className="truncate border-t px-3 py-2 text-xs font-medium">{t(shown.titleKey)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
