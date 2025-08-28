# Astroneko Coffee — Backend Anchor (Spring Boot 3, Java 21)

**Purpose**: Canonical backend architecture and API contract decisions  
**Owner**: Backend Team  
**Last-updated**: 2025-08-29  
**Status**: Canonical (architecture anchor)

> **Policy**: This document defines core backend architectural decisions. Changes to API structure, security patterns, or database strategy require approval via the Docs Change process.

> Scope: **Admin**, **Employee‑Cashier**, **Client/Guest**.  
> Datastores: **PostgreSQL**, **Redis**.  
> APIs: **REST first**, **WebSocket later**, **GraphQL later**.  
> Payments: **Mock first**, then **PayMongo or Xendit** (whichever is simplest when we reach it).

> **Note**: For detailed implementation guidance and code examples, see `docs/backend-setup.md`.

---

## 1) API Surface & Versioning

* **Base path:** `/api/v1`
* **Public endpoints (no auth):**

  * `GET /api/v1/menu`
  * `POST /api/v1/orders` (guest order allowed with `{ name, tableNumber, items[] }`)
* **Auth endpoints (beginner‑friendly but explicit):**

  * `POST  /api/v1/auth/login` — login, set httpOnly cookie, returns `{id,email,username,role}`
  * `PUT   /api/v1/auth/login` — **token refresh** (same cookie reissued)
  * `PATCH /api/v1/auth/login` — **session update** (e.g., device/metadata; no password change here)
  * `POST  /api/v1/auth/register` — client signup (username/email/password)
  * `GET   /api/v1/auth/me` — current session/user
  * `POST  /api/v1/auth/logout` — clear cookie
* **Role‑gated endpoints (examples):**

  * **Manager**: `POST/PUT/DELETE /api/v1/menu/*`, `GET /api/v1/stats/overview`
  * **Cashier**: `GET /api/v1/orders?status=…`, `POST /api/v1/orders/{id}/status`

> Note: We included `PUT/PATCH /auth/login` per your request, mapped to **refresh** (PUT) and **session metadata update** (PATCH). If you’d like different semantics, say so and I’ll adjust.

---

## 2) Architecture & Packaging

* **Style:** Layered — Controller → Service → Repository (no shortcuts)
* **Package by feature:** `auth`, `users`, `menu`, `orders`, `payments`, `queue`, `reservations`, `staff`, `stats`, `common`, `config`
* **DTO rule:** Controllers use **DTOs only** (no entities in/out)
* **Mapping:** **Manual** (simpler for beginners)
* **Common utilities package:** `common` (error, paging, ids, time, security helpers)

---

## 3) Data & Migrations

* **Migration tool:** **Liquibase** (chosen for beginner‑friendliness given prior Flyway pain)

  * Master changelog: `src/main/resources/db/changelog/db.changelog-master.yaml`
  * Changesets: YAML files per feature (e.g., `db.changelog-0001-init.yaml`)
* **IDs:** UUID v4 everywhere
* **Money:** `NUMERIC(12,2)` + `BigDecimal`
* **Time:** `TIMESTAMP WITH TIME ZONE` + `OffsetDateTime` (server + DB set to **Asia/Manila**)
* **Soft delete:** later (not in MVP)
* **Seeding:** Dev profile loads a `db.changelog-dev-seed.yaml` (users, a few menu items, sample order)

---

## 4) Database & Naming

* **Tables/columns:** `snake_case`
* **Unique constraints:** `users.email`, `users.username`, `menu_item.name` (scoped per category if you prefer)
* **FK cascades:** cascade on children (`order_items`), restrict on parents

---

## 5) Redis (minimal first)

* **Use now:** cache `GET /menu` (TTL: **30s**), simple counters for queue
* **Key prefix:** `astroneko:*`
* **Pub/Sub:** reserved for WebSocket phase

---

## 6) Security, Auth, CORS

* **Auth:** JWT access token (TTL **2h**)
* **Delivery:** **httpOnly cookie** set by `/auth/login` (primary)
* **Dev fallback:** also accept `Authorization: Bearer <token>` (dev profile **only**)
* **Roles:** `MANAGER`, `EMPLOYEE_CASHIER`, `CUSTOMER_LOYAL`
* **Method security:** `@PreAuthorize(...)` on service methods
* **Password hashing:** BCrypt(10)
* **CORS (works from day 1):**

  * Allowed origins: `http://localhost:3003`
  * Methods: `GET,POST,PUT,PATCH,DELETE,OPTIONS`
  * Headers: `Content-Type, Authorization`
  * Credentials: **true**

---

## 7) Error Handling & Logging

* **Global error schema:**

  ```json
  {
    "timestamp": "ISO-8601",
    "path": "/api/v1/…",
    "code": "ERR_CODE",
    "message": "Human friendly message",
    "details": [{ "field": "…", "issue": "…" }],
    "requestId": "uuid"
  }
  ```
* **Correlation ID:** `X-Request-Id` (generate if missing; echo in responses and logs)
* **Log levels:** INFO (normal), WARN (4xx), ERROR (5xx with stack)
* **PII:** never log raw passwords/tokens; mask emails/phones

---

## 8) MVP Endpoints (full list)

**Auth**

* `POST /auth/login`, `PUT /auth/login`, `PATCH /auth/login`, `POST /auth/register`, `GET /auth/me`, `POST /auth/logout`

**Menu**

* `GET /menu` (public)
* `POST /menu` (MANAGER)
* `PUT /menu/{id}` (MANAGER)
* `DELETE /menu/{id}` (MANAGER)

**Orders**

* `POST /orders` (guest allowed: `{ name, tableNumber, items[] }`; logged‑in may include `customerId`)
* `GET /orders/{id}` (owner/cashier/manager)
* `GET /orders?status=` (cashier/manager)
* `POST /orders/{id}/status` (cashier/kitchen/manager)

**Payments (mock first; provider later)**

* `POST /payments/intent`
* `POST /payments/webhook` (simulated)

**Queue / Reservations**

* `POST /queue`, `GET /queue`
* `POST /reservations`, `GET /reservations`

**Staff**

* `POST /staff/status` (IN/OUT/BREAK)
* `GET /staff/status` (manager)

**Admin Stats**

* `GET /stats/overview`

---

## 9) Realtime Scope (phased)

* **v1:** no sockets; polling where needed

  * `/queue`: poll every **10–15s**
  * `/admin/dashboard`: poll every **20–30s**
* **v2:** enable WebSocket (STOMP simple broker)

  * Topics: `/topic/queue`, `/topic/kitchen`, `/topic/staff`
  * Auth: pass JWT on connect

---

## 10) Testing Strategy (backend)

* **Unit:** JUnit 5 + Mockito (services/validators)
* **Integration:** SpringBootTest + **Testcontainers** (Postgres, Redis); Liquibase applies schema
* **Smoke:** start app, assert `GET /actuator/health`, `GET /api/v1/menu`
* **First critical tests:** login success/failure; create order validation; menu cache behavior

---

## 11) Tooling & Quality Gates

* **Build:** Maven
* **Style:** Spotless (google‑java‑format) + basic Checkstyle
* **OpenAPI:** springdoc‑openapi at `/swagger-ui.html` (dev only)
* **Postman:** committed collection for manual tests
* **CI:** GitHub Actions `mvn verify` (later add Testcontainers step)

---

## 12) Profiles & Config

* Profiles: `dev`, `test`, `prod`
* **Dev DB:** `jdbc:postgresql://localhost:5435/astroneko_db`
* **Dev Redis:** `localhost:6382`
* **Secrets:** env vars only (`.env.example` committed)
* **Ports rule:** +3 → Backend **8083**

---

## 13) Payments Strategy

* **MVP:** `MockPaymentService`
* **Adapter interface:** `PaymentProvider { createIntent(...); verifyWebhook(...); }`
* **Provider target:** **PayMongo** (PH) or **Xendit** — we will choose whichever is **simplest** when we integrate; we do **not** add either SDK until then.
* **Dev webhooks:** in‑process simulation endpoint

---

## 14) Performance & Pagination

* Pagination: `page` (1‑based), `size` (default 20, max 100), `sort` (`field,asc|desc`)
* N+1 avoidance: add fetch joins when we see it (later)
* Cache: `@Cacheable` for `GET /menu`, Redis TTL **30s**

---

## 15) Observability & Telemetry

* Request logging (no bodies) for `/api/**` in **dev**
* Dev telemetry endpoint: `POST /telemetry` (dev only) → `{ event, userId?, role?, ts }`
* Actuator: `health`, `info` only

---

## 16) Entities (MVP, updated per your note)

* **User**: `id (UUID)`, `email`, `username`, `passwordHash`, `role`, `createdAt`, `updatedAt`
* **MenuItem**: `id`, `name`, `description`, `price`, `category`, `imageUrl` (uploads supported later), `isActive`, `createdAt`, `updatedAt`
* **Order**: `id`, `customerId?`, `cashierId?`, `status (NEW|IN_KITCHEN|READY|FULFILLED|CANCELLED)`, `channel (ONLINE|POS)`, `total`, `createdAt`, `updatedAt`
* **OrderItem**: `id`, `orderId`, `menuItemId`, `qty`, `price`
* **Payment**: `id`, `orderId`, `method`, `amount`, `status`, `txnRef?`
* **QueueTicket**: `id`, `name`, `partySize`, `position`, `status`, `createdAt`
* **Reservation**: `id`, `name`, `phone`, `partySize`, `timeSlot`, `status`, `createdAt`
* **StaffStatus**: `id`, `userId`, `status (IN|OUT|BREAK)`, `at`

---

## 17) Error Codes (starter set)

`AUTH_INVALID`, `AUTH_FORBIDDEN`, `AUTH_CONFLICT`,
`MENU_DUPLICATE`, `MENU_NOT_FOUND`,
`ORDER_INVALID`, `ORDER_NOT_FOUND`,
`PAYMENT_FAILED`, `PAYMENT_INVALID`,
`QUEUE_INVALID`, `RESERVATION_CONFLICT`,
`STAFF_INVALID`.

---

## 18) Docs Outputs

* `/docs/backend.md` (this anchor)
* `/docs/api.md` (endpoint table & examples)
* `/docs/erd.png` (diagram)
* `/docs/error-codes.md`
* (Optional) auto‑export OpenAPI JSON to Postman

---

## 19) No‑Go Boundaries

* No libraries outside this anchor without written approval.
* No new roles without updating access policy.
* No endpoints merged without minimal tests and Postman steps.
* No skipping docs when behavior changes.

---

## 20) Execution Style (strict)

* One tiny task at a time; wait for confirmation before next.
* If a tool fights us, choose simpler fallback (e.g., polling before sockets).
* Every step that changes behavior updates the docs.
