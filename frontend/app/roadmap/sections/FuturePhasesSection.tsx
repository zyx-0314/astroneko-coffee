'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';
import { FuturePhase } from '@/schema/roadmap.schema';

interface FuturePhasesSectionProps {
  futurePhases: FuturePhase[];
}

export default function FuturePhasesSection({ futurePhases }: FuturePhasesSectionProps) {
  return (
    <div>
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
      >
        Upcoming Features
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {futurePhases.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className={`h-full ${phase.color} hover:shadow-md transition-shadow`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {phase.phase}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {phase.quarter}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  {phase.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <Circle className="h-3 w-3 text-gray-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
