"use client";

import { useReducedMotion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { mediaKind } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  title: string;
  mode: "card" | "dialog";
  emptyLabel: string;
  className?: string;
};

// Card videos load nothing until visible, then play muted while on screen.
// Dialog videos get controls and start on open, unless the visitor prefers reduced motion.
export function ProjectMedia({ project, title, mode, emptyLabel, className }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const kind = mediaKind(project);

  useEffect(() => {
    const video = ref.current;
    if (!video || mode !== "card" || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [mode, reduce]);

  if (kind === "none") {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground",
          className,
        )}
      >
        <ImageOff className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
        <span>{emptyLabel}</span>
      </div>
    );
  }

  if (kind === "image") {
    return (
      <img
        src={project.image}
        alt={title}
        loading={mode === "card" ? "lazy" : "eager"}
        decoding="async"
        className={cn(
          "h-full w-full",
          mode === "card" ? "object-cover" : "object-contain",
          className,
        )}
      />
    );
  }

  return (
    <video
      ref={ref}
      aria-label={title}
      poster={project.video?.poster}
      muted
      loop
      playsInline
      controls={mode === "dialog"}
      autoPlay={mode === "dialog" && !reduce}
      preload={mode === "card" ? "none" : "metadata"}
      className={cn(
        "h-full w-full",
        mode === "card" ? "object-cover" : "object-contain",
        className,
      )}
    >
      {project.video?.sources.map(({ type, url }) => (
        <source key={url} src={url} type={`video/${type}`} />
      ))}
    </video>
  );
}
