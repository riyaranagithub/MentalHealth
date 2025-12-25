import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, X } from 'lucide-react';
import { Duration } from './GuidedBreathing';

interface BreathingExerciseProps {
  duration: Duration;
  onComplete: () => void;
}

type Phase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export function BreathingExercise({ duration, onComplete }: BreathingExerciseProps) {
  const [phase, setPhase] = useState<Phase>('inhale');
  const [elapsed, setElapsed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Breathing pattern: 4s inhale, 2s hold, 4s exhale, 2s hold (12s total cycle)
  const phaseDurations = {
    inhale: 4,
    hold1: 2,
    exhale: 4,
    hold2: 2
  };

  const phaseText = {
    inhale: 'Breathe in...',
    hold1: 'Hold...',
    exhale: 'Breathe out...',
    hold2: 'Hold...'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => {
        const newElapsed = prev + 0.1;
        if (newElapsed >= duration) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return duration;
        }
        return newElapsed;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  useEffect(() => {
    const cycleTime = elapsed % 12;
    
    if (cycleTime < 4) {
      setPhase('inhale');
    } else if (cycleTime < 6) {
      setPhase('hold1');
    } else if (cycleTime < 10) {
      setPhase('exhale');
    } else {
      setPhase('hold2');
    }
  }, [elapsed]);

  const getAnimationScale = () => {
    const cycleTime = elapsed % 12;
    
    if (cycleTime < 4) {
      // Inhale: grow from 1 to 1.5
      return 1 + (cycleTime / 4) * 0.5;
    } else if (cycleTime < 6) {
      // Hold: stay at 1.5
      return 1.5;
    } else if (cycleTime < 10) {
      // Exhale: shrink from 1.5 to 1
      return 1.5 - ((cycleTime - 6) / 4) * 0.5;
    } else {
      // Hold: stay at 1
      return 1;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* End Early Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/30 transition-colors text-gray-600"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Sound Toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/30 transition-colors text-gray-600"
      >
        {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </button>

      <div className="text-center">
        {/* Breathing Animation */}
        <div className="mb-12 flex justify-center">
          <motion.div
            className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 shadow-2xl"
            animate={{
              scale: getAnimationScale(),
            }}
            transition={{
              duration: 0.1,
              ease: "linear"
            }}
          />
        </div>

        {/* Phase Text */}
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl text-gray-700"
        >
          {phaseText[phase]}
        </motion.p>

        {/* Progress */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-100"
              style={{ width: `${(elapsed / duration) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {Math.floor(duration - elapsed)}s remaining
          </p>
        </div>
      </div>
    </div>
  );
}
