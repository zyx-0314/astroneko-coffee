import { CategoryFilter, FuturePhase, RoadmapItem, StatusFilter } from '@/schema/roadmap.schema';
import { 
  Circle, 
  CheckCircle, 
  Clock, 
  Shield, 
  Settings, 
  Smartphone, 
  Database, 
  BarChart3 
} from 'lucide-react';

export const roadmapData: RoadmapItem[] = [
  // PHASE 0 - Foundations (Completed)
  {
    id: 'p0-platform',
    title: 'Platform & Security Backbone',
    description: 'JWT authentication, RBAC with role-based permissions, and error handling pages.',
    status: 'completed',
    category: 'authentication',
    priority: 'high',
    quarter: 'Phase 0',
    progress: 100,
    features: ['JWT tokens with httpOnly cookies', 'Password hashing and strength rules', 'RBAC: Manager, Front Desk, Kitchen, Client', 'Permission matrix and 403 handling', 'Error pages: forbidden, backend-down, maintenance']
  },
  {
    id: 'p0-public',
    title: 'Public Shell (Minimal)',
    description: 'Basic public pages with landing, menu display, and order placeholder.',
    status: 'completed',
    category: 'frontend',
    priority: 'high',
    quarter: 'Phase 0',
    progress: 100,
    features: ['Landing page with header, nav, footer', 'Public menu with category filter', 'Availability badges', 'Order page with cart placeholder']
  },
  {
    id: 'p1-auth',
    title: 'Authentication System',
    description: 'Complete sign in/up flow with role-based redirects and route protection.',
    status: 'completed',
    category: 'authentication',
    priority: 'high',
    quarter: 'Phase 1',
    progress: 85,
    features: ['Email+password forms with validation', 'Demo login buttons for roles', 'Client sign up with full validation', 'JWT route protection middleware', 'Auto-logout on token expiry']
  },

  // PHASE 1 - POS Core (In Progress)
  {
    id: 'p1-menu',
    title: 'Menu Management (MVP)',
    description: 'CRUD operations for menu items with category management and availability toggle.',
    status: 'in-progress',
    category: 'admin',
    priority: 'high',
    quarter: 'Phase 1',
    progress: 75,
    features: ['Create/Edit/Delete menu items', 'Name, description, price, category fields', 'Availability toggle (Available/Out of Stock)', 'Sort by name/price, filter by category', 'Bulk availability toggle operations']
  },
  {
    id: 'p1-frontdesk',
    title: 'Front Desk Dashboard',
    description: 'Real-time order queue management and order processing interface.',
    status: 'planned',
    category: 'admin',
    priority: 'high',
    quarter: 'Phase 1',
    progress: 0,
    features: ['Real-time queue with WebSocket', 'Order cards with customer info', 'Priority badges and notifications', 'Build/modify orders with items', 'Send orders to Kitchen (KDS tickets)']
  },
  {
    id: 'p1-kitchen',
    title: 'Kitchen Display System (KDS)',
    description: 'Kitchen staff interface for order preparation and status updates.',
    status: 'planned',
    category: 'backend',
    priority: 'high',
    quarter: 'Phase 1',
    progress: 0,
    features: ['Kitchen ticket queue display', 'Prep status updates (in-progress/done)', 'Special instructions display', 'Line-item status tracking', 'Status sync back to Front Desk']
  }
];

// Mini cards for future phases
export const futurePhases: FuturePhase[] = [
  {
    phase: 'Phase 2',
    title: 'Payments & Inventory',
    quarter: 'Q2 2025',
    items: ['Payment Integration (Cash + Mock Digital)', 'Inventory Management (SKUs, Stock Levels)', 'Recipe BOM System', 'Client Dashboard (Basic)'],
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
  },
  {
    phase: 'Phase 3', 
    title: 'Staff Management',
    quarter: 'Q3 2025',
    items: ['Staff CRUD Operations', 'Employee Metrics Dashboard', 'Role Management', 'Staff Performance Tracking'],
    color: 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800'
  },
  {
    phase: 'Phase 4',
    title: 'Enhanced Operations',
    quarter: 'Q3 2025', 
    items: ['Front Desk Inventory UI', 'Equipment Management', 'Customer Service Tools', 'Supply Management'],
    color: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
  },
  {
    phase: 'Phase 5',
    title: 'Analytics & Reporting',
    quarter: 'Q4 2025',
    items: ['Manager Analytics Dashboard', 'Sales Reports & EOD', 'Client Favorites & Recommendations', 'Advanced Admin Features'],
    color: 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800'
  }
];

export const categories: CategoryFilter[] = [
  { key: 'all', label: 'All Categories', icon: Circle, color: 'text-gray-600' },
  { key: 'authentication', label: 'Authentication', icon: Shield, color: 'text-green-600' },
  { key: 'admin', label: 'Admin Panel', icon: Settings, color: 'text-[#6B4E37]' },
  { key: 'frontend', label: 'Frontend', icon: Smartphone, color: 'text-[#2CA6A4]' },
  { key: 'backend', label: 'Backend', icon: Database, color: 'text-[#E1B168]' },
  { key: 'mobile', label: 'Mobile', icon: Smartphone, color: 'text-purple-600' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-orange-600' }
];

export const statuses: StatusFilter[] = [
  { key: 'all', label: 'All Status', icon: Circle },
  { key: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-green-600' },
  { key: 'in-progress', label: 'In Progress', icon: Clock, color: 'text-yellow-600' },
  { key: 'planned', label: 'Planned', icon: Circle, color: 'text-gray-400' }
];
