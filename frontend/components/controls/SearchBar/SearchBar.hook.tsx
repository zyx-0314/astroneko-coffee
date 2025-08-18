import { ChangeEvent } from 'react';
import { UseSearchBarProps } from '@/schema';

export const useSearchBar = ({ onChange }: UseSearchBarProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return {
    handleInputChange
  };
};
