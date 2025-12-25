import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

interface StressEnergyChartProps {
  entries: MentalHealthEntry[];
}

export function StressEnergyChart({ entries }: StressEnergyChartProps) {
  const chartData = entries
    .slice(-14)
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      stress: entry.stressLevel,
      energy: entry.energyLevel
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-xl mb-4 text-gray-900">Stress & Energy Levels</h3>
      <p className="text-sm text-gray-600 mb-6">Tracking your daily patterns</p>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#666', fontSize: 12 }}
            tickLine={{ stroke: '#f0f0f0' }}
          />
          <YAxis 
            domain={[0, 10]}
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
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="stress"
            stroke="#ef4444"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorStress)"
            name="Stress"
          />
          <Area
            type="monotone"
            dataKey="energy"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorEnergy)"
            name="Energy"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
