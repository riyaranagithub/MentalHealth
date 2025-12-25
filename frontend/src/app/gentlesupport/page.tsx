'use client';

import { useState } from 'react';
import { MainHub } from '../../components/gentlesupport/MainHub';
import { GuidedBreathing } from '../../components/gentlesupport/GuidedBreathing';
import { GroundingExercise } from '../../components/gentlesupport/GroundingExercise';
import { ThoughtReframing } from '../../components/gentlesupport/ThoughtReframing';
import { Mindfulness } from '../../components/gentlesupport/Mindfulness';
import { EmotionRegulation } from '../../components/gentlesupport/EmotionRegulation';
import { ExpressiveWriting } from '../../components/gentlesupport/ExpressiveWriting';
import { SelfCompassion } from '../../components/gentlesupport/SelfCompassion';
import { GratitudeReset } from '../../components/gentlesupport/GratitudeReset';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'hub' | 'breathing' | 'grounding' | 'reframing' | 'mindfulness' | 'emotion' | 'writing' | 'compassion' | 'gratitude'>('hub');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {currentScreen === 'hub' && (
        <MainHub onSelectTool={(tool) => {
          if (tool === 'breathing') setCurrentScreen('breathing');
          else if (tool === 'grounding') setCurrentScreen('grounding');
          else if (tool === 'reframing') setCurrentScreen('reframing');
          else if (tool === 'mindfulness') setCurrentScreen('mindfulness');
          else if (tool === 'sensory') setCurrentScreen('emotion');
          else if (tool === 'writing') setCurrentScreen('writing');
          else if (tool === 'compassion') setCurrentScreen('compassion');
          else if (tool === 'gratitude') setCurrentScreen('gratitude');
        }} />
      )}
      {currentScreen === 'breathing' && (
        <GuidedBreathing onBack={() => setCurrentScreen('hub')} />
      )}
      {currentScreen === 'grounding' && (
        <GroundingExercise onBack={() => setCurrentScreen('hub')} />
      )}
      {currentScreen === 'reframing' && (
        <ThoughtReframing onBack={() => setCurrentScreen('hub')} />
      )}
      {currentScreen === 'mindfulness' && (
        <Mindfulness onBack={() => setCurrentScreen('hub')} />
      )}
      {currentScreen === 'emotion' && (
        <EmotionRegulation onBack={() => setCurrentScreen('hub')} />
      )}
      {currentScreen === 'writing' && (
        <ExpressiveWriting onBack={() => setCurrentScreen('hub')} />
      )}
      {currentScreen === 'compassion' && (
        <SelfCompassion onBack={() => setCurrentScreen('hub')} />
      )}
      {currentScreen === 'gratitude' && (
        <GratitudeReset onBack={() => setCurrentScreen('hub')} />
      )}
    </div>
  );
}