import { UseSaleBannersProps } from '@/schema';

export const useSaleBanners = ({ onViewPromos }: UseSaleBannersProps) => {
  const handleViewPromos = () => {
    onViewPromos();
  };

  return {
    handleViewPromos
  };
};
