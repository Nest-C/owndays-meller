# Frontend Developer Assignment — OWNDAYS × MELLER Products Page

## 1. Overview

Build the **Products page** (商品一覧) of the **OWNDAYS × MELLER** collaboration website, based on the provided Figma designs for **Desktop (1440px)** and **Mobile (390px)**.

The page lists the 8 sunglasses models of the collaboration. Users can switch frame colors, open a product detail panel, browse styling photos, and jump to the OWNDAYS online store to buy.

The goal of this assignment is to evaluate your ability to:

- Translate a Figma design into a pixel-accurate, responsive web page
- Write clean, maintainable, component-based code
- Build interactive UI (color swatches, modal/drawer, carousels, mobile menu)
- Pay attention to performance, accessibility, SEO and detail

---

## 2. Design Files

| Item | Figma Link |
| --- | --- |
| Products page (Desktop, Mobile, product detail, mobile menu) | https://www.figma.com/design/rB6UnnDhxpDhJevd8UHEVV/OWNDAYS-x-MELLER?node-id=430-1302&m=dev |
| Button states | https://www.figma.com/design/rB6UnnDhxpDhJevd8UHEVV/OWNDAYS-x-MELLER?node-id=777-2624&m=dev |
| Favicon | https://www.figma.com/design/rB6UnnDhxpDhJevd8UHEVV/OWNDAYS-x-MELLER?node-id=627-4906&m=dev |
| OG image | https://www.figma.com/design/rB6UnnDhxpDhJevd8UHEVV/OWNDAYS-x-MELLER?node-id=458-3855&m=dev |
| Meta data (title, description, keywords) | https://www.figma.com/design/rB6UnnDhxpDhJevd8UHEVV/OWNDAYS-x-MELLER?node-id=3022-856&m=dev |

### Frames inside the Products section

| Frame | Viewport | Description |
| --- | --- | --- |
| `PRODUCTS` | Desktop 1440px | Main page |
| `MODAI_Follow-up support` | Desktop 1440px | Product detail panel (drawer from the right) |
| `PRODUCTS` | Mobile 390px | Main page |
| `MODAI_Follow-up support` | Mobile 390px | Product detail panel (full-screen modal) |
| `TOP MENU` | Mobile 390px | Hamburger menu (opened state) |

> Use Figma **Dev Mode** to get exact spacing, typography, colors and assets.
> If anything is missing or unclear in the design, make a reasonable decision and **document it in your README**.

---

## 3. Page Structure

Implement the page in this order, matching both Desktop and Mobile designs:

1. **Header** — `OWNDAYS × MELLER` logo, navigation (`ABOUT`, `PRODUCTS`, `STORES`). On mobile, nav collapses into a hamburger icon.
2. **Hero** — full-width key visual image with the `PRODUCTS` heading (orange text on a black highlight bar).
3. **Product grid** — 8 product cards on an orange background.
   - Desktop: 3 columns
   - Mobile: 1 column
4. **HOW TO STYLE THEM** — section heading followed by a horizontal row of styling photos, each with an orange `+` button.
5. **Footer** — navigation links, Instagram icon, `ONLINE STORE` and `OWNDAYS.COM` external links, legal links (`CONTACT US`, `PRIVACY POLICY`, `TERMS OF USE`, `特定商取引法表示`) and copyright.

Overlays:

6. **Product detail panel** — opened by clicking a product card.
7. **Mobile menu** — opened by the hamburger icon.

Links to other pages (About, Stores, Contact, policies, etc.) can point to `#`.

---

## 4. Functional Requirements

### 4.1 Product Card
Each card displays:
- Product image (on a light gray `#F7F7F7` image area)
- Product name (e.g. `ADISA`) and product number (e.g. `ML2001D-6S C1`)
- Color swatches (number varies per product — see Figma)
- Price as shown in the design (e.g. `¥7,800+tax`)

Behavior:
- **Hover (desktop):** card shows the black border state as shown on the first card in the Figma design.
- **Color swatches:** clicking a swatch switches the card image (and the product number color code, if applicable) to that color. The selected swatch shows the selected ring state from Figma. Clicking a swatch must **not** open the detail panel.
- **Click on the card:** opens the Product Detail panel for that product, with the currently selected color pre-selected.

### 4.2 Product Detail Panel
Follow the `MODAI_Follow-up support` frames.

- **Desktop:** a panel that slides in from the right (≈616px wide); the page behind it is dimmed and blurred.
- **Mobile:** a full-screen modal card with rounded corners over a dimmed/blurred background.
- Content:
  - Product name (orange) and close (`×`) button
  - **Image carousel** of the product, with the previous/next images peeking at the edges. Support swipe on touch devices and navigation on desktop.
  - **Color chips** (e.g. `BLACK`, `BROWN DEMI`, `CLEAR GRAY`, `CLEAR GREEN`). The selected chip is filled black; selecting a chip updates the carousel images and `P/No.`.
  - Spec rows: `P/No.`, `TYPE`, `PRICE` (e.g. `¥7,800 税込`)
  - Product description (Japanese)
  - `ONLINE STORE` button + caption `OWNDAYSオンラインストアに移動します`
- The `ONLINE STORE` button opens the product page on the OWNDAYS online store in a **new tab**, using the URL for the selected color, e.g.
  `https://www.owndays.com/jp/ja/products/ML2001D-6S?sku=9445`
- Close the panel by: the `×` button, clicking the backdrop, or pressing `Esc`.
- While open: lock page scroll, trap focus inside the panel, and return focus to the card that opened it on close.

### 4.3 ONLINE STORE Button States
Follow the **Button states** frame:

| State | Appearance |
| --- | --- |
| Default | Orange `#FF6723` background, white text `ONLINE STORE` |
| Hover | Darker orange/brown background |
| Disabled (out of stock) | Light gray background, text `OUT OF STOCK`, not clickable |

When the product is out of stock (`selling_setting.in_stock === 0` in the API — see Section 6), show the disabled state. In the current data, **CHAUEN** is out of stock.

### 4.4 HOW TO STYLE THEM
- Styling photos are laid out in a horizontal row that overflows the viewport (desktop and mobile).
- Make it a **horizontally scrollable carousel** (drag/swipe on touch, scroll or arrow navigation on desktop — your choice, documented in README).
- Each photo's `+` button opens the Product Detail panel of the product worn in that photo.

### 4.5 Mobile Menu
Follow the `TOP MENU` frame:
- Hamburger icon opens a full-screen black menu card with `ABOUT`, `PRODUCTS`, `STORES` and the secondary links (`CONTACT US`, `PRIVACY POLICY`, `TERMS OF USE`, `特定商取引法表示`).
- Close via `×` or `Esc`; lock page scroll while open.

### 4.6 Deep Link to a Product
The Product Detail panel state must be reflected in the URL so a specific product and color can be shared and opened directly.

- URL format: `?product={model_name lowercased}&color={sku.code}` — e.g. `/products?product=adisa&color=C1`
- Opening the panel adds/updates these query parameters; changing the color in the panel updates `color`; closing the panel removes both.
- Loading a URL with valid parameters opens the panel for that product with that color selected (also on first page load / refresh).
- If `color` is missing or invalid, open the product with its default color (first SKU by `order`). If `product` is invalid, do not open the panel.
- Browser **Back** button closes the panel (or returns to the previous product/color state) — no full page reload.

---

## 5. Meta Data, Favicon & OG Image

Implement the following exactly as specified in the **Meta data** frame:

```html
<title>商品一覧 | OWNDAYS × MELLER（メラー） 公式オンラインストア｜サングラス</title>
<meta name="description" content="OWNDAYS × MELLER 商品一覧。デザイン性・機能性に優れたサステナブルな素材のサングラス（全てUV99%以上カット・偏光レンズ・傷防止コート・撥水コート）を展開中。">
<meta name="keywords" content="商品一覧,サングラス,偏光レンズ,Meller,メラー,アイウェア,フレーム,サステイナブ,トレンド,バルセロナ,スペイン,OWNDAYS,オンデーズ,オンデイズ">
```

Also:
- `<html lang="ja">`
- **Favicon:** export from the Favicon frame (320×320 source). Provide at least `favicon.ico` (or 32×32 PNG), `apple-touch-icon` (180×180) and a larger PNG.
- **OG image:** export from the OG image frame (**1200×630**). Add Open Graph and Twitter Card tags (`og:title`, `og:description`, `og:image`, `og:type`, `og:url`, `twitter:card="summary_large_image"`).
- Single `<h1>` per page and correct heading hierarchy.

---

## 6. Data

Product data **must be fetched** from this endpoint. Do **not** hard-code products in HTML or copy the JSON into the project.

```
GET https://api-one-alpha-60.vercel.app/meller/products.json
```

**Product image base URL:** `[INSERT IMAGE BASE URL]` — image `path` values in the API are relative (e.g. `products/36ebdac7-….webp`) and must be prefixed with this base URL. The same applies to color swatch images (`colors/….jpeg`).

### 6.1 Response Structure

```jsonc
{
  "success": true,
  "message": "Product data retrieved successfully.",
  "total": 8,
  "not_found": [],
  "data": [
    {
      "product": {
        "id": 2787,
        "code": "ML2001D-6S",          // product number
        "model_name": "ADISA",          // product name shown on the card
        "lens_width": "53", "lens_height": "36.0", "bridge_width": "21",
        "temple_depth": "145", "size_range": "XL"
        // ...
      },
      "product_line": { "id": 88, "name": "OWNDAYS × MELLER", "slug": "meller" },
      "product_type": { "id": 2, "name": "Sunglasses" },
      "localization": {
        "language_code": "ja",
        "description": "クラシックな長方形シェイプに、…"   // detail panel description
      },
      "frame_types": [{ "id": 1, "code": "square" }],   // TYPE
      "selling_setting": {
        "country_code": "jp",
        "price": 7800,       // price including tax (税込)
        "raw_price": 7091,   // price excluding tax
        "in_stock": 2        // 0 = out of stock
      },
      "skus": [                                         // one SKU per color variation
        {
          "id": 9445,                                   // used in the store URL
          "code": "C1",                                 // color code
          "order": 1,
          "colors": [
            {
              "code": "black",
              "name": "ブラック",
              "hex_code": "#000000",                    // may be null
              "path": null,                             // swatch image, used when hex_code is null
              "localizations": [
                { "language_code": "ja", "name": "ブラック" },
                { "language_code": "en", "name": "Black" }
              ]
            }
          ],
          "images": [
            { "id": 126032, "path": "products/36ebdac7-….webp", "order": 1 }
          ]
        }
      ]
    }
  ]
}
```

### 6.2 Field Mapping

| UI element | Source |
| --- | --- |
| Product name (`ADISA`) | `product.model_name` |
| `P/No.` (`ML2001D-6S C1`) | `product.code` + `" "` + selected `sku.code` |
| `TYPE` (`SQUARE`) | `frame_types[0].code`, uppercased |
| Price | `selling_setting.price` formatted as `¥7,800` (tax included). Use the label format from the design. |
| Description | `localization.description` |
| Swatches / color chips | `skus` sorted by `order` — one swatch per SKU |
| Swatch color | `colors[].hex_code`; if `null`, use the image at `colors[].path` (e.g. Brown Demi tortoise pattern) |
| Two-tone swatch | When a SKU has **2 colors** (e.g. black + orange), render a split/half-half swatch as shown in Figma |
| Color chip label (`BROWN DEMI`) | English `localizations[].name`, uppercased. For 2-color SKUs, join with ` / ` (e.g. `BLACK / ORANGE`) |
| Card image | First image (lowest `order`) of the selected SKU |
| Detail panel carousel | All images of the selected SKU, sorted by `order` |
| ONLINE STORE URL | `https://www.owndays.com/jp/ja/products/{product.code}?sku={sku.id}` |
| Out of stock | `selling_setting.in_stock === 0` → disabled `OUT OF STOCK` button |

Default selected color on page load: the first SKU by `order`.

### 6.3 Data Handling Requirements
- Create a typed data layer (e.g. TypeScript interfaces for the API response) and transform the raw API response into the shape your UI needs, instead of reading deeply nested fields directly inside components.
- Handle **loading**, **error** (request fails or `success: false`) and **empty** (`data` is empty) states with appropriate UI.
- Handle missing / `null` fields gracefully (e.g. no images, no English localization, `hex_code` and `path` both `null`).
- Fetching on the server (SSR/SSG) or client is your choice — explain it in the README. If you hit CORS issues on the client, proxy the request through your own API route.

### 6.4 Assets not in the API
- **Styling photos** (HOW TO STYLE THEM), hero image, logo, icons, favicon and OG image: export from Figma.
- Map each styling photo to a product (`product.code`) in your own config file so the `+` button can open the right detail panel.

---

## 7. Non-Functional Requirements

### 7.1 Responsive
- Match the Desktop (1440px) and Mobile (390px) designs.
- Must look good between them (tablet). Suggested breakpoints:
  - Mobile: `< 768px` → 1-column grid
  - Tablet: `768px – 1023px` → 2-column grid
  - Desktop: `≥ 1024px` → 3-column grid
- Content should not stretch indefinitely on large screens (desktop container is 1300px).
- No horizontal page scroll at any width from `320px` upward (the HOW TO STYLE THEM carousel scrolls inside its own container).

### 7.2 Design Accuracy
- Spacing, typography, colors and layout should closely match Figma.
- Main brand color: `#FF6723` (orange), plus black `#000000`, white, and `#F7F7F7` for image backgrounds.

#### Fonts
Use the fonts below. Do **not** substitute them with other fonts.

| Font family | Weights | Usage in the design |
| --- | --- | --- |
| `GT America Trial Cm` (Compressed) | 500 / 700 / **900** | Product names, big headings (`PRODUCTS`, `HOW TO STYLE THEM`) — mostly Black (900) |
| `GT America Trial` | 500 | Prices |
| `Favorit` | 400 / 500 / 700 | UI text, labels, product numbers, buttons |
| `Founders Grotesk` | 400 / 500 | Wherever specified in Figma |
| `Noto Sans JP` | 500 | Japanese text — load from Google Fonts |

Always check the font family and weight of each text layer in Figma Dev Mode.

All fonts except Noto Sans JP are hosted on the OWNDAYS storage. Use these `@font-face` declarations as-is (do not download and re-host the files):

```css
/* Favorit fonts */
@font-face {
    font-family: 'Favorit';
    src: url('https://storage.owndays.com/meller/fonts/Favorit/Favorit-Bold.woff2') format('woff2'),
        url('https://storage.owndays.com/meller/fonts/Favorit/Favorit-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Favorit';
    src: url('https://storage.owndays.com/meller/fonts/Favorit/Favorit-Medium.woff2') format('woff2'),
        url('https://storage.owndays.com/meller/fonts/Favorit/Favorit-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Favorit';
    src: url('https://storage.owndays.com/meller/fonts/Favorit/Favorit-Regular.woff2') format('woff2'),
        url('https://storage.owndays.com/meller/fonts/Favorit/Favorit-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

/* GT America Trial fonts */
@font-face {
    font-family: 'GT America Trial Cm';
    src: url('https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-CmBd.woff2') format('woff2'),
        url('https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-CmBd.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'GT America Trial Cm';
    src: url('https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-CmBl.woff2') format('woff2'),
        url('https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-CmBl.woff') format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'GT America Trial Cm';
    src: url('https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-CmMd.woff2') format('woff2'),
        url('https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-CmMd.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'GT America Trial';
    src: url('https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-Md.woff2') format('woff2'),
        url('https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-Md.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

/* Founders Grotesk fonts */
@font-face {
    font-family: 'Founders Grotesk';
    src: url('https://storage.owndays.com/meller/fonts/FoundersGrotesk/FoundersGrotesk-Regular.woff2') format('woff2'),
        url('https://storage.owndays.com/meller/fonts/FoundersGrotesk/FoundersGrotesk-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Founders Grotesk';
    src: url('https://storage.owndays.com/meller/fonts/FoundersGrotesk/FoundersGrotesk-Medium.woff2') format('woff2'),
        url('https://storage.owndays.com/meller/fonts/FoundersGrotesk/FoundersGrotesk-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}
```

Notes:
- Define sensible fallback stacks (e.g. `font-family: 'Favorit', 'Noto Sans JP', sans-serif;`) so Japanese characters fall back to Noto Sans JP.
- Avoid layout shift while fonts load (CLS target in 7.3).

### 7.3 Performance
- Responsive images (`srcset`/`sizes`), modern formats (WebP/AVIF), lazy loading for below-the-fold images.
- Hero image must not be lazy-loaded; avoid layout shift (set image dimensions / aspect ratio).
- Target **Lighthouse Performance ≥ 85** and **CLS < 0.1** on mobile.

### 7.4 Accessibility
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`)
- Meaningful `alt` text for product and styling images
- All interactive elements usable by keyboard with visible focus states
- Swatches and color chips: accessible names (e.g. `aria-label="BLACK"`) and selected state (`aria-pressed` or radio group)
- Detail panel and mobile menu: `role="dialog"`, `aria-modal="true"`, focus trap, `Esc` to close
- External links that open in a new tab include `rel="noopener noreferrer"`
- Respect `prefers-reduced-motion` for animations

---

## 8. Tech Stack

**Required**
- **React** or **Next.js** only — other frameworks (Vue, Nuxt, Svelte, Angular, plain HTML/JS, etc.) will not be accepted
- State in the README which one you chose and why

**Preferred**
- **TypeScript**
- CSS approach of your choice: Tailwind CSS, CSS Modules, SCSS, or styled-components

**Allowed**
- A carousel library (e.g. Swiper, Embla) — justify the choice in README
- Headless/utility libraries (e.g. for focus trapping)

**Not allowed**
- Pre-built UI templates or page builders
- UI component libraries that dictate visual design (e.g. MUI, Bootstrap)

---

## 9. Bonus (Optional)

- Smooth open/close animations for the detail panel and mobile menu
- Hover image swap or subtle animation on product cards
- Unit / component tests (e.g. swatch selection, button state, panel open/close)

---

## 10. Deliverables

1. **Git repository** (GitHub / GitLab / Bitbucket) with a clear commit history
2. **README.md** including:
   - How to install and run the project locally
   - Tech stack and the reasons for your choices
   - Project / folder structure overview
   - Assumptions and decisions made where the design was unclear
   - Known issues or what you would improve with more time
3. **Live demo URL** (**required**) — deployed on Vercel, Netlify or a similar platform, publicly accessible and matching the submitted repository

---

## 11. Evaluation Criteria

| Criteria | Weight |
| --- | --- |
| Design accuracy (Desktop & Mobile, incl. detail panel and menu) | 25% |
| Responsiveness & cross-browser behavior | 15% |
| Functionality & data handling (API mapping, swatches, detail panel, deep link, carousels, button states, menu, loading/error states) | 20% |
| Code quality, structure & reusability | 20% |
| Performance, accessibility & SEO (meta, OG, favicon) | 10% |
| Documentation & Git hygiene | 10% |

Bonus items are considered on top of the core score.

---

## 12. Timeline & Submission

- **Time limit:** **7 days** from the date you receive the assignment email from HR
- **Submit to:** `[INSERT EMAIL / CONTACT]`
- **Submission format:** Repository link + live demo link (both required)

Please make sure the repository is public, or grant access to: `[INSERT GITHUB USERNAME(S)]`

---

## 13. Questions

If you have any questions about the assignment or the design, contact `[INSERT CONTACT]`. If you can't wait for an answer, make your best judgment and note it in the README.

Good luck, and we look forward to seeing your work!
