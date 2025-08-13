# Astroneko Coffee — Dev Manual Foundations

## 1. Guiding Principles

1. **Beginner-first complexity curve**

   * Start with the simplest functional implementation, then layer complexity later.
2. **One task, one step, one confirmation**

   * No multi-step leaps; AI waits for “done” before moving on.
3. **Zero assumption policy**

   * No unapproved libraries, features, or architecture changes.
4. **Consistency over cleverness**

   * Prefer predictable, uniform code patterns over “smart” but inconsistent ones.
5. **Single source of truth for decisions**

   * This Dev Manual + Plan.md = only binding references.
6. **Document before building**

   * Architectural or dependency changes must be documented & approved first.
7. **Role-based clarity**

   * All functionality tied to specific user roles — avoid ambiguous access rules.
8. **Fallback paths**

   * Always have a simple backup path if advanced tech (e.g., WebSocket, GraphQL) fails.
9. **Strict naming conventions**

   * CamelCase for code files, snake\_case for DB, matching frontend/backend schemas.
10. **Portable local dev**

    * Everything must work on Windows 11 + WSL2 + Docker without extra hidden setup.
11. **Security from day one**

    * Auth, CORS, and validation implemented in MVP form at first setup, not “later”.
12. **A11y and mobile-first baseline**

    * Accessible and usable on mobile, kiosk, desktop by default.

---

## 2. Agreements We Must Lock

* **Language**: English only.
* **Theme**: Alien Space Cat Coffee (colors, fonts, branding locked).
* **Role structure**: MANAGER, EMPLOYEE\_CASHIER, CUSTOMER\_LOYAL, Guest.
* **Routing**:

  * `(user)`, `(admin)`, `(employee-cashier)` groups in Next.js.
  * API base `/api/v1` in backend.
* **Versioning**:

  * REST v1 → WebSocket v1 → GraphQL v1 (later).
* **Public access**:

  * Menu browsing + guest ordering allowed.
* **Auth method**: JWT in httpOnly cookie (role-based redirects).
* **Ports**: +3 from default (Frontend: 3003, Backend: 8083, Postgres: 5435, Redis: 6382).
* **Environments**: `dev`, `test`, `prod` with matching `.env` templates.

---

## 3. Setup Requirements (All Devs & AI)

* **OS**: Windows 11 + WSL2 for Docker.
* **Backend**:

  * Java 21 LTS
  * Maven 3.9+
  * Postgres (Docker)
  * Redis (Docker + Redis Commander)
* **Frontend**:

  * Node.js LTS
  * npm (not yarn/pnpm for simplicity)
* **Tools**:

  * Postman (manual tests)
  * VSCode with recommended extensions list
* **Dev services**:

  * Docker Compose config for backend DB/cache
  * Swagger UI in dev
* **Git**:

  * Branch naming: `feature/…`, `fix/…`
  * Conventional commits

---

## 4. Clarifications to Set Now

1. **Schema ownership**

   * One shared contract per resource (Zod on frontend, Jakarta Validation on backend) — must match.
2. **State boundaries**

   * What is persisted vs. transient in each role’s flow.
3. **Realtime scope** for MVP

   * Which pages actually need sockets in v1 vs. fallback polling.
4. **Deployment target** (local only for now?)

   * Or do we set up a staging server for shared testing?
5. **Testing scope** for MVP

   * Are we doing unit tests from day 1, or after main flows are up?
6. **Data seeding**

   * Do we start with fake menu/orders for testing, or empty DB?

---

## 5. “No-Go” Rules

* No adding dependencies unless listed in this manual.
* No introducing new role types without updating access policy.
* No merging untested endpoints or pages.
* No skipping doc updates — all changes must be reflected in `/docs` or `plan.md`.
* No inline style hacks or bypassing agreed naming conventions.

---

## 6. Testing Strategy

**Goal:** Confidence with minimal overhead. Start small, expand later.

### Backend
- **Unit Tests:** Use JUnit 5 + Mockito for services and validators.
- **Integration Tests:** Use `@SpringBootTest` with Testcontainers for Postgres and Redis. Seed data using Flyway before tests and hit real HTTP endpoints via MockMvc.
- **Contract Smoke Tests:** Start the app and assert `/actuator/health` and `/api/v1/menu` return HTTP 200.

### Frontend
- **Unit/Component Tests:** Use Jest + React Testing Library (avoid Enzyme).
- **API Mocking:** Use MSW to mock Axios/fetch in tests.
- **E2E Tests (Later):** Use Cypress for a simple “happy path” (e.g., login → place order → see order detail).

### What to Test First (MVP)
- Login form (valid/invalid states).
- Menu renders (ISR fallback works).
- POS add-to-cart & submit (store interaction + API call).
- Backend order creation (validations + 201 + Location header).

### Coverage Targets (Starter)
- Backend services: ~60–70%.
- Frontend stores/utils: ~60%.
(Focus on reliability, not chasing 100%.)

---

## 7. Deployment & CI/CD

**Goal:** Local-first with an upgrade path.

### Local Target (Primary for MVP)
- Use `docker compose up` to start Postgres, Redis, Backend, and Frontend.
- Each service should have its own `.env` file, with a committed `.env.example`.

### CI (GitHub Actions Suggested)
- **Backend:** Run `mvn -B verify` with Testcontainers.
- **Frontend:** Run `npm ci && npm test && npm run build`.
- **Artifacts:** Backend JAR and Frontend `.next` build.

### Staging (Optional, Later)
- Use a single VM or container host with `docker compose -f compose.staging.yml`.
- Avoid Kubernetes until absolutely necessary.

---

## 8. Data Seeding

**Goal:** Repeatable and safe.

- Use Flyway for schema and baseline data.
- **V1__init.sql:** Define tables.
- **R__seed_dev.sql:** Add repeatable seeds for dev only (e.g., users, menu items, sample orders).

### Profiles
- Use `spring.profiles.active=dev` to load `R__seed_dev.sql`.

### Frontend Demo Data
- Avoid hardcoded demo data; always fetch from the real API.

### Reset Script
- Provide a `make reset-dev` or equivalent npm script to drop and re-seed the database quickly.

---

## 9. Error Handling & Logging

**Goal:** Consistent and human-friendly.

### Backend
- Use `@ControllerAdvice` for global error handling with a standard error body:
  ```json
  {
    "timestamp": "ISO",
    "path": "/api/v1/…",
    "code": "ORDER_INVALID",
    "message": "…",
    "details": [...]
  }
  ```
- **Log Levels:**
  - INFO: Normal operations.
  - WARN: Recoverable issues (validation, 4xx).
  - ERROR: Server failures (5xx) with stacktrace.
- **Correlation ID:** Accept `X-Request-Id` or generate one; include in logs and error responses.
- **No PII in Logs:** Mask sensitive data like emails or phone numbers.

### Frontend
- Show inline field errors for forms and use toast notifications for global errors.
- Provide a fallback message: “Something went wrong. Please try again.”
- Capture network errors and send them to a dev telemetry endpoint in the dev profile.

---

## 10. Accessibility (A11y)

**Goal:** Concrete and checkable.

- **Standards:** Target WCAG 2.1 AA for MVP screens.
- **Linting:** Enable `eslint-plugin-jsx-a11y`.
- **Checks:**
  - Keyboard-only navigation passes on key pages.
  - Visible focus ring on interactive elements.
  - Color contrast ≥ AA (use palette + contrast check).
  - Forms have labels and `aria-describedby` for errors.
- **Tools:** Use the axe DevTools browser extension during reviews.

