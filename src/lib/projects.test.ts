import { describe, expect, test } from "bun:test";
import { projects } from "@/data/projects";
import {
  filterProjects,
  findProjectBySlug,
  mediaKind,
  neighbors,
  PLATFORMS,
  previewKind,
  projectSlug,
  slugFromKey,
  techOptions,
} from "./projects";

describe("slugs", () => {
  test("titleKey becomes kebab case", () => {
    expect(slugFromKey("projects.quickLofi.title")).toBe("quick-lofi");
    expect(slugFromKey("projects.pixDonation.title")).toBe("pix-donation");
    expect(slugFromKey("projects.decomp.title")).toBe("decomp");
  });
  test("every project has a unique slug", () => {
    const slugs = projects.map(projectSlug);
    expect(new Set(slugs).size).toBe(projects.length);
  });
  test("findProjectBySlug ignores filters and unknown slugs", () => {
    expect(findProjectBySlug("harbor")?.titleKey).toBe("projects.harbor.title");
    expect(findProjectBySlug("nope")).toBeUndefined();
    expect(findProjectBySlug(null)).toBeUndefined();
  });
});

describe("order", () => {
  test("Quick Lofi is the first featured project", () => {
    expect(projects.filter((p) => p.featured)[0].titleKey).toBe("projects.quickLofi.title");
  });
  test("featured projects, with the blog where Auto Volume was", () => {
    expect(projects.filter((p) => p.featured).map(projectSlug)).toEqual([
      "quick-lofi",
      "flexa",
      "blog",
      "scrolled",
      "pix-donation",
      "harbor",
    ]);
  });
  test("Auto Volume and My Movies are gone", () => {
    expect(findProjectBySlug("auto-volume")).toBeUndefined();
    expect(findProjectBySlug("my-movies")).toBeUndefined();
  });
  test("only platforms that have projects are offered", () => {
    expect(PLATFORMS).toEqual(["web", "extension", "gnome", "cli"]);
  });
});

describe("filterProjects", () => {
  test("no filters returns everything in order", () => {
    expect(filterProjects(projects, { platform: null, tech: null })).toEqual(projects);
  });
  test("platform filter", () => {
    const gnome = filterProjects(projects, { platform: "gnome", tech: null });
    expect(gnome.map(projectSlug)).toEqual(["quick-lofi", "flexa", "nautilus-copy"]);
  });
  test("platform and tech combine", () => {
    expect(
      filterProjects(projects, { platform: "gnome", tech: "Python" }).map(projectSlug),
    ).toEqual(["flexa", "nautilus-copy"]);
  });
  test("impossible combination is empty", () => {
    expect(filterProjects(projects, { platform: "cli", tech: "Python" })).toEqual([]);
  });
});

describe("helpers", () => {
  test("techOptions lists shared tags, most used first", () => {
    const opts = techOptions(projects);
    expect(opts.length).toBeGreaterThan(0);
    expect(opts.every((o) => o.count > 1)).toBe(true);
    expect(opts[0].count).toBeGreaterThanOrEqual(opts[opts.length - 1].count);
  });
  test("mediaKind", () => {
    expect(mediaKind(findProjectBySlug("decomp") ?? projects[0])).toBe("none");
    expect(mediaKind(findProjectBySlug("harbor") ?? projects[0])).toBe("image");
    expect(mediaKind(findProjectBySlug("flexa") ?? projects[0])).toBe("video");
  });
  test("previewKind tells store pages from demos", () => {
    expect(previewKind("https://extensions.gnome.org/extension/6904/quick-lofi/")).toBe("store");
    expect(previewKind("https://addons.mozilla.org/en-US/firefox/addon/scrolled/")).toBe("store");
    expect(previewKind("https://get-cat.vercel.app/")).toBe("demo");
    expect(previewKind("https://blog.eucaue.online/")).toBe("site");
  });
});

describe("media assets", () => {
  test("every video has a poster file in public/", async () => {
    for (const p of projects.filter((x) => x.video)) {
      expect({ slug: projectSlug(p), poster: p.video?.poster ?? null }).not.toEqual({
        slug: projectSlug(p),
        poster: null,
      });
      expect(await Bun.file(`public${p.video?.poster}`).exists()).toBe(true);
    }
  });
});

describe("neighbors", () => {
  test("walks the full list and wraps at both ends", () => {
    const first = projectSlug(projects[0]);
    const last = projectSlug(projects[projects.length - 1]);
    expect(neighbors(first)).toEqual({ prev: last, next: projectSlug(projects[1]), index: 1 });
    expect(neighbors(last).next).toBe(first);
  });
});
