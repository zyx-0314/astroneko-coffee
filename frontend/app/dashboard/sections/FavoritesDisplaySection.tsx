import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { MenuItemCard } from '@/components/cards';
import { FavoritesDisplaySectionProps } from '@/schema';

export default function FavoritesDisplaySection({ items, onQuickOrder }: FavoritesDisplaySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Your Top 3 Favorites
        </h2>
        <p className="text-muted-foreground">Your most frequently ordered items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <MenuItemCard
              item={item}
              index={index}
              viewMode="grid"
              onAddToCart={onQuickOrder}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
