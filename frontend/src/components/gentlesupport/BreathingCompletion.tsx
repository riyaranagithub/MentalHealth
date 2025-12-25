import { useState } from 'react';
import { motion } from 'motion/react';

interface BreathingCompletionProps {
  onTryAnother: () => void;
  onBack: () => void;
}

export function BreathingCompletion({ onTryAnother, onBack }: BreathingCompletionProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { emoji: '😌', label: 'Calm' },
    { emoji: '😊', label: 'Good' },
    { emoji: '🙂', label: 'Okay' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😔', label: 'Still Tough' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        {/* Completion Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-6 flex justify-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center text-4xl">
            ✓
          </div>
        </motion.div>

        {/* Message */}
        <h1 className="text-3xl mb-3 text-gray-800">
          Nice work.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You showed up for yourself.
        </p>

        {/* Mood Check */}
        <div className="mb-8">
          <p className="text-gray-700 mb-4">How do you feel now?</p>
          <div className="flex gap-3 justify-center flex-wrap">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  selectedMood === mood.label
                    ? 'bg-blue-100 ring-2 ring-blue-400'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-xs text-gray-600">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onTryAnother}
            className="w-full bg-blue-500 text-white py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-md"
          >
            Try another tool
          </button>
          <button
            onClick={onBack}
            className="w-full bg-white text-gray-700 py-4 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Return home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
