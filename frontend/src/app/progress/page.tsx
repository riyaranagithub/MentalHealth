'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Calendar, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { MoodTrendChart } from '../../components/progress/MoodTrendChart';
import { StressEnergyChart } from '../../components/progress/StressEnergyChart';
import { InsightsCards } from '../../components/progress/InsightsCards';
import { ActivityBreakdown } from '../../components/progress/ActivityBreakdown';
import { TriggerPatterns } from '../../components/progress/TriggerPatterns';
import { GratitudeTimeline } from '../../components/progress/GratitudeTimeline';
import { useJournalStoreContext } from "@/providers/journal-store-provider";

interface MentalHealthEntry {
  mood: string;
  stressLevel: number;
  energyLevel: number;
  triggers?: string;
  gratitude?: string;
  copingActivities?: string[];
  sleepQuality: string;
  reflection?: string;
  date: string;
}


interface ProgressDashboardProps {
  entries: MentalHealthEntry[];
  onBack: () => void;
}

export default function ProgressDashboard({ onBack }: ProgressDashboardProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  const fetchJournals = useJournalStoreContext((state) => state.fetchJournals);
  const journals = useJournalStoreContext((state) => state.journals);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  console.log("Journals in Progress Dashboard:", journals);
const entries = journals.map(j => ({
  mood: j.mood,
  stressLevel: j.stressLevel,
  energyLevel: j.energyLevel,
  triggers: j.triggers || "",
  gratitude: j.gratitude || "",
  copingActivities: j.copingActivities || [],
  sleepQuality: j.sleepQuality,
  reflection: j.reflection || "",
  date: j.date.toString(),
}));


  // Filter entries based on time range
  const getFilteredEntries = () => {
    if (timeRange === 'all') return entries;

    const now = new Date();
    const daysToSubtract = timeRange === 'week' ? 7 : 30;
    const cutoffDate = new Date(now.getTime() - daysToSubtract * 24 * 60 * 60 * 1000);

    return entries.filter(entry => new Date(entry.date) >= cutoffDate);
  };

  const filteredEntries = getFilteredEntries();

  // Calculate overall stats
  const calculateStats = () => {
    if (filteredEntries.length === 0) return null;

    const avgStress = filteredEntries.reduce((sum, e) => sum + e.stressLevel, 0) / filteredEntries.length;
    const avgEnergy = filteredEntries.reduce((sum, e) => sum + e.energyLevel, 0) / filteredEntries.length;

    // Calculate trend (compare first half vs second half)
    const midpoint = Math.floor(filteredEntries.length / 2);
    const firstHalfStress = filteredEntries.slice(0, midpoint).reduce((sum, e) => sum + e.stressLevel, 0) / midpoint;
    const secondHalfStress = filteredEntries.slice(midpoint).reduce((sum, e) => sum + e.stressLevel, 0) / (filteredEntries.length - midpoint);
    const stressTrend = firstHalfStress - secondHalfStress; // Positive = improving

    return {
      avgStress: avgStress.toFixed(1),
      avgEnergy: avgEnergy.toFixed(1),
      stressTrend,
      totalEntries: filteredEntries.length,
      goodSleepDays: filteredEntries.filter(e => e.sleepQuality === 'good' || e.sleepQuality === 'excellent').length
    };
  };

  const stats = calculateStats();

  const getTrendIcon = (trend: number) => {
    if (trend > 0.5) return <TrendingDown className="w-5 h-5 text-green-500" />;
    if (trend < -0.5) return <TrendingUp className="w-5 h-5 text-orange-500" />;
    return <Minus className="w-5 h-5 text-blue-500" />;
  };

  const getTrendText = (trend: number) => {
    if (trend > 0.5) return { text: 'Stress decreasing', color: 'text-green-600' };
    if (trend < -0.5) return { text: 'Stress increasing', color: 'text-orange-600' };
    return { text: 'Stress stable', color: 'text-blue-600' };
  };

  if (!stats || filteredEntries.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl">
          <div className="text-6xl mb-6">📊</div>
          <h2 className="text-3xl mb-4 text-gray-800">No data yet</h2>
          <p className="text-gray-600 mb-8">
            Start tracking your mental health journey to see your progress and insights here.
          </p>
          <button
            onClick={onBack}
            className="w-full bg-purple-500 text-white py-4 rounded-xl hover:bg-purple-600 transition-colors shadow-md"
          >
            Start tracking
          </button>
        </div>
      </div>
    );
  }

  const trendInfo = getTrendText(stats.stressTrend);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl text-gray-900">Your Progress</h1>
                <p className="text-sm text-gray-600">Understanding your mental health journey</p>
              </div>
            </div>

            {/* Time range selector */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              {(['week', 'month', 'all'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg transition-all ${timeRange === range
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {range === 'week' ? '7 days' : range === 'month' ? '30 days' : 'All time'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Check-ins</span>
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl text-gray-900 mb-1">{stats.totalEntries}</div>
            <p className="text-xs text-gray-500">entries recorded</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Stress Trend</span>
              {getTrendIcon(stats.stressTrend)}
            </div>
            <div className={`text-3xl mb-1 ${trendInfo.color}`}>
              {stats.avgStress}
            </div>
            <p className={`text-xs ${trendInfo.color}`}>{trendInfo.text}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg Energy</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl text-gray-900 mb-1">{stats.avgEnergy}</div>
            <p className="text-xs text-gray-500">out of 10</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Good Sleep</span>
              <Award className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl text-gray-900 mb-1">{stats.goodSleepDays}</div>
            <p className="text-xs text-gray-500">nights of quality rest</p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <MoodTrendChart entries={filteredEntries} />
          <StressEnergyChart entries={filteredEntries} />
        </div>

        {/* Insights Cards */}
        <InsightsCards entries={filteredEntries} />

        {/* Activity and Patterns */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <ActivityBreakdown entries={filteredEntries} />
          <TriggerPatterns entries={filteredEntries} />
        </div>

        {/* Gratitude Timeline */}
        <GratitudeTimeline entries={filteredEntries} />

        {/* Encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 text-center shadow-lg"
        >
          <div className="text-5xl mb-4">🌟</div>
          <h3 className="text-2xl mb-2 text-gray-800">You're making progress</h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Every entry is a step toward understanding yourself better. Keep showing up for yourself—you're doing great.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
