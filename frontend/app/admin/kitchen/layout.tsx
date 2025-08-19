'use client';

import { AdminAside } from '@/components/aside';
import { RoleGuard } from '@/components/guards';
import { useAuth } from '@/provider/auth-provider';
import { kitchenRoles } from '@/lib/auth';

export default function KitchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <RoleGuard allowedRoles={kitchenRoles}>
      <div className="flex min-h-[calc(100vh-80px)]">
        {user && (
          <AdminAside 
            user={user} 
            className="w-64 min-h-full" 
          />
        )}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </RoleGuard>
  );
}
