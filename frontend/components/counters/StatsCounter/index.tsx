'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { StatsCounterProps } from '@/schema/components.schema';

const StatsCounter = ({
  value,
  label,
  suffix = '',
  prefix = '',
  delay = 0,
  icon,
  className = '',
  valueClassName = '',
  labelClassName = ''
}: StatsCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  });
  
  const displayValue = useMotionValue('0');

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      displayValue.set(`${prefix}${Math.round(latest)}${suffix}`);
    });

    return unsubscribe;
  }, [springValue, displayValue, prefix, suffix]);

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Icon */}
      {icon && (
        <motion.div 
          className="text-4xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
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
      )}
      
      {/* Counter Value */}
      <motion.div
        className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 ${valueClassName}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4 }}
      >
        <motion.span>{displayValue}</motion.span>
      </motion.div>
      
      {/* Label */}
      <motion.p
        className={`text-lg text-gray-600 dark:text-gray-400 font-medium ${labelClassName}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.6 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

export default StatsCounter;
