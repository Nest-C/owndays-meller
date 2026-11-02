# OWNDAYS × MELLER — Product Listing Page

Frontend interview assignment: one responsive product listing page for the OWNDAYS × MELLER sunglasses collection. Keep it simple — no over-engineering. Full brief: `docs/requirements.md`.

@AGENTS.md

## Sources
- Figma (dev mode copy): https://www.figma.com/design/Gjoc232seWWtLnzRPW9eDQ/1---OWNDAYS-x-MELLER?node-id=212-332&m=dev — frames: TOP MENU (mobile menu), PRODUCTS (desktop 1440×3541 and mobile 390), MODAl_Follow-up support (product modal, desktop + mobile), parts, favion, ogp_1200x630
- Products API: `GET https://api-one-alpha-60.vercel.app/meller/products.json` (schema: https://github.com/frontend-otm/api/blob/main/meller/PRODUCTS_README.md)
- Images: prefix `path` with `https://storage.owndays.com/storage/`
- Brand fonts (self-hosted in `public/fonts/`, @font-face in `globals.css`, 1-year immutable cache via `headers()` in `next.config.ts`; originals on `storage.owndays.com/meller/fonts/`): Favorit 400/500/700, GT America Trial Cm (CmBd = 700, CmBl = 900 — the brief maps these the other way round; "Bl" = Black is the heavier one)

## Commands
```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
npx tsc --noEmit
```
`PRODUCTS_URL` env var overrides the API (useful for offline fixtures). `SITE_URL` (canonical/OG base, `metadataBase`) = `NEXT_PUBLIC_SITE_URL` → else `https://$VERCEL_PROJECT_PRODUCTION_URL` on Vercel → else localhost.

## Stack and decisions
- Next.js 16 App Router, React 19, TypeScript, **CSS Modules only** (no Tailwind, no styled-components, no clsx).
- `cacheComponents` is deliberately **off**; data uses `fetch(..., { next: { revalidate: 3600 } })` in `src/lib/products.ts` (ISR, page is static). `getProducts()` throws on failure on purpose so a failed revalidation keeps the last good page.
- Products are fetched in the Server Component `src/app/page.tsx` so all cards are in the initial HTML (SEO). JSON-LD `ItemList`/`Product` from `src/lib/seo.ts`.
- Metadata (title, description, canonical, OG, Twitter) in `src/app/layout.tsx`; OGP is `public/images/og-image.jpg` (compressed Figma export), wired via `OG_IMAGE` in `src/constants/site.ts`.
- `next/image` with `remotePatterns` for storage.owndays.com. Next 16: use `preload`, not the deprecated `priority`. Hero uses art direction (`getImageProps` + `<picture>`, two crops in `src/assets/images/`, matching crop preloaded per media query; Figma's grain overlay is baked into the JPGs).
- Noto Sans JP via `next/font/google` (`preload: false`). Brand fonts preloaded with `react-dom` `preload()`.
- Only interactive components are Client Components: Navbar, MobileMenu, ProductCatalog and its children.

## Structure
```
src/app/                 layout, page, globals.css (tokens + @font-face + reset)
src/lib/                 types.ts, products.ts, format.ts (prices, image URLs, swatches, store URL), seo.ts
src/constants/site.ts    SITE_URL, OG_IMAGE, nav links, external URLs
src/assets/images/       hero-desktop.jpg, hero-mobile.jpg
src/hooks/               useScrolled, useScrollLock, useEscape, useDragScroll (mouse drag for the HowToStyle strip)
src/components/
  ui/                    shared, product-agnostic: Logo, Highlight, icons.tsx
  layout/                Navbar (+MobileMenu), Hero, Footer
  product/               ProductCatalog (client boundary, owns selected product), ProductGrid, ProductCard,
                         ProductModal (+ImageCarousel), HowToStyle (+styleItems.ts), Swatch
```
- One folder per component: `Component.tsx` + `Component.module.css`.
- Dependencies flow one way: `ui/` → `layout/` / `product/` → `app/`. ESLint `no-restricted-imports` blocks `ui/` importing from the other groups.
- Imports use the `@/` alias.

## Styling conventions
- Design tokens are CSS variables in `globals.css` (`--color-brand: #ff6a1f`, `--color-surface: #f2f2f2`, `--font-display`, `--gutter` 16px/70px, `--header-h` 62px/102px, `--modal-w: 616px`, z-index vars).
- Breakpoint: `@media (min-width: 1024px)` = desktop; below = mobile. Media queries can't use variables, so write the literal.
- State styling via attributes, not conditional classes: `[aria-pressed='true']`, `[aria-checked='true']`, `[data-open='true']`, `[data-state='closing']`, `[data-solid='true']`.
- Orange `#ff6a1f` was read from screenshots (brief says `#F26A2F`) — confirm in Figma dev mode.

## Behaviour (all implemented and tested)
- Navbar: transparent over hero, orange after 40px scroll. Desktop text nav; mobile hamburger → black overlay menu (closes on link, ×, backdrop, ESC).
- Grid: 3 cols ≥1024px, 1 col below. Card: stretched button opens modal; swatches (max 4 + "+n") switch image and P/No. Price `¥7,800+tax`.
- Swatch: hex fill; pattern image when `hex_code` null (Brown Demi); two-color SKUs split diagonally; inset border keeps near-white colors visible.
- Modal: right panel 616px desktop / full screen mobile; slide/fade animation; carousel with snap; color chips (English names) switch carousel + P/No.; TYPE from `frame_types[0].code` uppercased; price `¥7,800 税込`; ESC/×/backdrop close; focus trap + restore; body scroll lock.
- CTA: `https://www.owndays.com/jp/ja/products/{code}?sku={sku.id}`; hover inverts; `in_stock === 0` → disabled "OUT OF STOCK" (CHAUEN).
- HowToStyle: horizontal scroll strip, "+" (70px desktop / 56px mobile) opens the modal for the product in `styleItems.ts`.

## Data quirks
- CHAUEN (ML2002D-6S) has `in_stock: 0`.
- KESSIE C4 and NAYAH C3/C4 have two colors per SKU.
- Image count per SKU varies 3–6.

## Still to do
- [ ] Run against the real API and compare desktop + mobile with Figma (spacing and sizes were measured from screenshots, not dev-mode values).
- [ ] Export from Figma: lifestyle photos → `public/images/style/` + `image:` in `styleItems.ts`; favicon (frame `favion`) → `src/app/icon.svg`. Hero and OGP are done. Logo is done (`public/logo.svg`, white, 351×52). Height 16px mobile / 52px desktop matches the brief's padding math (23+16+23 = 62, 25+52+25 = 102); the brief's "240×16" mobile size can't keep the SVG's ratio (16px tall = ~108px wide) — check in Figma.
- [ ] Deploy to Vercel (bonus) — no env var needed unless a custom domain is used.

## Related
`../owndays-meller` is an earlier Vite + styled-components version of the same page — superseded, kept for reference only. Don't edit it.
