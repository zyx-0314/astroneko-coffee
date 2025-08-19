import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tokenManager } from './lib/auth-cookies';

// Define role permissions
const ROLE_PERMISSIONS = {
  client: [
    '/dashboard',
    '/dashboard/profile',
    '/dashboard/orders',
    '/dashboard/favorites',
    '/dashboard/addresses',
    '/dashboard/payment',
    '/dashboard/settings',
    '/menu',
    '/order',
    '/about',
    '/contact',
    '/careers'
  ],
  cook: [
    '/admin/kitchen/dashboard',
    '/admin/kitchen/dashboard/orders',
    '/admin/kitchen/dashboard/menu',
    '/admin/kitchen/dashboard/inventory',
    '/admin/reports',
    '/admin/help',
    '/admin/requests',
    '/admin/manual',
    '/dashboard/profile',
    '/dashboard/settings'
  ],
  barista: [
    '/admin/kitchen/dashboard',
    '/admin/kitchen/dashboard/orders',
    '/admin/kitchen/dashboard/menu',
    '/admin/kitchen/dashboard/inventory',
    '/admin/reports',
    '/admin/help',
    '/admin/requests',
    '/admin/manual',
    '/dashboard/profile',
    '/dashboard/settings'
  ],
  cashier: [
    '/admin/front-desk/dashboard',
    '/admin/front-desk/dashboard/orders',
    '/admin/front-desk/dashboard/customers',
    '/admin/front-desk/dashboard/reservations',
    '/admin/reports',
    '/admin/help',
    '/admin/requests',
    '/admin/manual',
    '/dashboard/profile',
    '/dashboard/settings'
  ],
  helper: [
    '/admin/front-desk/dashboard',
    '/admin/front-desk/dashboard/orders',
    '/admin/front-desk/dashboard/customers',
    '/admin/front-desk/dashboard/reservations',
    '/admin/reports',
    '/admin/help',
    '/admin/requests',
    '/admin/manual',
    '/dashboard/profile',
    '/dashboard/settings'
  ],
  manager: [
    '/admin/dashboard',
    '/admin/managers/dashboard',
    '/admin/managers/dashboard/staff',
    '/admin/managers/dashboard/analytics',
    '/admin/managers/dashboard/performance',
    '/admin/managers/dashboard/reports',
    '/admin/kitchen/dashboard',
    '/admin/kitchen/dashboard/orders',
    '/admin/kitchen/dashboard/menu',
    '/admin/kitchen/dashboard/inventory',
    '/admin/front-desk/dashboard',
    '/admin/front-desk/dashboard/orders',
    '/admin/front-desk/dashboard/customers',
    '/admin/front-desk/dashboard/reservations',
    '/admin/reports',
    '/admin/help',
    '/admin/requests',
    '/admin/manual',
    '/admin/settings',
    '/dashboard/profile',
    '/dashboard/settings'
  ],
  owner: [
    '/admin/dashboard',
    '/admin/managers/dashboard',
    '/admin/managers/dashboard/staff',
    '/admin/managers/dashboard/analytics',
    '/admin/managers/dashboard/performance',
    '/admin/managers/dashboard/reports',
    '/admin/kitchen/dashboard',
    '/admin/kitchen/dashboard/orders',
    '/admin/kitchen/dashboard/menu',
    '/admin/kitchen/dashboard/inventory',
    '/admin/front-desk/dashboard',
    '/admin/front-desk/dashboard/orders',
    '/admin/front-desk/dashboard/customers',
    '/admin/front-desk/dashboard/reservations',
    '/admin/reports',
    '/admin/help',
    '/admin/requests',
    '/admin/manual',
    '/admin/settings',
    '/dashboard/profile',
    '/dashboard/settings'
  ]
};

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/careers',
  '/menu',
  '/authentication',
  '/errors/backend-down',
  '/errors/forbidden',
  '/errors/maintenance'
];

// Mock function to get user role - in real app, this would come from JWT or session
function getUserRole(request: NextRequest): string | null {
  try {
    // Get token from cookies using our token manager
    const token = tokenManager.getServerToken(request.headers.get('cookie'));
    
    if (!token) {
      return null;
    }
    
    // Decode JWT token to extract role (simplified - in production, verify signature)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role?.toLowerCase() || null;
  } catch (error) {
    console.error('Error extracting user role from token:', error);
    return null;
  }
}

function hasPermission(userRole: string, requestedPath: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS];
  if (!permissions) return false;
  
  // Check exact match first
  if (permissions.includes(requestedPath)) return true;
  
  // Check if any permission is a prefix of the requested path
  return permissions.some(permission => 
    requestedPath.startsWith(permission + '/')
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Allow static files and API routes
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Get user role
  const userRole = getUserRole(request);
  
  // Redirect to authentication if no role found
  if (!userRole) {
    const url = request.nextUrl.clone();
    url.pathname = '/authentication';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  
  // Check permissions
  if (!hasPermission(userRole, pathname)) {
    // Redirect to appropriate dashboard based on role
    const url = request.nextUrl.clone();
    
    switch (userRole) {
      case 'client':
        url.pathname = '/dashboard';
        break;
      case 'cook':
      case 'barista':
        url.pathname = '/admin/kitchen/dashboard';
        break;
      case 'cashier':
      case 'helper':
        url.pathname = '/admin/front-desk/dashboard';
        break;
      case 'manager':
      case 'owner':
        url.pathname = '/admin/managers/dashboard';
        break;
      default:
        url.pathname = '/errors/forbidden';
    }
    
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
