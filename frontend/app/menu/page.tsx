import { PlaceholderCard } from "@/components/cards";

// Static placeholder page - use SSR
export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#2D5A4A] dark:text-[#2CA6A4] mb-8">
          Our Menu
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Discover our intergalactic coffee creations and space-age treats.
        </p>
        <PlaceholderCard
          title="Coming Soon!"
          description="We're crafting an amazing menu experience. Check back soon for our full selection of cosmic coffees and stellar snacks."
          primaryButtonText="Return Home"
          primaryButtonHref="/"
        />
      </div>
    </div>
  );
}
