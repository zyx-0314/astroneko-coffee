'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function RoadmapFooterSection() {
  return (
    <Card className="bg-white dark:bg-gray-800 mt-8">
      <CardContent className="p-6 text-center">
        <Calendar className="h-8 w-8 text-[#6B4E37] mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Stay Updated
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          This roadmap is updated regularly. Timeline estimates are subject to change based on 
          development priorities and feedback. Want to suggest a feature or report an issue? 
          Contact our development team through the admin dashboard.
        </p>
      </CardContent>
    </Card>
  );
}
