# OWNDAYS × MELLER — Product Listing Page

Frontend interview assignment: one responsive product listing page for the OWNDAYS × MELLER sunglasses collection. Keep it simple — no over-engineering. Full brief: `docs/requirements.md`. When it disagrees with `docs/assignment.md` (or Figma), **requirements.md wins**.

@AGENTS.md

## Sources
- Figma (dev mode copy): https://www.figma.com/design/Gjoc232seWWtLnzRPW9eDQ/1---OWNDAYS-x-MELLER?node-id=212-332&m=dev — frames: TOP MENU (mobile menu), PRODUCTS (desktop 1440×3541 and mobile 390), MODAl_Follow-up support (product modal, desktop + mobile), parts, favion, ogp_1200x630
- Products API: `GET https://api-one-alpha-60.vercel.app/meller/products.json` (schema: https://github.com/frontend-otm/api/blob/main/meller/PRODUCTS_README.md)
- Images: prefix `path` with `https://storage.owndays.com/storage/`
- Brand fonts are loaded from OWNDAYS storage, **not re-hosted**: the brief (docs/assignment.md 7.2) says to use its `@font-face` declarations as-is, so they are pasted verbatim into `src/app/fonts.css` (its own file, imported before `globals.css` in `layout.tsx`) (Favorit 400/500/700, GT America Trial Cm 500/700/900, GT America Trial 500, Founders Grotesk 400/500). Don't edit them or move the files into the repo. Storage sends `access-control-allow-origin: *` but `Cache-Control: no-store`, which we can't change.

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
- `cacheComponents` is deliberately **off**; data uses `fetch(..., { next: { revalidate: 3600 } })` in `src/api/client.ts` (`apiGet`, ISR, page is static); one folder per service: `getProducts()` in `src/api/products/products.ts` (path in `products.constants.ts`, response type in `products.types.ts`). `getProducts()` throws on failure on purpose so a failed revalidation keeps the last good page, and drops products with no SKU (every UI piece assumes at least one).
- Products are fetched in the Server Component `src/app/(landing)/page.tsx` (route group — URL is still `/`; don't also add `src/app/page.tsx`, both would resolve to `/`) so all cards are in the initial HTML (SEO). JSON-LD `ItemList`/`Product` from `src/lib/seo.ts`.
- `src/app/layout.tsx` renders Navbar, `<main>{children}</main>`, Footer — pages render only their own sections. Metadata (title, description, canonical, OG, Twitter) is there too; OGP is `public/images/og-image.jpg` (compressed Figma export), wired via `OG_IMAGE` in `src/constants/site.ts`.
- `next/image` with `remotePatterns` for storage.owndays.com. Next 16: use `preload`, not the deprecated `priority`. Hero uses art direction (`getImageProps` + `<picture>`, two crops `src/assets/images/hero-desktop.jpg` 2560×1125 / `hero-mobile.jpg` 1170×2031, statically imported in `Hero.tsx` so width/height come from the files; matching crop preloaded per media query; grain overlay = `public/images/filter-image.webp` tiled in `Hero.module.css`).
- Noto Sans JP via `next/font/google` (`preload: false`), the brief says "load from Google Fonts". The above-the-fold brand fonts (Favorit Bold, GT America CmBl) are preloaded from storage with `react-dom` `preload()` in `layout.tsx`.
- `public/` vs `src/assets/`: `public/` only for files that need a fixed URL (`og-image.jpg` is cached by social platforms; `logo-desktop.svg` / `logo-mobile.svg`, kept out of `src/assets` because SVGR would turn them into components; `filter-image.webp`, referenced from CSS `url()`). Everything else is imported from `src/assets/` (hashed name, build fails if missing).
- Only interactive components are Client Components: Navbar, MobileMenu, ProductCatalog and its children.

## Structure
```
src/app/                 layout, (landing)/page.tsx, fonts.css (brief's @font-face, verbatim), globals.css (tokens + reset), favicon.ico, icon.png, apple-icon.png
src/api/                 client.ts (apiGet, shared) + one folder per service: products/ (products.ts = getProducts, .types, .constants) — server-only (`import 'server-only'` in client.ts)
src/lib/                 product.ts (price, image URLs, default SKU, swatches, stock, store URL), seo.ts (JSON-LD)
src/types/product.ts     API model types shared by several files
src/constants/site.ts    SITE_URL, OG_IMAGE, nav links, external URLs
src/assets/icons/        icon SVGs + index.ts + svg.d.ts (types `*.svg` imports, so `tsc` works before next-env.d.ts exists); SVGR (`@svgr/webpack`, turbopack rule in next.config.ts) makes every .svg import a component → `<CartIcon width height />` renders an inline, aria-hidden <svg>
src/assets/images/       hero-desktop.jpg, hero-mobile.jpg + image.d.ts (types `*.jpg` imports as StaticImageData)
public/images/           filter-image.webp (hero grain, CSS url()), og-image.jpg
src/hooks/               useProductDeepLink (selected product + SKU ↔ `?product=&color=`), useFocusTrap (menu + modal), useScrolled, useScrollLock, useEscape, useDragScroll (mouse drag for the HowToStyle strip), useInView (starts the HowToStyle title wipe)
src/components/
  shared/                product-agnostic: Highlight, InputModality (sets <html data-input="mouse|keyboard"> → focus rings only for keyboard users)
  layout/                Navbar (+MobileMenu, Logo), Hero, Footer
  product/               ProductCatalog (client boundary, owns the selection via useProductDeepLink), ProductGrid, ProductCard,
                         ProductModal (+ImageCarousel), HowToStyle (STYLE_ITEMS in HowToStyle.constants.ts), Swatch
```
## Code conventions
@CONVENTIONS.md

## Design tokens
- CSS variables in `globals.css`: `--color-brand: #f26a2f` (also the solid navbar; `BRAND_COLOR` in `site.ts` mirrors it for theme-color), `--color-surface: #f2f2f2`, `--font-display`, `--gutter` 16px/70px, `--header-h` 70px/102px, `--modal-w: 616px`, z-index vars.
- Orange is `#F26A2F` per the brief (screenshots read `#ff6a1f`) — confirm in Figma dev mode.

## Behaviour (all implemented and tested)
- Navbar: transparent over hero, orange after 40px scroll. Desktop text nav; mobile hamburger → black overlay menu (closes on link, ×, backdrop, ESC).
- In-page nav has **no #hash anchors**: PRODUCTS is a `SectionLink` button (`components/shared/`) that scrolls to `[data-section='products']` (ProductGrid; `section` key in `NAV_LINKS`); the logo scrolls to the top. ABOUT and STORES are shown as plain text with no action (`section: null` → `SectionLink` renders a `<span>`). The URL never changes, and `Navbar` sets `history.scrollRestoration = 'manual'` so every visit and refresh starts at the top.
- Grid: 3 cols ≥1024px, 1 col below. Card: stretched button opens modal; swatches (max 4 + "+n") switch image and P/No. Price `¥7,800+tax`.
- Swatch: hex fill; pattern image when `hex_code` null (Brown Demi); two-color SKUs split diagonally; inset border keeps near-white colors visible.
- Modal: right panel 616px desktop / full screen mobile; slide/fade animation; carousel with snap; color chips (English names) switch carousel + P/No.; TYPE from `frame_types[0].code` uppercased; price `¥7,800 税込`; ESC/×/backdrop close; focus trap + restore; body scroll lock.
- Deep link: the open modal is mirrored in the URL (`?product=adisa&color=C2`) via the native History API — open pushes (browser Back closes), color change replaces; loading such a URL opens the modal. Static HTML is unchanged.
- CTA: `https://www.owndays.com/jp/ja/products/{code}?sku={sku.id}`; hover inverts; `in_stock === 0` → disabled "OUT OF STOCK" (CHAUEN).
- HowToStyle: horizontal scroll strip, "+" (70px desktop / 56px mobile) opens the modal for the product in `HowToStyle.constants.ts`.

## Data quirks
- CHAUEN (ML2002D-6S) has `in_stock: 0`.
- KESSIE C4 and NAYAH C3/C4 have two colors per SKU.
- Image count per SKU varies 3–6.

## Still to do
- [ ] Run against the real API and compare desktop + mobile with Figma (spacing and sizes were measured from screenshots, not dev-mode values).
- [ ] Export from Figma: lifestyle photos → `src/assets/images/style/`, statically imported as `image:` in `HowToStyle.constants.ts`. Hero, OGP and favicon are done (favicon: `src/app/favicon.ico` 16/32/48 + `icon.png` 512 + `apple-icon.png` 180, from frame `favion` 627:4906). Logo is done: two separate files, `public/logo-desktop.svg` 351×52 and `public/logo-mobile.svg` 240×16 (its own wider layout, per the brief), switched by `<picture>` in `Logo.tsx` (`MEDIA_DESKTOP` from `site.ts`).
- [ ] Deploy to Vercel (bonus) — set `API_BASE_URL` in Vercel env; `NEXT_PUBLIC_SITE_URL` only for a custom domain.

## Related
`../owndays-meller` is an earlier Vite + styled-components version of the same page — superseded, kept for reference only. Don't edit it.
