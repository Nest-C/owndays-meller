# Code conventions

Follow these in every change. Rules marked **(lint)** are enforced by `npm run lint` (`eslint.config.mjs`); run it before you finish, along with `npx tsc --noEmit`. Most lint errors are auto-fixable with `npx eslint . --fix`. The rest are by convention, so match the existing code.

## Formatting (lint)
- Single quotes in TS/JS, double quotes in JSX attributes. Semicolons always. 2-space indent.
- Trailing commas on multi-line literals, arguments and imports. Parentheses around every arrow parameter: `(e) => …`.
- `{ a, b }` with spaces. No trailing whitespace, one blank line max, newline at end of file. Max line length 130.

## Imports
- **(lint)** Order, with no blank lines between groups:
  1. Packages (`react`, `next/*`, `react-dom`).
  2. `@/api` → `@/lib` → `@/types` → `@/constants` → `@/hooks` → `@/assets` → `@/components`.
  3. Sibling components (`./ImageCarousel`).
  4. The component's own files, in this order: `./X.module.css` → `./X.types` → `./X.constants`.
- **(lint)** Use the `@/` alias across folders; never `../`. Use `./` only for files in the same folder.
- **(lint)** Type-only imports use `import type { … }`. In a mixed import, mark the types inline: `import { useRef, type RefObject } from 'react'`.
- **(lint)** `shared/` must not import from `layout/` or `product/`. Dependencies flow `shared/` → `layout/` / `product/` → `app/`.

## Files and folders
- Naming:

  | What | Case | Examples |
  |---|---|---|
  | Component folders and files | PascalCase | `ProductCard/ProductCard.tsx` |
  | Hooks | camelCase, `use` prefix | `useInView.ts` |
  | Other folders and TS files | lowercase, one word | `lib/product.ts`, `constants/site.ts` |
  | Assets and docs | kebab-case | `hero-desktop.jpg`, `cart.svg`, `products-api.md` |
  | Next.js special files | as Next.js requires | `page.tsx`, `layout.tsx`, `(landing)/`, `apple-icon.png` |

  Font files keep their vendor names (`Favorit-Bold.woff2`).
- One folder per component, with the folder and file named after the component in PascalCase: `ProductCard/ProductCard.tsx`.
- Next to it, only when needed:
  - `ProductCard.module.css`: its styles.
  - `ProductCard.types.ts`: its props interface (`ProductCardProps`) and any type only it uses.
  - `ProductCard.constants.ts`: constants only it uses (`MAX_SWATCHES`).
- A sub-component used by only one parent lives in the parent's folder (`ProductModal/ImageCarousel.tsx`, `Navbar/MobileMenu.tsx`).
- Groups:
  - `components/shared/`: product-agnostic, used by several sections.
  - `components/layout/`: the page frame.
  - `components/product/`: the product feature.
- A type used in more than one place goes in `src/types/` (`product.ts` for API data). A constant used in more than one place goes in `src/constants/site.ts`.
- Hooks: `src/hooks/useThing.ts`, one hook per file. A hook's private types and constants stay inline in its file.
- Pure helpers: `src/lib/`, one file per topic (`product.ts`, `seo.ts`). Data fetching (server-only): `src/api/`.
- Icons: add the SVG to `src/assets/icons/` (kebab-case, no prefix: `cart.svg`), then re-export it from `index.ts`: `export { default as CartIcon } from './cart.svg';`. Use it as `<CartIcon width={22} height={22} />`.

## Components
- **(lint)** Named exports only: `export function Navbar()`. Default exports are allowed only where Next.js requires them (`page`, `layout` and other route files, `*.config.*`).
- Declare with `function`, not an arrow. A memoized component wraps a named function: `export const Swatch = memo(function Swatch(…) {…})`.
- Props are typed with the `XProps` interface from `X.types.ts` and destructured in the signature. Defaults go in the destructuring: `({ delay = 0, play = true })`.
- Add `'use client'` as the first line of any component that uses hooks, event handlers (`onClick`, `onKeyDown`, …) or browser APIs. Everything else stays a Server Component.
- **(lint)** Self-close empty elements (`<span />`). No useless fragments.
- Use `next/image` for images (`preload` for the LCP image, not the deprecated `priority`). Decorative images get `alt=""`.
- Links that open a new tab spread `{...EXTERNAL_LINK}` from `@/constants/site`.

## TypeScript
- `interface` for object shapes (props, API data); `type` for unions, aliases and derived types.
- Type the return value of exported helpers in `src/lib/` (`(price: number): string =>`).
- Constants are `UPPER_SNAKE_CASE`. Use `as const` for fixed lists (`NAV_LINKS`). Everything else is `camelCase`.
- **(lint)** `===` only. `const` unless the value is reassigned. Braces may be omitted only for one-line `if` bodies: `if (!el) return;`.
- **(lint)** No `console.log`; `console.warn` and `console.error` are allowed.

## CSS
- CSS Modules only: no Tailwind, no inline style objects except to pass a CSS variable (`style={{ '--wipe-delay': '0.6s' }}`).
- Class names are camelCase (`.imageBox`) and used as `styles.imageBox`.
- Write mobile styles first; desktop overrides go in one `@media (min-width: 1024px)` block at the end of the file. Media queries can't use variables, so write the literal.
- Use the tokens from `globals.css` (`var(--color-brand)`, `var(--gutter)`, …) rather than raw values.
- Style states with attributes, not extra classes: `[aria-pressed='true']`, `[data-open='true']`, `[data-state='closing']`.
- Keyframes describe only the hidden end (`from { opacity: 0; }`). The visible end is the element's normal style, so `prefers-reduced-motion` and `animation: none` still show the content.

## Comments
- Explain *why*, not *what*. Keep it to one line where possible: `/** … */` above an export, `//` inside code.
- No commented-out code. No comments that repeat the code.
