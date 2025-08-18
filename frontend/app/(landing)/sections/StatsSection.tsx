'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react';
import { AppearContainer, imageScale, scaleContainer, slideRightContainer } from '@/framer';

export default function StatsSection() {
  return (
    <AnimatedSection className="bg-[#D4EDEC]/30 dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div className="order-1" variants={slideRightContainer}>
            <motion.h2 
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              variants={scaleContainer}
            >
              Numbers that speak to our cosmic success
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-12 leading-relaxed"
              variants={scaleContainer}
            >
              {`Since our launch into the coffee galaxy, we've been serving stellar experiences to 
              earthlings and space travelers alike. Here's what we've achieved so far.`}
            </motion.p>
            
            <motion.div className="grid grid-cols-2 gap-8" variants={scaleContainer}>
              <motion.div 
                className="text-center group"
                variants={scaleContainer}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-[#6B4E37] dark:text-[#E1B168] mb-2"
                  variants={AppearContainer}
                  whileInView={{ 
                    opacity: [0, 1],
                    scale: [0.8, 1.2, 1]
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  10,000+
                </motion.div>
                <p className="text-gray-900 dark:text-white font-medium flex items-center justify-center gap-2">
                  <BarChart3 size={16} />
                  Cups Served Monthly
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cosmic fuel delivered daily</p>
              </motion.div>
              
              <motion.div 
                className="text-center group"
                variants={scaleContainer}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-[#6B4E37] dark:text-[#E1B168] mb-2"
                  variants={AppearContainer}
                  whileInView={{ 
                    opacity: [0, 1],
                    scale: [0.8, 1.2, 1]
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  98%
                </motion.div>
                <p className="text-gray-900 dark:text-white font-medium flex items-center justify-center gap-2">
                  <TrendingUp size={16} />
                  Customer Satisfaction
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Happy space travelers</p>
              </motion.div>
              
              <motion.div 
                className="text-center group"
                variants={scaleContainer}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-[#6B4E37] dark:text-[#E1B168] mb-2"
                  variants={AppearContainer}
                  whileInView={{ 
                    opacity: [0, 1],
                    scale: [0.8, 1.2, 1]
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  42
                </motion.div>
                <p className="text-gray-900 dark:text-white font-medium flex items-center justify-center gap-2">
                  <Users size={16} />
                  Coffee Varieties
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">From across the galaxy</p>
              </motion.div>
              
              <motion.div 
                className="text-center group"
                variants={scaleContainer}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-[#6B4E37] dark:text-[#E1B168] mb-2"
                  variants={AppearContainer}
                  whileInView={{ 
                    opacity: [0, 1],
                    scale: [0.8, 1.2, 1]
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  5+
                </motion.div>
                <p className="text-gray-900 dark:text-white font-medium flex items-center justify-center gap-2">
                  <Calendar size={16} />
                  Years in Operation
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Serving stellar coffee</p>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Stats Image */}
          <motion.div className="order-2" variants={imageScale}>
            <motion.div 
              className="aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/landing/stats/Stats.webp"
                alt="Our Success Story - Numbers that speak to our cosmic success"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              />
              {/* Animated background particles */}
              <motion.div
                className="absolute top-4 right-4 text-white opacity-70"
                animate={{ y: [-5, 5, -5], rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute bottom-6 left-6 text-white opacity-60"
                animate={{ y: [5, -5, 5], x: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                🚀
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
