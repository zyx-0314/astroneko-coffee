'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Coffee, Sparkles, Users } from 'lucide-react';
import { fadeInContainer, slideDownContainer, slideUpContainer } from '@/framer';

export default function FeaturesListSection() {
  return (
    <motion.section 
      className="py-20 px-4 bg-white dark:bg-gray-900"
      variants={fadeInContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto">
        <motion.div className="text-center mb-16" variants={slideDownContainer}>
          <motion.h2 
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6"
            variants={slideDownContainer}
          >
            Why Choose Astroneko Coffee?
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={slideDownContainer}
          >
            Discover what makes our intergalactic café experience special. From specialty blends to 
            cosmic ambiance, every detail is crafted for your enjoyment.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div 
            className="text-center group"
            variants={slideUpContainer}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-16 h-16 bg-[#6B4E37] rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-[#5A3E2A] transition-colors"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Coffee className="text-white" size={32} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Specialty Coffee Blends</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {`Hand-selected beans from across the universe, roasted to perfection for an unmatched 
              flavor experience that's truly stellar.`}
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center group"
            variants={slideUpContainer}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-16 h-16 bg-[#2CA6A4] rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-[#238A88] transition-colors"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="text-white" size={32} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Cosmic Ambiance</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Carefully curated space-themed atmosphere with ambient sounds and stellar décor that 
              transports you to another galaxy.
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center group"
            variants={slideUpContainer}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-16 h-16 bg-[#E1B168] rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-[#D4A850] transition-colors"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Users className="text-white" size={32} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Community Experience</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Join our intergalactic community of coffee lovers and space enthusiasts for events, 
              tastings, and cosmic conversations.
            </p>
          </motion.div>
        </div>
        
        <motion.div className="text-center mt-12" variants={slideUpContainer}>
          <AnimatedButton 
            asChild
            className="bg-[#6B4E37] hover:bg-[#5A3E2A] text-white px-8 py-4 rounded-lg font-medium"
          >
            <Link href="/menu">
              Explore Our Menu
            </Link>
          </AnimatedButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
