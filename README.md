# OWNDAYS × MELLER — Product Listing Page

Responsive product listing page for the OWNDAYS × MELLER sunglasses collection, built from the Figma design.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · CSS Modules — no other runtime dependencies.

## Setup

```bash
npm install
cp .env.example .env.local   # sets API_BASE_URL (required)
npm run dev      # http://localhost:3000
npm run build    # production build (fetches the products API)
npm run start    # serve the production build
npm run lint
```

Requires Node 20+. `API_BASE_URL` (the products API, server-only) is required — the build stops with a clear error if it is missing. Canonical and Open Graph URLs must be absolute: on Vercel they use the production domain automatically (`VERCEL_PROJECT_PRODUCTION_URL`). Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) only to override it, e.g. for a custom domain.

### Deploy (Vercel)

Import the repo on Vercel, add `API_BASE_URL=https://api-one-alpha-60.vercel.app` under Project Settings → Environment Variables, and deploy. Set `NEXT_PUBLIC_SITE_URL` only if you use a custom domain.

## Why Next.js

The page is mostly static content with a few interactive parts, which is what Next.js's Server Components are good at:

| Need from the brief | How it's handled |
|---|---|
| SEO / meta tags | `metadata` in `app/layout.tsx` → title, description, canonical, Open Graph, Twitter card |
| OGP image 1200×630 | `public/images/og-image.jpg` (Figma frame `ogp_1200x630`, compressed to ~170 KB), set as `openGraph.images` / `twitter.images` via `OG_IMAGE` in `constants/site.ts` |
| Products visible to crawlers | `app/(landing)/page.tsx` fetches on the server, so all 8 products are in the initial HTML |
| Rich results | `schema.org` `ItemList` / `Product` JSON-LD with price and stock |
| Performance | Static page regenerated hourly (ISR), `next/image` (resized WebP/AVIF, lazy loading; hero uses art-directed desktop/mobile crops via `getImageProps`), self-hosted Noto Sans JP via `next/font`, preloaded brand fonts |
| Fresh data | `fetch(..., { next: { revalidate: 3600 } })` — if the API fails during revalidation, the last good page keeps being served |

Only components that need state or events are Client Components (`'use client'`): `Navbar`, `MobileMenu`, `ProductCatalog` and what it renders. Hero, Footer and the page itself stay on the server.

## Project structure

```
public/
├── fonts/                      # brand fonts (Favorit, GT America Trial), self-hosted
├── images/
│   ├── hero-desktop.jpg        # hero crops (art direction: desktop strip / mobile portrait)
│   ├── hero-mobile.jpg
│   ├── filter-image.webp       # grain texture tiled over the hero
│   └── og-image.jpg            # Open Graph / Twitter share image
└── logo.svg                    # navbar logo

src/
├── app/
│   ├── layout.tsx              # <html lang="ja">, metadata, fonts; Navbar + <main> + Footer around every page
│   ├── (landing)/              # route group: the parentheses keep it out of the URL, so this is still "/"
│   │   └── page.tsx            # the landing page — server: fetch products, render page, JSON-LD
│   ├── favicon.ico, icon.png, apple-icon.png  # from Figma frame `favion` (16/32/48, 512, 180) — Next adds the <link> tags
│   └── globals.css             # @font-face, design tokens (CSS variables), reset
├── api/                        # server-side data fetching
│   ├── client.ts               # apiGet(): API_BASE_URL + path, hourly revalidation, throws on failure
│   ├── endpoints.ts            # API paths (products: /meller/products.json)
│   └── products.ts             # getProducts()
├── lib/
│   ├── types.ts                # shared API model types (from PRODUCTS_README.md)
│   ├── format.ts               # prices, image URLs, swatches, store URL
│   └── seo.ts                  # JSON-LD builder
├── constants/site.ts           # site text, nav links, external URLs
├── hooks/                      # useScrolled, useScrollLock, useEscape, useDragScroll
└── components/                 # grouped by role; one folder per component (Component.tsx + Component.module.css)
    ├── shared/                 # product-agnostic
    │   └── Highlight/          # black-block display heading ("PRODUCTS", "HOW TO STYLE THEM")
    ├── layout/                 # page frame
    │   ├── Navbar/             # sticky navbar (transparent → orange) + MobileMenu, Logo
    │   ├── Hero/
    │   └── Footer/
    └── product/                # the product feature
        ├── ProductCatalog/     # client boundary: holds the selected product
        ├── ProductGrid/        # 3 columns ≥1024px, 1 column below
        ├── ProductCard/        # swatches switch image + P/No.; max 4 swatches + "+n"
        ├── ProductModal/       # right panel 616px / full screen; carousel, color chips, CTA
        ├── HowToStyle/         # "HOW TO STYLE THEM": horizontal photo strip (mouse drag on desktop), "+" opens the product
        └── Swatch/             # color swatch for a SKU (solid, pattern or two-color)
```

Folder rule: dependencies flow one way, `shared/` → `layout/` / `product/` → `app/`. `shared/` never imports from the other groups; ESLint enforces this (`no-restricted-imports` in `eslint.config.mjs`). Structure follows the Next.js "store project files outside of `app`" strategy and the shared-vs-feature split from [Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md), kept to three levels as the [React docs](https://legacy.reactjs.org/docs/faq-structure.html) suggest.

Styling conventions: design tokens live in `globals.css` as CSS variables; component states use `data-*` / ARIA attributes (`[aria-pressed='true']`, `[data-state='closing']`) instead of conditional class names, so no `clsx` is needed.

## Behaviour

- **Breakpoint:** `≥1024px` desktop, `<1024px` mobile.
- **Card:** the whole card opens the modal (stretched button); swatches are separate buttons. Two-color SKUs show a split swatch; Brown Demi uses its pattern image.
- **Modal:** opens with the first SKU; chips switch the carousel and P/No.; closes with ×, the backdrop or ESC; focus is trapped and returned; slide/fade animation, reduced-motion aware.
- **ONLINE STORE:** `https://www.owndays.com/jp/ja/products/{code}?sku={id}`; inverted on hover; disabled **OUT OF STOCK** when `in_stock === 0` (CHAUEN).
- **Prices:** `¥7,800+tax` on cards, `¥7,800 税込` in the modal.

## Assets still to export from Figma

Hero, OGP, logo and favicon are done. Still missing (the page falls back to product photos until then):

| Asset | Where it goes |
|---|---|
| "How to style them" photos | `public/images/style/…`, then add `image:` to each entry in `src/components/product/HowToStyle/HowToStyle.constants.ts` (each entry also says which product its "+" opens) |
