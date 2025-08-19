'use client';

import { useAuth } from '@/provider/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserRole } from '@/schema/user.schema';
import { getRouteForRole } from '@/lib/auth';

interface UseRoleGuardProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const useRoleGuard = ({ allowedRoles, redirectTo }: UseRoleGuardProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/authentication');
        setIsAuthorized(false);
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
        setIsAuthorized(false);
        return;
      }

      setIsAuthorized(true);
    }
  }, [user, isLoading, allowedRoles, redirectTo, router]);

  return {
    isAuthorized,
    isLoading,
    user
  };
};
