import { motion } from 'motion/react';
import { BookHeart, Sparkles, Brain, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: BookHeart,
    title: 'Mood & Journal Tracking',
    description: 'Monitor your emotional patterns and reflect on your day with guided journaling prompts.',
    color: 'from-pink-100 to-rose-100',
    iconColor: 'text-pink-600'
  },
  {
    icon: Sparkles,
    title: 'Coping Tools & Exercises',
    description: 'Access breathing exercises, grounding techniques, and evidence-based coping strategies.',
    color: 'from-purple-100 to-blue-100',
    iconColor: 'text-purple-600'
  },
  {
    icon: Brain,
    title: 'Mindfulness & Meditation',
    description: 'Practice guided meditations and mindfulness exercises designed to bring you peace.',
    color: 'from-blue-100 to-cyan-100',
    iconColor: 'text-blue-600'
  },
  {
    icon: TrendingUp,
    title: 'Insights & Analytics',
    description: 'Understand your mental health journey with personalized insights and progress tracking.',
    color: 'from-green-100 to-teal-100',
    iconColor: 'text-green-600'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
            Everything you need to thrive
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            MindMate provides tools and resources to support your mental wellness journey
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
