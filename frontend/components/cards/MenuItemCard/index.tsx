"use client";

import { motion } from 'framer-motion';
import { Calendar, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { cardFadeUp, cardScale } from '@/framer';
import { GenerateMenuItemPlaceholder } from '@/lib/placeholder-image-utils';
import { MenuItemCardProps } from '@/schema';

import { useMenuItemCard } from './MenuItemCard.hook';

export default function MenuItemCard({
  item,
  index,
  viewMode,
  onAddToCart,
}: MenuItemCardProps) {
  const {
    getPromoTypeDisplay,
    handleAddToCart,
    getTags,
    getWeeklyBuys,
    getWeeklyReviews,
    getRating,
    getReviewsCount,
  } = useMenuItemCard({ item, onAddToCart });

  return (
    <motion.div
      variants={viewMode === "grid" ? cardScale : cardFadeUp}
      custom={index}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`h-full ${!item.inStock ? "opacity-60" : ""} ${
          viewMode === "list" ? "flex flex-row" : ""
        }`}
      >
        <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
          <div className="relative">
            <Image
              src={
                item.image ? item.image : GenerateMenuItemPlaceholder(item.type)
              }
              alt={item.name}
              width={300}
              height={200}
              className={`w-full object-cover ${
                viewMode === "grid"
                  ? "h-48 rounded-t-lg"
                  : "h-full rounded-l-lg"
              }`}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            {!item.inStock && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-t-lg">
                <span className="font-semibold text-white">Out of Stock</span>
              </div>
            )}
            <div className="top-2 right-2 absolute flex flex-col gap-1">
              {getPromoTypeDisplay()}
              <div className="flex flex-col items-end">
                {item.isOnSale && item.originalPrice && (
                  <span className="text-gray-500 text-xs line-through">
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
          <CardHeader className={viewMode === "list" ? "pb-2" : ""}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="mb-1 text-[#6B4E37] dark:text-[#E1B168]">
                  {item.name}
                </CardTitle>
                <CardDescription className="mb-2 text-sm">
                  {item.description}
                </CardDescription>
                <div className="flex flex-wrap items-center gap-2">
                  {item.promoType?.toLowerCase() === "neekogust" && (
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs">
                      NEEKOGUST SPECIAL
                    </Badge>
                  )}
                  {(item.promoType?.toLowerCase() === "welcome-back-school" ||
                    item.promoType?.toLowerCase() ===
                      "welcome_back_school") && (
                    <Badge className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-xs">
                      SCHOOL SPECIAL
                    </Badge>
                  )}
                  {item.isOnSale && item.originalPrice && !item.promoType && (
                    <Badge variant="destructive" className="bg-red-500 text-xs">
                      SALE
                    </Badge>
                  )}
                  {item.isCombo && (
                    <Badge className="bg-[#2CA6A4] text-white text-xs">
                      COMBO DEAL
                    </Badge>
                  )}
                  {!item.inStock && (
                    <Badge variant="outline" className="text-gray-500 text-xs">
                      OUT OF STOCK
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 mb-1 text-[#E1B168]">
                  <Star className="fill-current w-4 h-4" />
                  <span className="font-medium text-sm">
                    {getRating().toFixed(1)}
                  </span>
                  <span className="text-gray-500 text-xs">
                    ({getReviewsCount()})
                  </span>
                </div>
                <div className="text-right">
                  {item.isOnSale && item.originalPrice && (
                    <div className="text-gray-500 text-xs line-through">
                      ${item.originalPrice.toFixed(2)}
                    </div>
                  )}
                  <div className="font-bold text-[#6B4E37] dark:text-[#E1B168] text-lg">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className={viewMode === "list" ? "py-2" : ""}>
            <div className="flex flex-wrap gap-1 mb-3">
              {getTags().map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="gap-2 grid grid-cols-2 w-full text-gray-500 text-xs">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {getWeeklyBuys()} weekly buys
              </div>
              <div className="flex justify-end items-center gap-1">
                <Calendar className="w-3 h-3" />
                {getWeeklyReviews()} reviews/week
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="bg-[#2CA6A4] hover:bg-[#2CA6A4]/90 w-full text-white cursor-pointer"
              disabled={!item.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 w-4 h-4" />
              {item.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
