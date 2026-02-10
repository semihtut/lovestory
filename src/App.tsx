import { useState, useMemo, useCallback } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import MapView from './components/MapView';
import StepView from './components/StepView';
import WelcomeScreen from './components/WelcomeScreen';
import JourneyComplete from './components/JourneyComplete';
import LockScreen from './components/LockScreen';
import IntroAnimation from './components/IntroAnimation';
import InstallPrompt from './components/InstallPrompt';
import Fireflies from './components/Fireflies';
import SecretMessage from './components/SecretMessage';
import TicketsScreen from './components/TicketsScreen';
import { useProgress } from './hooks/useProgress';
import { useHiddenHearts } from './hooks/useHiddenHearts';
import { useShake } from './hooks/useShake';
import { journeySteps } from './data/journeyData';
import { isUnlocked } from './utils/unlock';
import './App.css';

const WELCOMED_KEY = 'lovestory-welcomed';

function AppContent() {
  const [showIntro, setShowIntro] = useState(true);
  const [locked, setLocked] = useState(() => !isUnlocked());
  const [view, setView] = useState<'map' | 'step' | 'tickets'>('map');
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem(WELCOMED_KEY));
  const [showComplete, setShowComplete] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const { completedSteps, completeStep, resetProgress } = useProgress();
  const { collectedHearts, collectHeart, resetHearts } = useHiddenHearts();

  useShake(useCallback(() => setShowSecret(true), []));

  const unlockedSteps = useMemo(() => {
    const set = new Set<string>();
    for (const step of journeySteps) {
      if (step.order === 1) set.add(step.id);
      else {
        const prev = journeySteps.find(s => s.order === step.order - 1);
        if (prev && completedSteps.has(prev.id)) set.add(step.id);
      }
      if (completedSteps.has(step.id)) set.add(step.id);
    }
    return set;
  }, [completedSteps]);

  const currentStep = useMemo(
    () => journeySteps.find(s => unlockedSteps.has(s.id) && !completedSteps.has(s.id)),
    [unlockedSteps, completedSteps],
  );

  const switchTo = useCallback((target: 'map' | 'step' | 'tickets', stepId?: string) => {
    setTransitioning(true);
    setTimeout(() => {
      if (stepId) setActiveStepId(stepId);
      setView(target);
      requestAnimationFrame(() => setTransitioning(false));
    }, 220);
  }, []);

  const openStep = (stepId: string) => {
    if (locked) return;
    switchTo('step', stepId);
  };

  const handleComplete = (stepId: string) => {
    completeStep(stepId);
    const allDone = journeySteps.every(s => s.id === stepId || completedSteps.has(s.id));
    if (allDone) {
      setShowComplete(true);
    }
    switchTo('map');
    setActiveStepId(null);
  };

  const handleBack = () => {
    switchTo('map');
    setActiveStepId(null);
  };

  const handleReset = () => {
    resetProgress();
    resetHearts();
    setView('map');
    setActiveStepId(null);
  };

  const openTickets = () => switchTo('tickets');

  const handleWelcomeStart = () => {
    setShowWelcome(false);
    localStorage.setItem(WELCOMED_KEY, '1');
  };

  const activeStep = journeySteps.find(s => s.id === activeStepId);

  if (showIntro) {
    return (
      <div className="app">
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      </div>
    );
  }

  if (locked) {
    return (
      <div className="app">
        <Fireflies />
        <Header locked onReset={() => {}} />
        <LockScreen onUnlocked={() => setLocked(false)} />
      </div>
    );
  }

  return (
    <div className="app">
      <Fireflies />
      {showWelcome && <WelcomeScreen onStart={handleWelcomeStart} />}
      {showComplete && <JourneyComplete onClose={() => setShowComplete(false)} />}

      <Header showBack={view === 'step' || view === 'tickets'} onBack={handleBack} onReset={handleReset} />

      <div className={`view-container${transitioning ? ' view-out' : ''}`}>
        {view === 'map' ? (
          <MapView
            steps={journeySteps}
            completedSteps={completedSteps}
            unlockedSteps={unlockedSteps}
            currentStep={currentStep}
            onOpenStep={openStep}
            collectedHearts={collectedHearts}
            onOpenTickets={openTickets}
          />
        ) : view === 'tickets' ? (
          <TicketsScreen
            steps={journeySteps}
            completedSteps={completedSteps}
            unlockedSteps={unlockedSteps}
            collectedHearts={collectedHearts}
            onBack={handleBack}
          />
        ) : activeStep ? (
          <StepView
            step={activeStep}
            isCompleted={completedSteps.has(activeStep.id)}
            onComplete={handleComplete}
            onBack={handleBack}
            collectedHearts={collectedHearts}
            onCollectHeart={collectHeart}
          />
        ) : null}
      </div>

      <InstallPrompt />
      {showSecret && <SecretMessage onClose={() => setShowSecret(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
