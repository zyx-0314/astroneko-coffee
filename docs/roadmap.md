# Astroneko Coffee – Roadmap

## **Module 1 – Environment & Project Setup**

### Submodules

1. **Repo & Structure**

   * Create monorepo with `frontend/`, `backend/`, `infrastructure/`
   * Add README stubs per folder
2. **Core Tooling**

   * Install Java 21, Node.js LTS, Docker, Postman
   * Setup WSL2 for Windows dev
3. **Base Skeletons**

   * **Backend**: Spring Boot with Spring Web, Security, Data JPA, PostgreSQL Driver, Validation, Actuator
   * **Frontend**: Next.js TS, shadcn/ui, radix-ui, Zustand, Zod, Axios, Framer Motion
4. **Docker Compose**

   * Postgres + Redis + Redis Commander
   * Ports: +3 from default

**Deliverables:**

* Running containers for DB/cache
* Compiling empty backend & frontend
* `.env.example` files in both apps

---

## **Module 2 – Data & API Foundations**

### Submodules

1. **Data Modeling**

   * Entities: User, MenuItem, Order, OrderItem, Payment, QueueTicket, Reservation, StaffStatus
   * Audit fields, UUID IDs
2. **Schemas**

   * Backend: Jakarta Validation
   * Frontend: Zod schemas in `/schemas`
3. **API Structure**

   * Base path `/api/v1`
   * Public vs Auth endpoints defined
4. **Security & CORS**

   * JWT via httpOnly cookie
   * Role-based access (MANAGER, EMPLOYEE\_CASHIER, CUSTOMER\_LOYAL)
   * CORS policy set for local dev

**Deliverables:**

* ER diagram in `/docs`
* JPA entities & repos scaffolded
* Empty controller stubs per resource
* Swagger UI visible with endpoint list

---

## **Module 3 – Core Features**

### Submodules

1. **Menu Management**

   * GET menu (public)
   * CRUD menu items (manager only)
2. **Order System**

   * Place guest or customer order
   * Order status updates (cashier/kitchen)
   * Basic total calculation
3. **Queue & Reservations**

   * Create/view queue tickets
   * Create/view reservations
4. **Payments**

   * MockPaymentService
   * PaymentProvider interface for later Xendit integration
5. **Staff Status**

   * Update IN/OUT/BREAK
   * View staff status (manager)

**Deliverables:**

* Working REST endpoints with role rules
* Unit tests for services
* Postman collection with example calls

---

## **Module 4 – Frontend MVP**

### Submodules

1. **Routing & Layout**

   * `/ (user)/`, `/ (admin)/`, `/ (employee-cashier)/`
   * Shared navbar/footer components
2. **Pages**

   * Menu view (public & logged-in)
   * POS ordering (cashier)
   * Admin dashboard (manager)
3. **State Management**

   * Zustand stores per feature
4. **API Integration**

   * Axios wrapper with interceptors for JWT cookies
5. **A11y & Mobile-first**

   * WCAG 2.1 AA checks
   * Dark mode toggle

**Deliverables:**

* All MVP pages functional
* Mobile, tablet, desktop layouts verified
* Accessibility audit passes

---

## **Module 5 – Testing & Quality**

### Submodules

1. **Backend**

   * JUnit + Mockito unit tests
   * Testcontainers integration tests
2. **Frontend**

   * Jest + RTL for components
   * MSW for API mocking
   * Cypress E2E (later)
3. **Code Quality**

   * ESLint/Prettier (frontend)
   * Spotless/Checkstyle (backend)
4. **Telemetry**

   * Dev telemetry endpoint for debugging events

**Deliverables:**

* Passing test suites
* Lint/format scripts in package.json & pom.xml
* Test coverage reports

---

## **Module 6 – Deployment & CI/CD**

### Submodules

1. **Local Deployment**

   * `docker compose up --build` for full stack
2. **Staging Prep**

   * Optional staging profile & compose override
3. **CI/CD**

   * GitHub Actions for backend & frontend build/test
   * Artifact build (backend JAR, frontend `.next` export)

**Deliverables:**

* One-command local start
* CI builds passing
* Deployment instructions in `/docs`

---

## **Module 7 – Documentation & Handover**

### Submodules

1. **Dev Manual**

   * Setup steps, principles, naming conventions
   * API & role access matrix
2. **Roadmap Tracking**

   * This document updated per milestone
3. **User Guide**

   * How to use the system as manager, cashier, customer
4. **Handover Package**

   * Final repo with tagged release
   * Demo recording (optional)

**Deliverables:**

* Updated `/docs` folder
* Final README with quick start
* Confirmed milestone completion log

