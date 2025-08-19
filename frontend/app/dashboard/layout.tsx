'use client';

import { RoleGuard } from '@/components/guards';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={['client']}>
      {children}
    </RoleGuard>
  );
}
