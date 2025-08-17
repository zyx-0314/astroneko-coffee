'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { AnimatedButton } from '@/components/ui/animated-button';
import { fadeInContainer } from '@/framer/variants/containers';
import { fadeInUp, fadeInDown } from '@/framer/variants/text';
import { FloatingParticles } from '@/components/backgrounds';

const galleryItems = [
  { icon: '☕', title: 'Perfect Brews', delay: 0.1 },
  { icon: '🌌', title: 'Cosmic Atmosphere', delay: 0.2 },
  { icon: '🥐', title: 'Galactic Treats', delay: 0.3 },
  { icon: '👥', title: 'Friendly Crew', delay: 0.4 }
];

export default function GallerySection() {
  return (
    <AnimatedSection className="py-20 px-4 bg-[#2CA6A4] text-white overflow-hidden relative">
      {/* Background floating elements */}
      <FloatingParticles
        count={15}
        size="md"
        color="bg-white/20"
        opacity={0.6}
        speed="medium"
      />

      <motion.div 
        className="container mx-auto relative z-10"
        variants={fadeInContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
            variants={fadeInDown}
          >
            Experience Our Cosmic Gallery
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Take a visual journey through our intergalactic café. From our stellar coffee creations 
            to our unique cosmic atmosphere, see what makes Astroneko Coffee special.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              className="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: item.delay,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 10px 30px rgba(255,255,255,0.2)"
              }}
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
                      delay: index * 0.5
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <motion.p 
                    className="text-sm font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay + 0.2 }}
                  >
                    {item.title}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <AnimatedButton 
            asChild
            className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg font-medium hover:bg-white/30 transition-all duration-300"
          >
            <Link href="/mood-board">
              View Design System
            </Link>
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
