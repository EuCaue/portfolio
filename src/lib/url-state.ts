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
