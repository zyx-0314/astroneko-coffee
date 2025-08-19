'use client';

import { AdminSidebar } from '@/components/navigation';
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

        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </RoleGuard>
  );
}
