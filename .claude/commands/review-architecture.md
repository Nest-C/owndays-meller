---
description: Review the codebase (or a path) for clean architecture and best practices
argument-hint: "[path | 'diff']  (default: whole src/)"
---

You are a senior frontend engineer reviewing a Next.js 16 / React 19 / TypeScript interview assignment
(OWNDAYS × MELLER product listing page). The reviewer on the other side is a hiring panel: they value
**clarity, correct boundaries and restraint** over cleverness. "Keep it simple — no over-engineering" is a hard requirement.

## Scope
- Target: `$ARGUMENTS`. If empty, review all of `src/` plus `next.config.ts` and `eslint.config.mjs`.
  If `diff`, review only `git diff HEAD` and untracked files under `src/`.
- Ground truth, read these first: `CLAUDE.md`, `CONVENTIONS.md`, `docs/requirements.md`, `docs/state-management.md`.
  Before judging any Next.js API usage, check `node_modules/next/dist/docs/` — this Next version differs from your training data.
- Do **not** edit files. Read only. Do not review `../owndays-meller` or `.claude/worktrees/`.

## What to check

### 1. Architecture and boundaries
- Dependency direction: `shared/` → `layout/` / `product/` → `app/`; `api/` is server-only and never imported by a Client Component.
- Server vs Client split: `'use client'` only where hooks, handlers or browser APIs are used; is the client boundary as low as it can be
  (ProductCatalog and below)? Any server-only data or secrets leaking into client bundles?
- Data flow: products fetched once in `(landing)/page.tsx`, passed down as props; no duplicate fetching, no client-side refetch.
  `getProducts()` throws on failure (intentional, keeps last good ISR page) — flag only if something swallows that error.
- Responsibility: pure logic in `src/lib/` (no React, no fetch), API in `src/api/<service>/`, UI in components.
  Flag components that compute business rules inline (price, stock, SKU selection, URLs) instead of using `lib/product.ts`.
- Types: API shapes in `src/types/` / `*.types.ts`; no `any`, no unchecked casts, no duplicate type definitions.

### 2. React best practices
- State: minimal, colocated, derived values computed not stored; no `useEffect` used to sync derived state.
- Effects: correct dependencies, cleanup for listeners/observers/timers, no effects that could be event handlers.
- Memoization: `memo`/`useCallback`/`useMemo` only where it measurably helps — flag both missing and pointless ones.
- Keys stable and unique; no index keys on reorderable lists.
- Hooks in `src/hooks/` are single-purpose, reusable and SSR-safe (no `window` access during render).

### 3. Next.js specifics
- `next/image`: correct `sizes`, `preload` (not deprecated `priority`) only on the LCP image, `alt` text (decorative = `""`).
- Metadata, canonical, OG/Twitter, JSON-LD correctness; all cards present in initial HTML.
- Caching: `revalidate` usage, no accidental dynamic rendering (cookies/headers/searchParams), static output preserved.
- Env vars: `API_BASE_URL` server-only, no `NEXT_PUBLIC_` leaks of secrets.

### 4. Accessibility
- Modal: focus trap + restore, `aria-modal`, labelled dialog, ESC close, scroll lock released on unmount.
- Buttons vs links used correctly; `aria-pressed` on swatches/chips; visible keyboard focus (via `InputModality`, no stray `outline: none`).
- Disabled "OUT OF STOCK" state is announced; images and icons have correct alt / `aria-hidden`.
- `prefers-reduced-motion` respected.

### 5. CSS
- CSS Modules only, mobile-first with a single `@media (min-width: 1024px)` block at the end of each file.
- Tokens from `globals.css` instead of raw values; state styled via attributes, not extra classes.
- Keyframes describe only the hidden end.

### 6. Conventions and hygiene
- Everything in `CONVENTIONS.md` that lint does **not** enforce: file/folder naming, one component per folder,
  named exports, `function` declarations, `XProps` in `X.types.ts`, constants placement, comment style (why, not what).
- Dead code, unused exports/files/assets, duplicated logic, magic numbers, misleading names.
- Run `npm run lint` and `npx tsc --noEmit` and include any failures.

### 7. Over-engineering (equally important)
Flag abstractions with a single caller, config nobody varies, premature generalisation, or layers that add indirection without benefit.
Removing code is a valid recommendation.

## How to report
- Verify every finding against the actual code before reporting it; drop anything you cannot point to.
- Do not flag documented decisions in `CLAUDE.md` (e.g. `cacheComponents` off, CmBd/CmBl mapping, route group) unless the code contradicts them.
- Output, in this order:
  1. **Summary** — 3–5 lines: overall architecture verdict and the top risks.
  2. **Findings table** — `Severity (High/Med/Low) | Category | File:line | Issue | Suggested fix`, sorted by severity.
     High = bug, a11y blocker, broken boundary or security leak. Med = maintainability or best-practice gap. Low = polish / naming.
  3. **What's done well** — short list, so strengths are kept during refactors.
  4. **Top 3 actions** — the smallest changes with the biggest payoff.
- Keep suggested fixes minimal and in the project's existing style; show a short code snippet only when the fix isn't obvious.
