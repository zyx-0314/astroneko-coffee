'use client';

import TestimonialCard from '@/components/cards/TestimonialCard';
import { AnimatedSection } from '@/components/ui/animated-section';

export default function TestimonialSection() {
  return (
    <AnimatedSection className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <TestimonialCard
          quote="The cosmic atmosphere is truly out of this world! Astroneko Coffee has become my daily escape from the ordinary. Every cup is perfectly crafted, and the intergalactic vibes make it a truly unique coffee experience."
          author="Sarah Mars"
          role="Space Explorer & Coffee Enthusiast"
          initials="SM"
          rating={3}
          delay={0.2}
        />
      </div>
    </AnimatedSection>
  );
}
