import { motion } from 'framer-motion';
import { MenuItemCard } from '@/components/cards';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { RecommendationDisplaySectionProps } from '@/schema';

export default function RecommendationDisplaySection({ items, onAddToCart }: RecommendationDisplaySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recommended for You</h2>
        <p className="text-muted-foreground">
          Handpicked selections based on your taste preferences
        </p>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-3 sm:space-x-4 pb-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-48 sm:w-56 md:w-64 flex-shrink-0"
            >
              <div className="h-full">
                <MenuItemCard
                  item={item}
                  index={index}
                  viewMode="grid"
                  onAddToCart={onAddToCart}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.section>
  );
}
