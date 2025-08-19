import React from 'react';
import { motion } from 'framer-motion';

export default function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Mood Board Inspired Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FA] via-[#D4EDEC] to-[#E1B168]/20 dark:from-[#212529] dark:via-[#343A40] dark:to-[#6B4E37]/20" />
      
      {/* Animated Orbs with Brand Colors */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(107, 78, 55, 0.15)' }} // #6B4E37 Shingle Fawn
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(44, 166, 164, 0.15)' }} // #2CA6A4 Jungle Green
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(225, 177, 104, 0.1)' }} // #E1B168 Equator
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Floating Coffee Bean Elements */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 rounded-full"
        style={{ backgroundColor: 'rgba(107, 78, 55, 0.4)' }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-20 w-3 h-3 rounded-full"
        style={{ backgroundColor: 'rgba(44, 166, 164, 0.5)' }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 0.9, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* More scattered elements */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full"
        style={{ backgroundColor: 'rgba(225, 177, 104, 0.6)' }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5
        }}
      />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5 dark:opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(107, 78, 55, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(107, 78, 55, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}
