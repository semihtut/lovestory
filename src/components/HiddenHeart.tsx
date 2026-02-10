import React, { useState, useCallback } from 'react';

interface Props {
  stepId: string;
  xPercent: number;
  yPercent: number;
  alreadyCollected: boolean;
  onCollect: (stepId: string) => void;
}

export default function HiddenHeart({ stepId, xPercent, yPercent, alreadyCollected, onCollect }: Props) {
  const [found, setFound] = useState(false);

  const handleTap = useCallback(() => {
    if (found) return;
    setFound(true);
    setTimeout(() => onCollect(stepId), 500);
  }, [found, onCollect, stepId]);

  if (alreadyCollected) return null;

  return (
    <svg
      className={`hidden-heart${found ? ' hidden-heart-found' : ''}`}
      onClick={handleTap}
      style={{
        position: 'absolute',
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        width: 18,
        height: 18,
        color: 'var(--accent)',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
      />
    </svg>
  );
}
