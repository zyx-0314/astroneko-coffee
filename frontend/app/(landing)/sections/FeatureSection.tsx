'use client';

import Image from 'next/image';
import { fadeInContainer, imageScale, slideLeftContainer, slideUpContainer } from '@/framer';
import { motion } from 'framer-motion';
import { Coffee, Sparkles } from 'lucide-react';

export default function FeatureSection() {
  return (
    <motion.section 
      className="py-20 px-4 bg-[#D4EDEC]/30 dark:bg-gray-800"
      variants={fadeInContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Feature Image */}
          <motion.div className="order-2 lg:order-1" variants={imageScale}>
            <div className="aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden relative">
              <Image
                src="/landing/feature/Feature.webp"
                alt="Cosmic Coffee Experience at Astroneko Coffee"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              />
              {/* Floating particles */}
              <motion.div
                className="absolute top-4 right-4 text-white opacity-70"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles size={20} />
              </motion.div>
              <motion.div
                className="absolute bottom-6 left-6 text-white opacity-60"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Coffee size={16} />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div className="order-1 lg:order-2" variants={slideLeftContainer}>
            <motion.h2 
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              variants={slideUpContainer}
            >
              Crafted with cosmic precision and earthly passion
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              variants={slideUpContainer}
            >
              Every cup at Astroneko Coffee is a journey through space and time. Our master roasters 
              bring together the finest beans from across the galaxy, creating blends that are truly 
              out of this world.
            </motion.p>
            
            <motion.div className="space-y-4" variants={slideUpContainer}>
              <motion.div 
                className="flex items-start space-x-4"
                variants={slideUpContainer}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-6 h-6 bg-[#6B4E37] rounded-full flex-shrink-0 mt-1"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Premium Quality</h3>
                  <p className="text-gray-600 dark:text-gray-400">High-quality ingredients sourced from sustainable farms across the universe.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                variants={slideUpContainer}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-6 h-6 bg-[#2CA6A4] rounded-full flex-shrink-0 mt-1"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Unique Experience</h3>
                  <p className="text-gray-600 dark:text-gray-400">{`An immersive intergalactic café atmosphere that's truly one-of-a-kind.`}</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                variants={slideUpContainer}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-6 h-6 bg-[#E1B168] rounded-full flex-shrink-0 mt-1"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Expert Service</h3>
                  <p className="text-gray-600 dark:text-gray-400">Our cosmic crew provides exceptional service with a smile.</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
