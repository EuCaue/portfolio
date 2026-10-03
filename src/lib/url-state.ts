import { projects } from "@/data/projects";
import { type Filters, findProjectBySlug, PLATFORMS, type Platform } from "./projects";

export type UrlState = Filters & { project: string | null };

const TAGS = new Set(projects.flatMap((p) => p.tags));

export function parseUrlState(params: URLSearchParams): UrlState {
  const platform = params.get("platform");
  const tech = params.get("tech");
  const project = params.get("project");
  return {
    platform: PLATFORMS.includes(platform as Platform) ? (platform as Platform) : null,
    tech: tech && TAGS.has(tech) ? tech : null,
    project: findProjectBySlug(project) ? project : null,
  };
}

export function writeUrlState(current: URLSearchParams, patch: Partial<UrlState>): string {
  const next = new URLSearchParams(current);
  for (const [key, value] of Object.entries(patch)) {
    if (value) next.set(key, value);
    else next.delete(key);
  }
  const qs = next.toString();
  return qs ? `?${qs}` : "";
}

export type HistoryAction = "push" | "replace" | "back";

// Opening a project adds a history entry so Back closes the dialog; everything else replaces.
export function historyAction(
  current: UrlState,
  patch: Partial<UrlState>,
  openedByPush: boolean,
): HistoryAction {
  if (patch.project && !current.project) return "push";
  if ("project" in patch && !patch.project && current.project && openedByPush) return "back";
  return "replace";
}

// Changing language keeps the current view: filters and the open project carry over.
export const localePath = (locale: string, search: string) => `/${locale}${search}`;
