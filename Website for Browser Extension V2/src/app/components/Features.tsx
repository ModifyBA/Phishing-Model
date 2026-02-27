import { motion } from 'motion/react';
import { Shield, Users, Briefcase } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: Users,
    title: 'Everyday Internet Users',
    description: 'Perfect for anyone who wants to browse safely without technical knowledge. Get instant alerts about risky websites before you click.',
  },
  {
    icon: Briefcase,
    title: 'Business Professionals',
    description: 'Protect sensitive company data while browsing. Our AI analyzes security practices to prevent data breaches and phishing attacks.',
  },
  {
    icon: Shield,
    title: 'Privacy-Conscious Users',
    description: 'Understand which websites track you and compromise your privacy. Make informed decisions about where you share your data.',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900">Manage your browsing safety</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Who is RiskLens suitable for?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 text-center border border-gray-200 rounded-xl bg-white">
                <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <feature.icon className="size-10 text-green-600" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}