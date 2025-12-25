import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

interface ActivityBreakdownProps {
  entries: MentalHealthEntry[];
}

export function ActivityBreakdown({ entries }: ActivityBreakdownProps) {
  // Count coping activities
  const activityCounts: { [key: string]: number } = {};
  entries.forEach(entry => {
    entry.copingActivities.forEach(activity => {
      activityCounts[activity] = (activityCounts[activity] || 0) + 1;
    });
  });

  const chartData = Object.entries(activityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([activity, count]) => ({
      activity,
      count
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-xl mb-4 text-gray-900">Your Coping Activities</h3>
      <p className="text-sm text-gray-600 mb-6">What helps you most</p>
      
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              type="number"
              tick={{ fill: '#666', fontSize: 12 }}
              tickLine={{ stroke: '#f0f0f0' }}
            />
            <YAxis 
              type="category"
              dataKey="activity"
              tick={{ fill: '#666', fontSize: 12 }}
              tickLine={{ stroke: '#f0f0f0' }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '12px'
              }}
              formatter={(value: number) => [`${value} times`, 'Used']}
            />
            <Bar 
              dataKey="count" 
              fill="#8b5cf6" 
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          <p>No activities tracked yet</p>
        </div>
      )}
    </motion.div>
  );
}
