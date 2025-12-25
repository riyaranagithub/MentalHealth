import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Trash2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

interface ExpressiveWritingProps {
  onBack: () => void;
}

const prompts = [
  'What\'s weighing on your mind right now?',
  'Describe how you\'re feeling without filtering',
  'What would you like to let go of?',
  'Write a letter you\'ll never send',
  'What do you need to hear right now?',
  'Describe your day as if telling a friend',
  'What are you grateful for in this moment?'
];

export function ExpressiveWriting({ onBack }: ExpressiveWritingProps) {
  const [text, setText] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
  const [autoSave, setAutoSave] = useState(false);
  const [deleteAfter, setDeleteAfter] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [text]);

  const handleComplete = () => {
    if (deleteAfter) {
      setText('');
    }
    setShowComplete(true);
  };

  const handleNewEntry = () => {
    setText('');
    setShowComplete(false);
    setDeleteAfter(false);
  };

  if (showComplete) {
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
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-200 to-teal-200 flex items-center justify-center text-4xl mx-auto">
                ✍️
              </div>
            </motion.div>

            <h1 className="text-3xl mb-3 text-gray-800">
              Your words matter
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              You wrote {wordCount} word{wordCount !== 1 ? 's' : ''}
            </p>
            <p className="text-gray-600 mb-8">
              {deleteAfter 
                ? 'Your thoughts have been released and deleted'
                : 'Your thoughts have been expressed'}
            </p>

            <div className="space-y-3">
              <button
                onClick={handleNewEntry}
                className="w-full bg-teal-500 text-white py-4 rounded-xl hover:bg-teal-600 transition-colors shadow-md"
              >
                Write again
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl">
          <h1 className="text-3xl mb-6 text-gray-800 text-center">
            Expressive Writing
          </h1>

          {/* Prompt Selector */}
          <div className="mb-6">
            <label className="text-sm text-gray-600 mb-2 block">
              Choose a prompt (optional)
            </label>
            <select
              value={selectedPrompt}
              onChange={(e) => setSelectedPrompt(e.target.value)}
              className="w-full p-4 rounded-xl bg-teal-50 border-2 border-transparent focus:border-teal-300 focus:outline-none"
            >
              {prompts.map((prompt, idx) => (
                <option key={idx} value={prompt}>
                  {prompt}
                </option>
              ))}
            </select>
          </div>

          {/* Prompt Display */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-5 rounded-2xl mb-6 italic text-gray-700 text-center">
            {selectedPrompt}
          </div>

          {/* Writing Area */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing... no one will judge"
            className="w-full min-h-[300px] p-6 rounded-2xl bg-white border-2 border-gray-200 focus:border-teal-300 focus:outline-none resize-none text-lg leading-relaxed"
            autoFocus
          />

          {/* Word Count */}
          <div className="text-sm text-gray-500 mt-2 text-right">
            {wordCount} word{wordCount !== 1 ? 's' : ''}
          </div>

           

        

          {/* Complete Button */}
          <button
            onClick={handleComplete}
            disabled={text.trim().length === 0}
            className="w-full mt-6 bg-teal-500 text-white py-4 rounded-xl hover:bg-teal-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}
