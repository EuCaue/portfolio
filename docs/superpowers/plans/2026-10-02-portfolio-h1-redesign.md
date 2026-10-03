# Portfolio H1 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the approved H1 mockup (`.impeccable/mocks/explorations/h1-atual-refinado.html`) in the Next.js app: the current clean, neutral look, refined, with URL-driven filters, a draggable project preview dialog, rewritten copy in both languages and one playful section (About).

**Architecture:** Pure logic (project slugs, platforms, filtering, URL state) lives in `src/lib/` and is covered by `bun test`. Sections stay in `src/components/sections/`, small reusable pieces in `src/components/portfolio/`, shadcn primitives in `src/components/ui/`, and adapted React Bits components in `src/components/react-bits/`. URL state is read with `useSearchParams` and written with `router.replace(..., { scroll: false })`; the projects section renders a static, unfiltered fallback inside `<Suspense>` so the server HTML always lists every project.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind 3, framer-motion 12 (`LazyMotion` + `m`), lucide-react, next-themes, Radix (dialog, dropdown-menu, toast, slot, label, separator), EmailJS, zod. Tests with the Bun runtime's built-in `bun test` (no new dependency).

**Spec:** the user's request (2026-10-02, items 1-10, quoted in Global Constraints), the approved mockup `h1-atual-refinado.html`, and `PRODUCT.md`.

## Global Constraints

- No new npm dependencies. React Bits components are copied as source and import from `framer-motion`, never `motion/react` or `gsap`.
- Featured projects keep the order of `src/data/projects.ts`; Quick Lofi is first. Other projects keep their data order.
- Section order: Hero, Projects, About, Contact, Footer. The nav follows the same order.
- Visual: clean and minimal first. Zinc neutrals, one accent (emerald) only for "published" status and success states. Max 2 type families: Geist and Geist Mono. Inter is not used as a display face.
- Spacing in multiples of 4px. Contrast WCAG AA in both themes. Light and dark through CSS tokens.
- Banned: purple/blue gradients, glassmorphism, blobs, "Hello, I'm X" hero, emoji as icons, skill bars, invented testimonials or numbers, decorative timeline, "my process", animating every element, em dashes or en dashes in copy.
- Every project opens a preview dialog (video, GIF or image, description, tags, links). The dialog can be dragged around the screen on pointer devices with a viewport width of 640px or more.
- URL controls the important state: `?platform=<web|mobile|extension|gnome|cli>`, `?tech=<tag>`, `?project=<slug>`. Unknown values are ignored.
- Accessibility: semantic landmarks, skip link, visible focus, keyboard access to every control, alt text and aria labels, `prefers-reduced-motion` respected everywhere.
- Copy in `en.ts` and `pt-BR.ts` is rewritten with the humanizer skill: plain, specific, no AI tells, facts unchanged.
- Responsive 360px to 1920px without horizontal scroll.

## Review Focus

1. `?project=nonexistent` or `?platform=GNOME` (wrong case) in a shared link: the page must load normally, no dialog, filters fall back to "all". Test in `url-state.test.ts`.
2. `?project=` pointing at a project hidden by the current filter: the dialog still opens for that project. Test in `projects.test.ts` (`findProjectBySlug` ignores filters).
3. A filter combination with zero results (`?platform=cli&tech=Python`): empty state with a working "Clear filters" button, not a blank section. Test in `projects.test.ts` plus the screenshot pass.
4. Projects with no media (Auto Volume, decomp): card and dialog show a clear "No preview available" state, no broken `<video>`. Test in `projects.test.ts` (`mediaKind` returns `"none"`).
5. Reduced motion: no autoplaying video, no blur-in text, no drag animation on the About stack; content visible immediately. Checked in the screenshot pass with `--force-prefers-reduced-motion`.

---

### Task 1: Project data model and pure logic

**Files:**
- Modify: `src/data/projects.ts` (add `platform` to every entry)
- Create: `src/lib/projects.ts`
- Create: `src/lib/url-state.ts`
- Test: `src/lib/projects.test.ts`, `src/lib/url-state.test.ts`

**Interfaces:**
- Produces: `type Platform = "web" | "mobile" | "extension" | "gnome" | "cli"`, `PLATFORMS: Platform[]`, `slugFromKey(titleKey: string): string`, `projectSlug(p: Project): string`, `findProjectBySlug(slug: string | null): Project | undefined`, `filterProjects(list: Project[], f: Filters): Project[]`, `techOptions(list: Project[]): { tag: string; count: number }[]`, `mediaKind(p: Project): "video" | "image" | "none"`, `previewKind(url: string): "store" | "demo"`, `type Filters = { platform: Platform | null; tech: string | null }`, `type UrlState = Filters & { project: string | null }`, `parseUrlState(params: URLSearchParams): UrlState`, `writeUrlState(current: URLSearchParams, patch: Partial<UrlState>): string`.

- [ ] **Step 1: Write the failing tests**

```ts
// src/lib/projects.test.ts
import { describe, expect, test } from "bun:test";
import { projects } from "@/data/projects";
import { filterProjects, findProjectBySlug, mediaKind, previewKind, projectSlug, slugFromKey, techOptions } from "./projects";

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
    expect(filterProjects(projects, { platform: "gnome", tech: "Python" }).map(projectSlug)).toEqual(["flexa"]);
  });
  test("impossible combination is empty", () => {
    expect(filterProjects(projects, { platform: "cli", tech: "Python" })).toEqual([]);
  });
});

describe("helpers", () => {
  test("techOptions lists shared tags, most used first", () => {
    const opts = techOptions(projects);
    expect(opts.every((o) => o.count > 1)).toBe(true);
    expect(opts[0].count).toBeGreaterThanOrEqual(opts[opts.length - 1].count);
  });
  test("mediaKind", () => {
    expect(mediaKind(findProjectBySlug("auto-volume")!)).toBe("none");
    expect(mediaKind(findProjectBySlug("harbor")!)).toBe("image");
    expect(mediaKind(findProjectBySlug("flexa")!)).toBe("video");
  });
  test("previewKind tells store pages from demos", () => {
    expect(previewKind("https://extensions.gnome.org/extension/6904/quick-lofi/")).toBe("store");
    expect(previewKind("https://addons.mozilla.org/en-US/firefox/addon/scrolled/")).toBe("store");
    expect(previewKind("https://get-cat.vercel.app/")).toBe("demo");
  });
});
```

```ts
// src/lib/url-state.test.ts
import { describe, expect, test } from "bun:test";
import { parseUrlState, writeUrlState } from "./url-state";

const p = (s: string) => new URLSearchParams(s);

describe("parseUrlState", () => {
  test("reads valid values", () => {
    expect(parseUrlState(p("platform=gnome&tech=Python&project=flexa"))).toEqual({ platform: "gnome", tech: "Python", project: "flexa" });
  });
  test("ignores unknown or badly cased values", () => {
    expect(parseUrlState(p("platform=GNOME&tech=Cobol&project=nope"))).toEqual({ platform: null, tech: null, project: null });
  });
  test("empty params", () => {
    expect(parseUrlState(p(""))).toEqual({ platform: null, tech: null, project: null });
  });
});

describe("writeUrlState", () => {
  test("sets and removes keys, keeps unrelated params", () => {
    expect(writeUrlState(p("utm=x"), { platform: "web" })).toBe("?utm=x&platform=web");
    expect(writeUrlState(p("platform=web&project=flexa"), { project: null })).toBe("?platform=web");
    expect(writeUrlState(p("platform=web"), { platform: null })).toBe("");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun test src/lib`
Expected: FAIL, modules `./projects` and `./url-state` not found.

- [ ] **Step 3: Add `platform` to the data**

In `src/data/projects.ts`, add `platform: Platform;` to the `Project` type (import `type Platform` from `@/lib/projects`) and set it per entry: Quick Lofi `gnome`, Flexa `gnome`, Auto Volume `mobile`, Scrolled `extension`, PIX Donation `web`, Harbor `cli`, Feed Pet `web`, CSS Cursor Gallery `web`, My Movies `web`, Reddit Auto Theme `extension`, URL Short `web`, Snap The Web `web`, Get Cat `web`, Nautilus Copy `gnome`, decomp `cli`.

- [ ] **Step 4: Write the implementation**

```ts
// src/lib/projects.ts
import { type Project, projects } from "@/data/projects";

export type Platform = "web" | "mobile" | "extension" | "gnome" | "cli";
export const PLATFORMS: Platform[] = ["web", "mobile", "extension", "gnome", "cli"];
export type Filters = { platform: Platform | null; tech: string | null };

export const slugFromKey = (titleKey: string) =>
  titleKey.split(".")[1].replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
export const projectSlug = (p: Project) => slugFromKey(p.titleKey);

export const findProjectBySlug = (slug: string | null) =>
  slug ? projects.find((p) => projectSlug(p) === slug) : undefined;

export const filterProjects = (list: Project[], f: Filters) =>
  list.filter((p) => (!f.platform || p.platform === f.platform) && (!f.tech || p.tags.includes(f.tech)));

export const techOptions = (list: Project[]) => {
  const counts = new Map<string, number>();
  for (const p of list) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts]
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }));
};

export const mediaKind = (p: Project) => (p.video ? "video" : p.image ? "image" : "none");
export const previewKind = (url: string) =>
  /(^|\.)extensions\.gnome\.org$|(^|\.)addons\.mozilla\.org$/.test(new URL(url).hostname) ? "store" : "demo";
export const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");
```

```ts
// src/lib/url-state.ts
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
  for (const [k, v] of Object.entries(patch)) {
    if (v) next.set(k, v);
    else next.delete(k);
  }
  const qs = next.toString();
  return qs ? `?${qs}` : "";
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `bun test src/lib`
Expected: all tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data/projects.ts src/lib/projects.ts src/lib/url-state.ts src/lib/*.test.ts
git commit -m "feat: add project platforms, filtering and URL state helpers"
```

### Task 2: Design tokens, fonts and motion setup

**Files:**
- Modify: `src/app/globals.css` (zinc tokens, accent, selection, scrollbar, reduced motion)
- Modify: `src/app/[locale]/layout.tsx` (Geist + Geist Mono via `next/font/google`, `MotionProvider`, skip link)
- Modify: `tailwind.config.ts` (`fontFamily.sans/mono` from CSS vars, `success` color, `container` max 1152px)
- Create: `src/components/common/motion-provider.tsx`

**Interfaces:**
- Produces: CSS vars `--background --foreground --muted --muted-foreground --border --primary --primary-foreground --success`; Tailwind classes `font-sans font-mono text-success`; `<MotionProvider>` wrapping children in `LazyMotion features={domMax} strict` and `MotionConfig reducedMotion="user"`.

- [ ] **Step 1:** Replace the HSL tokens with zinc values (light: background `0 0% 100%`, foreground `240 10% 3.9%`, muted `240 4.8% 95.9%`, muted-foreground `240 3.8% 40%` (AA on white), border `240 5.9% 90%`, primary `240 5.9% 10%`, success `161 94% 26%`; dark: background `240 10% 3.9%`, foreground `0 0% 98%`, muted `240 3.7% 15.9%`, muted-foreground `240 5% 64.9%`, border `240 3.7% 15.9%`, primary `0 0% 98%`, success `158 64% 52%`).
- [ ] **Step 2:** Add `::selection`, `scroll-padding-top: 5rem`, `html { scroll-behavior: smooth }` gated by `prefers-reduced-motion: no-preference`.
- [ ] **Step 3:** Create `MotionProvider`:

```tsx
"use client";
import { domMax, LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
```

- [ ] **Step 4:** In the layout load `Geist` and `Geist_Mono` with `variable: "--font-sans" / "--font-mono"`, wrap body content in `MotionProvider`, add `<a href="#main" class="sr-only focus:not-sr-only ...">` as the first body child.
- [ ] **Step 5:** Every `motion.*` in the codebase becomes `m.*` (strict mode throws otherwise). Run `grep -rn "motion\." src` and expect no results.
- [ ] **Step 6:** Run `bun run build`; expected: build succeeds. Commit `feat: switch to zinc tokens, Geist and lazy motion`.

### Task 3: Copy rewrite (humanizer), both languages

**Files:**
- Modify: `src/locales/en.ts`, `src/locales/pt-BR.ts`

- [ ] **Step 1:** Remove unused keys (`intro.hello`, `intro.scrollDown`, `intro.viewWork`, `about.visual.*`, `about.skills`, `projects.openPreview`, `contact.info.*`, `contact.form.title/subtitle`, `contact.form.toast.*`, `nav.home`).
- [ ] **Step 2:** Add keys: `nav.blog`, `nav.links`, `a11y.skip`, `theme.toggle`, `filter.platform`, `filter.all`, `platform.web|mobile|extension|gnome|cli`, `filter.tech`, `filter.anyTech`, `filter.count`, `filter.countAll`, `filter.empty`, `filter.clear`, `project.open`, `project.source`, `project.store`, `project.demo`, `project.published`, `project.noPreview`, `project.prev`, `project.next`, `project.close`, `project.dragHint`, `project.builtWith`, `about.stack.title`, `about.stack.hint`, `about.stack.next`, `about.stack.position`, `contact.copy`, `contact.copied`, `contact.email`.
- [ ] **Step 3:** Rewrite every visible string with the humanizer rules (no "passionate", no "seamless", no "robust", no staged contrasts, no dashes, sentence case for buttons). Project descriptions keep every fact (Quick Lofi 10,000+ downloads, Flexa Flatpak/RPM via GitHub Actions, Harbor native threads without an async runtime, etc.). The Portuguese file gets the same pass, and the strings that were still in English there (`contact.form.error*`, `footer.*`, `language.*`) get translated.
- [ ] **Step 4:** `grep -nP "[\x{2014}\x{2013}]" src/locales` returns nothing. Commit `content: rewrite site copy in plain language`.

### Task 4: Shared pieces and React Bits adaptations

**Files:**
- Create: `src/components/ui/badge.tsx` (shadcn badge, cva)
- Create: `src/components/react-bits/blur-text.tsx` (from React Bits BlurText; `motion` to `m` from framer-motion; renders spans `aria-hidden`; returns plain text when `useReducedMotion()` is true)
- Create: `src/components/react-bits/stack.tsx` (from React Bits Stack; `m` from framer-motion; exposes `sendTopToBack()` through a `ref` so a keyboard button can drive it; no random rotation on re-render, rotation seeded per index)
- Create: `src/components/portfolio/reveal.tsx` (one fade-up on first view, `m.div` with `whileInView`, `viewport={{ once: true, amount: 0.2 }}`)
- Create: `src/components/portfolio/project-media.tsx` (`<ProjectMedia project mode="card" | "dialog">`: video with `preload="none"`, poster, plays only while in view and only without reduced motion; image with width/height and `loading="lazy"`; `"none"` renders the empty state)
- Create: `src/components/portfolio/copy-email.tsx` (button, clipboard write, `aria-live` "Email copied")
- Generate posters: `ffmpeg -ss 1 -i public/<name>.mp4 -frames:v 1 -vf scale=960:-2 public/posters/<name>.webp` for every local video, and from the two remote videos when ffmpeg can read them; add `poster` to `Video` in `projects.ts`.

- [ ] Steps: write each file, import it nowhere yet, run `bunx tsc --noEmit` (expected: no errors in new files), commit `feat: add media, reveal, copy email and adapted React Bits pieces`.

### Task 5: Navbar and hero

**Files:** Modify `src/components/common/navbar.tsx`, `src/components/sections/intro.tsx`

- Navbar: solid background, hairline border after the hero scrolls out (IntersectionObserver, no scroll listener), links Projects, About, Contact, Blog, Links (external icon), language switcher, theme toggle, Resume button. Active section underlined via IntersectionObserver. Mobile: Sheet menu with the same links plus Resume.
- Hero: left aligned, `max-w-3xl`. `<h1>` with sr-only name and `BlurText` visuals; role and location line with `MapPin`; description; buttons "Download CV" (primary) and "Get in touch" (outline); quick row with `CopyEmail`, GitHub, LinkedIn. Height is content-driven (no `min-h-[90vh]`), so the projects heading shows in a 1440x900 first viewport.
- [ ] Verify: screenshot at 1440x900 and 360x780 in both themes; keyboard tab order reaches skip link, nav, CTAs. Commit `feat: rebuild navbar and hero`.

### Task 6: Projects section with URL filters

**Files:** Create `src/hooks/use-url-state.ts`, `src/components/portfolio/project-filters.tsx`, `src/components/portfolio/project-card.tsx`, `src/components/portfolio/project-row.tsx`; rewrite `src/components/sections/projects.tsx`.

- `useUrlState()` returns `[state, set]` where `set(patch)` calls `router.replace(pathname + writeUrlState(params, patch), { scroll: false })`.
- `Projects` = `<Suspense fallback={<ProjectsView state={EMPTY} onChange={noop} />}><ProjectsWithUrl /></Suspense>`.
- Filters: a `role="group"` of toggle buttons with `aria-pressed` and counts; tech filter is a shadcn `DropdownMenu` with a radio group; live region "Showing 3 of 15 projects"; empty state with "Clear filters".
- Grid: featured cards `sm:grid-cols-2 lg:grid-cols-3`, `m.div layout` with `AnimatePresence mode="popLayout"` for filter changes; other projects as a bordered list. Each card has a full-card button (title button with `::after` overlay) that sets `?project=<slug>`; GitHub and demo links sit above the overlay and stay clickable.
- [ ] Verify: `?platform=gnome` shows 3 cards, `?platform=cli&tech=Python` shows the empty state, back/forward restores filters. Commit `feat: projects section with URL driven filters`.

### Task 7: Draggable project dialog

**Files:** Create `src/components/portfolio/project-dialog.tsx`; mount it inside `ProjectsWithUrl`.

- Radix `Dialog` controlled by `state.project`; `onOpenChange(false)` writes `project: null`. Content is an `m.div` with `drag`, `dragControls`, `dragListener={false}`, `dragMomentum={false}`, `dragConstraints` = a fixed full-viewport ref; the header bar starts the drag (`onPointerDown`), shows a grip icon and the hint "Drag to move" as `title`. Drag is disabled below 640px and with reduced motion. Position resets on every open (`key={slug}`).
- Body: `ProjectMedia mode="dialog"` (video with controls), name, platform badge, "Published on {host}" when the preview is a store page, full description, tags, GitHub and store/demo buttons, previous and next buttons that walk the full project list and update `?project=`.
- [ ] Verify: open via click and via a direct URL; Esc and the close button clear the param; focus returns to the card; dialog drags on desktop. Commit `feat: draggable project preview dialog`.

### Task 8: About with the playful stack

**Files:** Rewrite `src/components/sections/about.tsx`

- Two paragraphs on the left. On the right a React Bits `Stack` of the four skill groups as cards (title plus items), draggable with the pointer; a "Next card" button and a "2 of 4" counter drive it from the keyboard; an `sr-only` list contains every skill so screen readers get all of it at once. Reduced motion: the stack turns into a static 2x2 grid.
- [ ] Verify: drag on desktop, button on keyboard, screenshot both themes. Commit `feat: about section with a draggable skill stack`.

### Task 9: Contact and footer

**Files:** Rewrite `src/components/sections/contact.tsx` (keep the EmailJS call, zod validation, honeypot and toast), `src/components/sections/footer.tsx`

- Contact: left column with the short invitation, `CopyEmail`, GitHub, LinkedIn; right column the form in a bordered surface with labels above inputs, inline errors under each field linked with `aria-describedby`, `aria-invalid`, a submit button that shows "Sending..." and is disabled while sending.
- Footer: copyright, eucaue.online, Blog, Resume.
- [ ] Verify: submit empty form shows three inline errors and focuses the first. Commit `feat: restyle contact and footer`.

### Task 10: Page order and verification

**Files:** Modify `src/app/[locale]/page.tsx`

- [ ] Order: `<Intro/> <Projects/> <About/> <Contact/>`, `<main id="main">`.
- [ ] Run `bun test`, `bunx tsc --noEmit`, `bunx biome check src`, `bun run build`. All pass.
- [ ] Screenshots with headless Chrome into `.impeccable/review/impl/`: full page 1440 light and dark, 360 light, hero 1440x900, filtered state, empty state, dialog open, About stack, reduced motion.
- [ ] Run `impeccable detect --json` on the changed files and fix what is mechanical.
- [ ] Commit `chore: verify redesign`.
