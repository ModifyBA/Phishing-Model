import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Link } from 'react-router';

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1639503547276-90230c4a4198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGllbGQlMjBzZWN1cml0eSUyMHByb3RlY3Rpb24lMjBkaWdpdGFsfGVufDF8fHx8MTc3MTAzMDkwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Security shield protection"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Explore the internet worry free.
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              RiskLens is an AI-powered browser extension that provides real-time risk scoring and transparency regarding the privacy and security risks of websites you visit. Our intelligent model analyzes multiple factors including data breach history, tracker presence, and security practices to generate accurate scores instantly.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Unlike traditional security tools, our extension collects the URL you're actively visiting and immediately evaluates it through our classification system. This proactive approach aims to provide faster alerts about unsafe websites, reducing exposure to harmful online environments and minimizing the risk of data theft.
            </p>
            <Link to="/how-it-works">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-8 h-12 text-base">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}