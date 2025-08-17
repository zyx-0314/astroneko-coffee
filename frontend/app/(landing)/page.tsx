import {
  HeroSection,
  FeatureSection,
  FeaturesListSection,
  BenefitsSection,
  HowItWorksSection,
  ServicesSection,
  StatsSection,
  TestimonialSection,
  CTASection,
  GallerySection,
} from './sections';

// Homepage with static content - use SSR for SEO and performance
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection />
      <FeatureSection />
      <FeaturesListSection />
      <BenefitsSection />
      <HowItWorksSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialSection />
      <CTASection />
      <GallerySection />
    </main>
  );
}
