import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

interface MindfulnessProps {
  onBack: () => void;
}

type Stage = 'intro' | 'session' | 'complete';

const sessions = [
  { duration: 60, label: '1 min' },
  { duration: 180, label: '3 min' },
  { duration: 300, label: '5 min' }
];

const prompts = [
  'Notice your breath flowing in and out...',
  'Feel the weight of your body where you sit...',
  'Observe your thoughts without judgment...',
  'Notice any sensations in your body...',
  'Return your attention to the present moment...',
  'Allow thoughts to pass like clouds in the sky...',
  'Feel the rhythm of your breathing...',
  'Notice the sounds around you...'
];

export function Mindfulness({ onBack }: MindfulnessProps) {
  const [stage, setStage] = useState<Stage>('intro');
  const [selectedDuration, setSelectedDuration] = useState(180);
  const [elapsed, setElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);

  useEffect(() => {
    if (stage !== 'session' || !isPlaying) return;

    const interval = setInterval(() => {
      setElapsed((prev) => {
        const newElapsed = prev + 1;
        if (newElapsed >= selectedDuration) {
          clearInterval(interval);
          setTimeout(() => setStage('complete'), 500);
          return selectedDuration;
        }
        return newElapsed;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, isPlaying, selectedDuration]);

  useEffect(() => {
    if (stage !== 'session') return;

    const promptInterval = setInterval(() => {
      setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    }, 15000);

    return () => clearInterval(promptInterval);
  }, [stage]);

  if (stage === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <button
            onClick={onBack}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          <h1 className="text-4xl mb-3 text-gray-800">
            Mindfulness
          </h1>
          <p className="text-gray-600 mb-8">
            A few moments of presence and calm
          </p>

          <div className="mb-8">
            <motion.div
              className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <p className="text-gray-600 mb-4">Choose your duration</p>
          <div className="flex gap-3 justify-center mb-8">
            {sessions.map((session) => (
              <button
                key={session.duration}
                onClick={() => setSelectedDuration(session.duration)}
                className={`px-6 py-3 rounded-xl transition-all ${
                  selectedDuration === session.duration
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {session.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setStage('session')}
              className="w-full bg-indigo-500 text-white py-4 rounded-xl hover:bg-indigo-600 transition-colors shadow-md"
            >
              Begin
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

  if (stage === 'session') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-200/30 to-purple-200/30 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-pink-200/30 to-purple-200/30 blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Controls */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="absolute top-6 left-6 p-3 rounded-full bg-white/50 hover:bg-white/70 transition-colors z-10"
        >
          {soundEnabled ? <Volume2 className="w-6 h-6 text-gray-700" /> : <VolumeX className="w-6 h-6 text-gray-700" />}
        </button>

        <button
          onClick={() => setStage('intro')}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/50 hover:bg-white/70 transition-colors z-10"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Content */}
        <div className="text-center relative z-10">
          <motion.div
            key={currentPrompt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12"
          >
            <p className="text-2xl md:text-3xl text-gray-700 max-w-2xl">
              {currentPrompt}
            </p>
          </motion.div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="mb-8 w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg mx-auto"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-gray-700" />
            ) : (
              <Play className="w-8 h-8 text-gray-700 ml-1" />
            )}
          </button>

          <div className="max-w-xs mx-auto">
            <div className="h-2 bg-white/50 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-indigo-500 transition-all duration-1000"
                style={{ width: `${(elapsed / selectedDuration) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {Math.floor((selectedDuration - elapsed) / 60)}:{String((selectedDuration - elapsed) % 60).padStart(2, '0')} remaining
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center text-4xl mx-auto">
              ✨
            </div>
          </motion.div>

          <h1 className="text-3xl mb-3 text-gray-800">
            Beautifully done
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            You took time to be present with yourself
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                setStage('intro');
                setElapsed(0);
                setIsPlaying(true);
              }}
              className="w-full bg-indigo-500 text-white py-4 rounded-xl hover:bg-indigo-600 transition-colors shadow-md"
            >
              Practice again
            </button>
            <button
              onClick={onBack}
              className="w-full bg-white text-gray-700 py-4 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Return home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
