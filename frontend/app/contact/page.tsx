import { ContentCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Static contact form page - use SSR for SEO
export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#2D5A4A] dark:text-[#2CA6A4] mb-8">
          Contact Us
        </h1>
        
        <ContentCard title="Get In Touch" className="mb-8">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-[#6B4E37] dark:text-[#E1B168]">Location</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Coming to a galaxy near you!<br />
                Our first earthly location launching soon.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-[#6B4E37] dark:text-[#E1B168]">Hours</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Space operates 24/7, and so will we!<br />
                <span className="text-sm">(Exact hours to be announced)</span>
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-[#6B4E37] dark:text-[#E1B168]">Mission Control</h3>
              <p className="text-gray-600 dark:text-gray-400">
                📧 hello@astroneko.coffee<br />
                📱 Cosmic communications coming soon<br />
                🌐 Follow our journey on social media
              </p>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="Stay Updated" className="mb-8">
          <div className="text-center">
            <p className="mb-6">
              Be the first to know when we launch our cosmic coffee experience!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              Newsletter signup coming soon
            </p>
          </div>
        </ContentCard>

        <div className="text-center">
          <Button asChild className="mr-4">
            <Link href="/">
              Return Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">
              About Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
