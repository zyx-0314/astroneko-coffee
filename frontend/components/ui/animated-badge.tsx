'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AnimatedBadgeProps extends React.ComponentProps<typeof Badge> {
  children: React.ReactNode;
  className?: string;
  motionProps?: MotionProps;
}

const defaultMotionProps: MotionProps = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
};

export function AnimatedBadge({ 
  children, 
  className, 
  motionProps = defaultMotionProps,
  ...badgeProps 
}: AnimatedBadgeProps) {
  return (
    <motion.div {...motionProps}>
      <Badge 
        className={cn("backdrop-blur-sm", className)} 
        {...badgeProps}
      >
        {children}
      </Badge>
    </motion.div>
  );
}
