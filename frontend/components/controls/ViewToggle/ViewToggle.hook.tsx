import { UseViewToggleProps } from '@/schema';

export const useViewToggle = ({ onViewModeChange }: UseViewToggleProps) => {
  const handleGridClick = () => {
    onViewModeChange('grid');
  };

  const handleListClick = () => {
    onViewModeChange('list');
  };

  return {
    handleGridClick,
    handleListClick
  };
};
