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

### Design Reference
[Relume](https://www.relume.io/app/project/P2342332_RSduN4JW0cXUIjRZtesDfMYibNQgPEdMPD72gV2c2kU?cf-turnstile-response=0.5ijF0AV5xbebryLB3GmqsVyilOjJpS6kKxCtZH3r-6GBF8xO8bQ3SE71bmzrOrD9GcnHOLs_b4g5gX4QgTz4bb0m-nGO0xjqAsqXghSD64wKkhJUc3BdFm2js7GFMISnH2gsAzzmPsfytvB0YgWEwy-vBs2jJLe2yaef4_XtFTmcV-W4ZvlaUHBARMtY0KSvZjK8ZEd-uxDrPd9YGEgpbf8WufieO6HSVXo2Iv-bYnkP_DxyMsnCsodHWSyR6Egtmm7M5Y6ObSNxFLMIOV7vJqu-Zts3-SJsO5TRGpXakgjprsHstIIVfx1B36BimTFQaExFgqTiRQG8jiO97myRKJwOcEx6n8l3WezeTnb-_QnWaHJoV9X4DJTOe3l1WQwuUHVWCjtBqOVvlEMcFf-2zZbBrWrHrsPFfa4hz2EfnQwgR3r4f5oSB3qUinSfUXUc1ut8CQBxLdGTQ36RaddDTAcwDyQJkLhwe7nZlXMiGBqOz67yuf5oElvIti939LQZp8lqaUutCmIvanuZ6T9HJMb2luDueA8TfIpeIWjK9Az3K8NxqFR7nBhQjGFj0ofCtpmVfC9rjAV-4ZB3xCnQ04sHzeEVGWqji3QWzSEz8bCwY5gM2XgUMNNWEakgKCt4_G7iQr_75tavX3bauMlqSOc_IQYxxi_Y1vtxFMT33_nuJg1YzbBcuIsC9vFvaS_3xJgN9v03uBpSyNj5Ixvlp1VmBChd9DHd52Po3Xr2kYf7fsq4ATlHJasA25_fTBmi_ki5m7ZEfAEdIScSsfFkkvWDQzfGYyIcnpsE2VYIe_w5_qr21IkebuFMQU7XPy-EAskxF3nnSRSZ7N7ngmtVsxtVW7Pd4-hzKwp3bVv2bKniSY15diD73f-HTwn4fZQqc8fRquCzI9J8GXMfXgnD_XoU90BoojQkwp7QUBZwv9Os7yT5A1dkiKwhj6UuQebg.TM2g5YvyMa40ty7PqtP0jw.ac969e5a7aeb51be450d1bae14d6bc5f5f90593b60745c4f4372c2390b40a805#mode=styleguide&concept=brqR1jqc88k8MtB3QIsdI)

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

## 🚀 Quick Start (Development Mode)

This project is configured for **development/demo purposes only** with Docker Compose.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git

### Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/zyx-0314/astroneko-coffee.git
cd astroneko-coffee

# 2. Start the development environment
./scripts/dev-start.bat

# OR with hot-reload support
./scripts/dev-watch.bat
```

That's it! The script will automatically:
- 🗄️ Start PostgreSQL database with sample data
- ☕ Build and run Spring Boot backend with hot-reload
- 🌐 Build and run Next.js frontend with hot-reload

---

## 🌐 Access Points

Once started, you can access:

- **Frontend Application**: [http://localhost:3001](http://localhost:3001)
- **Backend API Docs**: [http://localhost:8083/swagger-ui.html](http://localhost:8083/swagger-ui.html)  
- **Database**: `localhost:5434` (user: `astro`, password: `astro123`, db: `astroneko_dev`)

### Demo Credentials
- **Admin Access**: username `admin`, password `admin123`

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

## �️ Development Notes

### Project Status
This is a **development/demo project** designed to showcase full-stack development skills. Current implementation includes:

- ✅ **Complete menu system** with filtering and promotions
- ✅ **RESTful API** with comprehensive endpoints  
- ✅ **Modern frontend** with Next.js and Framer Motion animations
- ✅ **Database integration** with sample cosmic-themed menu items
- ✅ **Docker development environment** with hot-reload
- ✅ **API documentation** with Swagger UI

### Available Scripts
- `./scripts/dev-start.bat` - Start development environment
- `./scripts/dev-watch.bat` - Start with hot-reload (recommended)
- `./scripts/run-tests.bat` - Run backend tests

### Technology Stack
- **Backend**: Spring Boot 3.5, PostgreSQL, JPA/Hibernate
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Tools**: Docker Compose, Maven, npm, Swagger UI

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