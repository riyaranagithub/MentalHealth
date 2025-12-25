import { useState } from 'react';
import { BreathingIntro } from './BreathingIntro';
import { BreathingExercise } from './BreathingExercise';
import { BreathingCompletion } from './BreathingCompletion';

interface GuidedBreathingProps {
  onBack: () => void;
}

export type Duration = 30 | 60 | 180;

export function GuidedBreathing({ onBack }: GuidedBreathingProps) {
  const [stage, setStage] = useState<'intro' | 'exercise' | 'completion'>('intro');
  const [duration, setDuration] = useState<Duration>(60);

  const handleStart = (selectedDuration: Duration) => {
    setDuration(selectedDuration);
    setStage('exercise');
  };

  const handleComplete = () => {
    setStage('completion');
  };

  const handleTryAnother = () => {
    setStage('intro');
  };

  return (
    <>
      {stage === 'intro' && (
        <BreathingIntro onStart={handleStart} onBack={onBack} />
      )}
      {stage === 'exercise' && (
        <BreathingExercise duration={duration} onComplete={handleComplete} />
      )}
      {stage === 'completion' && (
        <BreathingCompletion onTryAnother={handleTryAnother} onBack={onBack} />
      )}
    </>
  );
}
