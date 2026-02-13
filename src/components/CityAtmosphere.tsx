import { useMemo } from 'react';

interface Props {
  cityId: string;
}

const ATMOSPHERE: Record<string, string> = {
  sarajevo: 'embers',
  madrid: 'sunrays',
  barcelona: 'shimmer',
  valencia: 'petals-orange',
  bosnia: 'petals-rose',
  rotterdam: 'rain',
  amsterdam: 'golden-shimmer',
};

export default function CityAtmosphere({ cityId }: Props) {
  const type = ATMOSPHERE[cityId];

  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
        '--size': `${2 + Math.random() * 4}px`,
        '--drift': `${-20 + Math.random() * 40}px`,
        opacity: 0.15 + Math.random() * 0.25,
      } as React.CSSProperties,
    }));
  }, [cityId]);

  if (!type) return null;

  return (
    <div className={`city-atmosphere atmosphere-${type}`} aria-hidden="true">
      {particles.map(p => (
        <span key={p.id} className="atmo-particle" style={p.style} />
      ))}
    </div>
  );
}
