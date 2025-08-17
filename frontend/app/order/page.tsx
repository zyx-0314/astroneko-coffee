import { PlaceholderCard } from "@/components/cards";

// Order form page - use CSR for interactive forms and user state
export default function OrderPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#2D5A4A] dark:text-[#2CA6A4] mb-8">
          Place Your Order
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Ready to experience the cosmic flavors of Astroneko Coffee?
        </p>
        <PlaceholderCard
          title="Online Ordering Coming Soon!"
          description="We're building an amazing online ordering system. Soon you'll be able to order your favorite cosmic brews with just a few clicks."
          primaryButtonText="Return Home"
          primaryButtonHref="/"
          secondaryButtonText="View Menu"
          secondaryButtonHref="/menu"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Features in development:
            </p>
            <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2">
              <li>• QR Menu scanning</li>
              <li>• Online ordering and payment</li>
              <li>• Table reservations</li>
              <li>• Order progress tracking</li>
              <li>• Loyalty rewards</li>
            </ul>
          </div>
        </PlaceholderCard>
      </div>
    </div>
  );
}
