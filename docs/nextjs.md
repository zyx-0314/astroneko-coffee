# Next.js Utilization — Astroneko Coffee (Anchor Doc)

**Purpose**: Canonical Next.js architecture and conventions  
**Owner**: Frontend Team  
**Last-updated**: 2025-08-29  
**Status**: Canonical (architecture decisions)

> **Policy**: This document contains recommended conventions for rendering strategy, routing patterns, and folder structure. Any changes to these architectural patterns must be approved via the Docs Change approval process.

> Goal: a mobile‑first web app supporting **Admin**, **Employee‑Cashier**, and **User (Client)**.
> Design for **mobile**, **tablet kiosk**, **desktop**. Keep choices simple for learning.

## 0) High‑level rules

* **Do the simplest thing that works**, then iterate.
* Prefer **consistency** over cleverness.
* Every page must have: clear loading state, empty state, error state.

---

## 1) Routing Model (App Router)

* We use **App Router** with **route groups**:

  * `app/(user)/…` → customer views (e.g., `app/(user)/menu/page.tsx`)
  * `app/(admin)/…` → admin views (e.g., `app/(admin)/dashboard/page.tsx`)
  * `app/(employee-cashier)/…` → cashier views (e.g., `app/(employee-cashier)/pos/page.tsx`)
* Public URL examples:

  * `/menu` (served by `/(user)/menu/page.tsx`)
  * `/admin/dashboard` (served by `/(admin)/dashboard/page.tsx`)
  * `/cashier/pos` (alias of `/(employee-cashier)/pos`)
* **Navigation**: bottom bar (mobile), sidebar (tablet/desktop) per area.

### Role access (beginner policy)

* **Guard by layout**:

  * `app/(admin)/layout.tsx` → checks `role === 'MANAGER'`
  * `app/(employee-cashier)/layout.tsx` → checks `role === 'EMPLOYEE_CASHIER'`
  * `app/(user)/layout.tsx` → optional (anonymous allowed)
* If unauthorized → redirect to `/login`.

---

## 2) Rendering Strategy (simple, per route)

Pick the easiest that matches the need. Defaults:

| Route                    | Default Rendering        | Why                                     |
| ------------------------ | ------------------------ | --------------------------------------- |
| `/menu`                  | **ISR (30s)**            | Mostly stable; cheap refetch on changes |
| `/login`                 | **CSR**                  | Forms + client-only auth flow           |
| `/cart`                  | **CSR**                  | Local state heavy                       |
| `/orders` (user history) | **SSR**                  | Per-user data, fresh on request         |
| `/orders/[id]`           | **SSR**                  | Fresh order status                      |
| `/cashier/pos`           | **CSR** + socket         | Live UI & quick input                   |
| `/admin/dashboard`       | **SSR** (+ socket later) | Fresh KPIs; can hydrate realtime        |
| `/queue`                 | **CSR** + socket         | Realtime list                           |

**Rules of thumb**

* **SSR** for authenticated dashboards & details.
* **ISR** for public/semi‑static (e.g., menu, promos).
* **CSR** for heavy client interactions (POS, cart, login).
* Add sockets when realtime is needed; keep REST as the source of truth.

---

## 3) Realtime Scope (v1 vs v2)

### v1 (No Sockets Yet):
- **/cashier/pos:** No realtime; submit orders and show results.
- **/admin/dashboard:** SSR on load; optional polling every 20–30s.
- **/queue:** CSR view with polling every 10–15s.

### v2 (Enable WebSocket):
- **Topics:**
  - Queue updates.
  - Kitchen order progress.
  - Staff presence.
- **Auth:** Use JWT on connect and subscribe per role/room.

---

## 4) Rendering Strategy (Expanded)

### Rules of Thumb:
- **SSR** for authenticated dashboards & details.
- **ISR** for public/semi-static (e.g., menu, promos).
- **CSR** for heavy client interactions (POS, cart, login).
- Add sockets when realtime is needed; keep REST as the source of truth.

---

## 5) Data Fetching & HTTP

* **HTTP client**: **Axios** (centralized instance).
* **SSR data**: use **server components** or **route handlers** to call backend.
* **CSR data**: call via Axios in client components.
* **Revalidation**:

  * ISR pages: `revalidate = 30` seconds (starter default).
  * Manual refresh action where needed.

**Axios defaults**

* Base URL: `process.env.NEXT_PUBLIC_API_BASE_URL`
* Timeout: 10s
* Retry: none (beginner‑friendly; we add later if needed)
* Error shape expected from backend: `{ code, message, details? }`

---

## 6) State, Forms, Validation

* **Global state**: **Zustand** stores for:

  * `auth.store.ts` (token, role, user)
  * `cart.store.ts` (order draft)
  * UI prefs (theme) if needed
* **Local component state** for forms/dialogs.
* **Validation**: **Zod** for:

  * API boundaries (parse responses)
  * Forms (schema + error messages)

---

## 7) UI/UX, Theme, Accessibility

* **Colors**: Cosmic Mocha `#6B4E37` (primary), Nebula Teal `#2CA6A4` (secondary), Solar Gold `#E1B168` (accent).
* **Fonts**: Cormorant Garamond (main), Cantarell (body).
* **Component lib**: Tailwind + **shadcn/ui** from the start.
* **Motion**: **Framer Motion** for subtle page/element transitions.
* **Dark mode**: supported (system default, toggle in header).
* **A11y baseline**: keyboard nav, visible focus, ARIA for menus/tabs, WCAG AA contrast.

---

## 8) Auth UX (JWT from backend)

* **Storage** (beginner‑friendly): **httpOnly cookie** set by backend on `/auth/login`.

  * Client reads role from `/auth/me` (SSR or CSR fetch).
* **Redirects** after login by role:

  * `MANAGER` → `/admin/dashboard`
  * `EMPLOYEE_CASHIER` → `/cashier/pos`
  * default → `/menu`
* **401/403**: toast + redirect to `/login`.
* **Expiry**: if `/auth/me` fails → clear stores → go to `/login`.

---

## 9) Folder & Naming Conventions (CONFIRMED)

> You asked for strict structure + naming. Confirmed and locked.

* **Schemas**: `*.schema.ts` / `*.schema.tsx` (e.g., `menuItem.schema.ts`)
* **Local hooks** (per feature page): `*.hook.ts` / `*.hook.tsx` (e.g., `dashboard.hook.tsx`)
* **Design presenter** (component that calls its local hook): co-located with page (e.g.,
  `app/(admin)/dashboard/page.tsx` + `app/(admin)/dashboard/dashboard.hook.tsx`)
* **Global hooks** (reusable): `src/hooks/nameOfHook.hook.ts`
* **Providers**: `src/providers/providersName.provider.tsx`
* **Stores (Zustand)**: `src/stores/storeName.store.ts`
* **Schemas** shared\*\*:\*\* `src/lib/schemas/fileName.schema.ts`
* **CamelCase everywhere** (files, exports, vars). No separate styles folder.

*(I understand and will follow this exactly. No deviations or “AI creativity.”)*

---

## 10) Testing (beginner track)

* **Jest + React Testing Library** for components.
* **MSW** to mock HTTP in tests.
* First targets:

  * Login form (valid/invalid)
  * Menu page renders items (ISR fallback)
  * POS add‑to‑cart flow (store interaction)
* Starter coverage target: **\~60–70%** on utilities & stores.

---

## 11) Realtime plan (later)

* Add **WebSocket (STOMP)** for:

  * `/queue` (live numbers)
  * `/cashier/pos` (order placed → notify kitchen)
  * `/admin/dashboard` (live KPIs)
* CSR components subscribe; SSR serves initial paint.

---

## 12) Errors, Loading, Empty States

* **Loading**: skeletons on lists/cards; spinner on primary buttons when submitting.
* **Empty**: illustration + short text + primary action.
* **Errors**: inline for forms + toast for global; standardized error parser.

---

## 13) SEO / Metadata

* English only.
* Minimal metadata per route (title/description).
* Public OG tags for `/menu` only (optional later).

---

## 14) Analytics / Telemetry (local)

* Simple console+in‑memory logger for dev:

  * Event naming: `area.action.result` (e.g., `auth.login.success`)
  * Attach `userId`, `role`, `timestamp`.
* Optional: send to backend `/telemetry` (disabled by default).

---

## 15) Env & Config

* Required envs (client‑safe start):

  * `NEXT_PUBLIC_API_BASE_URL` (e.g., `http://localhost:8083`)
* Secret envs go server‑side only (none required for UI MVP).
* Feature flags: `src/lib/flags.ts` (plain booleans).

---

## 16) Learner‑first route (how we’ll build)

1. **Scaffold UI shell** with the three route groups and 3 pages:

   * `/(user)/menu` (ISR 30s)
   * `/(employee-cashier)/pos` (CSR)
   * `/(admin)/dashboard` (SSR)
2. Wire **Axios** instance + simple `useAuth.hook.ts` (reads `/auth/me`).
3. Add **Zustand** `auth.store.ts` + `cart.store.ts`.
4. Plug **shadcn/ui**, **Framer** (one subtle transition).
5. Add **Zod** schemas for `login`, `menuItem`, `orderDraft`.
6. Tests: login form + menu render + add to cart.
7. Add **dark mode toggle** and basic a11y review (tab order, focus traps).

---

## 17) Page‑by‑page starter contracts

* `/menu` (ISR 30s)

  * GET `GET /menu` (public)
  * `menuItem.schema.ts` parse
  * Empty state text: “Menu coming soon”
* `/login` (CSR)

  * POST `/auth/login` → httpOnly cookie; then GET `/auth/me`
  * On success: role‑based redirect
* `/cashier/pos` (CSR)

  * Read `/menu`, use `cart.store.ts`, submit order `POST /orders`
* `/admin/dashboard` (SSR)

  * Server fetch `/stats` (mock at first), hydrate

---

## 18) Commit & PR hygiene

* Conventional commits (`feat:`, `fix:`, `docs:`).
* Include **screenshots** of the three pages in the PR description.
* Short **changelog** snippet in PR body.

---

# Quick Decision Recap (filled)

* **App Router**: Yes, with `(user)`, `(admin)`, `(employee-cashier)` groups.
* **Rendering**: ISR `/menu` (30s); CSR `/login`, `/cashier/pos`; SSR `/admin/dashboard`, `/orders/*`.
* **HTTP**: Axios; base URL from `NEXT_PUBLIC_API_BASE_URL`.
* **State**: Zustand (auth, cart); local for forms.
* **Validation**: Zod at forms + response boundaries.
* **Theme**: Cosmic Mocha / Nebula Teal / Solar Gold; Cormorant Garamond & Cantarell; shadcn + Framer; dark mode; a11y baseline.
* **Auth**: httpOnly cookie; role redirects.
* **Realtime**: add sockets to queue/POS/dashboard later.
* **Testing**: Jest + RTL + MSW; first 3 flows.
* **Telemetry**: local logger; `area.action.result` convention.
* **Env**: `NEXT_PUBLIC_API_BASE_URL` only (UI side).
