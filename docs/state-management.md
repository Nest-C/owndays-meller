# State management — decision record

**Status:** decided · **Decision:** no state library. React `useState` + lifting state up, with server data from a Server Component. Revisit list at the end.

## 1. Requirements

**Functional** (from `requirements.md`)
- Show 8 products from one read-only JSON endpoint.
- Card: switch SKU via swatches (image + P/No. update).
- Modal: open from a card or a "How to style them" `+`; switch SKU via chips; close via ×, backdrop, ESC.
- Mobile menu: open/close.
- Navbar: changes colour on scroll.

**Non-functional**
- SEO: products must be in the initial HTML.
- Performance: no unnecessary re-renders, small client bundle (both are evaluation criteria).
- Code quality: a reviewer should be able to follow the data flow quickly.

**Constraints**
- Interview assignment, one developer, about 7 days. Avoid over-engineering.
- No writes, no auth, no cart, no data shared between pages (there is only one page).

## 2. What state exists

| State | Kind | Owner today | Who reads it |
|---|---|---|---|
| Product list | Server data, read-only | `app/(landing)/page.tsx` (Server Component) → props | Grid, cards, HowToStyle, modal, JSON-LD |
| Selected product + modal SKU index | UI, shared by 2 siblings, mirrored in the URL | `useProductDeepLink` (`useState` + History API) in `ProductCatalog` | Grid + HowToStyle (open), Modal (read, change SKU) |
| Card SKU index (per product) | UI, shared with the modal | `cardSkus` in `ProductCatalog` → `ProductGrid` → `ProductCard` (controlled) | that card; follows the modal's SKU |
| Modal closing flag | UI, local | `ProductModal` | modal only |
| Menu open | UI, local | `Navbar` | Navbar + MobileMenu (child) |
| Scrolled past hero | UI, derived from window | `useScrolled` hook | Navbar |

```
 Server (build / ISR every 1h)
 ┌───────────────────────────┐
 │ page.tsx  getProducts()   │──── products (props) ─────────────┐
 └───────────────────────────┘                                   │
 Client                                                          ▼
 ┌ Navbar ─────────────┐      ┌ ProductCatalog  useProductDeepLink() ───────┐
 │ [menuOpen]          │      │   [selected + skuIndex] ⇄ ?product=&color=  │
 │  └ MobileMenu       │      │   [cardSkus] ← follows selected skuIndex    │
 │                     │      │  ├ ProductGrid ─ ProductCard ×8 (controlled)│
 │ useScrolled()       │      │  ├ HowToStyle  (onOpen)                     │
 └─────────────────────┘      │  └ ProductModal [closing]                   │
                              └─────────────────────────────────────────────┘
```

There are **two pieces of shared client state**, both in `ProductCatalog`: the selected product and its SKU (shared by siblings one level apart and mirrored in the URL), and the color each card shows. The card colors started out local to each `ProductCard`, but a color picked in the modal has to stay on the card after closing, so they moved up next to the selection. Whenever the selection changes, `ProductCatalog` copies its SKU into `cardSkus` during render (not in an effect, so the card never shows the old color for a frame). Everything else is local to a single component.

## 3. Options compared

Sizes are the minified + gzip size of a minimal usage, bundled with esbuild, React excluded (measured 2026‑10‑29). For scale, the page currently ships about **184 kB gzip** of JavaScript, mostly the React and Next.js runtime.

### Client UI state

| Option | Version | +JS gzip | Model | Fits this page? |
|---|---|---|---|---|
| **`useState` + lift up** (current, wrapped in `useProductDeepLink`) | React 19 | 0 | Local state, props down, callbacks up | ✅ Two shared values in one component, one level of lifting. Nothing to learn, nothing to configure. |
| `useReducer` / Context | React 19 | 0 | Reducer, or a provider for deep trees | ⚪ Context only pays off when props pass through many layers; here it's one. A reducer suits many related transitions, but there are 2–3 per component. |
| Zustand | 5.0.16 | ~0.4 kB | Small external store with hooks and selectors | ⚪ The cheapest library option, and the one I'd pick if global state ever appeared. Today it would replace one `useState` with a store file. |
| Jotai | 3.0.1 | ~3.2 kB | Atoms, composed bottom‑up | ⚪ Good for many small interdependent values. We have one. |
| Valtio | 2.3.2 | ~2.5 kB | Mutable proxy, snapshot reads | ⚪ Convenient, but mutation-style updates are less obvious in review. |
| Redux Toolkit + react-redux | 2.13.0 / 9.3.1 | ~10.6 kB | Single store, slices, actions, devtools | ❌ Best for large apps with many writers and a need for time-travel debugging. Here it means a store, a slice, a provider and boilerplate for one value; a reviewer would read it as over‑engineering. |
| MobX + mobx-react-lite | 7.1.3 / 5.1.2 | ~13.6 kB | Observable classes, automatic tracking | ❌ Powerful for complex domain models; heavy and "magic" for this. |
| XState + @xstate/react | 5.33.3 / 6.1.0 | ~13.6 kB | Explicit state machines | ❌ The modal's open → closing → closed is a tiny machine; a `closing` flag already covers it. |

### Server data

| Option | Version | +JS gzip | Fits this page? |
|---|---|---|---|
| **Server Component fetch + ISR** (current) | Next 16 | 0 | ✅ Data is in the HTML (SEO), there's no loading spinner, and it refreshes hourly. The client never fetches. |
| TanStack Query | 5.105.0 | ~9.9 kB | ❌ Built for client caching, refetching, mutations and pagination. We have one read-only list that never changes during a visit. Client fetching would also take products out of the initial HTML unless you add hydration. |
| SWR | 2.5.1 | ~6.4 kB | ❌ Same reasoning as TanStack Query, lighter. |

### URL state

| Option | Version | +JS gzip | Notes |
|---|---|---|---|
| **Native History API** (current) | Next 16 | 0 | `window.history.pushState`/`replaceState` + a `popstate` listener, reading `window.location.search` in an effect. Supported by the App Router; no `useSearchParams`, so no `<Suspense>` boundary and the static HTML is the same for every query. |
| nuqs | 2.10.2 | ~6.2 kB | Type-safe query-string state with a nicer API. Worth it with many URL params; not for one or two. |

## 4. Decision

Keep **built-in React state**, with no state or data-fetching library.

- **Why:** two shared values owned by one component, a static read-only dataset, and a reviewer who rewards simple, readable data flow. Any library adds files, concepts and bytes without solving a problem the page has.
- **Re-renders are already controlled:** `ProductCard` is `memo`'d, gets its SKU index as a plain number, and every handler it receives is a stable `useCallback`. Opening the modal or changing one card's color re-renders `ProductCatalog` and `ProductGrid`, but only the card whose number changed renders again. Smaller leaves (`Swatch`, `ImageCarousel`) are deliberately not memoized: their props change on every render they get, so `memo` would only add cost.
- **Selection lives in the URL too:** `?product=adisa&color=C2` makes a product shareable and lets mobile "Back" close the modal, at 0 kB.
- **Trade-off accepted:** if the app grew to several pages sharing client state (a cart, favourites, filters), we'd move that state to a small store. We'd make that change then, not now.

## 5. What to revisit as the system grows

| Trigger | Change |
|---|---|
| Per-product SEO for shared links | The selection is already in the URL (done, see §4). Next step would be real routes or `generateMetadata` per product. |
| Filters or sorting (frame type, colour) | URL state first (shareable, works with back/forward); consider nuqs once there are more than a couple of params. |
| Client state shared across pages (cart, favourites, recently viewed) | Zustand (~0.4 kB), with a store per concern. Persist favourites with its `persist` middleware. |
| Client-side fetching (stock polling, pagination, search) | TanStack Query, seeded from server data so the initial HTML stays complete. |
| Complex multi-step flows (checkout, lens selection wizard) | Consider XState for that flow only. |
| Large team with many writers to one store, audit or debug needs | Redux Toolkit. |

## References
- React: [Sharing state between components](https://react.dev/learn/sharing-state-between-components), [Choosing the state structure](https://react.dev/learn/choosing-the-state-structure), [Passing data deeply with context](https://react.dev/learn/passing-data-deeply-with-context) (its "Before you use context" section recommends trying props first)
- Next.js 16 docs bundled in `node_modules/next/dist/docs`: Fetching data, Incremental static regeneration, Linking and navigating → *Native History API*
- Library docs: [Zustand](https://zustand.docs.pmnd.rs), [Jotai](https://jotai.org), [Valtio](https://valtio.dev), [Redux Toolkit](https://redux-toolkit.js.org), [MobX](https://mobx.js.org), [XState](https://stately.ai/docs), [TanStack Query](https://tanstack.com/query), [SWR](https://swr.vercel.app), [nuqs](https://nuqs.dev)
