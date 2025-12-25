import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface EmotionRegulationProps {
  onBack: () => void;
}

type Stage = 'select' | 'intensity' | 'suggestions';

const emotions = [
  { name: 'Anxious', emoji: '😰', color: 'from-yellow-100 to-orange-100' },
  { name: 'Sad', emoji: '😢', color: 'from-blue-100 to-indigo-100' },
  { name: 'Angry', emoji: '😠', color: 'from-red-100 to-pink-100' },
  { name: 'Overwhelmed', emoji: '😵', color: 'from-purple-100 to-pink-100' },
  { name: 'Lonely', emoji: '😔', color: 'from-gray-100 to-blue-100' },
  { name: 'Frustrated', emoji: '😤', color: 'from-orange-100 to-red-100' }
];

const getSuggestions = (emotion: string, intensity: number) => {
  const baseSuggestions = {
    Anxious: [
      'Try the 5-4-3-2-1 grounding technique',
      'Practice box breathing (4-4-4-4)',
      'Name what you can control right now',
      'Take a short walk if possible'
    ],
    Sad: [
      'Allow yourself to feel without judgment',
      'Reach out to someone you trust',
      'Do something kind for yourself',
      'Listen to music that comforts you'
    ],
    Angry: [
      'Take 10 deep breaths before responding',
      'Write down what you\'re feeling',
      'Physical movement can help release tension',
      'Ask yourself: what do I need right now?'
    ],
    Overwhelmed: [
      'Break things into smaller steps',
      'Focus on just the next 5 minutes',
      'It\'s okay to ask for help',
      'One thing at a time'
    ],
    Lonely: [
      'Text someone you care about',
      'Join an online community',
      'Practice self-compassion',
      'Remember: this feeling is temporary'
    ],
    Frustrated: [
      'Step away for a moment if you can',
      'Identify what\'s in your control',
      'Try a different approach',
      'Be patient with yourself'
    ]
  };

  return baseSuggestions[emotion as keyof typeof baseSuggestions] || [];
};

export function EmotionRegulation({ onBack }: EmotionRegulationProps) {
  const [stage, setStage] = useState<Stage>('select');
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(5);

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    setStage('intensity');
  };

  const selectedEmotionData = emotions.find(e => e.name === selectedEmotion);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl">
          {stage === 'select' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="text-3xl mb-3 text-gray-800 text-center">
                How are you feeling?
              </h1>
              <p className="text-gray-600 mb-8 text-center">
                Select the emotion that's strongest right now
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.name}
                    onClick={() => handleEmotionSelect(emotion.name)}
                    className={`bg-gradient-to-br ${emotion.color} p-6 rounded-2xl hover:shadow-lg transition-all text-center`}
                  >
                    <div className="text-5xl mb-3">{emotion.emoji}</div>
                    <div className="text-lg text-gray-800">{emotion.name}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {stage === 'intensity' && selectedEmotionData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{selectedEmotionData.emoji}</div>
                <h1 className="text-3xl mb-3 text-gray-800">
                  {selectedEmotion}
                </h1>
                <p className="text-gray-600">
                  How intense is this feeling?
                </p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Mild</span>
                  <span className="text-2xl">{intensity}</span>
                  <span>Intense</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #86efac, #fef08a ${intensity * 10}%, #fca5a5 100%)`
                  }}
                />
              </div>

              <button
                onClick={() => setStage('suggestions')}
                className={`w-full bg-gradient-to-br ${selectedEmotionData.color} text-gray-800 py-4 rounded-xl hover:shadow-lg transition-all`}
              >
                Get support
              </button>
            </motion.div>
          )}

          {stage === 'suggestions' && selectedEmotion && selectedEmotionData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{selectedEmotionData.emoji}</div>
                <h1 className="text-2xl mb-2 text-gray-800">
                  It's okay to feel {selectedEmotion.toLowerCase()}
                </h1>
                <p className="text-gray-600">
                  Here are some gentle suggestions that might help
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {getSuggestions(selectedEmotion, intensity).map((suggestion, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-gradient-to-br ${selectedEmotionData.color} p-5 rounded-2xl`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-xl">💡</div>
                      <p className="text-gray-700 flex-1">{suggestion}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {intensity >= 7 && (
                <div className="bg-pink-50 p-5 rounded-2xl mb-6 border-2 border-pink-200">
                  <p className="text-gray-700">
                    💗 This feeling is strong right now. Remember, you don't have to handle this alone. 
                    It's okay to reach out to someone you trust.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setStage('select');
                    setSelectedEmotion(null);
                    setIntensity(5);
                  }}
                  className="w-full bg-purple-500 text-white py-4 rounded-xl hover:bg-purple-600 transition-colors shadow-md"
                >
                  Check in again
                </button>
                <button
                  onClick={onBack}
                  className="w-full bg-white text-gray-700 py-4 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Back
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
