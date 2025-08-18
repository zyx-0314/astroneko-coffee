import { UseComboBannerProps } from '@/schema';

export const useComboBanner = ({ onViewCombos }: UseComboBannerProps) => {
  const handleViewCombos = () => {
    onViewCombos();
  };

  return {
    handleViewCombos
  };
};
