import { ComboBanner, SaleBanners } from '@/components/banners';
import { PromotionalSectionProps } from '@/schema';

export default function PromotionalSection({ onViewCombos, onViewPromos }: PromotionalSectionProps) {
  return (
    <>
      <ComboBanner onViewCombos={onViewCombos} />
      <SaleBanners onViewPromos={onViewPromos} />
    </>
  );
}
