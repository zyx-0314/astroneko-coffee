'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { fadeInContainer } from '@/framer/variants/containers';
import { fadeInUp, fadeInDown } from '@/framer/variants/text';

const steps = [
  {
    image: '/landing/howItWorks/Step_Into_Our_Galaxy.webp',
    title: 'Step Into Our Galaxy',
    description: 'Enter our cosmic café and immediately feel transported to an intergalactic coffee experience like no other. The atmosphere sets the tone for your journey.',
    delay: 0.2
  },
  {
    image: '/landing/howItWorks/Choose_Your_Cosmic_Blend.webp',
    title: 'Choose Your Cosmic Blend',
    description: 'Browse our stellar menu of specialty blends and galactic treats. Our cosmic crew is here to guide you through our extensive selection of otherworldly flavors.',
    delay: 0.4
  },
  {
    image: '/landing/howItWorks/Savor_the_Experience.webp',
    title: 'Savor the Experience',
    description: 'Enjoy your perfectly crafted cosmic coffee in our unique atmosphere. Whether you stay to work or take it to-go, every sip is an adventure.',
    delay: 0.6
  }
];

export default function HowItWorksSection() {
  return (
    <AnimatedSection className="py-20 px-4 bg-white dark:bg-gray-900">
      <motion.div 
        className="container mx-auto"
        variants={fadeInContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6"
            variants={fadeInDown}
          >
            How Your Cosmic Journey Works
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            From the moment you step into our intergalactic café to your last sip, 
            every moment is designed for an extraordinary experience.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: step.delay }}
            >
              <motion.div 
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-full h-48 rounded-xl mb-6 overflow-hidden relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.5
                    }}
                  />
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold mb-3 text-gray-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: step.delay + 0.2 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: step.delay + 0.4 }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
