'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  className?: string;
  motionProps?: MotionProps;
}

const defaultMotionProps: MotionProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
};

export function AnimatedButton({ 
  children, 
  className, 
  motionProps = defaultMotionProps,
  ...buttonProps 
}: AnimatedButtonProps) {
  return (
    <motion.div {...motionProps}>
      <Button 
        className={cn("shadow-lg", className)} 
        {...buttonProps}
      >
        {children}
      </Button>
    </motion.div>
  );
}
