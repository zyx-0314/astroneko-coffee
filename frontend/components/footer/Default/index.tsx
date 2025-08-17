import Link from 'next/link';
import Image from 'next/image';

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Image
                src="/main-logo/light-transparent.webp"
                alt="Astroneko Coffee"
                width={32}
                height={32}
                className="mr-3"
              />
              <span className="text-xl font-bold">Astroneko Coffee</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your intergalactic café experience awaits. Where alien vibes meet perfect brews, 
              creating memories that are truly out of this world.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/menu" className="text-gray-300 hover:text-white transition-colors">Menu</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/order" className="text-gray-300 hover:text-white transition-colors">Order Online</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><span className="text-gray-300">Dine-In Experience</span></li>
              <li><span className="text-gray-300">Takeaway Service</span></li>
              <li><span className="text-gray-300">Special Events</span></li>
              <li><span className="text-gray-300">Catering</span></li>
              <li><span className="text-gray-300">Corporate Meetings</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              <li><Link href="/mood-board" className="text-gray-300 hover:text-white transition-colors">Design System</Link></li>
              <li><Link href="/test/crud-expose" className="text-gray-300 hover:text-white transition-colors">API Testing</Link></li>
              <li><a href="http://localhost:8083/swagger-ui.html" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">API Docs</a></li>
              <li><span className="text-gray-300">Social Media</span></li>
              <li><span className="text-gray-300">Newsletter</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Astroneko Coffee. All rights reserved. Built with cosmic care and stellar code.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
