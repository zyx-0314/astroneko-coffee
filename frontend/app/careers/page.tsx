import { Button } from "@/components/ui/button";
import Link from "next/link";

// Static page - use SSR for SEO benefits
export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#2D5A4A] dark:text-[#2CA6A4] mb-8">
          Join Our Cosmic Crew
        </h1>
        
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Ready to embark on an intergalactic career adventure?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#6B4E37] dark:text-[#E1B168]">
              Why Join Astroneko?
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">🚀</span>
                <span>Be part of a revolutionary coffee experience</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⭐</span>
                <span>Work with cutting-edge technology</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🌟</span>
                <span>Competitive compensation and benefits</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☕</span>
                <span>Unlimited cosmic coffee</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🛸</span>
                <span>Flexible work arrangements</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#6B4E37] dark:text-[#E1B168]">
              Open Positions
            </h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h3 className="font-semibold">Cosmic Barista</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Full-time • Coming Soon</p>
              </div>
              <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h3 className="font-semibold">Space Kitchen Crew</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Part-time • Coming Soon</p>
              </div>
              <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h3 className="font-semibold">Mission Control Manager</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Full-time • Coming Soon</p>
              </div>
              <div>
                <h3 className="font-semibold">Technology Officer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Full-time • Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Ready to Apply?</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            We're still preparing for launch, but we'd love to hear from passionate individuals 
            who want to be part of something extraordinary.
          </p>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              📧 Send your resume and cover letter to: careers@astroneko.coffee
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Applications will be reviewed as we approach our launch date
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button asChild className="mr-4">
            <Link href="/contact">
              Contact Us
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
