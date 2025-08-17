'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  variant?: 'default' | 'outlined' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  iconBg?: string;
  iconHoverBg?: string;
  className?: string;
}

const variantStyles = {
  default: 'bg-gray-50 dark:bg-gray-800',
  outlined: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
  glass: 'bg-white/10 backdrop-blur-sm border border-white/20'
};

const sizeStyles = {
  sm: {
    card: 'p-6 rounded-xl',
    iconContainer: 'w-12 h-12 rounded-lg mb-4',
    iconText: 'text-4xl',
    title: 'text-lg',
    description: 'text-sm'
  },
  md: {
    card: 'p-8 rounded-2xl',
    iconContainer: 'w-16 h-16 rounded-xl mb-6',
    iconText: 'text-6xl',
    title: 'text-xl',
    description: 'text-base'
  },
  lg: {
    card: 'p-10 rounded-3xl',
    iconContainer: 'w-20 h-20 rounded-2xl mb-8',
    iconText: 'text-7xl',
    title: 'text-2xl',
    description: 'text-lg'
  }
};

const FeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
  variant = 'default',
  size = 'md',
  iconBg = 'bg-gray-200 dark:bg-gray-700',
  iconHoverBg,
  className = ''
}: FeatureCardProps) => {
  const styles = sizeStyles[size];
  const cardVariant = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <motion.div 
        className={`
          ${cardVariant} 
          ${styles.card} 
          text-center hover:shadow-lg transition-all duration-300 
          ${className}
        `}
        whileHover={{ 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
        }}
      >
        <motion.div 
          className={`
            ${iconBg} 
            ${styles.iconContainer} 
            mx-auto flex items-center justify-center
            ${iconHoverBg ? `group-hover:${iconHoverBg}` : ''}
            transition-colors duration-300
          `}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className={styles.iconText}
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: delay * 2
            }}
          >
            {icon}
          </motion.div>
        </motion.div>
        
        <motion.h3 
          className={`${styles.title} font-semibold mb-3 text-gray-900 dark:text-white`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className={`${styles.description} text-gray-600 dark:text-gray-400 mb-6 leading-relaxed`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;
