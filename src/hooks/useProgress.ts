import { useState, useCallback } from 'react';

const STORAGE_KEY = 'lovestory-progress';

function loadProgress(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch { /* ignore */ }
  return new Set();
}

function saveProgress(completed: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
}

export function useProgress() {
  const [completedSteps, setCompleted] = useState<Set<string>>(loadProgress);

  const completeStep = useCallback((stepId: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.add(stepId);
      saveProgress(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setCompleted(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { completedSteps, completeStep, resetProgress };
}
