import { type Project, projects } from "@/data/projects";

export type Platform = "web" | "mobile" | "extension" | "gnome" | "cli";
const ALL_PLATFORMS: Platform[] = ["web", "mobile", "extension", "gnome", "cli"];
// Only platforms that have at least one project are offered as filters.
export const PLATFORMS = ALL_PLATFORMS.filter((k) => projects.some((p) => p.platform === k));
export type Filters = { platform: Platform | null; tech: string | null };
export type MediaKind = "video" | "image" | "none";

export const slugFromKey = (titleKey: string) =>
  titleKey
    .split(".")[1]
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

export const projectSlug = (p: Project) => slugFromKey(p.titleKey);

export const findProjectBySlug = (slug: string | null) =>
  slug ? projects.find((p) => projectSlug(p) === slug) : undefined;

export const filterProjects = (list: Project[], f: Filters) =>
  list.filter(
    (p) => (!f.platform || p.platform === f.platform) && (!f.tech || p.tags.includes(f.tech)),
  );

export const techOptions = (list: Project[]) => {
  const counts = new Map<string, number>();
  for (const p of list) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return Array.from(counts)
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }));
};

export const mediaKind = (p: Project): MediaKind =>
  p.video ? "video" : p.image ? "image" : "none";

const STORE_HOSTS = ["extensions.gnome.org", "addons.mozilla.org"];
export const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");
const OWN_SITES = ["blog.eucaue.online"];
export const previewKind = (url: string) =>
  STORE_HOSTS.includes(hostOf(url)) ? "store" : OWN_SITES.includes(hostOf(url)) ? "site" : "demo";

// Previous and next project in the full list (filters do not apply), wrapping at the ends.
export const neighbors = (slug: string) => {
  const i = projects.findIndex((p) => projectSlug(p) === slug);
  const at = (k: number) => projectSlug(projects[(k + projects.length) % projects.length]);
  return { prev: at(i - 1), next: at(i + 1), index: i + 1 };
};
