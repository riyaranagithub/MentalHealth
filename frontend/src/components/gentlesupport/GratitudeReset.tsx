import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface GratitudeResetProps {
  onBack: () => void;
}

type Stage = 'intro' | 'entry' | 'complete';

const suggestions = [
  'A person who supports me',
  'A small comfort today',
  'Something I survived',
  'A moment of calm',
  'A choice I made for myself',
  'Something beautiful I noticed',
  'A memory that makes me smile',
  'My body for carrying me through'
];

export function GratitudeReset({ onBack }: GratitudeResetProps) {
  const [stage, setStage] = useState<Stage>('intro');
  const [gratitude, setGratitude] = useState('');

  const handleSuggestionClick = (suggestion: string) => {
    setGratitude(suggestion);
  };

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

          <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-8 md:p-12 rounded-3xl shadow-xl">
            {/* Sparkles Animation */}
            <div className="relative mb-8 flex justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-yellow-600" />
              </motion.div>
              
              {/* Floating sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-yellow-400"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    x: [0, (Math.cos(i * 60 * Math.PI / 180) * 60)],
                    y: [0, (Math.sin(i * 60 * Math.PI / 180) * 60)],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                />
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl mb-4 text-gray-800">
              Gratitude Reset
            </h1>

            <p className="text-lg text-gray-700 mb-2">
              Take a moment to notice something good.
            </p>
            <p className="text-gray-600 mb-8">
              It doesn't have to be big.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setStage('entry')}
                className="w-full bg-yellow-400 text-gray-800 py-4 rounded-xl hover:bg-yellow-500 transition-colors shadow-md"
              >
                Start
              </button>
              <button
                onClick={onBack}
                className="w-full bg-white/60 text-gray-700 py-4 rounded-xl hover:bg-white/80 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'entry') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <button
            onClick={() => setStage('intro')}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-8 md:p-12 rounded-3xl shadow-xl">
            <div className="text-center mb-6">
              <Sparkles className="w-10 h-10 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl text-gray-800 mb-2">
                What is one thing you're grateful for right now?
              </h2>
            </div>

            {/* Text Input */}
            <textarea
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="Type here, or choose a suggestion below..."
              className="w-full min-h-[180px] p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-transparent focus:border-yellow-300 focus:outline-none resize-none text-lg leading-relaxed mb-6"
              autoFocus
            />

            {/* Suggestions */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">
                Suggestions (tap to autofill):
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 bg-white/60 hover:bg-white text-gray-700 rounded-full text-sm transition-colors"
                  >
                    • {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={() => setStage('complete')}
              disabled={gratitude.trim().length === 0}
              className="w-full bg-yellow-400 text-gray-800 py-4 rounded-xl hover:bg-yellow-500 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete
            </button>
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
        <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-8 md:p-12 rounded-3xl shadow-xl">
          {/* Heart/Sparkle Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <div className="text-6xl mb-4">💛</div>
          </motion.div>

          <h1 className="text-3xl mb-4 text-gray-800">
            Thank you for noticing that.
          </h1>

          {/* User's gratitude reflection */}
          {gratitude && (
            <div className="bg-white/60 p-6 rounded-2xl mb-6 italic text-gray-700">
              "{gratitude}"
            </div>
          )}

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Gratitude doesn't erase hard things,<br />
            but it can make them feel lighter.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                setStage('entry');
                setGratitude('');
              }}
              className="w-full bg-yellow-400 text-gray-800 py-4 rounded-xl hover:bg-yellow-500 transition-colors shadow-md"
            >
              Add another
            </button>
            <button
              onClick={onBack}
              className="w-full bg-white/60 text-gray-700 py-4 rounded-xl hover:bg-white/80 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
