import { motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowRight, Search, Download, Globe, Mail, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';

export function Hero() {
  const [url, setUrl] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (url) {
      // Extract domain from URL
      let domain = url;
      try {
        // Remove protocol if present
        domain = domain.replace(/^https?:\/\//, '');
        // Remove www. if present
        domain = domain.replace(/^www\./, '');
        // Remove trailing slash and path
        domain = domain.split('/')[0];
      } catch (e) {
        // Use as-is if parsing fails
      }
      navigate(`/insights/${domain}`);
    }
  };

  // Auto-rotate slides every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-50 pt-20 pb-16">
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div>
                  <h1 className="text-5xl font-bold leading-tight mb-6 text-gray-900">
                    Know the risks.
                    <br />
                    <span className="text-green-600">Browse with confidence.</span>
                  </h1>
                  <p className="text-gray-600 mb-8 text-lg">
                    Check if you websites are safe
                  </p>

                  {/* Add to Browser Button */}
                  <Button 
                    className="bg-green-600 text-white hover:bg-green-700 rounded-full px-8 h-12 mb-6"
                  >
                    Add to browser
                  </Button>

                  {/* URL Search Bar */}
                  <div className="relative">
                    <Input 
                      type="text" 
                      placeholder="Check your sites" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                      className="w-full h-14 pl-6 pr-14 rounded-full bg-green-600 border-0 text-white placeholder:text-white/80 text-base"
                    />
                    <button 
                      onClick={handleAnalyze}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors"
                    >
                      <Search className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758874573279-2709f2ce5d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3b3JraW5nJTIwbGFwdG9wJTIwYnJvd3Npbmd8ZW58MXx8fHwxNzcxMDMwODk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Person browsing safely on laptop"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentSlide === 1 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div>
                  <h1 className="text-5xl font-bold leading-tight mb-6 text-gray-900">
                    How to use
                    <br />
                    <span className="text-green-600">RiskLens Extension</span>
                  </h1>
                  <p className="text-gray-600 mb-8 text-lg">
                    Get started in 3 simple steps
                  </p>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Install the Extension</h3>
                        <p className="text-gray-600">Download RiskLens from your browser's extension store</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Browse Normally</h3>
                        <p className="text-gray-600">Visit any website and RiskLens will automatically analyze it</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">View Security Score</h3>
                        <p className="text-gray-600">Click the extension icon to see detailed risk analysis and insights</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      className="bg-green-600 text-white hover:bg-green-700 rounded-full px-8 h-12 mt-8"
                    >
                      <Download className="mr-2 size-4" />
                      Download Now
                    </Button>
                    
                    <Link to="/how-it-works">
                      <Button 
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 rounded-full px-8 h-12 mt-8"
                      >
                        Learn More
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93c2VyJTIwZXh0ZW5zaW9uJTIwY2hyb21lfGVufDF8fHx8MTc3MTA0Mzk5OXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Browser extension interface"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentSlide === 2 && (
            <motion.div
              key="slide-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div>
                  <h1 className="text-5xl font-bold leading-tight mb-6 text-gray-900">
                    Connect with us
                    <br />
                    <span className="text-green-600">We're here to help</span>
                  </h1>
                  <p className="text-gray-600 mb-8 text-lg">
                    Have questions or feedback? Get in touch with our team
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <Mail className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email Us</h3>
                        <p className="text-gray-600">support@risklens.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <MessageCircle className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Live Chat</h3>
                        <p className="text-gray-600">Available 24/7 for support</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <Globe className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Community Forum</h3>
                        <p className="text-gray-600">Join our user community</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="bg-green-600 text-white hover:bg-green-700 rounded-full px-8 h-12"
                  >
                    Contact Support
                  </Button>
                </div>

                {/* Right Image */}
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjB0ZWFtfGVufDF8fHx8MTc3MTA0Mzk5OXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Customer support team"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12">
          <button
            onClick={() => setCurrentSlide(0)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentSlide === 0 ? 'bg-green-600' : 'bg-gray-300'
            }`}
            aria-label="Go to slide 1"
          />
          <button
            onClick={() => setCurrentSlide(1)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentSlide === 1 ? 'bg-green-600' : 'bg-gray-300'
            }`}
            aria-label="Go to slide 2"
          />
          <button
            onClick={() => setCurrentSlide(2)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentSlide === 2 ? 'bg-green-600' : 'bg-gray-300'
            }`}
            aria-label="Go to slide 3"
          />
        </div>
      </div>
    </section>
  );
}