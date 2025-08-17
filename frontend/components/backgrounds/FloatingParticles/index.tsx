'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export interface FloatingParticlesProps {
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  opacity?: number;
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

const sizeStyles = {
  sm: 'w-1 h-1',
  md: 'w-2 h-2', 
  lg: 'w-3 h-3'
};

const speedSettings = {
  slow: { duration: 6, range: 15 },
  medium: { duration: 4, range: 25 },
  fast: { duration: 2, range: 35 }
};

const FloatingParticles = ({
  count = 20,
  size = 'sm',
  color = 'bg-white/30',
  opacity = 0.3,
  speed = 'medium',
  className = ''
}: FloatingParticlesProps) => {
  const [mounted, setMounted] = useState(false);
  const speedConfig = speedSettings[speed];

  // Generate deterministic particle positions to avoid hydration mismatch
  const particles = Array.from({ length: count }, (_, i) => ({
    left: ((i * 37) % 100),
    top: ((i * 67) % 100),
    duration: speedConfig.duration + ((i * 0.5) % 2),
    delay: (i * 0.3) % 2,
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute ${sizeStyles[size]} ${color} rounded-full`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity,
          }}
          animate={{
            y: [-speedConfig.range, speedConfig.range],
            x: [-speedConfig.range/2, speedConfig.range/2],
            opacity: [opacity * 0.5, opacity, opacity * 0.5],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
