import { useState } from 'react';
import { ArrowLeft, Heart, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface SelfCompassionProps {
  onBack: () => void;
}

type Stage = 'affirmation' | 'writing' | 'complete';

const affirmations = [
  'I am doing the best I can with what I have right now',
  'My feelings are valid and deserve to be acknowledged',
  'I deserve the same kindness I show to others',
  'It\'s okay to not be okay sometimes',
  'I am worthy of love and compassion, especially from myself',
  'My struggles don\'t define my worth',
  'I am allowed to take up space and have needs',
  'Making mistakes doesn\'t make me a failure',
  'I am enough, exactly as I am',
  'It\'s okay to rest and take care of myself'
];

const prompts = [
  'What would you say to a friend going through what you\'re experiencing?',
  'What do you need to hear right now?',
  'Write yourself a gentle reminder',
  'What are three things you appreciate about yourself?',
  'How have you shown up for yourself today?'
];

export function SelfCompassion({ onBack }: SelfCompassionProps) {
  const [stage, setStage] = useState<Stage>('affirmation');
  const [currentAffirmation, setCurrentAffirmation] = useState(
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
  const [writing, setWriting] = useState('');

  const getNewAffirmation = () => {
    let newAffirmation;
    do {
      newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    } while (newAffirmation === currentAffirmation);
    setCurrentAffirmation(newAffirmation);
  };

  if (stage === 'affirmation') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <button
            onClick={onBack}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl text-center">
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center mx-auto mb-6"
              >
                <Heart className="w-10 h-10 text-rose-500" />
              </motion.div>
              <h1 className="text-3xl mb-3 text-gray-800">
                A moment of self-compassion
              </h1>
              <p className="text-gray-600">
                Take a deep breath and read this slowly
              </p>
            </div>

            <motion.div
              key={currentAffirmation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl mb-8 min-h-[200px] flex items-center justify-center"
            >
              <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed">
                {currentAffirmation}
              </p>
            </motion.div>

            <div className="space-y-3">
              <button
                onClick={getNewAffirmation}
                className="w-full bg-white text-gray-700 py-4 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Another affirmation
              </button>
              <button
                onClick={() => setStage('writing')}
                className="w-full bg-pink-500 text-white py-4 rounded-xl hover:bg-pink-600 transition-colors shadow-md"
              >
                Write to myself
              </button>
              <button
                onClick={onBack}
                className="w-full bg-white text-gray-700 py-4 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Return home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'writing') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-3xl w-full">
          <button
            onClick={() => setStage('affirmation')}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl">
            <div className="text-center mb-6">
              <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h1 className="text-3xl mb-3 text-gray-800">
                Write yourself kindness
              </h1>
              <p className="text-gray-600">
                Speak to yourself as you would to someone you love
              </p>
            </div>

            {/* Prompt Selector */}
            <div className="mb-6">
              <label className="text-sm text-gray-600 mb-2 block">
                Choose a prompt
              </label>
              <select
                value={selectedPrompt}
                onChange={(e) => setSelectedPrompt(e.target.value)}
                className="w-full p-4 rounded-xl bg-pink-50 border-2 border-transparent focus:border-pink-300 focus:outline-none"
              >
                {prompts.map((prompt, idx) => (
                  <option key={idx} value={prompt}>
                    {prompt}
                  </option>
                ))}
              </select>
            </div>

            {/* Prompt Display */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-5 rounded-2xl mb-6 italic text-gray-700 text-center">
              {selectedPrompt}
            </div>

            {/* Writing Area */}
            <textarea
              value={writing}
              onChange={(e) => setWriting(e.target.value)}
              placeholder="Dear self..."
              className="w-full min-h-[300px] p-6 rounded-2xl bg-white border-2 border-gray-200 focus:border-pink-300 focus:outline-none resize-none text-lg leading-relaxed"
              autoFocus
            />

            <button
              onClick={() => setStage('complete')}
              disabled={writing.trim().length === 0}
              className="w-full mt-6 bg-pink-500 text-white py-4 rounded-xl hover:bg-pink-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center text-4xl mx-auto">
              💗
            </div>
          </motion.div>

          <h1 className="text-3xl mb-3 text-gray-800">
            You are worthy of your own kindness
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for taking this time for yourself
          </p>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl mb-8">
            <p className="text-gray-700 italic">
              "{currentAffirmation}"
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                setStage('affirmation');
                setWriting('');
                getNewAffirmation();
              }}
              className="w-full bg-pink-500 text-white py-4 rounded-xl hover:bg-pink-600 transition-colors shadow-md"
            >
              Practice again
            </button>
            <button
              onClick={onBack}
              className="w-full bg-white text-gray-700 py-4 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
