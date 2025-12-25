import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "MindMate has become my safe space. The breathing exercises help me manage my anxiety, and the journal feature lets me process my thoughts without judgment.",
    author: "Sarah M.",
    role: "Using MindMate for 6 months",
    gradient: "from-purple-100 to-pink-100"
  },
  {
    text: "I love how gentle and non-pressuring this app is. It meets me where I am and helps me take small steps toward better mental health every day.",
    author: "James K.",
    role: "Using MindMate for 4 months",
    gradient: "from-blue-100 to-cyan-100"
  },
  {
    text: "The insights feature showed me patterns I never noticed before. Understanding my triggers has been life-changing. MindMate truly cares about my wellbeing.",
    author: "Maya L.",
    role: "Using MindMate for 1 year",
    gradient: "from-green-100 to-teal-100"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
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
            Trusted by thousands
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from people on their mental wellness journey
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={`bg-gradient-to-br ${testimonial.gradient} rounded-3xl p-8 h-full shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-gray-600 opacity-50" />
                </div>

                {/* Testimonial text */}
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="border-t border-gray-300/50 pt-6">
                  <p className="text-gray-900 mb-1">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-600"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Therapist Recommended</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔒</span>
            <span>Privacy First</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span>4.9/5 Rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
