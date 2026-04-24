# 33 Days with St. Joseph — Site Design

**Date:** 2026-04-25
**Status:** Approved, ready for implementation planning

## Goal

A simple, legible, easily-hostable website that guides users through the 33-day Consecration to St. Joseph devotional. Content is transcribed word-for-word from the bundled PDF `33-Days-of-Prayers-and-Daily-Challenge ENGLISH.pdf`; the site adds only the navigation and progress affordances needed to make the PDF a pleasant day-by-day experience.

## Non-goals (v1)

- No backend, database, or user accounts.
- No dark mode (palette is CSS-variable-based so this is a cheap future add).
- No search, i18n, audio, PWA, sharing, or analytics.
- No admin UI — content is source-controlled Markdown.
- No automated test suite — manual verification fits the cost/value profile of an all-static content site with one small client module.
- No editorial changes to the PDF content: punctuation, capitalization, and line breaks preserved exactly.

## Stack

- **Next.js 15 (App Router)** with TypeScript, statically generated (`force-static`).
- **MDX** via `@next/mdx` for all prose content.
- **Tailwind CSS v4** for styling.
- **Nunito** loaded via `next/font/google` with `display: 'swap'`.
- **Progress tracking** in `localStorage` only — no backend.
- **Deployment** on Vercel with zero configuration.

## Information architecture

Routes:

| Path | Purpose |
|---|---|
| `/` | Home: hero, "Start Day 1" / "Continue where you left off", short description. |
| `/introduction` | Bishop Battersby's introduction letter. |
| `/day/[1..33]` | 33 daily pages (dynamic route, each backed by an MDX file). |
| `/act-of-consecration` | The final Act of Consecration prayer. |
| `/litany` | The Litany of St. Joseph. |
| `/endnotes` | Bibliographic references (i–xxv). |

Sidebar order — mirrors the devotional's natural flow:
1. Introduction
2. Days 1 → 33 (expanded by default; auto-scrolls current day into view)
3. Act of Consecration
4. Litany of St. Joseph
5. Endnotes

Prev/Next navigation at the foot of every content page follows this same order. A single `lib/page-order.ts` module is the source of truth.

## Layout & navigation

Three-region layout, desktop (≥ 1024px):

```
Navbar (sticky, 64px)
  "33 Days with St. Joseph"                [Progress: 5/33]
Sidebar (280px, sticky, scrollable)  |  Content (max-w 680px, centered)
```

Sidebar day indicators:

- `○` not started
- `●` current (most recently viewed day)
- `✓` completed

Mobile (< 1024px):

- Hamburger icon in the navbar opens the sidebar as a slide-in drawer with backdrop.
- Closes on navigation, backdrop click, and `Esc`.
- Focus trap while open; restores focus to the hamburger on close.
- Content fills width with `px-5` padding.

Accessibility:

- Sidebar is `<nav aria-label="Daily prayers">`.
- "Skip to content" link above the sidebar.
- `aria-current="page"` on the active link.
- `sr-only` text for the ○/●/✓ symbols ("Not started" / "Current" / "Completed").
- All interactive elements get a 2px `--accent` focus ring offset 2px.
- Respect `prefers-reduced-motion` for transitions.

## Visual design

Palette (CSS variables; dark mode ready later):

| Token | Light | Role |
|---|---|---|
| `--bg` | `#FAF7F2` | Page background (warm cream) |
| `--surface` | `#FFFFFF` | Sidebar, cards |
| `--border` | `#E8E2D6` | Subtle dividers |
| `--text` | `#1F2430` | Body text |
| `--text-muted` | `#6B6559` | Secondary text, metadata |
| `--accent` | `#4A2C2A` | Deep burgundy — links, active nav, Day headers |
| `--accent-soft` | `#F0E6D2` | Current-day sidebar highlight |
| `--scripture-bg` | `#F5EFE3` | Scripture blockquote background |
| `--scripture-border` | `#B8925A` | Scripture blockquote left border (muted gold) |

Typography — Nunito throughout, weight hierarchy does the work:

- **Body prose:** 18px / 1.75 line-height, weight 400.
- **H1 (page / day title):** 36px, weight 700, `--accent`, preceded by small uppercase eyebrow (e.g. `Day 3`) at 13px, weight 700, letter-spacing 0.12em, `--text-muted`.
- **H2 (inline headings, e.g. "Daily Challenge"):** 22px, weight 700, `--text`.
- **Scripture blockquote:** 17px italic on `--scripture-bg` with a 3px `--scripture-border` left rule, 20px padding; citation line in small caps.
- **Sidebar:** 15px, weight 600 for section headers, 400 for day links, 700 for current day.
- **Navbar title:** 18px, weight 800.

Spacing & rhythm:

- Content column max width 680px (~65ch).
- Paragraphs separated by `1em`; section breaks `2em`.
- Content pages use `py-12` top/bottom padding.

Polish:

- Smooth scroll on anchor links.
- Small cross/lily glyph next to the navbar title, defined in one place so it can be removed with one line.

## Progress tracking

Storage — single `localStorage` key `stjoseph:progress`:

```ts
type Progress = {
  completedDays: number[];       // e.g. [1, 2, 3]
  currentDay: number | null;     // most recently viewed day
  lastVisitedPath: string | null;// e.g. "/day/5" — powers "Continue"
};
```

Access layer — `lib/progress.ts` with pure functions, all guarded by `typeof window !== 'undefined'` so SSG does not crash at build:

- `readProgress(): Progress`
- `markDayComplete(day: number): void`
- `unmarkDayComplete(day: number): void`
- `setCurrentDay(day: number): void`
- `setLastVisitedPath(path: string): void`
- `resetProgress(): void`

State distribution — a client-only `ProgressProvider` context hydrates once on mount and feeds:

- Sidebar (indicators, current-day highlight)
- Navbar (progress count "5/33")
- Day page (Mark-complete button, auto-setting `currentDay` on mount)
- Home page (Continue CTA)

UI:

- **Mark day complete** button sits above the Prev/Next nav on each day page. Toggles to "✓ Completed · undo" once clicked.
- **Next** button gains emphasis (`--accent` fill) once the current day is marked complete. It remains a plain link; no auto-redirect.
- **Home CTA:** "Continue — Day N" when `lastVisitedPath` is set, else "Start with Day 1". Always also shows a secondary "Read the Introduction" link.
- **Reset progress** link in the sidebar footer, guarded by `confirm()`.

Edge cases:

- First visit / cleared storage — all days `○`; home shows "Start with Day 1".
- localStorage disabled — writes silently degrade for the session; reads return defaults; no user-visible error.
- Hydration flicker — indicator slots render neutral placeholders server-side and fade in real state on hydration.

## Content pipeline (PDF → MDX, word-for-word)

One-time extraction during implementation:

1. Run `scripts/extract-pdf.py` (uses `pypdf`) to dump raw text to `scripts/extracted.txt` (gitignored, working artifact only).
2. Manually split and clean into 36 MDX files. The split is manual — not scripted — because the PDF contains running page headers, soft-wrapped paragraphs, em-dashes split across lines, and inline footnote markers. An automated pipeline would silently mangle content; careful hand-editing is the right tool here.
3. Each MDX file gets a small frontmatter block and body in plain Markdown.

File layout:

```
content/
├── introduction.mdx
├── act-of-consecration.mdx
├── litany.mdx
├── endnotes.mdx
└── days/
    ├── 01.mdx
    ├── 02.mdx
    ├── …
    └── 33.mdx
```

Example Day MDX:

```mdx
---
day: 1
theme: "Noble Offspring of David"
---

The Old Testament prophets always taught that the Messiah was to spring
from the seed of David…

> The LORD also declares to you that the LORD will make a house for you:
> when your days have been completed and you rest with your ancestors, I
> will raise up your offspring after you, sprung from your loins, and I
> will establish his kingdom. He it is who shall build a house for my
> name, and I will establish his royal throne forever.
>
> — 2 Samuel 7:11-13

Joseph was of the royal blood of David…

St. Joseph, pray for me so that I may have the grace to carry out my role
and care for the people God has entrusted to me. *Pray the Litany of St. Joseph.*

## Daily Challenge

Reflect on your exalted identity as a beloved son of God the Father…
```

Rendering conventions (defined once in `mdx-components.tsx`):

- `<h1>` auto-rendered from frontmatter (`Day N` eyebrow + `{theme}`). Body never repeats it.
- `<blockquote>` uses Scripture styling (gold rule, cream bg, italic, citation line in small caps).
- `<h2>` used for inline subsections such as "Daily Challenge".
- Inline footnote references (`i`, `ii`, …) become superscript links to `/endnotes#ref-i`.
- "Pray the Litany of St. Joseph." is substituted by a tiny MDX component that links to `/litany`.

Word-for-word safeguards:

- Every MDX file diffable against `extracted.txt`.
- `content/README.md` holds a verification checklist covering all 36 files; each must be ticked off against the PDF before ship.
- No editorial changes under any circumstance.

## Project structure

```
saintjoseph/
├── app/
│   ├── layout.tsx                 # root: <html>, Nunito font, ProgressProvider, ThreeRegion shell
│   ├── page.tsx                   # home
│   ├── introduction/page.tsx      # loads content/introduction.mdx
│   ├── act-of-consecration/page.tsx
│   ├── litany/page.tsx
│   ├── endnotes/page.tsx
│   ├── day/
│   │   └── [day]/
│   │       ├── page.tsx           # loads content/days/{day}.mdx
│   │       └── not-found.tsx
│   └── globals.css                # Tailwind v4 @theme tokens
├── components/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx                # desktop + drawer in one progress-aware component
│   ├── SidebarDayItem.tsx
│   ├── PrevNext.tsx
│   ├── MarkCompleteButton.tsx
│   ├── ContinueCTA.tsx
│   └── ScriptureLink.tsx
├── lib/
│   ├── progress.ts
│   ├── progress-context.tsx
│   └── page-order.ts
├── content/
│   ├── README.md
│   ├── introduction.mdx
│   ├── act-of-consecration.mdx
│   ├── litany.mdx
│   ├── endnotes.mdx
│   └── days/01.mdx … 33.mdx
├── mdx-components.tsx
├── scripts/
│   └── extract-pdf.py
├── public/
│   └── favicon.svg
├── next.config.mjs                # @next/mdx wired
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .gitignore                     # existing + scripts/extracted.txt
└── README.md                      # dev + deploy notes
```

## Deployment

Push to GitHub → import into Vercel → accept defaults (Next.js auto-detected). No env vars, no build config.

## Acceptance criteria

- All 36 content files exist, render without build errors, and match the PDF word-for-word.
- Sidebar navigation works on desktop and as a drawer on mobile; current page is highlighted; progress indicators render correctly across first visit, mid-journey, and completion states.
- "Mark day complete" / undo works; state survives refresh; "Continue where you left off" on the home page points to the last visited path.
- Nunito loads without FOUT/FOIT; page has no CLS on font swap.
- Site deploys to Vercel from a fresh checkout with no manual configuration.
- Keyboard navigation reaches every interactive element; focus states are visible; drawer traps focus while open.
