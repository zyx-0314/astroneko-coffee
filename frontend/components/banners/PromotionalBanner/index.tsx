'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface PromotionalBannerProps {
  icon: ReactNode;
  title: string;
  description: string;
  promoCode?: {
    code: string;
    label: string;
  };
  variant?: 'glass' | 'solid' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  delay?: number;
}

const variantStyles = {
  glass: 'bg-white/10 backdrop-blur-sm border border-white/10',
  solid: 'bg-gray-100 dark:bg-gray-800',
  gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm'
};

const sizeStyles = {
  sm: {
    container: 'p-6 rounded-xl max-w-md',
    icon: 'text-3xl mb-3',
    title: 'text-lg',
    description: 'text-sm'
  },
  md: {
    container: 'p-8 rounded-2xl max-w-lg',
    icon: 'text-5xl mb-4',
    title: 'text-2xl',
    description: 'text-base'
  },
  lg: {
    container: 'p-10 rounded-3xl max-w-2xl',
    icon: 'text-6xl mb-6',
    title: 'text-3xl',
    description: 'text-lg'
  }
};

const PromotionalBanner = ({
  icon,
  title,
  description,
  promoCode,
  variant = 'glass',
  size = 'md',
  className = '',
  delay = 0
}: PromotionalBannerProps) => {
  const styles = sizeStyles[size];
  const variantStyle = variantStyles[variant];

  return (
    <motion.div 
      className={`
        ${variantStyle} 
        ${styles.container} 
        mx-auto mb-8 text-center
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(255,255,255,0.1)"
      }}
    >
      {/* Animated Icon */}
      <motion.div 
        className={styles.icon}
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {icon}
      </motion.div>
      
      {/* Title */}
      <motion.h3 
        className={`${styles.title} font-bold mb-4 text-current`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2 }}
      >
        {title}
      </motion.h3>
      
      {/* Description */}
      <motion.p 
        className={`${styles.description} text-current/80 mb-6`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4 }}
      >
        {description}
        
        {/* Promo Code */}
        {promoCode && (
          <>
            {' '}Use code:{' '}
            <motion.span 
              className="font-mono font-bold text-[#E1B168] bg-gray-800 px-2 py-1 rounded ml-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {promoCode.code}
            </motion.span>
          </>
        )}
      </motion.p>
    </motion.div>
  );
};

export default PromotionalBanner;
