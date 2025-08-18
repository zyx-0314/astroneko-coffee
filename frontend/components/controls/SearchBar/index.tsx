'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SearchBarProps } from '@/schema';
import { useSearchBar } from './SearchBar.hook';

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search menu items, tags, or descriptions..." 
}: SearchBarProps) {
  const { handleInputChange } = useSearchBar({ onChange });

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className="pl-10"
      />
    </div>
  );
}
