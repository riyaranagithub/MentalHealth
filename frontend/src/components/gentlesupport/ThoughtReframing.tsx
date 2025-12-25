import { useState } from 'react';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';

interface ThoughtReframingProps {
  onBack: () => void;
}

type Stage = 'input' | 'classify' | 'evidence' | 'reframe';

export function ThoughtReframing({ onBack }: ThoughtReframingProps) {
  const [stage, setStage] = useState<Stage>('input');
  const [thought, setThought] = useState('');
  const [classification, setClassification] = useState<'fact' | 'feeling' | null>(null);
  const [evidence, setEvidence] = useState('');

  const handleContinue = () => {
    if (stage === 'input' && thought) setStage('classify');
    else if (stage === 'classify' && classification) setStage('evidence');
    else if (stage === 'evidence') setStage('reframe');
  };

  const getReframe = () => {
    if (classification === 'feeling') {
      return `It sounds like you're experiencing ${thought.toLowerCase()}. Remember, feelings are temporary and valid, but they're not facts. What would you tell a friend who felt this way?`;
    }
    return `Let's look at this more closely. The thought "${thought}" may feel true right now. What evidence supports or challenges this? Is there another way to look at this situation?`;
  };

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
          {stage === 'input' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="text-3xl mb-3 text-gray-800">
                What's on your mind?
              </h1>
              <p className="text-gray-600 mb-6">
                Write down the thought that's bothering you
              </p>

              <textarea
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder="I'm having a thought that..."
                className="w-full min-h-[200px] p-6 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-300 focus:outline-none resize-none text-lg"
                autoFocus
              />

              <button
                onClick={handleContinue}
                disabled={!thought}
                className="w-full mt-6 bg-purple-500 text-white py-4 rounded-xl hover:bg-purple-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </motion.div>
          )}

          {stage === 'classify' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="text-3xl mb-3 text-gray-800">
                Is this a fact or a feeling?
              </h1>
              <p className="text-gray-600 mb-6">
                Facts can be proven. Feelings are experiences.
              </p>

              <div className="bg-purple-50 p-6 rounded-2xl mb-6 italic text-gray-700">
                "{thought}"
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setClassification('fact')}
                  className={`w-full p-6 rounded-2xl text-left transition-all ${
                    classification === 'fact'
                      ? 'bg-purple-200 ring-2 ring-purple-400'
                      : 'bg-purple-50 hover:bg-purple-100'
                  }`}
                >
                  <div className="text-lg mb-1">📋 This is a fact</div>
                  <div className="text-sm text-gray-600">
                    It can be verified or proven
                  </div>
                </button>

                <button
                  onClick={() => setClassification('feeling')}
                  className={`w-full p-6 rounded-2xl text-left transition-all ${
                    classification === 'feeling'
                      ? 'bg-purple-200 ring-2 ring-purple-400'
                      : 'bg-purple-50 hover:bg-purple-100'
                  }`}
                >
                  <div className="text-lg mb-1">💭 This is a feeling</div>
                  <div className="text-sm text-gray-600">
                    It's my interpretation or emotion
                  </div>
                </button>
              </div>

              <button
                onClick={handleContinue}
                disabled={!classification}
                className="w-full bg-purple-500 text-white py-4 rounded-xl hover:bg-purple-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </motion.div>
          )}

          {stage === 'evidence' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="text-3xl mb-3 text-gray-800">
                What's the evidence?
              </h1>
              <p className="text-gray-600 mb-6">
                List facts that support or challenge this thought
              </p>

              <textarea
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                placeholder="What actually happened? What do I know for sure?"
                className="w-full min-h-[200px] p-6 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-300 focus:outline-none resize-none text-lg"
                autoFocus
              />

              <button
                onClick={handleContinue}
                className="w-full mt-6 bg-purple-500 text-white py-4 rounded-xl hover:bg-purple-600 transition-colors shadow-md"
              >
                See reframe
              </button>
            </motion.div>
          )}

          {stage === 'reframe' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-orange-600" />
                </div>
              </div>

              <h1 className="text-3xl mb-3 text-gray-800 text-center">
                A different perspective
              </h1>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl mb-6 text-gray-700 leading-relaxed">
                {getReframe()}
              </div>

              {evidence && (
                <div className="bg-blue-50 p-6 rounded-2xl mb-6">
                  <p className="text-sm text-gray-600 mb-2">Your evidence:</p>
                  <p className="text-gray-700">{evidence}</p>
                </div>
              )}

              <p className="text-center text-gray-600 mb-6">
                Reframing takes practice. Be patient with yourself.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setStage('input');
                    setThought('');
                    setClassification(null);
                    setEvidence('');
                  }}
                  className="w-full bg-purple-500 text-white py-4 rounded-xl hover:bg-purple-600 transition-colors shadow-md"
                >
                  Reframe another thought
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
