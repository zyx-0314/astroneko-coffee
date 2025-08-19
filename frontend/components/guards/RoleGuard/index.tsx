'use client';

import { useAuth } from '@/provider/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { UserRole } from '@/schema/user.schema';
import { getRouteForRole } from '@/lib/auth';
import { useRoleGuard } from './RoleGuard.hook';

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
  const { isAuthorized, isLoading } = useRoleGuard({
    allowedRoles,
    redirectTo
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return fallback;
  }

  return <>{children}</>;
}
