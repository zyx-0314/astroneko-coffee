import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tokenManager } from './lib/auth-cookies';

// Define role permissions
const ROLE_PERMISSIONS = {
  client: [
    '/dashboard',
    '/dashboard/profile',
    '/dashboard/favorites',
    '/dashboard/addresses',
    '/dashboard/payment',
    '/dashboard/settings',
    '/menu',
    '/order',
    '/about',
    '/contact',
    '/careers',
    '/mood-board',
    '/roadmap'
  ],
  cook: [
    '/menu',
    '/order',
    '/about',
    '/contact',
    '/careers',
    '/mood-board',
    '/roadmap',
    '/admin/kitchen/dashboard',
    '/admin/kitchen/orders',
    '/admin/kitchen/menu',
    '/admin/kitchen/inventory',
    '/admin/help',
    '/admin/manual',
    '/admin/profile',
    '/admin/settings'
  ],
  barista: [
    '/menu',
    '/order',
    '/about',
    '/contact',
    '/careers',
    '/mood-board',
    '/roadmap',
    '/admin/kitchen/dashboard',
    '/admin/kitchen/orders',
    '/admin/kitchen/menu',
    '/admin/kitchen/inventory',
    '/admin/help',
    '/admin/manual',
    '/admin/profile',
    '/admin/settings'
  ],
  cashier: [
    '/menu',
    '/order',
    '/about',
    '/contact',
    '/careers',
    '/mood-board',
    '/roadmap',
    '/admin/front-desk/dashboard',
    '/admin/front-desk/inventory',
    '/admin/front-desk/orders',
    '/admin/front-desk/reservations',
    '/admin/help',
    '/admin/manual',
    '/admin/profile',
    '/admin/settings'
  ],
  helper: [
    '/menu',
    '/order',
    '/about',
    '/contact',
    '/careers',
    '/mood-board',
    '/roadmap',
    '/admin/front-desk/dashboard',
    '/admin/front-desk/orders',
    '/admin/front-desk/reservations',
    '/admin/front-desk/inventory',
    '/admin/help',
    '/admin/manual',
    '/admin/profile',
    '/admin/settings'
  ],
  manager: [
    '/menu',
    '/order',
    '/about',
    '/contact',
    '/careers',
    '/mood-board',
    '/roadmap',
    '/admin/managers/dashboard',
    '/admin/managers/staff',
    '/admin/managers/inventory',
    '/admin/managers/orders',
    '/admin/managers/menu',
    '/admin/managers/customers',
    '/admin/managers/analytics',
    '/admin/managers/performance',
    '/admin/reports',
    '/admin/help',
    '/admin/requests',
    '/admin/manual',
    '/admin/settings',
    '/admin/profile',
  ],
  owner: [
    '/menu',
    '/order',
    '/about',
    '/contact',
    '/careers',
    '/admin/managers/dashboard',
    '/admin/managers/staff',
    '/admin/managers/inventory',
    '/admin/managers/orders',
    '/admin/managers/menu',
    '/admin/managers/customers',
    '/admin/managers/analytics',
    '/admin/managers/performance',
    '/admin/reports',
    '/admin/help',
    '/admin/requests',
    '/admin/manual',
    '/admin/settings',
    '/admin/profile',
  ]
};

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/careers',
  '/menu',
  '/mood-board',
  '/roadmap',
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
