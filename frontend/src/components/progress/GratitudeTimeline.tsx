import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface MentalHealthEntry {
  mood: string;
  stressLevel: number;
  energyLevel: number;
  triggers: string;
  gratitude: string;
  copingActivities: string[];
  sleepQuality: string;
  reflection: string;
  date: string;
}

interface GratitudeTimelineProps {
  entries: MentalHealthEntry[];
}

export function GratitudeTimeline({ entries }: GratitudeTimelineProps) {
  const gratitudeEntries = entries
    .filter(e => e.gratitude && e.gratitude.trim().length > 0)
    .slice(-6)
    .reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-lg mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-yellow-600" />
        <h3 className="text-2xl text-gray-900">Gratitude Highlights</h3>
      </div>
      <p className="text-gray-600 mb-6">The bright spots in your journey</p>
      
      {gratitudeEntries.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gratitudeEntries.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl mb-3">💛</div>
              <p className="text-gray-700 mb-3 italic">"{entry.gratitude}"</p>
              <div className="text-xs text-gray-500">
                {new Date(entry.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Start recording what you're grateful for to see them here</p>
        </div>
      )}
    </motion.div>
  );
}
