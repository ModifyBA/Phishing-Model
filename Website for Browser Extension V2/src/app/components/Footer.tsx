import { Send, Instagram, Twitter, Youtube, Dribbble } from 'lucide-react';
import { useState } from 'react';
import logoImage from 'figma:asset/5359972e9e4260f6bcd141dfc6d216542cc5799c.png';

export function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#2c3e4f] text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Logo and Copyright */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={logoImage} alt="RiskLens Logo" className="h-10 w-auto" />
              <span className="text-xl font-semibold text-white">RiskLens</span>
            </div>
            
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">Copyright</div>
              <div className="text-sm text-gray-300">Copyright © 2025</div>
              <div className="text-sm text-gray-300">All rights reserved</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-3">Social Links</div>
              <div className="flex gap-3">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Dribbble className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div></div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Contact us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Testimonials</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Help center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms of service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Legal</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Status</a></li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base">Stay up to date</h4>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 pr-12 bg-[#3d4f5f] text-white text-sm rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:text-gray-400"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-green-400 transition-colors">
                <Send className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}