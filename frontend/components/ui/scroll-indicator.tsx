'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollIndicatorProps } from '@/schema/animatedComponents.schema';

export function ScrollIndicator({ targetId = "features", className = "" }: ScrollIndicatorProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.div 
      className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      onClick={scrollToSection}
    >
      <motion.div 
        className="flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Badge 
          variant="secondary" 
          className="bg-[#6B4E37] hover:bg-[#5A3E2A] text-white border-0 px-4 py-2 rounded-full mb-2 transition-colors duration-300"
        >
          Scroll
        </Badge>
        <ChevronDown className="w-6 h-6 text-white animate-bounce" />
      </motion.div>
    </motion.div>
  );
}
