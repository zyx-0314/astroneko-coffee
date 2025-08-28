# Astroneko Coffee - Documentation Index

**Purpose**: Table of contents and overview of project documentation  
**Owner**: Documentation Team  
**Last-updated**: 2025-08-29  
**Status**: Canonical (TOC only)

## Project Overview
A modern coffee shop management system built with Spring Boot backend and Next.js frontend, featuring admin dashboards, customer ordering, and comprehensive business management tools.

## Architecture Stack
- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS
- **Backend**: Spring Boot with Java 21
- **Database**: PostgreSQL + Redis
- **Deployment**: Docker Compose

---

## Documentation Map

### Core Architecture (Canonical)
- **[Backend Architecture](spring.md)** - Spring Boot API design, security, database, and packaging decisions
- **[Frontend Architecture](nextjs.md)** - Next.js routing, rendering strategy, state management, and conventions
- **[Charter & Principles](charter.md)** - Development principles, no-go rules, and team agreements

### Development Guides
- **[Backend Setup](backend-setup.md)** - Detailed implementation guide with code examples and configuration
- **[Testing Guide](testing.md)** - Automated testing framework for backend and frontend
- **[Onboarding Steps](steps.md)** - Quick start checklist for new developers

### Planning & Specifications
- **[Roadmap](roadmap.md)** - Phased MVP development plan (P0-P5)
- **[Feature List](functions_list.md)** - Comprehensive feature mapping by page and section
- **[Menu & Products](services-and-products.md)** - Sample menu items and product catalog

### Process & Standards
- **[Git Commit Rules](git-commit.md)** - Commit message format and version control standards

### Examples & Tutorials
- **[Setup Tutorial](examples/setup-tutorial.md)** - Step-by-step tutorial with detailed code examples

---

## Quick Links

### For New Developers
1. Read [Charter](charter.md) for principles and rules
2. Follow [Onboarding Steps](steps.md) for quick setup
3. Refer to [Backend Setup](backend-setup.md) and [Frontend Architecture](nextjs.md) for implementation details

### For Architecture Decisions
- [Backend Architecture](spring.md) - API contracts and backend patterns
- [Frontend Architecture](nextjs.md) - Routing and component conventions
- [Charter](charter.md) - Change approval process for architectural modifications

### For Feature Development
- [Roadmap](roadmap.md) - Current development priorities
- [Feature List](functions_list.md) - Complete feature specifications
- [Testing Guide](testing.md) - Testing requirements and setup

---

## Document Types
- **Canonical**: Single source of truth (architecture decisions, TOCs)
- **Tutorial**: Time-sensitive setup guides and examples  
- **Content**: Marketing materials and sample data
- **Process**: Team workflows and standards

---

**Note**: For detailed project structure and component organization, see the individual architecture documents linked above.
│   │   │   ├── layout.tsx              # Front desk layout
│   │   │   └── dashboard/              # Kitchen dashboard - TODO: Apply Section and Components
│   │   │       ├── page.tsx
│   │   │       └── sections/           # Kitchen dashboard components
│   │   │           └── index.ts        # Section exports
│   │   ├── managers/                   # Manager management
│   │   │   ├── layout.tsx              # Front desk layout
│   │   │   └── dashboard/              # Manager dashboard - TODO: Apply Section and Components
│   │   │       ├── page.tsx
│   │   │       └── sections/           # Manager dashboard components
│   │   │           └── index.ts
│   │   ├── profile/                    # User profile - TODO: Apply Section and Components
│   │   │   ├── page.tsx
│   │   │   └── sections/               # Profile page components
│   │   │       └── index.ts            # Section exports
│   │   ├── reports/                    # Business reports - TODO: Apply Section and Components
│   │   │   ├── page.tsx
│   │   │   └── sections/               # Reports page components
│   │   │       └── index.ts            # Section exports
│   │   └── settings/                   # User settings - TODO: Apply Section and Components
│   │       ├── page.tsx
│   │       └── sections/               # Settings page components
│   │           └── index.ts            # Section exports
│   ├── authentication/                 # sign in sign up page
│   │   ├── page.tsx                    # Authentication main page
│   │   └── sections/                   # Authentication page components
│   │       ├── AuthBackground.tsx      # Authentication background
│   │       ├── index.ts                # Section exports
│   │       ├── SignInSection.tsx       # Sign-in form section
│   │       └── SignUpSection.tsx       # Sign-up form section
│   ├── careers/                        # Careers section
│   │   ├── page.tsx
│   │   └── sections/                   # Careers page components
│   │       └── index.ts                # Section exports
│   ├── contact/                        # Contact page - TODO: Apply Section and Components
│   │   ├── page.tsx
│   │   └── sections/                   # Contact page components
│   │       └── index.ts                # Section exports
│   ├── dashboard/                      # User dashboard
│   │   ├── layout.tsx                  # Dashboard layout
│   │   ├── page.tsx                    # Dashboard main page
│   │   └── sections/                   # Dashboard components
│   │       ├── FavoritesDisplaySection.tsx    # User favorites display
│   │       ├── OrderHistoryDisplaySection.tsx # Order history section
│   │       ├── ProfileDisplaySection.tsx      # Profile information
│   │       ├── RecommendationDisplaySection.tsx # Personalized recommendations
│   │       └── index.ts                # Section exports
│   ├── errors/                         # Error pages
│   │   ├── backend-down/               # Backend connection errors - TODO: Apply Section and Components
│   │   │   └── page.tsx
│   │   ├── forbidden/                  # Access denied errors - TODO: Apply Section and Components
│   │   │   └── page.tsx
│   │   └── maintenance/                # Maintenance mode - TODO: Apply Section and Components
│   │       └── page.tsx
│   ├── menu/                           # Menu display
│   │   ├── page.tsx                    # Menu page
│   │   └── sections/                   # Menu page components
│   │       ├── ControlsSection.tsx     # Menu filter and search controls
│   │       ├── MenuDisplaySection.tsx  # Menu items display
│   │       ├── MenuHeaderSection.tsx   # Menu page header
│   │       ├── PromotionalSection.tsx  # Featured promotions
│   │       └── index.ts                # Section exports
│   ├── mood-board/                     # Mood board feature - move back the sections and do components
│   │   ├── page.tsx                    # Mood board page
│   │   └── sections/                   # Mood board page components
│   │       └── index.ts                # Section exports
│   ├── order/                          # Order management
│   │   ├── page.tsx                    # Order page
│   │   └── sections/                   # Order page components
│   │       └── index.ts                # Section exports
│   ├── roadmap/                        # Product roadmap
│   │   ├── page.tsx                    # roadmap page
│   │   └── sections/                   # roadmap page components
│   │       └── index.ts                # Section exports
│   ├── layout.tsx                      # Root layout
│   └── globals.css                     # Global styles
├── components/                         # Reusable UI components
│   ├── backgrounds/                    # Background components
│   │   ├── FloatingParticles/          # Animated particle effects
│   │   │   └── index.tsx
│   │   └── index.tsx                   # Background exports
│   ├── banners/                        # Banner components
│   │   ├── ComboBanner/                # Combo promotion banners
│   │   │   ├── ComboBanner.hook.tsx    # Combo banner logic
│   │   │   └── index.tsx
│   │   ├── PromotionalBanner/          # Promotional displays
│   │   │   └── index.tsx
│   │   ├── SaleBanners/                # Sale announcement banners
│   │   │   ├── SaleBanners.hook.tsx    # Sale banner logic
│   │   │   └── index.tsx
│   │   └── index.tsx                   # Banner exports
│   ├── cards/                          # Card components
│   │   ├── AuthCard/                   # Authentication cards
│   │   │   ├── AuthCard.hook.tsx       # Card logic hook
│   │   │   └── index.tsx
│   │   ├── ContentCard/                # Content display cards
│   │   │   └── index.tsx
│   │   ├── DemoAccountCard/            # Demo account info
│   │   │   ├── DemoAccountCard.hook.tsx # Demo account logic
│   │   │   └── index.tsx
│   │   ├── FeatureCard/                # Feature showcase cards
│   │   │   └── index.tsx
│   │   ├── GalleryCard/                # Gallery display cards
│   │   │   └── index.tsx
│   │   ├── InfoCard/                   # Information cards
│   │   │   └── index.tsx
│   │   ├── MenuItemCard/               # Menu item display
│   │   │   ├── MenuItemCard.hook.tsx   # Menu item logic
│   │   │   └── index.tsx
│   │   ├── PlaceholderCard/            # Placeholder content
│   │   │   └── index.tsx
│   │   ├── StaffActionsCard/           # Staff action buttons
│   │   │   └── index.tsx
│   │   ├── StaffOverviewCard/          # Staff overview display
│   │   │   └── index.tsx
│   │   ├── TestimonialCard/            # Customer testimonials
│   │   │   └── index.tsx
│   │   └── index.tsx                   # Card exports
│   ├── carousel/                       # Carousel components
│   │   ├── RecoCarousel/               # Recommendation carousel
│   │   │   └── index.tsx               # Recommendation carousel component
│   │   └── index.tsx                   # Carousel exports
│   ├── controls/                       # Form controls
│   │   ├── ActiveFilters/              # Active filter display
│   │   │   ├── ActiveFilters.hook.tsx  # Active filters logic
│   │   │   └── index.tsx
│   │   ├── SearchBar/                  # Search input component
│   │   │   ├── SearchBar.hook.tsx      # Search logic
│   │   │   └── index.tsx
│   │   ├── SortFilter/                 # Sort and filter controls
│   │   │   ├── SortFilter.hook.tsx     # Sort/filter logic
│   │   │   └── index.tsx
│   │   ├── ViewToggle/                 # View mode switcher
│   │   │   ├── ViewToggle.hook.tsx     # View toggle logic
│   │   │   └── index.tsx
│   │   └── index.tsx                   # Control exports
│   ├── counters/                       # Counter components
│   │   ├── StatsCounter/               # Statistics counter display
│   │   │   ├── StatsCounter.hook.tsx   # Counter logic
│   │   │   └── index.tsx
│   │   └── index.tsx                   # Counter exports
│   ├── footer/                         # Footer components
│   │   ├── Default/                    # Default footer layout
│   │   │   └── index.tsx
│   │   └── index.tsx                   # Footer exports
│   ├── forms/                          # Form components
│   │   ├── StaffForm/                  # Staff management forms
│   │   │   ├── StaffForm.hook.ts       # Staff form logic
│   │   │   └── index.tsx
│   │   └── index.tsx                   # Forms exports
│   ├── guards/                         # Route guards
│   │   ├── RoleGuard/                  # Role-based route protection
│   │   │   ├── RoleGuard.hook.ts       # Role guard logic
│   │   │   └── index.tsx
│   │   └── index.tsx                   # Guard exports
│   ├── header/                         # Header components
│   │   ├── Authenticated/              # Authenticated user header
│   │   │   ├── Authenticated.hook.tsx  # Auth header logic
│   │   │   └── index.tsx
│   │   ├── Default/                    # Default header layout
│   │   │   ├── Default.hook.tsx        # Default header logic
│   │   │   └── index.tsx
│   │   ├── DynamicHeader/              # Dynamic header component
│   │   │   ├── DynamicHeader.hook.tsx  # Dynamic header logic
│   │   │   └── index.tsx
│   │   └── index.tsx                   # Header exports
│   ├── navigation/                     # Navigation components
│   │   ├── AdminSidebar/               # Admin sidebar navigation
│   │   │   ├── AdminSidebar.hook.tsx   # Sidebar component hook
│   │   │   └── index.tsx
│   │   └── index.ts                    # Navigation exports
│   ├── moodBoard/                      # Mood board components
│   │   ├── Colors/                     # Color palette display
│   │   │   ├── Colors.hook.tsx         # Color logic
│   │   │   └── index.tsx
│   │   ├── Typography/                 # Typography showcase
│   │   │   └── index.tsx
│   │   ├── UIElements/                 # UI elements display
│   │   │   └── index.tsx
│   │   └── index.tsx                   # MoodBoard exports
│   ├── table/                          # Table components
│   │   ├── OrdersTable/                # Orders management table
│   │   │   └── index.tsx
│   │   ├── StaffTable/                 # Staff management table
│   │   │   ├── StaffTable.hook.ts      # Staff table logic
│   │   │   └── index.tsx
│   │   ├── StocksTable/                # Inventory management table
│   │   │   └── index.tsx
│   │   └── index.ts                    # Tables exports
│   └── ui/               # Base UI components (shadcn/ui)
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── animated-badge.tsx
│       ├── animated-button.tsx
│       ├── animated-card.tsx
│       ├── animated-section.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── empty-state.tsx
│       ├── feature-card.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── scroll-indicator.tsx
│       ├── section-title.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── status-badge.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── theme-toggle.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── framer/               # Framer Motion animations
│   ├── index.ts          # Animation exports
│   └── variants/         # Animation variants
│       ├── badges/        # Badge animation variants
│       ├── buttons/       # Button animation variants
│       ├── cards/         # Card animation variants
│       ├── containers/    # Container animation variants
│       ├── images/        # Image animation variants
│       ├── text/          # Text animation variants
│       └── index.ts       # Variant exports
├── hooks/                # Custom React hooks
│   └── use-mobile.ts     # Mobile detection hook
├── lib/                  # Utility libraries
│   ├── api-test.ts       # API testing utilities
│   ├── auth-cookies.ts   # Cookie management
│   ├── auth.ts           # Authentication utilities
│   ├── date-utils.ts     # Date utilities
│   ├── utils.ts          # General utilities
│   └── data/             # Static data files
│       ├── menu.ts       # Menu items data
│       ├── orders-new.ts # New orders data
│       ├── orders.ts     # Orders data
│       ├── stats.ts      # Statistics data
│       ├── stocks.ts     # Stock/inventory data
│       └── users.ts      # Users data
├── provider/             # Context providers
│   ├── auth-provider.tsx # Auth provider wrapper
│   └── theme-provider.tsx # Theme provider
├── public/               # Static assets
│   ├── landing/          # Landing page assets
│   │   ├── benefit/       # Benefits section images
│   │   ├── feature/       # Feature section images
│   │   ├── gallery/       # Gallery images
│   │   ├── howItWorks/    # Process explanation images
│   │   ├── service/       # Services section images
│   │   └── stats/         # Statistics section images
│   ├── main-logo/        # Logo assets
│   └── placeholder/      # Placeholder images
└── schema/               # Validation schemas (Zod)
    ├── animatedComponents.schema.ts
    ├── cards.schema.ts
    ├── colors.schema.ts
    ├── components.schema.ts
    ├── header.schema.ts
    ├── menuItem.schema.tsx
    ├── menuItemValidation.schema.ts
    ├── order.schema.ts
    ├── stats.schema.ts
    ├── stock.schema.ts
    ├── typography.schema.ts
    ├── uiElements.schema.ts
    └── user.schema.ts
```

## Frontend Explanations

### App Router Structure
- **`(landing)/`**: Grouped route for the main landing page with marketing sections
- **`admin/`**: Protected admin dashboard with management tools
- **`authentication/`**: Used to sign in and sign up
- **`dashboard/`**: User-facing dashboard for customers
- **`order/`**: Order placement and management system

### Component Architecture
- **`components/ui/`**: Base shadcn/ui components for consistent design system
- **Specialized folders**: Feature-specific components (cards, forms, navigation)

### State Management
- **`contexts/`**: React Context for global state (authentication, theme)
- **`provider/`**: Context provider wrappers for clean separation
- **`hooks/`**: Custom hooks for reusable stateful logic

### Utilities & Configuration
- **`lib/`**: Core utilities for API calls, authentication, and data manipulation
- **`schema/`**: Zod schemas for type-safe validation and form handling, stores all interface and types
- **`framer/`**: Animation configurations using Framer Motion

---

# Backend

## Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── coffee/
│   │   │       └── astroneko/
│   │   │           └── backend/
│   │   │               ├── BackendApplication.java  # Spring Boot main class
│   │   │               ├── config/                  # Configuration classes
│   │   │               ├── controller/              # REST API endpoints
│   │   │               │   ├── AuthController.java # Authentication endpoints
│   │   │               │   ├── MenuController.java # Menu display endpoints
│   │   │               │   ├── MenuManagementController.java # Menu CRUD
│   │   │               │   └── UserController.java # User management
│   │   │               ├── dto/                     # Data Transfer Objects
│   │   │               │   ├── AuthResponse.java   # Authentication response DTO
│   │   │               │   ├── CreateMenuItemRequest.java # Menu item creation request
│   │   │               │   ├── LoginRequest.java   # Login request DTO
│   │   │               │   ├── SignUpRequest.java  # Registration request DTO
│   │   │               │   └── UpdateMenuItemRequest.java # Menu item update request
│   │   │               ├── entity/                  # JPA entities
│   │   │               │   ├── MenuItem.java       # Menu item entity
│   │   │               │   └── User.java           # User entity
│   │   │               ├── exception/               # Custom exceptions
│   │   │               │   └── GlobalExceptionHandler.java # Global error handling
│   │   │               ├── repository/              # Data access layer
│   │   │               │   ├── MenuItemRepository.java # Menu item repository
│   │   │               │   └── UserRepository.java # User repository
│   │   │               ├── service/                 # Business logic layer
│   │   │               │   ├── DatabaseSeederService.java # Data seeding
│   │   │               │   ├── MenuItemService.java # Menu business logic
│   │   │               │   └── UserService.java    # User business logic
│   │   │               └── util/                    # Utility classes
│   │   └── resources/
│   │       ├── application.properties               # Main configuration
│   │       └── data.sql                            # Initial data
│   └── test/
│       ├── java/                                   # Test classes
│       └── resources/
│           └── application-test.properties         # Test configuration
├── target/                                         # Build output
│   ├── classes/                                    # Compiled classes
│   ├── generated-sources/                          # Generated source files
│   ├── generated-test-sources/                     # Generated test sources
│   ├── maven-status/                               # Maven build status
│   └── test-classes/                              # Compiled test classes
├── pom.xml                                         # Maven dependencies
├── mvnw                                           # Maven wrapper (Unix)
├── mvnw.cmd                                       # Maven wrapper (Windows)
└── Dockerfile.dev                                 # Development Docker config
```

## Backend Explanations

### Spring Boot Architecture
- **`BackendApplication.java`**: Main application entry point with Spring Boot configuration
- **`config/`**: Spring configuration classes for security, database, CORS, etc.
- **`controller/`**: REST API controllers handling HTTP requests and responses
- **`service/`**: Business logic layer implementing core application functionality
- **`repository/`**: Data access layer using Spring Data JPA

### Data Layer
- **`entity/`**: JPA entities representing database tables and relationships
- **`dto/`**: Data Transfer Objects for API request/response payload structure
- **`repository/`**: Spring Data repositories for database operations

### Error Handling & Utilities
- **`exception/`**: Custom exception classes for business logic errors
- **`util/`**: Helper classes and utility methods for common operations

### Configuration & Resources
- **`application.properties`**: Main configuration for database, server, and feature settings
- **`data.sql`**: SQL scripts for initial data population
- **`application-test.properties`**: Test-specific configuration overrides

---

# Development Principles Observed

## 1. **Clean Architecture Separation**
- Clear separation between frontend (Next.js) and backend (Spring Boot)
- Layered architecture in backend: Controller → Service → Repository → Entity
- Component-based architecture in frontend with reusable UI components

## 2. **Modern Development Practices**
- **TypeScript**: Type safety across the entire frontend application
- **Schema Validation**: Zod schemas for runtime type checking and form validation
- **Component Composition**: Modular component design with shadcn/ui base components

## 3. **Scalable Project Structure**
- **Feature-based Organization**: Components organized by functionality (admin, auth, order)
- **Separation of Concerns**: Clear distinction between UI, business logic, and data layers
- **Configuration Management**: Environment-specific configurations for different deployment stages

## 4. **User Experience Focus**
- **Route Protection**: Authentication guards and role-based access control
- **Responsive Design**: Mobile-first approach with custom hooks for device detection
- **Animation System**: Framer Motion integration for smooth user interactions

## 5. **Development Workflow**
- **Docker Support**: Containerized development environment for consistency
- **Script Automation**: Batch and shell scripts for common development tasks
- **Testing Infrastructure**: Jest configuration for frontend testing

## 6. **Business Domain Modeling**
- **Coffee Shop Context**: Domain-specific entities and business logic
- **Multi-role System**: Support for customers, staff, and administrators
- **Order Management**: Complete order lifecycle from placement to fulfillment

## 7. **API-First Design**
- **RESTful Architecture**: Standard HTTP methods and status codes
- **DTO Pattern**: Clear API contracts with data transfer objects
- **Error Handling**: Structured exception handling and error responses

## 8. **Security & Authentication**
- **Context-based Auth**: React Context for authentication state management
- **Cookie Management**: Secure cookie handling for session management
- **Route Guards**: Protected routes based on authentication status


---

# Core Development Principles Applied

## **DRY (Don't Repeat Yourself)**

### Frontend Implementation:
- **Reusable Components**: Extensive use of shadcn/ui base components that are extended across the application
- **Hook Pattern**: Custom hooks like `use-mobile.ts`, `AuthCard.hook.tsx`, `AdminSidebar.hook.tsx` extract reusable logic
- **Schema Reusability**: Zod schemas, Interfaces and Types in the `schema/` directory provide consistent validation across forms
- **Index Exports**: Centralized exports through `index.ts` files for clean imports
- **Animation Variants**: Shared Framer Motion variants in `framer/variants/` for consistent animations

### Backend Implementation:
- **Service Layer**: Business logic centralized in service classes to avoid code duplication
- **DTO Pattern**: Consistent data transfer objects for API communication
- **Repository Pattern**: Spring Data JPA repositories eliminate repetitive CRUD operations
- **Configuration Classes**: Centralized configuration management

### Examples:
```typescript
// Reusable hook pattern
const useAuthCard = () => { /* shared logic */ }
const useDemoAccount = () => { /* shared logic */ }

// Shared validation schemas
export const userSchema = z.object({ /* common user validation */ })
```

## **SOLID Principles**

### **Single Responsibility Principle (SRP)**
- **Component Separation**: Each component has a single, well-defined purpose
  - `AuthCard/` handles only authentication UI
  - `MenuItemCard/` handles only menu item display
  - `StatsCounter/` handles only counter functionality
- **Hook Separation**: Logic hooks separated from UI components
- **Service Layer**: Each service class handles one business domain
  - `MenuItemService.java` - Menu operations only
  - `UserService.java` - User management only
  - `DatabaseSeederService.java` - Data seeding only

### **Open/Closed Principle (OCP)**
- **Component Extension**: Base UI components can be extended without modification
- **Animation System**: New animation variants can be added to `framer/variants/` without changing existing code
- **Schema Extension**: Zod schemas can be composed and extended for new forms
- **Spring Configuration**: New configurations can be added without modifying existing ones

### **Liskov Substitution Principle (LSP)**
- **Interface Consistency**: All card components follow the same interface pattern
- **Hook Contracts**: All hooks return consistent data structures
- **Repository Pattern**: All repositories implement standard Spring Data interfaces

### **Interface Segregation Principle (ISP)**
- **Focused Contexts**: `AuthContext.tsx` only handles authentication concerns
- **Specialized Components**: Components depend only on props they actually use
- **Targeted Hooks**: Each hook provides only the data needed by its consumers

### **Dependency Inversion Principle (DIP)**
- **Context Providers**: Components depend on contexts, not concrete implementations
- **Hook Abstraction**: Components use hooks instead of direct API calls
- **Service Injection**: Spring services are injected rather than directly instantiated

## **KISS (Keep It Simple, Stupid)**

### **Simple Structure**
- **Clear Naming**: Descriptive folder and file names that immediately convey purpose
- **Logical Grouping**: Related functionality grouped together (admin/, auth/, dashboard/)
- **Minimal Nesting**: Avoid deep folder hierarchies where possible
- **Standard Patterns**: Following Next.js App Router conventions and Spring Boot standards

### **Straightforward Implementation**
- **Direct Imports**: Clean import statements using index files
- **Simple State Management**: React Context for global state instead of complex state libraries
- **Convention over Configuration**: Following framework defaults where possible
- **Clear Component APIs**: Props interfaces that are easy to understand and use

### **Readable Code Structure**
```typescript
// Simple, clear component structure
export function MenuItemCard({ item, onSelect }: MenuItemCardProps) {
  const { isSelected, handleClick } = useMenuItemCard(item, onSelect);
  
  return (
    <Card className={cn("menu-item", { selected: isSelected })}>
      {/* Simple, readable JSX */}
    </Card>
  );
}
```

### **Minimal Complexity**
- **Single Purpose Files**: Each file has one clear responsibility
- **Avoid Over-Engineering**: Simple solutions for simple problems
- **Direct Communication**: Straightforward API endpoints without unnecessary abstractions
- **Clear Data Flow**: Props down, events up pattern consistently applied

## **Additional Architecture Principles**

### **Convention over Configuration**
- **Next.js Standards**: Following App Router file-based routing conventions
- **Spring Boot Defaults**: Leveraging Spring Boot's auto-configuration
- **Naming Conventions**: Consistent naming patterns across the codebase

### **Composition over Inheritance**
- **React Composition**: Components built through composition rather than class inheritance
- **Hook Composition**: Complex logic built by combining simpler hooks
- **Service Composition**: Spring services composed rather than inherited

### **Fail Fast Principle**
- **TypeScript**: Compile-time error catching
- **Zod Validation**: Runtime validation with clear error messages
- **Spring Validation**: Request validation at the API boundary

### **Separation of Concerns**
- **Layered Architecture**: Clear separation between presentation, business logic, and data layers
- **Context Isolation**: Different contexts for different concerns (auth, theme, etc.)
