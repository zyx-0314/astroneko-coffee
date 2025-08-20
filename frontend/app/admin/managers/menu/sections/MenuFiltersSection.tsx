'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface MenuFiltersSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  stockFilter: string;
  onStockFilterChange: (value: string) => void;
  sortBy: string;
  sortDir: 'asc' | 'desc';
  onSortChange: (sortBy: string, sortDir: 'asc' | 'desc') => void;
}

export default function MenuFiltersSection({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  stockFilter,
  onStockFilterChange,
  sortBy,
  sortDir,
  onSortChange,
}: MenuFiltersSectionProps) {
  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('-');
    onSortChange(field, direction as 'asc' | 'desc');
  };

  return (
    <Card className="bg-white dark:bg-gray-800 mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={onTypeFilterChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="COFFEE">Coffee</SelectItem>
                <SelectItem value="PASTRIES">Pastries</SelectItem>
                <SelectItem value="DRINKS">Drinks</SelectItem>
                <SelectItem value="BUNDLES">Bundles</SelectItem>
                <SelectItem value="VEGETARIAN">Vegetarian</SelectItem>
                <SelectItem value="INSTANT">Instant</SelectItem>
                <SelectItem value="COMBO">Combo</SelectItem>
              </SelectContent>
            </Select>

            <Select value={stockFilter} onValueChange={onStockFilterChange}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Select value={`${sortBy}-${sortDir}`} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name A-Z</SelectItem>
                <SelectItem value="name-desc">Name Z-A</SelectItem>
                <SelectItem value="price-asc">Price Low-High</SelectItem>
                <SelectItem value="price-desc">Price High-Low</SelectItem>
                <SelectItem value="rating-desc">Rating High-Low</SelectItem>
                <SelectItem value="createdAt-desc">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
