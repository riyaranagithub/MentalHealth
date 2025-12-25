import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

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

interface TriggerPatternsProps {
  entries: MentalHealthEntry[];
}

export function TriggerPatterns({ entries }: TriggerPatternsProps) {
  // Extract common trigger keywords
  const extractTriggers = () => {
    const triggerWords: { [key: string]: number } = {};
    
    entries.forEach(entry => {
      if (entry.triggers && entry.triggers.trim().length > 0) {
        // Simple keyword extraction (in production, use NLP)
        const words = entry.triggers.toLowerCase()
          .split(/\s+/)
          .filter(word => word.length > 4); // Filter short words
        
        words.forEach(word => {
          // Clean word
          const cleaned = word.replace(/[^a-z]/g, '');
          if (cleaned.length > 4) {
            triggerWords[cleaned] = (triggerWords[cleaned] || 0) + 1;
          }
        });
      }
    });

    return Object.entries(triggerWords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([trigger, count]) => ({ trigger, count }));
  };

  const commonTriggers = extractTriggers();

  // Get recent triggers
  const recentTriggers = entries
    .filter(e => e.triggers && e.triggers.trim().length > 0)
    .slice(-5)
    .reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-orange-500" />
        <h3 className="text-xl text-gray-900">Trigger Patterns</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">Common themes in difficult moments</p>
      
      {commonTriggers.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm text-gray-700 mb-3">Common Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {commonTriggers.map((item, idx) => (
              <div
                key={idx}
                className="px-3 py-2 bg-orange-50 text-orange-700 rounded-full text-sm flex items-center gap-2"
              >
                <span className="capitalize">{item.trigger}</span>
                <span className="text-xs bg-orange-200 px-2 py-0.5 rounded-full">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {recentTriggers.length > 0 ? (
        <div>
          <h4 className="text-sm text-gray-700 mb-3">Recent Triggers</h4>
          <div className="space-y-3">
            {recentTriggers.map((entry, idx) => (
              <div
                key={idx}
                className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100"
              >
                <div className="text-sm text-gray-700 mb-1">{entry.triggers}</div>
                <div className="text-xs text-gray-500">
                  {new Date(entry.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p>No triggers recorded</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <p className="text-sm text-gray-700">
          💡 Identifying patterns helps you prepare and develop coping strategies for similar situations.
        </p>
      </div>
    </motion.div>
  );
}
