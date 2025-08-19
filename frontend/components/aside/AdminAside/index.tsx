'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard,
  Users,
  ShoppingBag,
  Coffee,
  BarChart3,
  Settings,
  Calendar,
  Package,
  TrendingUp,
  Clock,
  ChefHat,
  Calculator,
  UserCheck,
  Building
} from 'lucide-react';
import { User } from '@/schema/user.schema';

export interface AdminAsideProps {
  user: User;
  className?: string;
}

export default function AdminAside({ user, className = '' }: AdminAsideProps) {
  const pathname = usePathname();

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      {
        name: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
        roles: ['manager', 'owner']
      }
    ];

    const roleSpecificItems = {
      kitchen: [
        {
          name: 'Kitchen Dashboard',
          href: '/admin/dashboard/kitchen',
          icon: ChefHat,
          roles: ['cook', 'barista']
        },
        {
          name: 'Active Orders',
          href: '/admin/dashboard/kitchen/orders',
          icon: Clock,
          roles: ['cook', 'barista']
        },
        {
          name: 'Menu Items',
          href: '/admin/dashboard/kitchen/menu',
          icon: Coffee,
          roles: ['cook', 'barista']
        },
        {
          name: 'Inventory',
          href: '/admin/dashboard/kitchen/inventory',
          icon: Package,
          roles: ['cook', 'barista']
        }
      ],
      frontDesk: [
        {
          name: 'Front Desk Dashboard',
          href: '/admin/dashboard/front-desk',
          icon: Calculator,
          roles: ['cashier', 'helper']
        },
        {
          name: 'Orders',
          href: '/admin/dashboard/front-desk/orders',
          icon: ShoppingBag,
          roles: ['cashier', 'helper']
        },
        {
          name: 'Customers',
          href: '/admin/dashboard/front-desk/customers',
          icon: Users,
          roles: ['cashier', 'helper']
        },
        {
          name: 'Reservations',
          href: '/admin/dashboard/front-desk/reservations',
          icon: Calendar,
          roles: ['cashier', 'helper']
        }
      ],
      manager: [
        {
          name: 'Managers Dashboard',
          href: '/admin/dashboard/managers',
          icon: Building,
          roles: ['manager', 'owner']
        },
        {
          name: 'Staff Management',
          href: '/admin/dashboard/managers/staff',
          icon: UserCheck,
          roles: ['manager', 'owner']
        },
        {
          name: 'Analytics',
          href: '/admin/dashboard/managers/analytics',
          icon: BarChart3,
          roles: ['manager', 'owner']
        },
        {
          name: 'Performance',
          href: '/admin/dashboard/managers/performance',
          icon: TrendingUp,
          roles: ['manager', 'owner']
        },
        {
          name: 'Reports',
          href: '/admin/dashboard/managers/reports',
          icon: BarChart3,
          roles: ['manager', 'owner']
        }
      ]
    };

    // Determine which section to show based on user role and current path
    let items = [...baseItems];
    
    if (['cook', 'barista'].includes(user.role) || pathname.includes('/kitchen')) {
      items = [...items, ...roleSpecificItems.kitchen];
    } else if (['cashier', 'helper'].includes(user.role) || pathname.includes('/front-desk')) {
      items = [...items, ...roleSpecificItems.frontDesk];
    } else if (['manager', 'owner'].includes(user.role) || pathname.includes('/managers')) {
      items = [...items, ...roleSpecificItems.manager];
    }

    // Filter items based on user role permissions
    return items.filter(item => 
      !item.roles || item.roles.includes(user.role)
    );
  };

  const navigationItems = getNavigationItems();

  const isActiveLink = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Admin Panel
        </h2>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveLink(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'bg-[#E1B168] text-[#2D5A4A] dark:bg-[#E1B168] dark:text-[#2D5A4A]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#E1B168]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="admin-sidebar-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#2D5A4A] dark:bg-[#2D5A4A] rounded-r-full"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link
              href="/admin/reports"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#E1B168] transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>View Reports</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#E1B168] transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
