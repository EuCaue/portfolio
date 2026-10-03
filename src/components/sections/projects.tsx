"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useRef } from "react";
import { ProjectCard } from "@/components/portfolio/project-card";
import { ProjectDialog } from "@/components/portfolio/project-dialog";
import { ProjectFilters } from "@/components/portfolio/project-filters";
import { ProjectRow } from "@/components/portfolio/project-row";
import { Spotlight } from "@/components/portfolio/spotlight";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { projects } from "@/data/projects";
import { useUrlState } from "@/hooks/use-url-state";
import { fill } from "@/lib/format";
import { filterProjects, projectSlug } from "@/lib/projects";
import type { UrlState } from "@/lib/url-state";

const SPOTLIGHT = "quick-lofi";
// Five cards read as two wide and three narrow instead of a row with a hole in it.
const SPANS = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];
const EMPTY: UrlState = { platform: null, tech: null, project: null };
const noop = () => {};

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t py-20 md:py-24">
      <div className="container">
        <h2
          id="projects-title"
          tabIndex={-1}
          className="text-3xl font-semibold tracking-[-0.03em] outline-none"
        >
          <ProjectsTitle />
        </h2>
        <Suspense fallback={<ProjectsView state={EMPTY} onChange={noop} />}>
          <ProjectsWithUrl />
        </Suspense>
      </div>
    </section>
  );
}

function ProjectsTitle() {
  const { t } = useLanguage();
  return <>{t("projects.title")}</>;
}

function ProjectsWithUrl() {
  const [state, set] = useUrlState();
  // Remember what opened the dialog so focus can go back there when it closes.
  const opener = useRef<HTMLElement | null>(null);
  const lastProject = useRef<string | null>(null);
  if (state.project) lastProject.current = state.project;
  const change = (patch: Partial<UrlState>) => {
    if (patch.project && !state.project)
      opener.current = document.activeElement as HTMLElement | null;
    set(patch);
  };
  return (
    <>
      <ProjectsView state={state} onChange={change} />
      <ProjectDialog
        slug={state.project}
        returnFocus={() => {
          // A dialog opened from a shared link has no opener: fall back to that project's card.
          const target =
            opener.current ??
            document.querySelector<HTMLElement>(`[data-open="${lastProject.current}"]`) ??
            document.getElementById("projects-title");
          target?.focus();
          opener.current = null;
        }}
        onClose={() => set({ project: null })}
        onNavigate={(slug) => set({ project: slug })}
      />
    </>
  );
}

function ProjectsView({
  state,
  onChange,
}: {
  state: UrlState;
  onChange: (p: Partial<UrlState>) => void;
}) {
  const { t } = useLanguage();
  const shown = filterProjects(projects, state);
  // Quick Lofi, the most proven project, gets the spotlight; the other featured projects follow.
  const spotlight = shown.find((p) => projectSlug(p) === SPOTLIGHT);
  const featured = shown.filter((p) => p.featured && p !== spotlight);
  const bento = featured.length === 5;
  const others = shown.filter((p) => !p.featured);
  const open = (slug: string) => onChange({ project: slug });
  const filtered = state.platform || state.tech;

  return (
    <>
      <p className="mt-2 max-w-[60ch] text-muted-foreground">{t("projects.subtitle")}</p>
      <div className="mt-8">
        <ProjectFilters state={state} onChange={onChange} />
        <p role="status" className="mt-3 text-xs text-muted-foreground">
          {filtered
            ? fill(t("filter.count"), { shown: shown.length, total: projects.length })
            : fill(t("filter.countAll"), { total: projects.length })}
        </p>
      </div>

      {shown.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed px-6 py-14 text-center">
          <p className="text-muted-foreground">{t("filter.empty")}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => onChange({ platform: null, tech: null })}
          >
            {t("filter.clear")}
          </Button>
        </div>
      )}

      {(spotlight || featured.length > 0) && (
        <h3 className="mb-4 mt-10 text-sm font-medium text-muted-foreground">
          {t("projects.featured")}
        </h3>
      )}
      {spotlight && <Spotlight project={spotlight} onOpen={open} />}
      {featured.length > 0 && (
        <ul
          className={`mt-5 grid gap-5 sm:grid-cols-2 ${bento ? "lg:grid-cols-6" : "lg:grid-cols-3"}`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {featured.map((p, i) => (
              <motion.li
                key={projectSlug(p)}
                className={
                  bento ? `${SPANS[i]} ${i === 4 ? "sm:col-span-2 lg:col-span-2" : ""}` : ""
                }
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={p} onOpen={open} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {others.length > 0 && (
        <>
          <h3 className="mb-4 mt-12 text-sm font-medium text-muted-foreground">
            {t("projects.other")}
          </h3>
          <ul className="divide-y overflow-hidden rounded-xl border">
            {others.map((p) => (
              <li key={projectSlug(p)}>
                <ProjectRow project={p} onOpen={open} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
