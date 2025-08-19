"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { RecoCarouselProps } from '@/schema/components.schema';

export function RecoCarousel({ items, className }: RecoCarouselProps) {
  return (
    <div className={className}>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-3 sm:space-x-4 pb-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="w-48 sm:w-56 md:w-64 flex-shrink-0 relative overflow-hidden">
                {/* Promo Badges based on actual item properties */}
                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 flex flex-col gap-1">
                  {item.promoType === 'neekogust' && (
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0 text-xs">
                      NEEKOGUST
                    </Badge>
                  )}
                  {item.promoType === 'welcome-back-school' && (
                    <Badge className="bg-gradient-to-r from-blue-600 to-green-500 text-white border-0 text-xs">
                      SCHOOL SPECIAL
                    </Badge>
                  )}
                  {item.isOnSale && item.originalPrice && !item.promoType && (
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-400 text-white border-0 text-xs">
                      PROMO
                    </Badge>
                  )}
                  {item.isCombo && (
                    <Badge className="bg-[#2CA6A4] text-white border-0 text-xs">
                      COMBO
                    </Badge>
                  )}
                </div>
                
                <div className="relative h-24 sm:h-28 md:h-32">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className="font-bold text-sm sm:text-lg">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs sm:text-sm text-muted-foreground line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{item.rating}</span>
                      <span className="text-muted-foreground hidden sm:inline">
                        ({item.reviewsCount})
                      </span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                    {item.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-3 sm:p-4 pt-0">
                  <Button 
                    className="w-full text-xs sm:text-sm" 
                    size="sm"
                    disabled={!item.inStock}
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
