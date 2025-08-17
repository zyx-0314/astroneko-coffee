'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { AnimatedButton } from '@/components/ui/animated-button';
import { fadeInContainer } from '@/framer/variants/containers';
import { fadeInUp, fadeInDown } from '@/framer/variants/text';
import { FloatingParticles } from '@/components/backgrounds';

const galleryItems = [
  { image: '/landing/gallery/Perfect_Brews.webp', title: 'Perfect Brews', delay: 0.1 },
  { image: '/landing/gallery/Cosmic_Atmosphere.webp', title: 'Cosmic Atmosphere', delay: 0.2 },
  { image: '/landing/gallery/Galactic_Treats.webp', title: 'Galactic Treats', delay: 0.3 },
  { image: '/landing/gallery/Friendly_Crew.webp', title: 'Friendly Crew', delay: 0.4 }
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
                className="w-full h-full relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay + 0.2 }}
                >
                  <motion.p 
                    className="text-sm font-medium text-white text-center drop-shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.title}
                  </motion.p>
                </motion.div>
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
            <Link href="/">
              View Our Gallery
            </Link>
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
