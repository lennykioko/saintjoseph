# 33 Days with St. Joseph

A simple, easy-to-follow website for praying the 33-day consecration to St. Joseph. Content is transcribed word-for-word from the bundled `33-Days-of-Prayers-and-Daily-Challenge ENGLISH.pdf`.

## Stack

- Next.js 15 (App Router)
- TypeScript, Tailwind CSS v4
- MDX content via `@next/mdx`
- Nunito font via `next/font/google`
- Progress saved in `localStorage` — no backend, no accounts
- Bun for install / scripts / runtime

## Getting started

```bash
bun install
bun run dev
```

Open http://localhost:3000 (or whatever port Next picks).

## Build

```bash
bun run build
bun run start
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, "Add New Project" → import the repo → accept the Next.js defaults.
3. Deploy. No environment variables required.

## Editing content

Each piece of text lives in `content/`:

```
content/
├── introduction.mdx
├── days/01.mdx … 33.mdx
├── act-of-consecration.mdx
├── litany.mdx
└── endnotes.mdx
```

Each day's MDX file has frontmatter (`day`, `theme`) and the body in plain Markdown. Scripture quotes use blockquotes; the citation goes in a `<Cite>` component. Inline footnote markers use `<FootnoteRef id="i" />`. The final "Pray the Litany of St. Joseph." in each day is rendered via `<ScriptureLink />` to link to `/litany`.

## Re-extracting content from the PDF

```bash
python3 scripts/extract-pdf.py
```

Writes `scripts/extracted.txt` (gitignored). Use it as a working file when reconciling MDX against the source.

## Project structure

```
app/                        # Next.js App Router routes
components/                 # Layout + interactive UI
content/                    # MDX content
lib/                        # Page order, progress storage + context
mdx-components.tsx          # Global MDX component mapping
docs/superpowers/specs/     # Design spec
```

## Acceptance checklist

- [x] All 36 content files render
- [x] Sidebar (desktop + mobile drawer) with progress indicators
- [x] Navbar with progress count
- [x] Mark-complete + undo, persists in localStorage
- [x] "Continue where you left off" on home page
- [x] Reset progress with confirmation
- [x] Keyboard accessibility (skip link, focus rings, aria-current)
- [x] Static export — every route prerendered
