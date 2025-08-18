'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cardFadeUp } from '@/framer';
import { ComboBannerProps } from '@/schema';
import { useComboBanner } from './ComboBanner.hook';

export default function ComboBanner({ onViewCombos }: ComboBannerProps) {
  const { handleViewCombos } = useComboBanner({ onViewCombos });

  return (
    <motion.div
      className="mb-6"
      variants={cardFadeUp}
    >
      <div className="bg-gradient-to-r from-[#2CA6A4] to-[#E1B168] text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">🚀 Cosmic Combo Deals!</h3>
            <p className="text-sm opacity-90">Save up to 20% on our special combination offers. Limited time only!</p>
          </div>
          <Button
            variant="outline"
            className="border-white text-white bg-transparent hover:text-[#2CA6A4]"
            onClick={handleViewCombos}
          >
            View Combos
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
