'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function RoadmapHeaderSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Astroneko Coffee Roadmap
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Track our phased development approach for the Astroneko Coffee management system.
          Wide cards show current work (Phase 0 & 1), while mini cards outline upcoming features in future phases.
          This roadmap is updated regularly to reflect our current priorities and development status.
        </p>
      </div>
    </motion.div>
  );
}
