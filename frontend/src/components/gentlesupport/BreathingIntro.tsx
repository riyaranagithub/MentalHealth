import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Duration } from './GuidedBreathing';

interface BreathingIntroProps {
  onStart: (duration: Duration) => void;
  onBack: () => void;
}

export function BreathingIntro({ onStart, onBack }: BreathingIntroProps) {
  const [selectedDuration, setSelectedDuration] = useState<Duration>(60);

  const durations: { value: Duration; label: string }[] = [
    { value: 30, label: '30s' },
    { value: 60, label: '1 min' },
    { value: 180, label: '3 min' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Title */}
        <h1 className="text-4xl mb-8 text-gray-800">
          Guided Breathing
        </h1>

        {/* Preview Animation */}
        <div className="mb-8 flex justify-center">
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-200 to-purple-200"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Duration Selector */}
        <div className="mb-8">
          <p className="text-gray-600 mb-4">Duration</p>
          <div className="flex gap-3 justify-center">
            {durations.map((dur) => (
              <button
                key={dur.value}
                onClick={() => setSelectedDuration(dur.value)}
                className={`px-6 py-3 rounded-xl transition-all ${
                  selectedDuration === dur.value
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {dur.label}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onStart(selectedDuration)}
            className="w-full bg-blue-500 text-white py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-md"
          >
            Start
          </button>
          <button
            onClick={onBack}
            className="w-full bg-white text-gray-700 py-4 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
