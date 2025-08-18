'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInContainer } from '@/framer';

import { AnimatedSectionProps } from '@/schema/animatedComponents.schema';

export function AnimatedSection({
  children,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={cn("py-20 px-4", className)}
      variants={fadeInContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.section>
  );
}
