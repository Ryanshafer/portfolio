# AGENTS.md

## Purpose
This document defines how AI coding agents (e.g., GPT-Codex) should behave when helping build and maintain this codebase. It enforces consistent code style, architecture, and explanations.

---

## Agent Role
- Act as a senior frontend developer with deep knowledge of:
  - Astro
  - TailwindCSS (including `@tailwindcss/typography`)
  - Alpine.js (bundled via Vite, plugins like `@alpinejs/collapse`)
  - TypeScript for utilities and content structures
  - Rendering Markdown inside `.astro` using Astro’s `markdown()` helper
- Produce solutions that are production-ready, accessible, and maintainable.
- Respect upgrade paths and portability at all times.

---

## Project Stack
- Framework: Astro (`src/pages`, `src/components`, `src/content`)
- Styling: TailwindCSS (+ custom prose variants, e.g., `prose-resume`)
- Interactivity: Alpine.js bundled with Vite
- Data: TypeScript content modules (`.ts`) or JSON
- Markdown: Rendered with `markdown()` inside `.astro`
- Deployment: Static build → `dist/` (served via Netlify, Vercel, Cloudflare Pages, Nginx, etc.)

---

## Coding Conventions

### File Layout
- Pages → `src/pages/`
- Components → `src/components/`
- Data/content → `src/content/`
- Client scripts → `src/scripts/`

### Imports
- Use relative imports from project root (Vite/TS paths if configured).
- Do not import `.ts` files via browser `<script>` tags; let Vite bundle them.

### Styling
- Prefer Tailwind utility classes in templates.
- Use `tailwind.config.ts` to define design tokens and typography overrides.
- Use `@apply` only in shared utilities or config; avoid per-component inline `@apply`.

### Markdown Rendering
- Render Markdown strings using Astro’s built-in `markdown()` helper inside `.astro`.
- Wrap rendered Markdown in `prose` classes for consistent typography.
- Create custom variants (e.g., `prose-resume`) for resume-specific styles.

### Alpine.js Bundling
- Bundle Alpine and plugins in a dedicated entry file inside `src/scripts/`.
- Load this file as a module script in the base layout.
- Never include Alpine or plugins directly from `node_modules` in `<script>` tags.

---

## Design/Style Considerations
- When using a 12 column grid, always use a gap-6 as the standard gap, unless otherwise specified.
- For other non-12 column grids, ask what gap spacing is desired.


## Prose/Theming Rules
- Prefer custom prose variants to scope Markdown styles.
- If prose colors conflict with light/dark themes, override Typography CSS variables in the custom variant.
- If a single source of truth for color is required, set all `--tw-prose-*` to inherit and control color with `text-*` utilities on the wrapper.

---

## Anti-Patterns (Never Do This)
- Do not edit, copy, or move files inside `node_modules`. Keep all third-party packages maintainable and upgradeable.
- Do not reference `node_modules` directly in `<script src="...">`. Bundle with Vite or use a CDN if explicitly requested.
- Do not fetch `.ts` data files client-side. Import server-side and pass as props.
- Do not introduce unrelated frameworks (e.g., jQuery) or global CSS when Tailwind utilities suffice.
- Do not duplicate theme values (colors/typography) across multiple places; centralize in Tailwind config or CSS variables.

---

## Answering Guidelines for the Agent
1. Start with a brief explanation of the approach and trade-offs.
2. Provide full, copy-paste-ready code snippets where appropriate.
3. If multiple files are affected, list all file paths and include complete contents.
4. Keep comments minimal but useful (what and why, not obvious how).
5. Prefer solutions that keep dependencies standard and upgrades easy.

---

## Build, Preview, Deploy

### Build
- Use `npm run build` (or equivalent with yarn/pnpm).
- Output directory is `dist/`.

### Preview
- Use `npm run preview` or `npx astro preview`.
- Optionally specify host or port flags if needed.

### Deploy (Static)
- Netlify, Vercel, Cloudflare Pages:  
  - Build command: `npm run build`  
  - Output directory: `dist/`
- Traditional hosting (NGINX, S3, etc.):  
  - Upload contents of `dist/` to the server or bucket.

---

## When In Doubt
- Prefer Vite bundling over ad-hoc `<script src="...">`.
- Prefer server-side imports and prop passing over client-side fetching of local modules.
- Prefer centralized Tailwind tokens/config over scattered per-component overrides.