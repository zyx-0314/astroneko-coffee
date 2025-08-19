'use client';

import { RoleGuard } from '@/components/guards';
import { staffRoles } from '@/lib/auth'; // All staff can access reports

export default function ReportsPage() {
  return (
    <RoleGuard allowedRoles={staffRoles}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Reports Dashboard
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-gray-600 dark:text-gray-400">
              Reports functionality coming soon...
            </p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
