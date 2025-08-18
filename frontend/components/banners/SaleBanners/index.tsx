'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cardFadeUp } from '@/framer';
import { SaleBannersProps } from '@/schema';
import { useSaleBanners } from './SaleBanners.hook';

export default function SaleBanners({ onViewPromos }: SaleBannersProps) {
  const { handleViewPromos } = useSaleBanners({ onViewPromos });

  return (
    <motion.div
      className="mb-6 flex flex-wrap md:flex-nowrap gap-4"
      variants={cardFadeUp}
    >
      {/* Neekogust Sale */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 rounded-lg shadow-lg flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">🎨 Neekogust Sale!</h3>
            <p className="text-sm opacity-90">Artist appreciation month - Special discounts on creative favorites!</p>
          </div>
          <Button
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white hover:text-purple-600"
            onClick={handleViewPromos}
          >
            View Promos
          </Button>
        </div>
      </div>
      
      {/* Welcome Back School Sale */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-4 rounded-lg shadow-lg flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">📚 Welcome Back School!</h3>
            <p className="text-sm opacity-90">Student specials - Perfect fuel for your academic journey!</p>
          </div>
          <Button
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
            onClick={handleViewPromos}
          >
            View Promos
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
