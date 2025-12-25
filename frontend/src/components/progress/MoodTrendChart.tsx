import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

interface MoodTrendChartProps {
  entries: MentalHealthEntry[];
}

const moodToScore: { [key: string]: number } = {
  'great': 5,
  'good': 4,
  'okay': 3,
  'sad': 2,
  'anxious': 2,
  'stressed': 2,
  'angry': 1,
  'terrible': 1
};

export function MoodTrendChart({ entries }: MoodTrendChartProps) {
  const chartData = entries
    .slice(-14) // Last 14 entries
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: moodToScore[entry.mood.toLowerCase()] || 3,
      fullDate: entry.date
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-xl mb-4 text-gray-900">Mood Trend</h3>
      <p className="text-sm text-gray-600 mb-6">How your mood has changed over time</p>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#666', fontSize: 12 }}
            tickLine={{ stroke: '#f0f0f0' }}
          />
          <YAxis 
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fill: '#666', fontSize: 12 }}
            tickLine={{ stroke: '#f0f0f0' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px'
            }}
            formatter={(value: number) => {
              const moodLabels = ['', 'Struggling', 'Tough', 'Okay', 'Good', 'Great'];
              return [moodLabels[value], 'Mood'];
            }}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>😔 Struggling</span>
        <span>😐 Okay</span>
        <span>😊 Great</span>
      </div>
    </motion.div>
  );
}
