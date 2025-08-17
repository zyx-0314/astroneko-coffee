'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { fadeInContainer } from '@/framer/variants/containers';
import { fadeInDown } from '@/framer/variants/text';

const services = [
  {
    icon: '🪑',
    title: 'Dine-In Experience',
    description: 'Immerse yourself in our cosmic atmosphere with comfortable seating, stellar ambiance, and the perfect environment for work, meetings, or relaxation.',
    delay: 0.2
  },
  {
    icon: '🥤',
    title: 'Takeaway Service',
    description: 'Grab your favorite cosmic coffee to-go and take the intergalactic experience with you. Perfect for busy space travelers and earthbound commuters alike.',
    delay: 0.4
  },
  {
    icon: '🎉',
    title: 'Special Events',
    description: 'Host your cosmic gatherings with us! From birthday parties to corporate meetings, our unique space-themed venue makes every event memorable and out of this world.',
    delay: 0.6
  }
];

export default function ServicesSection() {
  return (
    <AnimatedSection className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
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
            Our Cosmic Services
          </motion.h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: service.delay }}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
                whileHover={{ 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                <motion.div 
                  className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-xl mb-6 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-6xl"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.7
                    }}
                  >
                    {service.icon}
                  </motion.div>
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold mb-3 text-gray-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: service.delay + 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: service.delay + 0.4 }}
                >
                  {service.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
