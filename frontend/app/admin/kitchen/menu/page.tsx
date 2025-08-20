'use client';

import React from 'react';
import { motion } from 'framer-motion';
import RoleGuard from '@/components/guards/RoleGuard';
import { KitchenMenuSection } from './sections';

export default function KitchenMenuPage() {
  return (
    <RoleGuard allowedRoles={['cook', 'barista', 'manager', 'owner']}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <KitchenMenuSection />
      </motion.div>
    </RoleGuard>
  );
}
