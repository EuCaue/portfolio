---
name: add-portfolio-project
description: Use when adding, updating, or reordering a project in this portfolio, whether from a GitHub repo URL, pasted context, media link, existing public asset, or terminal/CLI project
---

# Add portfolio project

Add entry to `src/data/projects.ts` + `src/locales/en.ts` + `src/locales/pt-BR.ts` with verified facts, humanized bilingual copy, correct `public/` media, and justified `featured` placement.

**REQUIRED SUB-SKILL:** Use `humanizer` for every description.

## Workflow

### 1. Resolve repo and verify

```bash
gh repo view <owner/repo> --json name,description,languages,topics,homepageUrl,stargazersCount,updatedAt --jq .
gh api repos/<owner/repo>/readme --jq .content | base64 -d | head -n 120
```

Cross-check user context against `gh` + README + source. If private/mismatch, stop and ask. For doubts, use `grill-me`: short pointed questions until gap closed. Never invent facts.

### 2. Collect gaps

Ask only for what `gh`/context did not give:

- `slug` (kebab-case -> `projects.<slug>.title`), `title`
- `description` scope (what it does, key tech, one outcome)
- `tags` (3-8, reuse casing from `projects.ts`: `TypeScript`, `Next.js`, `CLI`)
- `github`, `preview` (optional)
- `media`: `/name.png` or `/name.mp4` or remote `https://...` video url; omit if none
- `featured` — you propose, user confirms

### 3. Draft copy via humanizer

Existing voice: 1-2 sentences, concrete, no hype. E.g. EN: "A native GNOME app for converting Windows cursor themes to Linux format. Built with Python, GTK4, and LibAdwaita, with automated CI/CD via GitHub Actions for Flatpak and RPM."

1. Draft raw EN + PT from verified facts.
2. Run `humanizer` pass (strip inflated claims, sales language, AI words, em dashes, generic endings).
3. Keep every claim, add none. Numbers must come from `gh`.

### 4. Featured vs other

Explain choice in one line. **Featured** if 2+ of: real users/downloads, store/live demo, non-trivial scope (native app, extension, mobile OS integration), distinct tech for portfolio. Otherwise **other**. Cap featured at 5-6, demoting old featured is normal. Reorder `projects` array accordingly.

### 5. Media

- Link provided -> download to `public/<slug>.ext`, ref as `/<slug>.ext`
- Already in `public/` -> verify with `ls public/`, keep path
- GIF/media already in README (e.g. `![demo](demo.gif)` or `demo.mp4`) -> extract path from README, download via `https://raw.githubusercontent.com/<owner>/<repo>/master/<path>` to `public/<slug>.ext`, ref locally as `/<slug>.ext` (prefer local copy over remote for performance)
- Remote github assets video -> keep `https://...` in `video.sources[0].url`
- None -> leave `image`/`video` absent (fallback icon)
- Terminal/CLI detected (tags has CLI or repo is TUI) -> ask: "Quer que eu gere um `.tape` e rode `vhs` para criar o gif?" If yes, create tape and run `vhs <slug>.tape` -> `public/<slug>.gif`:

```tape
Output public/<slug>.gif
Set Width 1200
Set Height 700
Type "my-cli --help"
Sleep 500
Enter
Sleep 1500
```

### 6. Edit files

```ts
// src/data/projects.ts
{
  titleKey: "projects.<slug>.title",
  descriptionKey: "projects.<slug>.description",
  image: "/<slug>.png", // or video: { sources: [{ url: "/<slug>.mp4", type: "mp4" }] }
  tags: ["TypeScript", "Next.js"],
  github: "https://github.com/...",
  preview: "https://...",
  featured: true,
}
// en.ts / pt-BR.ts
"projects.<slug>.title": "My Project",
"projects.<slug>.description": "One or two concrete sentences. What it does, how built, one result.",
```

Keep keys near other `projects.*` entries.

### 7. Verify

```bash
bun run build  # must pass
ls public/<slug>.*  # media exists if referenced
```

## Input modes

1. **Repo URL** -> step 1 extracts, step 2 for gaps.
2. **Full context** -> verify repo if mentioned, then humanize; ask for missing fields.
3. **Context + media link** -> as 2 + download.
4. **Context/repo + media in `public/`** -> verify file, no download.
5. **GIF/media in README** -> as 1, but download README asset to `public/` instead of asking for link (harbor case: `demo.gif` -> `public/harbor.gif`).
6. **Terminal project** -> as above + VHS prompt.

## Common mistakes

- Inventing stack/features not in repo
- Hype adjectives -> humanizer removes
- Missing PT translation
- Using `github.com/.../blob/.../img.png` directly -> use `?raw=true` or copy to `public/`
- Adding deps for gif -> use `vhs` only
