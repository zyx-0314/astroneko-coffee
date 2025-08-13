# ☕ Astroneko Coffee

Welcome to **Astroneko Coffee**, the intergalactic café experience where **alien vibes** meet **perfect brews**.
This project blends a real coffee shop concept with a **modern, scalable full-stack system**, built step-by-step with clear milestones.

---

## 📜 Table of Contents

* [About](#about)
* [Core Features](#core-features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Usage](#usage)
* [Development Workflow](#development-workflow)
* [Milestones](#milestones)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## 🌌 About

Astroneko Coffee is both a **practice project** and a **feature-rich coffee shop platform**.
It starts with **basic REST APIs and a Next.js frontend**, then expands into **real-time WebSockets**, **GraphQL**, **QR-based features**, and **local AI chat support**.

We’ll build it like a real product, but in controlled **2-hour dev blocks** that are fully documented in `/docs/logs`.

---

## ☑ Core Features (Planned)

* **Queue & Reservation System** – Walk-in and table bookings.
* **Menu Scanning** – Customers can scan a QR to view the menu.
* **Online Ordering** – Place and pay for orders ahead.
* **Wi-Fi QR Code** – Customers connect quickly via QR (within device limits).
* **Staff Status Updates** – Manager can see who’s in/out.
* **Order Progress Updates** – Kitchen → Front Desk → Cashier.
* **Department Requests** – Internal requests between staff roles.
* **Payment System** – Mock in v1, real gateway later.
* **Dashboards** – Admin, Loyal Customer, and Employee views.
* **Payroll System** – Clock-in/out and payslip generation (later milestone).

---

## 🛠 Tech Stack

**Backend**

* Java 21, Spring Boot (Web, Security, Data JPA, PostgreSQL Driver)
* Redis (cache + pub/sub for realtime)
* Springdoc OpenAPI for auto API docs
* REST → WebSocket → GraphQL progression

**Frontend**

* Next.js + TypeScript + Tailwind CSS
* Axios (HTTP), Zustand (state), Zod (validation)
* Framer Motion (animation)
* Jest + React Testing Library

**Infrastructure**

* Docker + Docker Compose
* PostgreSQL, Redis, Redis Commander
* Local AI: Ollama (later milestone)

---

## 📂 Project Structure

```
astroneko-coffee/
  backend/           # Spring Boot backend
  frontend/          # Next.js frontend
  infrastructure/    # Docker Compose, .env files
  docs/
    logs/            # 2-hour session logs
    TEMPLATE.md      # Log format
  .editorconfig
  README.md
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/astroneko-coffee.git
cd astroneko-coffee
```

### 2. Set up infrastructure

```bash
cd infrastructure
cp .env.example .env
docker compose up -d postgres redis redis-commander
```

### 3. Backend

```bash
cd ../backend
mvn spring-boot:run
```

### 4. Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## ▶ Usage

* Frontend: [http://localhost:3003](http://localhost:3003)
* Backend Swagger UI: [http://localhost:8083/swagger-ui.html](http://localhost:8083/swagger-ui.html)
* Redis Commander: [http://localhost:8084](http://localhost:8084)

---

## 📓 Development Workflow

We work in **2-hour dev blocks**, not daily unless free time allows.

**Block format**: `/docs/logs/YYYY-MM-DD-block-N.md`

* Objective
* Scope
* Commands run
* Tests & QA
* Outcomes
* Next steps

---

## 📅 Milestones

**M0** – Setup & hello world (backend + frontend)

**M1** – Auth (JWT) + Menu CRUD

**M2** – Orders + Queue/Reservation

**M3** – Staff & Requests + Dashboards

**M4** – WebSocket realtime updates

**M5** – GraphQL read models

**M6** – AI chat support (local Ollama)

**M7** – Payroll & final polish

---

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch:

```bash
git checkout -b feat/feature-name
```

3. Commit changes:

```bash
git commit -m "feat: add feature-name"
```

4. Push:

```bash
git push origin feat/feature-name
```

5. Open a pull request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).