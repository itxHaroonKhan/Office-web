# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build → dist/
npm run lint      # TypeScript type-check (tsc --noEmit)
npm run preview   # Preview production build locally
```

## Environment

Copy `.env.example` to `.env` and set:
- `GEMINI_API_KEY` — required for the AI ChatBox feature
- `APP_URL` — base URL (`https://softwareelites.com` in production, `http://localhost:3000` for local dev)

`GEMINI_API_KEY` is injected at build time via `vite.config.ts` `define` — it is exposed to the client as `process.env.GEMINI_API_KEY`.

## Architecture

**Single-page application** — no router. The entire website is one scrollable page with anchor-based navigation. All 10 sections live in `src/App.tsx` (~1400 lines):

`Home → Services → Portfolio → Technologies → Packages → Team → Blog → FAQ → About → Contact → Footer`

### Key files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Entire website — all sections, all inline data arrays, all state |
| `src/index.css` | Tailwind 4 theme config (`@theme`), custom CSS vars, scrollbar styles |
| `src/components/ChatBox.tsx` | Gemini AI chat widget using `@google/genai` |
| `src/components/Ballpit.tsx` | Three.js 3D ball physics (hero background) |
| `src/components/SplashCursor.tsx` | WebGL fluid cursor effect (fixed canvas, transparent) |
| `src/components/GlobeDemo.tsx` | Interactive globe via `cobe` (contact section) |
| `src/components/ScrollVelocity.tsx` | Scroll-speed-based marquee text |
| `components/ui/` | shadcn-based UI primitives (Marquee, Globe, Button) |
| `vite.config.ts` | `publicDir: 'public'`, path alias `@` → project root |

### Data / content

All editable content (portfolio items, team members, blog posts, FAQ, package pricing) is defined as inline arrays near the top of `src/App.tsx` — not in separate data files.

### Styling

- **Tailwind CSS v4** — config is in `src/index.css` under `@theme`, not `tailwind.config.js`
- Custom tokens: `--color-primary: #3b82f6`, `--color-dark: #03080f`, `--color-deep: #020610`
- Custom fonts: `Inter` (body), `Outfit` (headings via `font-display`), `Geist Variable`

### Static assets

All images are `.webp` files in `/public/`. They are referenced as root-relative paths (e.g. `/logo.webp`). The `vite.config.ts` sets `publicDir: 'public'` so these are copied as-is to `dist/` at build time.

### Company content to update

The following placeholder values in `src/App.tsx` need replacing with real info:
- Company name: `Software Elites`
- Email: `info@softwareelites.com`
- Phone / WhatsApp: `+1 (877) 513-4503` / `18775134503`
- Address: `7901 4th St N STE 300, St. Petersburg, FL 33702`
- Team members (lines ~112–116)
- About description (line ~1061)
