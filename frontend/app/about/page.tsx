import { ContentCard, FeatureCard, InfoCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Static page - use SSR for SEO benefits
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#2D5A4A] dark:text-[#2CA6A4] mb-8">
          About Astroneko Coffee
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <InfoCard title="Our Mission">
            <p>
              Welcome to Astroneko Coffee, where alien vibes meet perfect brews. We're creating an intergalactic café experience that blends the comfort of earth's finest coffee traditions with the wonder of cosmic exploration.
            </p>
          </InfoCard>
          
          <InfoCard title="Our Vision">
            <p>
              We envision a space where every sip takes you on a journey through the cosmos, where technology enhances the human connection, and where every visit feels like discovering a new world.
            </p>
          </InfoCard>
        </div>

        <ContentCard title="What Makes Us Special" className="mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🚀"
              title="Space-Age Technology"
              description="QR menus, online ordering, and real-time updates for a seamless experience"
            />
            <FeatureCard
              icon="☕"
              title="Cosmic Brews"
              description="Carefully crafted coffee blends inspired by the mysteries of the universe"
            />
            <FeatureCard
              icon="🌟"
              title="Stellar Service"
              description="Real-time order tracking and personalized customer experiences"
            />
          </div>
        </ContentCard>

        <div className="text-center">
          <Button asChild className="mr-4">
            <Link href="/order">
              Start Your Journey
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
