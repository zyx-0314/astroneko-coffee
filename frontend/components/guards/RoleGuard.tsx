'use client';

import { useAuth } from '@/provider/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { UserRole } from '@/schema/user.schema';
import { getRouteForRole } from '@/lib/auth';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
  fallback?: ReactNode;
}

export default function RoleGuard({ 
  children, 
  allowedRoles, 
  redirectTo,
  fallback = (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-destructive mb-2">Access Denied</h2>
        <p className="text-muted-foreground">You don't have permission to access this page.</p>
      </div>
    </div>
  )
}: RoleGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/authentication');
        return;
      }

      if (!allowedRoles.includes(user.role)) {
        if (redirectTo) {
          router.push(redirectTo);
        } else {
          // Redirect to user's appropriate dashboard
          const userRoute = getRouteForRole(user.role);
          router.push(userRoute);
        }
        return;
      }
    }
  }, [user, isLoading, allowedRoles, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback;
  }

  return <>{children}</>;
}
