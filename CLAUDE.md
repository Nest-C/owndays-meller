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
Env: `.env.local` (git-ignored; template `.env.example`). `API_BASE_URL` is **required** (server-only; point it at a local server for offline fixtures) — `src/api/client.ts` throws if it is missing, so set it in Vercel too. `SITE_URL` (canonical/OG base, `metadataBase`) = `NEXT_PUBLIC_SITE_URL` → else `https://$VERCEL_PROJECT_PRODUCTION_URL` on Vercel → else localhost.

## Stack and decisions
- Next.js 16 App Router, React 19, TypeScript, **CSS Modules only** (no Tailwind, no styled-components, no clsx).
- `cacheComponents` is deliberately **off**; data uses `fetch(..., { next: { revalidate: 3600 } })` in `src/api/client.ts` (`apiGet`, ISR, page is static); paths in `src/api/endpoints.ts`, `getProducts()` in `src/api/products.ts`. `getProducts()` throws on failure on purpose so a failed revalidation keeps the last good page.
- Products are fetched in the Server Component `src/app/(landing)/page.tsx` (route group — URL is still `/`; don't also add `src/app/page.tsx`, both would resolve to `/`) so all cards are in the initial HTML (SEO). JSON-LD `ItemList`/`Product` from `src/lib/seo.ts`.
- `src/app/layout.tsx` renders Navbar, `<main id="top">{children}</main>`, Footer — pages render only their own sections. Metadata (title, description, canonical, OG, Twitter) is there too; OGP is `public/images/og-image.jpg` (compressed Figma export), wired via `OG_IMAGE` in `src/constants/site.ts`.
- `next/image` with `remotePatterns` for storage.owndays.com. Next 16: use `preload`, not the deprecated `priority`. Hero uses art direction (`getImageProps` + `<picture>`, two crops `public/images/hero-desktop.jpg` 2560×1125 / `hero-mobile.jpg` 1170×2031 — width/height are hard-coded in `Hero.tsx`, update them if the files change; matching crop preloaded per media query; grain overlay = `public/images/filter-image.webp` tiled in `Hero.module.css`).
- Noto Sans JP via `next/font/google` (`preload: false`). Brand fonts preloaded with `react-dom` `preload()`.
- Only interactive components are Client Components: Navbar, MobileMenu, ProductCatalog and its children.

## Structure
```
src/app/                 layout, (landing)/page.tsx, globals.css (tokens + @font-face + reset), favicon.ico, icon.png, apple-icon.png
src/api/                 client.ts (apiGet), endpoints.ts, products.ts (getProducts) — server-only data fetching
src/lib/                 types.ts (API model types shared by several files), format.ts (prices, image URLs, swatches, store URL), seo.ts
src/constants/site.ts    SITE_URL, OG_IMAGE, nav links, external URLs
src/assets/icons/        icon SVGs + index.ts; SVGR (`@svgr/webpack`, turbopack rule in next.config.ts) makes every .svg import a component → `<CartIcon width height />` renders an inline, aria-hidden <svg>
public/images/           hero-desktop.jpg, hero-mobile.jpg, filter-image.webp (hero grain), og-image.jpg
src/hooks/               useScrolled, useScrollLock, useEscape, useDragScroll (mouse drag for the HowToStyle strip), useInView (starts the HowToStyle title wipe)
src/components/
  shared/                product-agnostic: Highlight
  layout/                Navbar (+MobileMenu, Logo), Hero, Footer
  product/               ProductCatalog (client boundary, owns selected product), ProductGrid, ProductCard,
                         ProductModal (+ImageCarousel), HowToStyle (STYLE_ITEMS in HowToStyle.constants.ts), Swatch
```
- One folder per component: `Component.tsx` + `Component.module.css` + `Component.types.ts` (its props and any type only it uses) + `Component.constants.ts` (constants only it uses). Shared constants live in `src/constants/`. A type used in more than one place lives in `src/lib/types.ts`; API-only types sit next to the API code (`src/api/products.types.ts`).
- Dependencies flow one way: `shared/` → `layout/` / `product/` → `app/`. ESLint `no-restricted-imports` blocks `shared/` importing from the other groups.
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
- HowToStyle: horizontal scroll strip, "+" (70px desktop / 56px mobile) opens the modal for the product in `HowToStyle.constants.ts`.

## Data quirks
- CHAUEN (ML2002D-6S) has `in_stock: 0`.
- KESSIE C4 and NAYAH C3/C4 have two colors per SKU.
- Image count per SKU varies 3–6.

## Still to do
- [ ] Run against the real API and compare desktop + mobile with Figma (spacing and sizes were measured from screenshots, not dev-mode values).
- [ ] Export from Figma: lifestyle photos → `public/images/style/` + `image:` in `HowToStyle.constants.ts`. Hero, OGP and favicon are done (favicon: `src/app/favicon.ico` 16/32/48 + `icon.png` 512 + `apple-icon.png` 180, from frame `favion` 627:4906). Logo is done (`public/logo.svg`, white, 351×52). Height 16px mobile / 52px desktop matches the brief's padding math (23+16+23 = 62, 25+52+25 = 102); the brief's "240×16" mobile size can't keep the SVG's ratio (16px tall = ~108px wide) — check in Figma.
- [ ] Deploy to Vercel (bonus) — set `API_BASE_URL` in Vercel env; `NEXT_PUBLIC_SITE_URL` only for a custom domain.

## Related
`../owndays-meller` is an earlier Vite + styled-components version of the same page — superseded, kept for reference only. Don't edit it.
