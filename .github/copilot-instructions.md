# Astroneko Coffee - AI Coding Agent Instructions

## Project Overview

Astroneko Coffee is a full-stack coffee shop management system built with Spring Boot 3 (Java 21) backend and Next.js 14 frontend. The system supports multiple user roles (Admin/Manager, Employee/Cashier, Client) with comprehensive coffee shop operations including menu management, order processing, staff management, and authentication.

## Architecture & Key Patterns

### Backend (Spring Boot 3 + PostgreSQL + Redis)

- **API Structure**: `/api/v1/expose/*` (public) and `/api/v1/secure/*` (authenticated)
- **Authentication**: JWT tokens with 2h TTL, stored in httpOnly cookies + Bearer fallback for dev
- **Package Structure**: Layered architecture - Controller → Service → Repository, DTOs only in controllers
- **Security**: BCrypt passwords, CORS enabled for `localhost:3001`, role-based access with `@PreAuthorize`
- **Database**: PostgreSQL with snake_case naming, UUID v4 for IDs, `NUMERIC(12,2)` for money
- **Caching**: Redis for menu caching (30s TTL), key prefix `astroneko:*`

### Frontend (Next.js 14 App Router + TypeScript + Tailwind CSS + shadcn/ui + zustand + zod)

- **Routing**: App Router with route groups - `(landing)`, `admin/`, `dashboard/`, `authentication/`
- **State Management**: React Context for auth (`AuthProvider`), local state for forms and zustand for global state
- **Validation**: Zod schemas, interfaces, and types in `/schema/*` for all forms and API boundaries
- **UI**: shadcn/ui + Radix UI components, Tailwind CSS, Framer Motion animations
- **Auth Flow**: JWT from backend → context provider → role-based redirects via middleware

### Principles

- **Simplicity**: Keep the codebase simple and easy to understand.
- **Modularity**: Break down the application into smaller, reusable components.
- **Consistency**: Follow consistent naming conventions and code styles.
- **Testability**: Write tests for all critical functionality.
- **Security**: Always prioritize security, especially in authentication and data handling.
- **Performance**: Optimize performance by minimizing re-renders and using efficient data fetching strategies.
- **Documentation**: Maintain clear and comprehensive documentation for all components and APIs.
- **Uniformity**: Ensure consistent design patterns and coding styles across the application.
- **Single Purpose Files**: Each file has one clear responsibility
- **Avoid Over-Engineering**: Simple solutions for simple problems
- **Direct Communication**: Straightforward API endpoints without unnecessary abstractions
- **Clear Data Flow**: Props down, events up pattern consistently applied
- **Next.js Standards**: Following App Router file-based routing conventions
- **Spring Boot Defaults**: Leveraging Spring Boot's auto-configuration
- **Naming Conventions**: Consistent naming patterns across the codebase
- **TypeScript**: Compile-time error catching
- **Zod Validation**: Runtime validation with clear error messages
- **Spring Validation**: Request validation at the API boundary
- **Layered Architecture**: Clear separation between presentation, business logic, and data layers
- **Context Isolation**: Different contexts for different concerns (auth, theme, etc.)
- **Clear Naming**: Descriptive folder and file names that immediately convey purpose
- **Reusable Components**: Extensive use of shadcn/ui base components that are extended across the application
- **Index Exports**: Centralized exports through `index.ts` files for clean imports
- **Animation Variants**: Shared Framer Motion variants in `framer/variants/` for consistent animations

#### Patterns

##### Frontend

- **Component Structure**: Components are structured in a way that promotes reusability and maintainability. It is important to follow a consistent folder structure and naming convention.

Example:

```
components/
├── backgrounds/                        # Component Group
│   ├── FloatingParticles/              # Specific Component
│   │   └── FloatingParticles.hook.tsx  # Custom hook for Specific Component
│   │   └── index.tsx
│   └── index.tsx                       # Main exporter of the group
```

- **Pages Structure**: Pages are organized by feature and follow a similar structure to components. Each page should have its own folder containing all related components, hooks, and styles.

Example:

```
app/
├── menu/                               # Page Name
│   ├── sections/                       # Section Group
│   │   ├── MenuHeaderSection.tsx       # Specific Section
│   │   ├── MenuDisplaySection.tsx      # Specific Section
│   │   └── index.tsx                   # Main exporter of the group
│   └── page.tsx                        # Page entry point
```

- **Schema Structure**: Schemas are defined in a way that enforces validation and type safety across the application. They should be organized by feature and follow a consistent naming convention.

Example:

```
schema/
├── menuItem.schema.ts      # Menu Item Schema
├── user.schema.ts          # User Schema
└── index.ts                # Main exporter
```

## Development Workflow

### Docker Development Setup

```bash
# Start full development environment
./scripts/dev-start.bat  # Windows
./scripts/dev-start.sh   # Unix

# With hot-reload (watch mode)
./scripts/dev-watch.bat  # Windows
./scripts/dev-watch.sh   # Unix
```

**Service URLs:**

- Frontend: http://localhost:3001
- Backend: http://localhost:8083 (Swagger: /swagger-ui.html)
- Database: localhost:5434 (user: astro, password: astro123, db: astroneko_dev)

### Testing Strategy

- **Backend**: JUnit 5 + Mockito for units, SpringBootTest + Testcontainers for integration
- **Frontend**: Jest + RTL, MSW for API mocking
- **Critical flows**: Authentication, menu CRUD, order processing

## Code Patterns & Conventions

### Backend Patterns

```java
// Controller pattern - DTOs only, no entities
@RestController
@RequestMapping("/api/v1/secure/menu")
@CrossOrigin(origins = "http://localhost:3001")
public class MenuManagementController {
    @PostMapping
    public ResponseEntity<?> createMenuItem(@Valid @RequestBody CreateMenuItemRequest request) {
        // Service handles business logic
    }
}

// Service pattern with validation
@Service
@PreAuthorize("hasRole('MANAGER')")
public class MenuItemService {
    // Business logic here
}
```

### Frontend Patterns

```typescript
// Schema-first validation (Zod)
export const MenuItemFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0),
});

// Component with sections pattern
// app/menu/page.tsx -> imports from app/menu/sections/
export default function MenuPage() {
  return (
    <main>
      <MenuHeaderSection />
      <MenuDisplaySection />
    </main>
  );
}
```

### Authentication Integration

```typescript
// Frontend auth pattern
const { user, isLoading } = useAuth();
const authResponse = await signIn(email, password);
// Automatic role-based redirect in middleware.ts

// Backend auth pattern
String token = jwtUtil.extractToken(request);
String email = jwtUtil.getEmailFromToken(token);
User user = userService.findByEmail(email);
```

## Data Models & Relationships

### Core Entities

- **User**: Supports staff roles (cashier, cook, manager) + client role, with optional shift data
- **MenuItem**: Categories (coffee, food, etc.), promotional types, stock tracking
- **Order**: Queue-based processing, multiple statuses, guest orders supported
- **StockItem**: Inventory with threshold alerts, supplier tracking

### Database Conventions

- Use UUID v4 for all IDs
- Soft deletes not implemented yet (hard deletes in MVP)
- Foreign key constraints with CASCADE on children, RESTRICT on parents
- All money fields as `NUMERIC(12,2)` with `BigDecimal` in Java

## Key Integration Points

### API Communication

- Frontend uses fetch with automatic token management via `lib/auth-cookies.ts`
- Error handling follows consistent schema with correlation IDs
- CORS configured for development (port 3001 ↔ 8083)

### Real-time Features (Planned)

- v1: Polling every 10-15s for queue updates
- v2: WebSocket with STOMP broker for `/topic/queue`, `/topic/kitchen`

## Important Files to Reference

- **Backend Config**: `backend/src/main/java/coffee/astroneko/backend/config/SecurityConfig.java`
- **Frontend Auth**: `frontend/contexts/AuthContext.tsx`, `frontend/middleware.ts`
- **API Routes**: Controllers in `backend/src/main/java/coffee/astroneko/backend/controller/`
- **Schemas**: `frontend/schema/` (Zod validation for all forms)
- **Docker Setup**: `compose.yml`, development Dockerfiles in service directories

## Common Tasks & Patterns

1. **Adding new API endpoint**: Create DTO → Controller method → Service logic → Repository if needed
2. **Adding new page**: Create in app router → implement sections → add to middleware role checks
3. **Form with validation**: Create Zod schema in `/schema/` → use in component with error handling
4. **Database changes**: Update JPA entity → create migration → update DTOs and services

## Role-Based Access Patterns

- **Middleware** (`middleware.ts`): Route protection based on user role
- **Backend**: `@PreAuthorize` annotations on service methods
- **Frontend**: Conditional rendering based on `user.role` from auth context
