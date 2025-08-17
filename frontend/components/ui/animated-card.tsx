'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  icon?: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  className?: string;
  variants?: Variants;
  children?: React.ReactNode;
}

const defaultCardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export function AnimatedCard({
  icon: Icon,
  iconColor = "bg-[#6B4E37]",
  title,
  description,
  className,
  variants = defaultCardVariants,
  children
}: AnimatedCardProps) {
  return (
    <motion.div 
      className={cn("text-center group", className)}
      variants={variants}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {Icon && (
        <motion.div 
          className={cn(
            "w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-colors",
            iconColor,
            "group-hover:scale-110"
          )}
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="text-white" size={32} />
        </motion.div>
      )}
      
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
      
      {children}
    </motion.div>
  );
}
