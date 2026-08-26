# Plano: Linktree + Blog (eucaue.online)

## Arquitetura

3 subdomínios, 3 repositórios:

```
eucaue.online            → Repo "linktree"     HTML/CSS/JS puro
blog.eucaue.online        → Repo "blog"         Astro + Tailwind + Markdown
portfolio.eucaue.online   → Repo "portfolio"    Next.js (existente)
```

---

## 1. Linktree (eucaue.online)

### Stack
- HTML + CSS + JS puro (zero build)
- Dark/light via `prefers-color-scheme` + `localStorage`
- Deploy: Vercel (static files, root directory sem build command)

### Estrutura de arquivos
```
linktree/
├── index.html          # foto, nome, título, bio, links
├── style.css           # CSS custom properties para temas
├── script.js           # toggle de tema
├── avatar.jpg          # foto sua
├── favicon.svg         # favicon
├── sun.svg             # ícone sol (light mode)
├── moon.svg            # ícone lua (dark mode)
├── github.svg
├── linkedin.svg
├── email.svg
├── portfolio.svg
└── blog.svg
```

### index.html
- Avatar redondo
- Nome: "Cauê Souza"
- Título: "Software Engineer"
- Bio: 1-2 linhas sobre você
- Links com ícones:
  - GitHub, LinkedIn, Email (contato)
  - Portfolio, Blog (subdomínios)
- Toggle de tema no canto superior direito

### style.css
- CSS custom properties: `--bg`, `--text`, `--muted`, `--accent`, `--border`
- `@media (prefers-color-scheme: dark)` como fallback
- Layout vertical, centrado, `max-width: 480px`
- Animações sutil: `transition`, `hover: translateY(-1px)`

### script.js (~20 linhas)
- Ler `localStorage.theme` ou `matchMedia`
- Aplicar classe `.dark` no `<html>`
- Toggle salva em `localStorage`

---

## 2. Blog (blog.eucaue.online)

### Stack
- Astro 5.x (SSR static output)
- Tailwind CSS
- Content Collections (Markdown)
- Bilingual: `en` + `pt-BR`
- RSS feed por idioma

### Estrutura de arquivos
```
blog/
├── src/
│   ├── content/
│   │   ├── config.ts                     # schema Zod
│   │   └── posts/
│   │       ├── en/
│   │       │   └── hello-world.md
│   │       └── pt-BR/
│   │           └── hello-world.md
│   ├── pages/
│   │   ├── index.astro                   # redirect pro idioma certo
│   │   ├── [lang]/
│   │   │   ├── index.astro               # listagem de posts
│   │   │   ├── [...slug].astro           # post individual
│   │   │   └── rss.xml.ts                # RSS por idioma
│   │   └── favicon.svg
│   ├── layouts/
│   │   ├── BlogPost.astro                # layout de leitura
│   │   └── Layout.astro                  # layout base
│   ├── components/
│   │   ├── ThemeToggle.astro
│   │   └── Footer.astro
│   ├── lib/
│   │   ├── i18n.ts                       # constants + helpers
│   │   └── posts.ts                      # utility functions
│   └── styles/
│       └── global.css                    # Tailwind base
├── astro.config.mjs
├── tailwind.config.mjs
├── postcss.config.cjs
├── tsconfig.json
├── package.json
└── README.md
```

### astro.config.mjs
```js
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://blog.eucaue.online",
  output: "static",
  integrations: [sitemap()],
  trailingSlash: "ignore",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt-BR"],
  },
});
```

### Content Collection Schema (src/content/config.ts)
```ts
import { defineCollection } from "astro:content";
import { z } from "zod";

export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  }),
};
```

### i18n (src/lib/i18n.ts)
- `languages = { en: "English", "pt-BR": "Português" }`
- `defaultLang = "en"`
- Helper: `getLangFromUrl(pathname)` → extrai `lang` da URL
- Helper: `switchLanguage(lang)` → link pro mesmo slug no outro idioma

### Páginas

#### `/index.astro`
- Redirect automático pro idioma do browser (`navigator.language` ou `Accept-Language` header)
- Fallback: `en`

#### `/[lang]/index.astro`
- Lista todos os posts naquele idioma, ordenados por data (mais recente primeiro)
- Cada post: imagem (opcional), título, data, descrição, tags, link pro post individual

#### `/[lang]/[...slug].astro`
- `getStaticPaths` enumerando todos os posts do content collection
- Usa `post.render()` pra renderizar o Markdown
- `<Layout>` com tema dark/light
- Footer com links relacionados (mesmo slug, outro idioma + posts com tags em comum)

#### `/[lang]/rss.xml.ts`
- RSS por idioma via `@astrojs/rss`
- Itens: title, description, pubDate, link, tags

### Markdown Post Template
```md
---
title: "Título do Post"
date: 2025-01-01
description: "Descrição curta."
tags: ["astro", "web"]
---

Conteúdo em Markdown aqui.
```

### Tailwind Config
- Fonte: system font stack (`font-family: -apple-system, BlinkMacSystemFont, ...`)
- Colors: extend com HSL custom properties
- Prose: `@tailwindcss/typography` para estilizar Markdown (instalar separadamente)

### Deploy (Vercel)
- Repo: `blog`
- Root Directory: `blog/`
- Build Command: `npm run build` (astro.build)
- Output Directory: `dist/`
- Domain: `blog.eucaue.online`

---

## 3. Deploy & DNS

### linktree
- Vercel Project → Root Dir: `linktree/`, Framework Preset: Other, sem build
- Domain: `eucaue.online`

### blog
- Vercel Project → Root Dir: `blog/`, Framework Preset: Astro
- Domain: `blog.eucaue.online`

### portfolio
- Já existe deployado, apontar CNAME `portfolio.eucaue.online` pro deploy existente

### DNS (no registrador)
```
@        CNAME  eucaue-linktree.vercel.app
portfolio CNAME  seu-deploy-portfolio.vercel.app
blog      CNAME  eucaue-blog.vercel.app
```

### Dependências do blog
```bash
cd blog
npm init astro@latest -- --template basics
npm install @astrojs/tailwind @astrojs/sitemap @astrojs/rss zod
```

---

## Ordem de Implementação

1. Criar repo `site` (monorepo)
2. Estrutura de pastas (`linktree/`, `blog/`)
3. Build linktree (HTML/CSS/JS)
4. Scaffold Astro blog (astro.config, tailwind, content collection)
5. Paginas: index redirect, `[lang]/index`, `[lang]/[...slug]`
6. Layout BlogPost + Layout
7. RSS por idioma
8. Post de exemplo (en + pt-BR)
9. `npm install` + `npm run build` no blog → verificar build passa
10. Deploy no Vercel + configurar DNS

## Tempo Estimado

| Tarefa              | Tempo   |
|---------------------|---------|
| Linktree            | 2h      |
| Astro scaffold      | 3-4h    |
| Páginas + layout    | 3h      |
| RSS + deploy        | 1-2h    |
| **Total**           | **~1 dia** |