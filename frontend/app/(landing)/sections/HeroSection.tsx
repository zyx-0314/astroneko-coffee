'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedBadge } from '@/components/ui/animated-badge';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Coffee, Sparkles } from 'lucide-react';
import { fadeInContainer, scaleContainer, slideUpContainer } from '@/framer';

// Animation variants
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex pt-24 justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 dark:from-gray-800 dark:via-gray-900 dark:to-black opacity-80"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 text-3xl opacity-30"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
      >
        ☕
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-2xl opacity-20"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
      >
        🌌
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-xl opacity-25"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1], delay: 2 }}
      >
        ✨
      </motion.div>
      
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center"
        variants={fadeInContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div className="mb-3 2xl:mb-8 relative h-24 2xl:h-30 aspect-square mx-auto" variants={scaleContainer}>
            <Image
              src="/main-logo/dark-transparent.webp"
              alt="Astroneko Coffee"
              fill
              className="mx-auto mb-6 dark:hidden"
              priority
              />
            <Image
              src="/main-logo/light-transparent.webp"
              alt="Astroneko Coffee"
              fill
              className="mx-auto mb-6 hidden dark:block"
              priority
            />
          </motion.div>
          
          {/* Badge */}
          <motion.div variants={slideUpContainer} className="mb-3 2xl:mb-8">
            <AnimatedBadge 
              variant="secondary" 
              className="bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium rounded-full border-0"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Intergalactic Coffee Experience
            </AnimatedBadge>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            className="text-4xl md:text-7xl 2xl:text-8xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            variants={slideUpContainer}
          >
            Welcome to<br />
            <motion.span
              className="bg-gradient-to-r from-[#6B4E37] via-[#E1B168] to-[#2CA6A4] bg-clip-text text-transparent"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              Astroneko Coffee
            </motion.span>
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={slideUpContainer}
          >
            Where alien vibes meet perfect brews. Experience our cosmic café where every cup is crafted 
            with intergalactic precision and earthly warmth.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={slideUpContainer}
          >
            <AnimatedButton 
              asChild 
              size="lg"
              className="bg-[#6B4E37] hover:bg-[#5A3E2A] text-white px-8 py-4 text-lg min-w-[160px] rounded-lg"
            >
              <Link href="/menu">
                <Coffee className="w-5 h-5 mr-2" />
                Explore Menu
              </Link>
            </AnimatedButton>
            
            <AnimatedButton 
              asChild 
              variant="outline" 
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg min-w-[160px] rounded-lg backdrop-blur-sm"
            >
              <Link href="/order">
                <Sparkles className="w-5 h-5 mr-2" />
                Order Now
              </Link>
            </AnimatedButton>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Animated Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div 
          className="flex flex-col items-center hidden sm:flex"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Badge 
            variant="secondary" 
            className="bg-[#6B4E37] text-white border-0 px-4 py-2 rounded-full mb-2"
          >
            Scroll
          </Badge>
          <ChevronDown className="w-6 h-6 text-white animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}
