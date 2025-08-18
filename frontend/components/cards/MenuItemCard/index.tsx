'use client';

import { motion } from 'framer-motion';
import { Calendar, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MenuItemCardProps } from '@/schema';
import { cardFadeUp, cardScale } from '@/framer';
import { useMenuItemCard } from './MenuItemCard.hook';

export default function MenuItemCard({ item, index, viewMode, onAddToCart }: MenuItemCardProps) {
  const { getPromoTypeDisplay, handleAddToCart } = useMenuItemCard({ item, onAddToCart });

  return (
    <motion.div
      variants={viewMode === 'grid' ? cardScale : cardFadeUp}
      custom={index}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`h-full ${!item.inStock ? 'opacity-60' : ''} ${viewMode === 'list' ? 'flex flex-row' : ''}`}>
        <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
          <div className="relative">
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={200}
              className={`w-full object-cover ${viewMode === 'grid' ? 'h-48 rounded-t-lg' : 'h-full rounded-l-lg'}`}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            {!item.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                <span className="text-white font-semibold">Out of Stock</span>
              </div>
            )}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {getPromoTypeDisplay()}
              <div className="flex flex-col items-end">
                {item.isOnSale && item.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
                <Badge className="bg-[#E1B168] text-[#6B4E37]">
                  ${item.price.toFixed(2)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <CardHeader className={viewMode === 'list' ? 'pb-2' : ''}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-[#6B4E37] dark:text-[#E1B168] mb-1">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-sm mb-2">
                  {item.description}
                </CardDescription>
                <div className="flex items-center gap-2 flex-wrap">
                  {item.promoType === 'neekogust' && (
                    <Badge className="text-xs bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                      NEEKOGUST SPECIAL
                    </Badge>
                  )}
                  {item.promoType === 'welcome-back-school' && (
                    <Badge className="text-xs bg-gradient-to-r from-blue-600 to-green-500 text-white">
                      SCHOOL SPECIAL
                    </Badge>
                  )}
                  {item.isOnSale && item.originalPrice && !item.promoType && (
                    <Badge variant="destructive" className="text-xs bg-red-500">
                      SALE
                    </Badge>
                  )}
                  {item.isCombo && (
                    <Badge className="text-xs bg-[#2CA6A4] text-white">
                      COMBO DEAL
                    </Badge>
                  )}
                  {!item.inStock && (
                    <Badge variant="outline" className="text-xs text-gray-500">
                      OUT OF STOCK
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-[#E1B168] mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-xs text-gray-500">({item.reviewsCount})</span>
                </div>
                <div className="text-right">
                  {item.isOnSale && item.originalPrice && (
                    <div className="text-xs text-gray-500 line-through">
                      ${item.originalPrice.toFixed(2)}
                    </div>
                  )}
                  <div className="text-lg font-bold text-[#6B4E37] dark:text-[#E1B168]">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className={viewMode === 'list' ? 'py-2' : ''}>
            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 w-full">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {item.weeklyBuys} weekly buys
              </div>
              <div className="flex items-center gap-1 justify-end">
                <Calendar className="w-3 h-3" />
                {item.weeklyReviews} reviews/week
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full bg-[#2CA6A4] hover:bg-[#2CA6A4]/90 text-white cursor-pointer"
              disabled={!item.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {item.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
