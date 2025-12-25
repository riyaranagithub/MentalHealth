import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GroundingExerciseProps {
  onBack: () => void;
}

const steps = [
  {
    number: 5,
    prompt: 'Name 5 things you can see',
    placeholder: 'Look around you...',
    color: 'from-blue-100 to-blue-200'
  },
  {
    number: 4,
    prompt: 'Name 4 things you can touch',
    placeholder: 'What textures do you notice?',
    color: 'from-purple-100 to-purple-200'
  },
  {
    number: 3,
    prompt: 'Name 3 things you can hear',
    placeholder: 'Listen carefully...',
    color: 'from-pink-100 to-pink-200'
  },
  {
    number: 2,
    prompt: 'Name 2 things you can smell',
    placeholder: 'What scents are present?',
    color: 'from-green-100 to-green-200'
  },
  {
    number: 1,
    prompt: 'Name 1 thing you can taste',
    placeholder: 'Notice any taste in your mouth...',
    color: 'from-orange-100 to-orange-200'
  }
];

export function GroundingExercise({ onBack }: GroundingExerciseProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputs, setInputs] = useState<string[]>(Array(5).fill(''));
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (value: string) => {
    const newInputs = [...inputs];
    newInputs[currentStep] = value;
    setInputs(newInputs);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6 flex justify-center"
            >
              <CheckCircle className="w-20 h-20 text-green-500" />
            </motion.div>

            <h1 className="text-3xl mb-3 text-gray-800">
              You're here. You're present.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              You've connected with the world around you.
            </p>

            <button
              onClick={onBack}
              className="w-full bg-blue-500 text-white py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-md"
            >
              Back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`bg-gradient-to-br ${step.color} p-8 md:p-12 rounded-3xl shadow-xl`}
          >
            {/* Progress */}
            <div className="mb-8">
              <div className="flex gap-2 justify-center mb-4">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx <= currentStep ? 'bg-white w-12' : 'bg-white/30 w-8'
                    }`}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>

            {/* Large Number */}
            <div className="text-center mb-6">
              <div className="text-8xl text-gray-700 mb-4">
                {step.number}
              </div>
            </div>

            {/* Prompt */}
            <h2 className="text-3xl text-center mb-8 text-gray-800">
              {step.prompt}
            </h2>

            {/* Input Area */}
            <textarea
              value={inputs[currentStep]}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={step.placeholder}
              className="w-full min-h-[150px] p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-transparent focus:border-gray-300 focus:outline-none resize-none text-lg"
              autoFocus
            />

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex-1 bg-white/60 text-gray-700 py-4 rounded-xl hover:bg-white/80 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 bg-white text-gray-800 py-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                {currentStep < steps.length - 1 && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
