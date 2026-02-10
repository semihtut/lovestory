import { useState, useCallback } from 'react';

const STORAGE_KEY = 'lovestory-hearts';

function loadHearts(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch { /* ignore */ }
  return new Set();
}

function saveHearts(collected: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...collected]));
}

export function useHiddenHearts() {
  const [collectedHearts, setCollected] = useState<Set<string>>(loadHearts);

  const collectHeart = useCallback((stepId: string) => {
    setCollected(prev => {
      const next = new Set(prev);
      next.add(stepId);
      saveHearts(next);
      return next;
    });
  }, []);

  const resetHearts = useCallback(() => {
    setCollected(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { collectedHearts, collectHeart, resetHearts };
}
