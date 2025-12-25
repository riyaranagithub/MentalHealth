import { motion } from 'motion/react';
import { Lightbulb, Moon, Heart, TrendingUp } from 'lucide-react';

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

interface InsightsCardsProps {
  entries: MentalHealthEntry[];
}

export function InsightsCards({ entries }: InsightsCardsProps) {
  // Calculate insights
  const mostCommonMood = () => {
    const moodCounts: { [key: string]: number } = {};
    entries.forEach(e => {
      moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
    });
    return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  };

  const sleepQualityInsight = () => {
    const goodSleep = entries.filter(e => e.sleepQuality === 'good' || e.sleepQuality === 'great').length;
    const percentage = Math.round((goodSleep / entries.length) * 100);
    return { percentage, quality: percentage > 70 ? 'excellent' : percentage > 50 ? 'good' : 'needs attention' };
  };

  const gratitudeStreak = () => {
    let streak = 0;
    for (let i = entries.length - 1; i >= 0; i--) {
      if (entries[i].gratitude && entries[i].gratitude.trim().length > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const energyTrend = () => {
    if (entries.length < 2) return 'stable';
    const recent = entries.slice(-7);
    const older = entries.slice(-14, -7);
    if (older.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((sum, e) => sum + e.energyLevel, 0) / recent.length;
    const olderAvg = older.reduce((sum, e) => sum + e.energyLevel, 0) / older.length;
    
    const diff = recentAvg - olderAvg;
    if (diff > 0.5) return 'increasing';
    if (diff < -0.5) return 'decreasing';
    return 'stable';
  };

  const sleep = sleepQualityInsight();
  const streak = gratitudeStreak();
  const energy = energyTrend();

  const insights = [
    {
      icon: Lightbulb,
      title: 'Most Common Mood',
      value: mostCommonMood(),
      description: 'Understanding your patterns',
      color: 'from-yellow-100 to-orange-100',
      iconColor: 'text-yellow-600'
    },
    {
      icon: Moon,
      title: 'Sleep Quality',
      value: `${sleep.percentage}%`,
      description: `${sleep.quality} sleep pattern`,
      color: 'from-blue-100 to-indigo-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Gratitude Streak',
      value: `${streak} days`,
      description: 'Keep it going!',
      color: 'from-pink-100 to-rose-100',
      iconColor: 'text-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'Energy Trend',
      value: energy,
      description: 'Your energy levels',
      color: 'from-green-100 to-teal-100',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl mb-6 text-gray-900">Key Insights</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`bg-gradient-to-br ${insight.color} rounded-2xl p-6 shadow-lg`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center`}>
                <insight.icon className={`w-6 h-6 ${insight.iconColor}`} />
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-2">{insight.title}</h3>
            <div className="text-2xl mb-1 text-gray-900 capitalize">{insight.value}</div>
            <p className="text-xs text-gray-600">{insight.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
