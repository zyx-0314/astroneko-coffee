'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface GalleryCardProps {
  icon: ReactNode;
  title: string;
  delay?: number;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  variant?: 'glass' | 'solid' | 'outlined';
}

const aspectRatioStyles = {
  square: 'aspect-square',
  video: 'aspect-video', 
  portrait: 'aspect-[3/4]'
};

const variantStyles = {
  glass: 'bg-white/10 backdrop-blur-sm border border-white/20',
  solid: 'bg-gray-100 dark:bg-gray-800',
  outlined: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700'
};

const GalleryCard = ({
  icon,
  title,
  delay = 0,
  className = '',
  aspectRatio = 'square',
  variant = 'glass'
}: GalleryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 10px 30px rgba(255,255,255,0.2)"
      }}
      className={`
        ${aspectRatioStyles[aspectRatio]} 
        ${variantStyles[variant]} 
        rounded-2xl overflow-hidden
        ${className}
      `}
    >
      <motion.div 
        className="w-full h-full flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
      >
        <div className="text-center">
          <motion.div 
            className="text-4xl mb-2"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: delay * 0.5
            }}
          >
            {icon}
          </motion.div>
          <motion.p 
            className="text-sm font-medium text-current"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.2 }}
          >
            {title}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GalleryCard;
