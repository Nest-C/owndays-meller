# Frontend Test: OWNDAYS x MELLER - Product Listing Page

## Overview

Build a responsive product listing page for the "OWNDAYS x MELLER" sunglasses collaboration collection. The page displays 8 sunglasses products in a grid layout with an interactive product detail modal and a horizontally scrollable "Style Them" carousel section.

**Figma Design:** Check from E-mail

---

## Data Source

### Fonts
| Name | Using | URL | Weight |
|------|-------|-----|--------|
| Noto Sans Japanese | `font-family: "Noto Sans JP", sans-serif;` | `https://fonts.google.com/noto/specimen/Noto+Sans+JP` | |
| Hiragino Kaku Gothic ProN | Can use the "Noto Sans Japanese" font instead | | |
| Favorit | `font-family: "Favorit", sans-serif;` | `https://storage.owndays.com/meller/fonts/Favorit/Favorit-Bold.woff2` | 700 |
| | | `https://storage.owndays.com/meller/fonts/Favorit/Favorit-Medium.woff2` | 500 |
| | | `https://storage.owndays.com/meller/fonts/Favorit/Favorit-Regular.woff2` | 400 |
| GT America Trial | `font-family: "GT America Trial Cm", sans-serif;` | `https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-CmBd.woff2` | 900 |
| | | `https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-CmBl.woff2` | 700 |
| | | `https://storage.owndays.com/meller/fonts/GTAmericaTrial/GTAmericaTrial-Md.woff2` | 500 |

### API Endpoints

| Endpoint | URL | Description |
|----------|-----|-------------|
| Products | `GET https://api-one-alpha-60.vercel.app/meller/products.json` | 8 products with SKU variants, colors, images, and pricing |

### API Documentation

Full schema and field descriptions: [PRODUCTS_README.md](https://github.com/frontend-otm/api/blob/main/meller/PRODUCTS_README.md)

### Image Base URL

Prepend to all image `path` fields:
```
https://storage.owndays.com/storage/
```

**Example:**
```
path: "products/36ebdac7-36d3-40a8-9e83-f3cb90b4c9d4.webp"
→ https://storage.owndays.com/storage/products/36ebdac7-36d3-40a8-9e83-f3cb90b4c9d4.webp
```

### Key Data Structure

```
GET /meller/products.json → Response:
{
  "success": true,
  "total": 8,
  "data": [
    {
      "product": { "id", "code", "model_name", ... },
      "product_line": { "name": "OWNDAYS × MELLER" },
      "product_type": { "name": "Sunglasses" },
      "localization": { "language_code": "ja", "description": "..." },
      "frame_types": [{ "code": "square" | "boston" | "polygon" | "wellington" }],
      "selling_setting": { "price": 7800, "in_stock": 2 },
      "skus": [
        {
          "code": "C1",
          "colors": [{ "hex_code": "#000000", "name": "ブラック", "path": null }],
          "images": [{ "path": "products/xxx.webp", "order": 1 }]
        }
      ]
    }
  ]
}
```

---

## Page Sections

### 1. Header / Navigation Bar

- Sticky top navigation
- Background: Brand orange (#F26A2F or similar from Figma)
- Width: 100% (1440px max on desktop, full-width on mobile)

**Desktop (≥1024px):**
- Left: "OWNDAYS x MELLER" collaboration logo (351x52px)
- Right: Text navigation links — "ABOUT", "PRODUCTS", "STORES"
- Font: Favorit Bold, 15px, uppercase, white, tracking 0.7px
- Gap between nav items: 50px
- Padding: 25px vertical

**Mobile (<1024px):**
- Left: "OWNDAYS x MELLER" collaboration logo (240x16px, scaled down)
- Right: Hamburger menu icon (20x24px, 3 horizontal lines, white)
- Padding: 23px vertical

**Mobile Menu (opened state):**
- Full-screen or slide-in overlay when hamburger is tapped
- Contains navigation links: "ABOUT", "PRODUCTS", "STORES"
- Close button to dismiss menu
- Dark/brand-colored background with white text

### 2. Hero Section

- Background color band at the top (dark area, ~633px height on desktop)
- "PRODUCTS" title with highlighted/underlined styling
- Prominent typography treatment

### 3. Product Grid

**Desktop (≥1024px):** 3-column grid layout  
**Mobile (<1024px):** Single column (full-width cards stacked vertically)

#### Product Card Specification

Each card displays:

| Element | Data Source | Example |
|---------|-------------|---------|
| Product Image | `skus[0].images[0].path` (first image of first SKU) | Rounded rectangle container |
| Model Name | `product.model_name` | "ADISA" |
| Product Code + SKU | `product.code` + " " + `skus[n].code` | "ML2001D-6S C1" |
| Color Swatches | `skus[].colors[].hex_code` or pattern image | Circular swatch indicators |
| Price | `selling_setting.price` | "¥7,800+tax" |

**Card dimensions:**
- Desktop: ~422 x 452px per card, 17px gap between cards
- Mobile: ~357 x 383px, full width stacked

**Color Swatches:**
- Display as 38x38px circular indicators
- If `hex_code` is available → use solid color fill
- If `hex_code` is null and `path` is provided → use pattern image
- Show max 4 swatches; hide overflow with appropriate UI treatment

---

### 4. Product Detail Modal / Panel

Triggered when a user clicks a product card or the "+" button on carousel items.

**Desktop:** Right-side overlay panel (616px width, full height 1012px)  
**Mobile:** Full-screen overlay

#### Modal Contents

| Element | Data Source | Notes |
|---------|-------------|-------|
| Close Button (X) | — | Top-right corner, `gridicons:cross` icon (42x42px) |
| Model Name | `product.model_name` | Large heading at top-left |
| Image Carousel | `skus[selectedSku].images[]` | Horizontal scrollable, shows multiple product angles |
| Color Variant Chips | `skus[].colors[].name` (localized) | Selectable chips/tabs below carousel |
| Product Number | `product.code` + SKU code | "P/No. ML2001D-6S C1" |
| Frame Type | `frame_types[0].code` | "TYPE SQUARE" (uppercased) |
| Price | `selling_setting.price` | "PRICE ¥7,800 税込" |
| Description | `localization.description` | Japanese product description text |
| CTA Button | `www.owndays.com/jp/ja/products/{$product.code}?sku={$product.skus[].id}` | "ONLINE STORE" button |
| CTA Subtitle | — | "OWNDAYSオンラインストアに移動します" |

**Color Variant Chips Behavior:**
- Chips show localized color names (e.g., "C1", "Brown Demi", "Clear Gray", "Clear Green")
- Selecting a chip updates the image carousel to show that SKU's images
- Selected chip has a distinct active state

**Image Carousel:**
- Shows product images for the selected SKU
- Horizontally scrollable with 3 visible slides
- Image dimensions: ~420x298px per slide (desktop)

---

### 5. "HOW TO STYLE THEM" Section

- Two section labels stacked: "HOW TO" and "STYLE THEM" with underline/highlight treatment
- Horizontal scrollable carousel of lifestyle/product images
- Each carousel item: ~405x611px (desktop) / ~326x492px (mobile)
- Each item has a "+" overlay button (70x70px circle, bottom-right corner) that opens the product detail modal
- Carousel should overflow the viewport and be scrollable

---

### 6. Footer

- "ALL ITEMS" CTA button (428x70px) leading to full collection
- Standard footer with navigation links

---

## Interactive Behaviors

### Product Card Click
- Opens the Product Detail Modal for the clicked product
- Default selected SKU: first SKU (`skus[0]`)

### Color Swatch / Chip Selection
- In the **grid card**: Updates the card's product image to the selected SKU's first image
- In the **modal**: Updates the image carousel and product code display

### "ONLINE STORE" Button
- Links to the product's online store page
- **States:**
  - Default: Dark fill, white text
  - Hover: Inverted colors (white fill, dark border, dark text)
  - Disabled/Out of Stock: Grayed out, text reads "OUT OF STOCK" (when `selling_setting.in_stock === 0`)

### Mobile Menu Toggle
- Tapping the hamburger icon opens a full-screen or slide-in navigation menu
- Menu contains: "ABOUT", "PRODUCTS", "STORES" links
- Tapping a menu item scrolls/navigates to the corresponding section and closes the menu
- Close button or tap outside to dismiss

### Carousel Scroll
- "Style Them" section: horizontal scroll with momentum/smooth scrolling
- No pagination dots required; free-scroll

---

## Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| ≥1024px (Desktop) | Text navigation links, 3-column product grid, side-panel modal (616px) |
| <1024px (Mobile) | Hamburger menu with overlay, single-column grid, full-screen modal |

---

## Design Tokens / Styling Notes

- **Font:** Sans-serif (suggest Inter, Favorit, or system font)
- **Navigation font:** Favorit Bold, 15px, uppercase, letter-spacing 0.7px, white
- **Navigation background:** Brand orange (#F26A2F)
- **Title style:** Large bold serif/display font for "PRODUCTS", "HOW TO", "STYLE THEM"
- **Card background:** Light/white with subtle border or shadow
- **Swatch size:** 38x38px circles with 3px gap
- **Price format:** "¥{price}+tax" in grid, "¥{price} 税込" in modal
- **Border radius:** Rounded corners on product images and cards
- **Primary CTA:** Dark background (#000 or near-black), white text, rounded corners
- **CTA hover:** White background, dark border, dark text (inverted)
- **Modal overlay:** Semi-transparent backdrop on mobile

---

## Data Mapping Quick Reference

```
Products (8 total):
┌──────────────┬──────────────┬────────────┬────────┬──────────┐
│ Model Name   │ Code         │ Frame Type │ Price  │ SKUs     │
├──────────────┼──────────────┼────────────┼────────┼──────────┤
│ ADISA        │ ML2001D-6S   │ square     │ ¥7,800 │ 4 colors │
│ CHAUEN       │ ML2002D-6S   │ boston     │ ¥7,800 │ 4 colors │
│ CUMBI        │ ML2003D-6S   │ polygon    │ ¥7,800 │ 4 colors │
│ KESSIE       │ ML2004D-6S   │ square     │ ¥7,800 │ 4 colors │
│ NAYAH        │ ML2005D-6S   │ wellington │ ¥7,800 │ 4 colors │
│ JAMIL        │ ML2006D-6S   │ square     │ ¥7,800 │ 2 colors │
│ KUBU         │ ML2007D-6S   │ boston     │ ¥7,800 │ 2 colors │
│ TANA         │ ML2008D-6S   │ wellington │ ¥7,800 │ 2 colors │
└──────────────┴──────────────┴────────────┴────────┴──────────┘
```

---

## Technical Requirements

### Must Have
- [ ] Responsive layout (desktop 3-col grid + mobile single-col)
- [ ] Navigation bar with desktop text links and mobile hamburger menu
- [ ] Mobile menu overlay with navigation links (ABOUT, PRODUCTS, STORES)
- [ ] Product cards rendering all 8 products from JSON
- [ ] Color swatch display with correct colors (hex or pattern image)
- [ ] Product detail modal/panel with full product information
- [ ] SKU/color variant switching (updates images + product code)
- [ ] Image carousel in product detail (horizontal scroll)
- [ ] "HOW TO STYLE THEM" horizontal scroll section
- [ ] "ONLINE STORE" button with hover and disabled states
- [ ] Price formatting (¥7,800+tax / ¥7,800 税込)
- [ ] Close button to dismiss modal

### Nice to Have
- [ ] Smooth open/close animation for modal
- [ ] Image lazy loading
- [ ] Keyboard accessibility (ESC to close modal, tab navigation)
- [ ] SEO meta tags (OGP image provided at 1200x630)

### Tech Stack (Suggested)
- Framework: React / Next.js / Vue (candidate's choice)
- Styling: Tailwind CSS / CSS Modules / Styled Components
- Data: Fetch from API endpoints (no backend required)

---

## Evaluation Criteria

1. **Pixel accuracy** — How closely the implementation matches the Figma design
2. **Responsiveness** — Correct behavior across desktop and mobile breakpoints
3. **Interactivity** — Smooth modal open/close, SKU switching, carousel scrolling
4. **Code quality** — Clean component structure, proper TypeScript types, reusable patterns
5. **Performance** — Efficient rendering, image optimization, no unnecessary re-renders
6. **Attention to detail** — Correct price formatting, proper Japanese text rendering, button states

---

## Submission

- Provide a GitHub repository or zip file
- Include a README with setup instructions
- Deploy to Vercel/Netlify (bonus)
- Estimated time: 7 days