'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { AnimatedButton } from '@/components/ui/animated-button';
import { fadeInContainer } from '@/framer/variants/containers';
import { fadeInUp, fadeInLeft } from '@/framer/variants/text';

export default function BenefitsSection() {
  return (
    <AnimatedSection className="py-20 px-4 bg-[#D4EDEC]/30 dark:bg-gray-800">
      <motion.div 
        className="container mx-auto"
        variants={fadeInContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div 
            className="order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              variants={fadeInLeft}
            >
              Experience the benefits of our cosmic café
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              At Astroneko Coffee, we believe every visit should be extraordinary. From our premium 
              ingredients to our unique atmosphere, discover what makes us special.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <AnimatedButton 
                asChild
                className="px-8 py-4 bg-[#6B4E37] text-white rounded-lg font-medium hover:bg-[#5A3E2A] transition-all duration-300"
              >
                <Link href="/about">
                  Learn More About Us
                </Link>
              </AnimatedButton>
            </motion.div>
          </motion.div>
          
          {/* Benefits Image */}
          <motion.div 
            className="order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/landing/benefit/Benefits.webp"
                alt="Experience the benefits of our cosmic café"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
