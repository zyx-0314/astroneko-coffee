'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { AnimatedButton } from '@/components/ui/animated-button';
import { fadeInUp, fadeInDown } from '@/framer/variants/text';

// Deterministic particle positions to avoid hydration mismatch
const particlePositions = Array.from({ length: 20 }, (_, i) => ({
  left: ((i * 37) % 100), // Pseudo-random but deterministic
  top: ((i * 67) % 100),
  duration: 3 + ((i * 0.5) % 2),
  delay: (i * 0.3) % 2,
}));

export default function CTASection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatedSection className="py-20 px-4 bg-gray-900 text-white overflow-hidden relative">
      {/* Background particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, 20],
                x: [-10, 10],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "reverse",
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <motion.div 
        className="container mx-auto text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-serif font-bold mb-6"
          variants={fadeInDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Ready for Your Cosmic Coffee Adventure?
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Join thousands of satisfied customers who have discovered the perfect blend of earthly comfort 
          and intergalactic wonder. Your cosmic coffee journey starts here.
        </motion.p>
        
        <motion.div 
          className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl max-w-lg mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(255,255,255,0.1)"
          }}
        >
          <motion.div 
            className="text-5xl mb-4"
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
            🎁
          </motion.div>
          <motion.h3 
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            First Visit Special!
          </motion.h3>
          <motion.p 
            className="text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
          >
            Get 20% off your first cosmic coffee experience. Use code: 
            <motion.span 
              className="font-mono font-bold text-[#E1B168] bg-gray-800 px-2 py-1 rounded ml-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              COSMIC20
            </motion.span>
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <AnimatedButton 
            asChild
            className="px-8 py-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 text-lg min-w-[160px]"
          >
            <Link href="/order">
              Order Now
            </Link>
          </AnimatedButton>
          
          <AnimatedButton 
            asChild
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg min-w-[160px]"
          >
            <Link href="/menu">
              View Menu
            </Link>
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
