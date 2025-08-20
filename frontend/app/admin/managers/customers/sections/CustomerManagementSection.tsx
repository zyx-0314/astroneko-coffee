'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { customerAPI, Customer as CustomerType } from '@/lib/api/customer.api';
import { purchaseHistoryAPI } from '@/lib/api/purchase-history.api';
import { CustomerDashboardSection } from './CustomerDashboardSection';
import { EnhancedCustomerTable } from './EnhancedCustomerTable';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  points: number;
  registrationDate: string;
  lastPurchaseDate?: string;
  isActive: boolean;
  totalOrders: number;
  totalSpent: number;
}

export function CustomerManagementSection() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      // Since EnhancedCustomerTable uses server-side pagination, 
      // we don't need to load customers here. Just set empty array.
      setCustomers([]);
    } catch (error) {
      console.error('Failed to load customers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CustomerDashboardSection />
      </motion.div>

      {/* Paginated Customer Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <EnhancedCustomerTable 
          customers={customers}
          loading={loading}
          onCustomerUpdate={loadCustomers}
        />
      </motion.div>
    </div>
  );
}
