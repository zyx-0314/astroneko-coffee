# Astroneko Coffee — MVP Roadmap (Phased, 3-Layer Checklist)

## PHASE 0 — Foundations (must exist before anything moves)

* [ ] **Platform & Security Backbone**

  * [ ] Auth model & tokens

    * [ ] JWT (httpOnly), refresh, expiry handling
    * [ ] Password hashing + strength rules
  * [ ] RBAC & route guards

    * [ ] Roles: Manager, Front Desk, Kitchen, Client
    * [ ] Permission matrix and 403 handling
  * [ ] Error pages

    * [ ] `/errors/forbidden`
    * [ ] `/errors/backend-down` (basic), `/errors/maintenance` (basic)

* [ ] **Public shell (minimal)**

  * [ ] Landing `/` (logo + CTA to order/auth)

    * [ ] Header + nav, footer
  * [ ] Menu `/menu` (read-only list)

    * [ ] Category filter, availability badges
  * [ ] Order `/order` (stub)

    * [ ] Cart summary placeholder

---

## PHASE 1 — POS Core: Auth → Menu → Orders → KDS (make coffee flow works)

* [ ] **Authentication Page `/authentication`**

  * [ ] Sign In

    * [ ] Email+password form, loading/disable, visibility toggle
    * [ ] Field-level errors; demo-login buttons for seeded roles
    * [ ] Redirect by role; preserve intended URL
  * [ ] Sign Up (Client only)

    * [ ] Form (first/last/email/password/confirm/sex/phone)
    * [ ] Zod validation + live password match
    * [ ] Auto-redirect to `/dashboard`
  * [ ] Route Protection (middleware)

    * [ ] Validate JWT on protected routes
    * [ ] Auto-logout on expiry → redirect to `/authentication`

* [ ] **Menu Management (MVP subset) `/admin/managers/menu`**

  * [ ] Menu CRUD (minimal)

    * [ ] Create/Edit/Delete: name, description, price, category
    * [ ] Availability toggle (Available/Out of Stock)
    * [ ] Rating/review display (placeholder)
  * [ ] Menu list/table (operator view)

    * [ ] Sort by name/price; filter by category/availability
    * [ ] Bulk toggle availability

* [ ] **Front Desk Dashboard `/admin/front-desk/dashboard`**

  * [ ] Queue Management (MVP)

    * [ ] Real-time queue (WebSocket)
    * [ ] Order cards: customer name (optional), items, notes
    * [ ] Priority badges; sound notification
  * [ ] Order Processing (pre-payment)

    * [ ] Build/modify order (items, modifiers, notes)
    * [ ] Send to Kitchen → create KDS ticket

* [ ] **Kitchen Dashboard `/admin/kitchen/dashboard`**

  * [ ] KDS

    * [ ] Ticket list: prep status (in-progress/done)
    * [ ] Special instructions display
    * [ ] Update line-item status; push status back to Front Desk

---

## PHASE 2 — Payments & Receipts + Inventory Basics (turn sales real, stock moves)

* [ ] **Payments (cash + mock digital)**

  * [ ] Payment Intent layer

    * [ ] Create/confirm/capture/refund (MOCK provider)
    * [ ] Idempotency keys; link to `order`
  * [ ] Front Desk payment UX

    * [ ] Status chips: paid/pending/processing
    * [ ] Receipt print/email (basic template)

* [ ] **Inventory (minimal functional)**

  * [ ] Supplies & SKUs

    * [ ] SKU: name/unit/onHand/threshold
    * [ ] Stock ledger: delta + reason
  * [ ] Recipes (BOM)

    * [ ] MenuItem → (SKU, qty)
    * [ ] Decrement on **PAID** order
  * [ ] Low-stock alerts

    * [ ] Threshold check & badge in manager view

* [ ] **Client Dashboard `/dashboard` (MVP)**

  * [ ] Profile

    * [ ] Basic info (name/email/phone)
  * [ ] Order History (paid orders only)

    * [ ] Table: date/items/total/status (sortable, searchable)

---

## PHASE 3 — Staff Management (CRUD + ops console for people)

* [ ] **Staff Dashboard & Table `/admin/managers/staff`**

  * [ ] Metrics (basic)

    * [ ] Total staff; active vs inactive
    * [ ] Role distribution chart
  * [ ] Table

    * [ ] Sort: Name/Role/Hire Date/Status
    * [ ] Search (name/email/phone/employeeId) + 300ms debounce
    * [ ] Filters: role, employment type, status
    * [ ] Row actions: Edit / Toggle Status / Delete
    * [ ] Bulk select → status updates/export

* [ ] **Create/Edit Staff**

  * [ ] New Staff (wizard light)

    * [ ] Personal info → Employment details (role/type/salary/hireDate)
    * [ ] Zod validation; autosave draft
  * [ ] Edit Staff

    * [ ] Partial updates
    * [ ] Salary change → audit trail
    * [ ] Role change → permission check
    * [ ] Status toggle with confirm

---

## PHASE 4 — Front Desk Inventory UI + Customer Service niceties

* [ ] **Front Desk Inventory `/admin/front-desk/inventory`**

  * [ ] Dashboard cards

    * [ ] Working equipment; maintenance required
    * [ ] Low stock; incoming supplies (ETA)
  * [ ] Equipment Management

    * [ ] Grid with icons + status badges
    * [ ] Status transitions (Working→Maintenance→Broken) + reason
    * [ ] Schedule maintenance (calendar + provider)
  * [ ] Supply Management

    * [ ] Progress bars (current vs target)
    * [ ] Receive supplies (qty + batch + QC)
    * [ ] Stock adjust (+/−) with reason; supplier quick-reorder
  * [ ] Search/Filter/Export

    * [ ] Real-time search; filters; CSV export

* [ ] **Front Desk Customer Service**

  * [ ] Customer lookup (name/phone/order #)
  * [ ] Loyalty balance display (if available later)
  * [ ] Feedback capture & issue tracking (basic)

---

## PHASE 5 — Analytics, Reports, Manager Consoles & Extras

* [ ] **Manager Dashboards**

  * [ ] Manager `/admin/managers/dashboard`

    * [ ] KPIs: total users, orders, revenue
    * [ ] Charts: sales trend; popular items
    * [ ] Quick actions: Menu/Staff/Inventory
  * [ ] Orders Management `/admin/managers/orders`

    * [ ] Orders table (status tracking, refunds)
    * [ ] Order analytics: trends, popular items
  * [ ] Inventory Management `/admin/managers/inventory`

    * [ ] All stock items, low-stock list, inventory value
    * [ ] Reorder points & supplier management

* [ ] **Reports & Analytics**

  * [ ] Sales by item/category/payment type
  * [ ] EOD cash vs digital reconciliation
  * [ ] Export: CSV/PDF
  * [ ] Scheduled reports (later)

* [ ] **Client Experience Enhancements**

  * [ ] Favorites & Recommendations

    * [ ] Favorites CRUD + quick reorder
    * [ ] Trending/seasonal recos (rules-based first)
  * [ ] Purchase statistics (monthly spend, AOV vs café avg)

* [ ] **General Admin & Help**

  * [ ] Profile, Settings, Help, Manual pages (basic)
  * [ ] Requests (leave/admin) — queue & approvals (basic)
  * [ ] Reservations (optional scope) — dashboard, table mgmt

---

## Cross-Cutting (applies as you go; don’t postpone)

* [ ] **API & Data**

  * [ ] REST endpoints per feature, with server validation
  * [ ] ACID transactions across order→payment→inventory
  * [ ] Caching: menu/session (Redis if present)
* [ ] **UX components**

  * [ ] Reusable table (sort/filter/search/paginate)
  * [ ] Status chips, badges, modals, confirm dialogs
  * [ ] CSV export utility
* [ ] **Security & Quality**

  * [ ] CSRF aligned with cookie strategy
  * [ ] Input sanitization everywhere
  * [ ] Accessibility pass on forms/tables
  * [ ] Telemetry: success/fail events on critical flows

---

## What ships at the end of each phase (definition of “done”)

* **P0**: Users can log in by role; public menu visible.
* **P1**: Front Desk can create orders; Kitchen sees & completes tickets.
* **P2**: Orders can be paid (cash + mock), receipts sent; stock decrements via recipes.
* **P3**: Managers can CRUD staff and control access.
* **P4**: Front Desk can manage supplies/equipment; better customer service tools.
* **P5**: Managers get reports/analytics; clients get favorites/recommendations; admin/help online.

---