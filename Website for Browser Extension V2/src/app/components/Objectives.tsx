import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { Card } from './ui/card';

const objectives = [
  {
    title: 'Product Requirements & Success Criteria',
    description: 'Defining user-focused scoring criteria that make website safety accessible and understandable for everyone.',
  },
  {
    title: 'UI/UX Design & Wireframes',
    description: 'Creating intuitive, visual score indicators and explanation dialogs that anyone can understand at a glance.',
  },
  {
    title: 'AI Risk Scoring Model Development',
    description: 'Building a unified, data-driven model that generalizes across websites using advanced machine learning.',
  },
  {
    title: 'Model Validation & Optimization',
    description: 'Ensuring transparency and reliability through rigorous testing against known safe and malicious sites.',
  },
  {
    title: 'Frontend Integration',
    description: 'Seamlessly connecting the AI backend to the extension UI for real-time risk assessment.',
  },
  {
    title: 'Advanced Features Development',
    description: 'Adding crowdsourced feedback, history logging, and continuous model updates for enhanced accuracy.',
  },
  {
    title: 'Testing, Deployment & Improvement',
    description: 'Comprehensive testing and iterative updates to ensure the system evolves with emerging threats.',
  },
];

export function Objectives() {
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
          <h2 className="mb-4 text-4xl font-bold text-gray-900">Our Development Roadmap</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A systematic approach to building a comprehensive security solution that addresses existing gaps in website risk assessment.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {objectives.map((objective, index) => (
            <motion.div
              key={objective.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-600 bg-white">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="size-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-green-600">Objective {index + 1}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{objective.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{objective.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}