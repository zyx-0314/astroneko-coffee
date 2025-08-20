import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { MenuItemCard } from '@/components/cards';
import { fadeInContainer, cardFadeUp } from '@/framer';
import { MenuDisplaySectionProps } from '@/schema';

const MenuDisplaySection = memo(function MenuDisplaySection({
  filteredItems,
  isLoading,
  viewMode,
  searchQuery
}: MenuDisplaySectionProps) {
  // Memoize the grid layout class to prevent unnecessary re-renders
  const gridLayoutClass = useMemo(() => {
    return viewMode === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
      : 'space-y-4';
  }, [viewMode]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <motion.div
        className="text-center py-16"
        variants={cardFadeUp}
      >
        <div className="text-muted-foreground text-lg">
          {searchQuery
            ? `No items found matching "${searchQuery}"`
            : 'No menu items available'}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={gridLayoutClass}
      variants={fadeInContainer}
      initial="hidden"
      animate="visible"
    >
      {filteredItems.map((item, index) => (
        <motion.div
          key={`${item.id}-${item.name}-${index}`}
          variants={cardFadeUp}
          // Add will-change for better performance during animations
          style={{ willChange: 'transform' }}
        >
          <MenuItemCard
            item={item}
            index={index}
            viewMode={viewMode}
          />
        </motion.div>
      ))}
    </motion.div>
  );
});

export default MenuDisplaySection;
