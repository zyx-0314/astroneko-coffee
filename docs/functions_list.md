# Astroneko Coffee - Functions List (Page → Section → Functionality)

**Purpose**: Comprehensive feature specifications and functionality mapping  
**Owner**: Product Team  
**Last-updated**: 2025-08-29  
**Status**: Living spec (change requires owning approver)

> **Policy**: This document serves as the living specification for all application features. Changes to functionality described here require approval from the owning product team member to ensure consistency with overall product vision.

## Authentication Page (`/authentication`)

### Sign In Section
- Sign in with email and password, redirect to role-appropriate dashboard based on user type
- Display authentication errors with field-specific validation messages
- Demo login buttons for quick access to different role accounts
- Password visibility toggle for better user experience
- Loading states during authentication process with disabled form submission

### Sign Up Section  
- Create new client accounts with form validation (firstName, lastName, email, password, confirmPassword, sex, phone number)
- Real-time password confirmation matching with visual feedback
- Client-only registration notice (staff registered by management)
- Auto-redirect to client dashboard after successful account creation
- Form field validation with Zod schema and inline error display

### Route Protection (Middleware)
- Validate JWT tokens on protected routes and redirect unauthorized users
- Role-based access control with permission matrix for each user type
- Preserve intended destination URL after login for seamless navigation
- Automatic logout and redirect to authentication page on token expiration

## Staff Management Page (`/admin/managers/staff`)

### Staff Dashboard Section
- Display total staff count with live database reflection and real-time updates
- Show active vs inactive staff ratios with color-coded status indicators
- Display new hires this month with trending analytics and percentage changes
- Show role distribution breakdown (Manager, Cashier, Cook, Barista, Helper) with visual charts
- Display employment type statistics (Full-time, Part-time, Contract, Intern) with percentage breakdowns
- Show average performance ratings across all staff with trend indicators

### Enhanced Staff Table Section
- Display comprehensive staff table with sortable columns (Name, Role, Hire Date, Salary, Status)
- Multi-column sorting with shift+click support and visual sort direction indicators
- Real-time search across firstName, lastName, email, phone, and employeeId with 300ms debouncing
- Advanced filtering by role (Manager, Cashier, Cook, Barista, Helper) with dropdown selection
- Filter by employment type (Full-time, Part-time, Contract, Intern) with multi-select options  
- Filter by status (Active/Inactive) with toggle switches and status badge display
- Row actions menu with Edit, View Details, Toggle Status, and Delete options
- Bulk selection for multiple staff operations (status updates, export, email)
- Expandable rows showing detailed staff information and employment history

### Create Staff Form Section
- Multi-step form wizard with progress indicator and step validation
- Personal information collection (firstName, lastName, email, phone, address)
- Employment details form (role, employmentType, salary, hireDate, department)
- Additional information capture (emergency contacts, banking details, notes)
- Real-time validation with Zod schema and field-specific error messages
- Auto-save draft functionality to localStorage for form persistence

### Edit Staff Details Section  
- Pre-populated form with existing staff information for editing
- Partial update capability for individual field modifications
- Role change validation with permission checks and cascade updates
- Salary modification with audit trail logging for compliance
- Status toggle (active/inactive) with confirmation dialogs for critical changes

## Front Desk Inventory Page (`/admin/front-desk/inventory`)

### Inventory Dashboard Section
- Display working equipment count with real-time status from database
- Show maintenance required equipment count with priority indicators (urgent vs scheduled)
- Display low stock items count with critical threshold alerts and auto-refresh
- Show incoming supplies count with delivery timeline and estimated arrival dates
- Visual status cards with color-coded indicators (green=working, yellow=maintenance, red=broken, orange=low stock)

### Equipment Management Section  
- Display equipment grid with visual cards showing type icons (☕ POS, 🖨️ printer, 📺 display)
- Show equipment status with color-coded badges and last maintenance dates
- Equipment status transitions (Working → Maintenance → Broken) with reason tracking
- Mark equipment for maintenance with calendar scheduling and service provider assignment
- Equipment details modal with purchase date, warranty info, service history, and photo upload

### Supply Management Section
- Display supply status with stock level progress bars and color coding (green=in-stock, yellow=low, red=out)
- Show current stock vs expected stock with visual indicators (250/500 pieces)
- Receive supplies workflow with quantity input, batch tracking, and quality checks
- Stock adjustment interface with increment/decrement buttons and reason selection
- Supplier information display with contact details and reorder functionality

### Inventory Search & Filter Section
- Real-time search across equipment names, supply names, categories, and locations with 300ms debouncing
- Filter by status (working, maintenance, broken, low-stock, in-stock) with dropdown selection
- Filter by type (equipment vs supplies) and location with multi-select options
- Display active filters as removable tags with count indicators
- Export filtered results to CSV with custom column selection

## Client Dashboard Page (`/dashboard`)

### Profile Display Section
- Display user profile information (name, email, phone) with real-time database sync
- Show account details including member since date and loyalty tier status
- Display loyalty points balance with points earning history
- Show account preferences and settings with quick edit functionality

### Order History Display Section  
- Display complete purchase history table with sortable columns (Date, Items, Total, Status)
- Sort by order date (default newest first), total amount, item count, and order status
- Real-time search across order IDs, item names, and order notes with 400ms debouncing
- Filter by date range with calendar picker and preset options (Last 7 days, Last month, Last year)
- Filter by order status (Complete, Pending, Cancelled, Refunded) with color-coded badges
- Filter by amount range using dual-handle slider with currency formatting
- Expandable row details showing item breakdown, quantities, prices, and special instructions

### Purchase Statistics Section
- Display total orders count with database reflection and trend indicators vs previous period
- Show total amount spent with currency formatting and spending velocity calculations  
- Display average order value with comparison to cafe average and trend visualization
- Show favorite items list with top 5 most ordered items and reorder quick buttons
- Display monthly spending chart with visual analytics and spending patterns

### Favorites Display Section
- Display saved favorite menu items with quick reorder functionality
- Add/remove items from favorites with heart icon toggle and instant feedback
- Show item popularity and customer ratings for favorite items
- Organize favorites by category (drinks, food, desserts) with filtering options

### Recommendation Display Section
- Display personalized menu recommendations based on order history analysis
- Show trending items among similar customers with social proof indicators
- Display seasonal recommendations and limited-time offers relevant to user preferences
- Show new menu items tailored to customer's past ordering patterns

## Menu Management Page (`/admin/managers/menu`)

### Menu Dashboard Section
- Display total menu items count with database reflection and category breakdown
- Show available vs unavailable items ratio with real-time stock status
- Display popular items analytics with weekly and monthly sales data
- Show average item rating across all menu items with review count statistics
- Display category distribution with visual charts and item counts per category

### Menu Items Table Section
- Display comprehensive menu table with sortable columns (Name, Category, Price, Stock Status, Rating)
- Sort by name (alphabetical), price (ascending/descending), rating, and weekly sales
- Real-time search across item names, descriptions, and categories with instant filtering
- Filter by category (Coffee, Food, Beverages, Desserts) with multi-select dropdown
- Filter by availability status (Available, Out of Stock, Discontinued) with toggle switches  
- Filter by price range using slider with currency formatting and preset ranges
- Row actions menu with Edit, Toggle Availability, View Analytics, and Delete options
- Bulk operations for selected items (price updates, category changes, availability toggle)

### Create Menu Item Section
- Multi-step form for adding new menu items with category selection and validation
- Item details form (name, description, price, category, allergen information)
- Image upload with preview, crop functionality, and multiple image support
- Ingredient and nutritional information entry with database validation
- Availability settings with stock tracking and automatic out-of-stock alerts
- Pricing configuration with cost analysis and profit margin calculations

### Edit Menu Item Section
- Pre-populated form with existing item data for modifications
- Price update functionality with history tracking and approval workflow
- Availability toggle with stock level management and automatic notifications
- Image management with add/remove/reorder capabilities and optimization
- Category reassignment with validation and menu reorganization

## Front Desk Dashboard Page (`/admin/front-desk/dashboard`)

### Queue Management Section
- Display current order queue with real-time status updates and queue positions
- Show order details (customer name, items, special instructions) with expandable cards
- Display estimated preparation time with dynamic updates based on kitchen capacity
- Show order priority indicators (regular, priority, express) with color-coded badges
- Real-time queue updates with WebSocket connection and sound notifications

### Order Processing Section  
- Display new orders awaiting processing with customer information and order details
- Show payment status (paid, pending, processing) with payment method indicators
- Order modification interface for special requests and item substitutions
- Customer communication panel for order updates and delivery notifications
- Receipt printing and email functionality with customizable templates

### Customer Service Section
- Display customer lookup with search by name, phone, or order number
- Show customer order history and preferences for personalized service
- Display loyalty points balance and redemption options
- Customer feedback collection with rating system and comment fields
- Issue resolution tracking with escalation to management workflows

## Menu Management System

### Menu Administration (`Manager`)
- **Menu Item CRUD**: Create, read, update, and delete menu items
- **Category Management**: Organize items by categories (coffee, food, beverages, etc.)
- **Pricing Management**: Set and update item prices with decimal precision
- **Stock Status Toggle**: Mark items as in-stock or out-of-stock
- **Promotional Management**: Manage promotional items and special offers
- **Rating & Review Display**: View customer ratings and review counts
- **Sales Analytics**: Track weekly and monthly purchase statistics per item

### Menu Display & Filtering
- **Public Menu Display**: Customer-facing menu with categories and filtering
- **Search Functionality**: Real-time menu item search
- **Category Filtering**: Filter menu items by type/category
- **Availability Indicators**: Clear display of item availability status

## Dashboard Systems

### Manager Dashboard
- **Staff Management Dashboard**: Complete staff oversight with analytics and management tools
- **Inventory Management**: Monitor and manage all inventory across departments
- **Menu Management**: Full menu control with pricing and availability management
- **Performance Analytics**: Staff performance tracking and reporting
- **Financial Overview**: Sales, revenue, and cost analytics

### Front Desk Dashboard (`Cashier/Helper`)
- **Order Queue Management**: Real-time order queue with status updates
- **Customer Service Tools**: Access to customer information and order history
- **Inventory Status**: Front-desk specific equipment and supply monitoring
- **Quick Actions**: Common front desk operations and shortcuts

### Kitchen Dashboard (`Cook/Barista`)
- **Order Display System**: Kitchen-focused order queue and preparation tracking
- **Menu Item Status**: Update item availability based on ingredient stock
- **Inventory Access**: Kitchen-specific inventory and supply management

### Client Dashboard
- **Personal Profile**: Account information and preferences management
- **Order History**: Complete purchase and order history with details
- **Favorites**: Saved menu items for quick reordering
- **Recommendations**: Personalized menu suggestions
- **Points & Rewards**: Loyalty points tracking and redemption

## Table & Data Management Features

### Sorting & Filtering Capabilities
- **Multi-column Sorting**: Sort tables by multiple criteria simultaneously
- **Advanced Filtering**: Complex filtering with multiple parameters
- **Real-time Search**: Instant search across multiple data fields
- **Pagination**: Efficient data loading with server-side pagination
- **Export Functions**: Data export capabilities for reporting

### Data Display & Interaction
- **Responsive Tables**: Mobile-friendly table designs with card views
- **Action Menus**: Context-sensitive action menus for table rows
- **Status Indicators**: Visual status indicators with color coding
- **Batch Operations**: Select multiple items for bulk actions
- **Data Validation**: Client-side and server-side data validation

## Request & Form Systems

### Staff Request Forms
- **New Staff Registration**: Comprehensive staff onboarding forms
- **Staff Information Updates**: Update existing staff member details
- **Leave Requests**: Time-off and leave management forms
- **Performance Review Forms**: Staff evaluation and review submissions

### Client Forms
- **Account Registration**: New client sign-up with validation
- **Profile Updates**: Personal information modification forms
- **Order Customization**: Menu item customization and special requests
- **Feedback Forms**: Customer feedback and rating submissions

## Security & Data Protection

### Authentication Security
- **JWT Token Security**: Secure token management with httpOnly cookies
- **Password Validation**: Strong password requirements and hashing
- **Session Management**: Automatic session timeout and refresh
- **CSRF Protection**: Cross-site request forgery protection

### Authorization Controls
- **Role-based Access**: Granular permissions based on user roles
- **Route Protection**: Middleware-enforced route access control
- **API Security**: Secure API endpoints with authentication requirements
- **Data Validation**: Comprehensive input validation and sanitization

## API Integration & Backend Features

### RESTful API Endpoints
- **Authentication APIs**: Login, logout, signup, and token management
- **Staff Management APIs**: Complete CRUD operations for staff data
- **Purchase History APIs**: Order history retrieval with filtering and pagination
- **Menu Management APIs**: Menu item CRUD with caching support
- **User Management APIs**: User profile and account management

### Data Management
- **Database Integration**: PostgreSQL with JPA/Hibernate ORM
- **Redis Caching**: Menu and session data caching for performance
- **Data Validation**: Server-side validation with detailed error responses
- **Transaction Management**: ACID transaction support for data integrity

## Complete Page Inventory & Capabilities

### Public/Landing Pages
**Landing Page (`/`)**
- Hero Section - Display coffee shop branding, welcome message, and main navigation
- Features Section - Showcase key services and offerings
- About Preview Section - Brief company introduction with link to full about page

**About Page (`/about`)**
- Company Story Section - Display detailed company history and mission
- Team Section - Show staff information and roles
- Values Section - Present company values and principles

**Menu Page (`/menu`)**
- Menu Header Section - Display page title and category navigation
- Menu Display Section - Show all menu items with categories, prices, and availability
- Menu Filter Section - Filter items by category, price range, and availability

**Contact Page (`/contact`)**
- Contact Information Section - Display address, phone, email, and hours
- Location Map Section - Interactive map showing coffee shop location
- Contact Form Section - Allow customers to send messages and inquiries

**Careers Page (`/careers`)**
- Job Listings Section - Display available positions with descriptions
- Application Form Section - Allow candidates to submit applications
- Company Benefits Section - Showcase employee benefits and culture

**Roadmap Page (`/roadmap`)**
- Development Timeline Section - Show planned features and updates
- Feature Progress Section - Display current development status
- Community Feedback Section - Collect user suggestions and feedback

**Mood Board Page (`/mood-board`)**
- Design Inspiration Section - Visual design references and concepts
- Color Palette Section - Brand colors and design guidelines
- Typography Section - Font choices and text styling examples

**Order Page (`/order`)**
- Order Form Section - Menu item selection and customization
- Cart Summary Section - Review selected items and total cost
- Checkout Section - Payment processing and order confirmation

### Authentication & User Management
**Authentication Page (`/authentication`)**
- Sign In Section - Sign in and redirect to their dashboard
- Sign Up Section - Create account with name, email, phone number, password validation and redirect to client dashboard

**Client Dashboard Page (`/dashboard`)**
- Profile Display Section - Show user account information and preferences
- Order History Section - Display complete purchase history with sorting and filtering
- Favorites Section - Show saved menu items for quick reordering
- Recommendations Section - Display personalized menu suggestions

### Error Pages
**Forbidden Page (`/errors/forbidden`)**
- Access Denied Section - Display error message with proper role-based redirect options
- Navigation Section - Provide links to appropriate dashboard based on user role

**Backend Down Page (`/errors/backend-down`)**
- Service Status Section - Display service unavailable message and estimated recovery time
- Alternative Actions Section - Provide offline options and contact information

**Maintenance Page (`/errors/maintenance`)**
- Maintenance Notice Section - Display scheduled maintenance information and duration
- Updates Section - Show progress of maintenance activities and expected completion

### Manager Dashboard Pages (`/admin/managers/`)
**Manager Dashboard (`/admin/managers/dashboard`)**
- Dashboard Section - Reflect the database information of total users, total orders, revenue, and key performance indicators
- Analytics Overview Section - Display business metrics with charts and trending data
- Quick Actions Section - Provide shortcuts to frequently used management functions

**Staff Management (`/admin/managers/staff`)**
- Staff Dashboard Section - Reflect the database information of total staff count, active employees, and role distribution
- Staff Table Section - Display comprehensive staff list with sorting, filtering, and search capabilities
- Add Staff Section - Create new staff members with role assignment and validation
- Edit Staff Section - Update existing staff information and role changes

**Menu Management (`/admin/managers/menu`)**
- Menu Dashboard Section - Reflect the database information of total menu items, categories, and availability status
- Menu Items Table Section - Display all menu items with full CRUD operations and batch actions
- Create Menu Item Section - Add new menu items with pricing, categories, and image upload
- Edit Menu Item Section - Update existing menu items with price changes and availability toggle

**Inventory Management (`/admin/managers/inventory`)**
- Inventory Dashboard Section - Reflect the database information of total stock items, low stock alerts, and inventory value
- Inventory Table Section - Display all inventory items with stock levels and supplier information
- Stock Management Section - Update stock quantities and manage reorder points
- Supplier Management Section - Manage supplier relationships and ordering processes

**Orders Management (`/admin/managers/orders`)**
- Orders Dashboard Section - Reflect the database information of total orders, pending orders, and daily sales
- Orders Table Section - Display all orders with status tracking and customer information
- Order Processing Section - Manage order status updates and fulfillment tracking
- Order Analytics Section - Show order trends, popular items, and sales patterns

**Customer Management (`/admin/managers/customers`)**
- Customer Dashboard Section - Reflect the database information of total customers, active users, and customer segments
- Customer Table Section - Display customer profiles with order history and preferences
- Customer Analytics Section - Show customer behavior patterns and loyalty metrics
- Customer Communication Section - Send notifications and manage customer relationships

**Performance Management (`/admin/managers/performance`)**
- Performance Dashboard Section - Reflect the database information of staff performance metrics and productivity scores
- Performance Reviews Section - Conduct and track employee evaluations
- Goals Management Section - Set and monitor performance goals and targets
- Training Management Section - Track training programs and skill development

**Analytics Dashboard (`/admin/managers/analytics`)**
- Business Intelligence Section - Reflect the database information of comprehensive business metrics and trends
- Sales Analytics Section - Display revenue analysis, product performance, and market trends
- Customer Analytics Section - Show customer acquisition, retention, and lifetime value metrics
- Operational Analytics Section - Track efficiency metrics and operational performance

**Reports Management (`/admin/managers/reports`)**
- Reports Dashboard Section - Reflect the database information of available reports and recent generations
- Custom Reports Section - Create and configure custom business reports
- Scheduled Reports Section - Manage automated report generation and distribution
- Export Functions Section - Export reports in various formats (PDF, Excel, CSV)

### Front Desk Pages (`/admin/front-desk/`)
**Front Desk Dashboard (`/admin/front-desk/dashboard`)**
- Queue Management Section - Reflect the database information of current order queue, waiting times, and order status
- Order Processing Section - Process new orders with customer information and payment handling
- Customer Service Section - Access customer lookup, order history, and issue resolution tools

**Front Desk Orders (`/admin/front-desk/orders`)**
- Orders Dashboard Section - Reflect the database information of daily orders, pending orders, and order completion rates
- Active Orders Section - Display current orders in progress with real-time status updates
- Order History Section - View completed orders with customer and payment information
- Order Management Section - Modify orders, handle refunds, and process special requests

**Front Desk Inventory (`/admin/front-desk/inventory`)**
- Inventory Dashboard Section - Reflect the database information of equipment status, supply levels, and maintenance schedules
- Equipment Management Section - Track POS systems, printers, displays with status monitoring
- Supply Management Section - Monitor front desk supplies like cups, napkins, receipt paper
- Maintenance Section - Schedule equipment maintenance and track service history

**Reservations Management (`/admin/front-desk/reservations`)**
- Reservations Dashboard Section - Reflect the database information of daily reservations, table availability, and booking trends
- Table Management Section - Manage table assignments and seating arrangements
- Booking System Section - Process new reservations with customer details and preferences
- Event Management Section - Handle special events and large group bookings

### Kitchen Pages (`/admin/kitchen/`)
**Kitchen Dashboard (`/admin/kitchen/dashboard`)**
- Kitchen Queue Section - Reflect the database information of pending orders, preparation times, and kitchen efficiency
- Order Display Section - Show current orders with preparation priority and special instructions
- Inventory Status Section - Display ingredient levels and supply availability for menu items
- Performance Metrics Section - Track kitchen productivity and order completion rates

**Kitchen Orders (`/admin/kitchen/orders`)**
- Orders Dashboard Section - Reflect the database information of kitchen-specific order metrics and preparation status
- Active Orders Section - Display orders in preparation with timing and priority indicators
- Completed Orders Section - Track finished orders and preparation time analytics
- Order Updates Section - Update order status and communicate with front desk

**Kitchen Menu (`/admin/kitchen/menu`)**
- Menu Status Section - Reflect the database information of item availability based on ingredient stock
- Item Management Section - Toggle menu item availability and update preparation notes
- Recipe Management Section - Access recipes, ingredients, and preparation instructions
- Stock Integration Section - Automatically update item availability based on inventory levels

**Kitchen Inventory (`/admin/kitchen/inventory`)**
- Inventory Dashboard Section - Reflect the database information of ingredient stock, expiration dates, and usage patterns
- Ingredient Management Section - Track food ingredients, beverages, and kitchen supplies
- Stock Updates Section - Record ingredient usage and receive new inventory
- Supplier Management Section - Manage supplier relationships and ordering schedules

### General Admin Pages (`/admin/`)
**Profile Page (`/admin/profile`)**
- Personal Information Section - Display and update staff member's personal details
- Account Settings Section - Manage password, notification preferences, and security settings
- Role Information Section - Show current role, permissions, and access levels
- Activity History Section - Track login history and system usage

**Settings Page (`/admin/settings`)**
- System Configuration Section - Manage application-wide settings and preferences
- Notification Settings Section - Configure alerts, email notifications, and system messages
- Security Settings Section - Manage authentication requirements and session timeouts
- Display Settings Section - Customize interface themes and layout preferences

**Requests Page (`/admin/requests`)**
- Requests Dashboard Section - Reflect the database information of pending requests, approved requests, and request types
- New Request Section - Submit leave requests, schedule changes, and administrative requests
- Request History Section - View submitted requests with status and approval information
- Management Section - Approve/deny requests (available to managers and supervisors)

**Reports Page (`/admin/reports`)**
- Reports Dashboard Section - Reflect the database information of available reports and generation history
- Quick Reports Section - Generate common operational reports with preset parameters
- Custom Reports Section - Create customized reports with specific date ranges and filters
- Export Section - Download reports in various formats and schedule automated delivery

**Help Page (`/admin/help`)**
- Documentation Section - Access system documentation and user guides
- FAQ Section - Common questions and troubleshooting solutions
- Support Section - Contact system administrators and technical support
- Tutorial Section - Step-by-step guides for common tasks and procedures

**Manual Page (`/admin/manual`)**
- User Manual Section - Comprehensive system usage instructions and procedures
- Role-Specific Guides Section - Documentation tailored to specific user roles and responsibilities
- Process Documentation Section - Standard operating procedures and workflow guides
- Training Materials Section - Resources for onboarding and skill development

## Role-Based Page Access Summary

### Client Role
- Landing, About, Menu, Contact, Careers, Order pages
- Authentication page (login/signup)
- Client Dashboard (`/dashboard`)

### Cashier/Helper Role (Front Desk)
- All client accessible pages
- Front Desk Dashboard (`/admin/front-desk/dashboard`)
- Front Desk Orders (`/admin/front-desk/orders`)
- Front Desk Inventory (`/admin/front-desk/inventory`)
- Reservations (`/admin/front-desk/reservations`)
- Profile, Settings, Help, Manual pages

### Cook/Barista Role (Kitchen)
- All client accessible pages
- Kitchen Dashboard (`/admin/kitchen/dashboard`)
- Kitchen Orders (`/admin/kitchen/orders`)
- Kitchen Menu (`/admin/kitchen/menu`)
- Kitchen Inventory (`/admin/kitchen/inventory`)
- Profile, Settings, Help, Manual pages

### Manager/Owner Role
- All pages across the entire system
- Complete access to all manager dashboards
- Full CRUD operations on all data
- Advanced analytics and reporting capabilities
- Staff management and system administration
