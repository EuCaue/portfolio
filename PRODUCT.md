# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and tech leads evaluating Cauê Souza for a full-time or remote software engineering role. They scan quickly, want to judge technical level from real shipped work, and leave with the resume or a message.

## Product Purpose

Personal portfolio of Cauê Souza, Software Engineer based in Salvador, Brazil. Success means a recruiter understands within seconds what Cauê builds, sees proof in shipped projects, and downloads the resume or sends a message.

## Positioning

Web and mobile engineer first (React, Next.js, React Native, TypeScript). Desktop and system-level work (GNOME Shell extensions, GTK4 apps, a Rust daemon) is the differentiator that shows range and depth, not the headline.

## Operating Context

- Bilingual site: `/en` and `/pt-br` routes with a language switcher. All copy lives in `src/locales/en.ts` and `src/locales/pt-BR.ts`.
- Resume served from `/api/resume/[lang]`.
- Contact form via EmailJS (name, email, message) with client-side validation and success/error states.
- Links to a linktree (`https://eucaue.online`) and blog (`https://blog.eucaue.online`) in navbar and footer.
- Contact: `souzacaue@proton.me`, GitHub `EuCaue`, LinkedIn `caue-souza`.

## Capabilities and Constraints

- Stack is fixed: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 3, framer-motion, lucide-react, next-themes, Radix primitives.
- No new dependencies except React Bits components.
- All 15 projects stay on the site (6 featured, 9 others), with their real descriptions, tags, GitHub and preview links.

## Brand Commitments

- Name: Cauê Souza. Existing light and dark favicons in `public/`.
- Content stays as written; only presentation changes.

## Evidence on Hand

- Quick Lofi: over 10,000 downloads on extensions.gnome.org (stated in project copy).
- Demo videos: `public/flexa.mp4`, `public/scrolled.mp4`, `public/pix-donation.mp4`, `public/reddit-auto-theme.mp4`, Quick Lofi and CSS Cursor Gallery videos on GitHub.
- Images: `public/harbor.gif`, `public/feed-pet.png`, `public/get-cat.png`, `public/nautilus-extension-copy-file-contents.png`, remote screenshots for My Movies, URL Short, Snap The Web.
- No testimonials, no employer logos, no metrics beyond the Quick Lofi download count. None may be invented.
- No portrait photo of Cauê in the repo.

## Product Principles

- Shipped work is the proof; every claim points at a real project.
- A recruiter must reach the resume and contact in one move from anywhere.
- Both languages are first-class.

## Accessibility & Inclusion

Keyboard navigation, visible focus, semantic HTML, alt text, WCAG AA contrast in both themes, `prefers-reduced-motion` respected. Responsive from 360px to 1920px.
