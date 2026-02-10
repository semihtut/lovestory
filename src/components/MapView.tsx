import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../context/LanguageContext';
import type { JourneyStep } from '../data/journeyData';

interface MapViewProps {
  steps: JourneyStep[];
  completedSteps: Set<string>;
  unlockedSteps: Set<string>;
  currentStep: JourneyStep | undefined;
  onOpenStep: (stepId: string) => void;
}

const ACCENT = '#a855f7';

function createPinIcon(type: 'completed' | 'current' | 'locked', order: number): L.DivIcon {
  if (type === 'locked') {
    return L.divIcon({
      className: '',
      html: '<div class="pin-dot"></div>',
      iconSize: [10, 10],
      iconAnchor: [5, 5],
    });
  }
  const label = type === 'completed' ? '&#10003;' : order;
  const pulse = type === 'current' ? '<div class="pin-pulse"></div>' : '';
  return L.divIcon({
    className: '',
    html: `
      <div class="pin-wrap">
        ${pulse}
        <div class="pin-container">
          <svg viewBox="0 0 30 40" width="30" height="40">
            <path d="M15 38C15 38 29 24 29 14.5C29 7 22.7 1 15 1C7.3 1 1 7 1 14.5C1 24 15 38 15 38Z"
                  fill="${ACCENT}" stroke="white" stroke-width="1.5"/>
            <circle cx="15" cy="14" r="7.5" fill="white" opacity="0.92"/>
          </svg>
          <span class="pin-label">${label}</span>
        </div>
      </div>`,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });
}

function FitBounds({ steps }: { steps: JourneyStep[] }) {
  const map = useMap();
  useEffect(() => {
    if (!steps.length) return;
    const bounds = L.latLngBounds(steps.map(s => [s.lat, s.lng] as L.LatLngTuple));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
  }, [map, steps]);
  return null;
}

function FlyToOnChange({ step }: { step: JourneyStep | undefined }) {
  const map = useMap();
  const prevId = useRef(step?.id);
  useEffect(() => {
    if (step && step.id !== prevId.current) {
      prevId.current = step.id;
      map.flyTo([step.lat, step.lng], 6, { duration: 1.0 });
    }
  }, [map, step?.id]);
  return null;
}

export default function MapView({
  steps,
  completedSteps,
  unlockedSteps,
  currentStep,
  onOpenStep,
}: MapViewProps) {
  const { lang, t } = useLanguage();

  const unlockedCoords = useMemo(() => {
    const coords: L.LatLngTuple[] = [];
    for (const s of steps) {
      if (unlockedSteps.has(s.id)) coords.push([s.lat, s.lng]);
      else break;
    }
    return coords;
  }, [steps, unlockedSteps]);

  const allCoords: L.LatLngTuple[] = steps.map(s => [s.lat, s.lng]);
  const allComplete = steps.every(s => completedSteps.has(s.id));

  return (
    <div className="map-view">
      <MapContainer
        className="map-container"
        center={[45, 10]}
        zoom={5}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <FitBounds steps={steps} />
        <FlyToOnChange step={currentStep} />

        <Polyline
          positions={allCoords}
          pathOptions={{ color: ACCENT, weight: 2, opacity: 0.12, dashArray: '2 10', lineCap: 'round' }}
        />
        {unlockedCoords.length > 1 && (
          <>
            {/* Glow layer */}
            <Polyline
              positions={unlockedCoords}
              pathOptions={{ color: ACCENT, weight: 6, opacity: 0.15, lineCap: 'round', dashArray: '2 10' }}
            />
            {/* Main dotted line */}
            <Polyline
              positions={unlockedCoords}
              pathOptions={{ color: ACCENT, weight: 2, opacity: 0.7, lineCap: 'round', dashArray: '2 10' }}
            />
          </>
        )}

        {steps.map(step => {
          const done = completedSteps.has(step.id);
          const open = unlockedSteps.has(step.id);
          const type = done ? 'completed' : open ? 'current' : 'locked';
          return (
            <Marker
              key={step.id}
              position={[step.lat, step.lng]}
              icon={createPinIcon(type, step.order)}
              eventHandlers={open ? { click: () => onOpenStep(step.id) } : {}}
            >
              <Tooltip direction="top" offset={[0, -42]}>
                <span>{step.city[lang]}{done ? ' ✓' : !open ? ' 🔒' : ''}</span>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="bottom-sheet">
        <div className="sheet-handle" />
        <div className="progress-dots" role="progressbar" aria-label={t('stepOf', { n: steps.filter(s => completedSteps.has(s.id)).length, total: steps.length })}>
          {steps.map(s => (
            <span
              key={s.id}
              className={`dot${completedSteps.has(s.id) ? ' dot-done' : s.id === currentStep?.id ? ' dot-current' : ''}`}
            />
          ))}
        </div>

        {allComplete ? (
          <div className="sheet-complete">
            <p className="sheet-complete-text">{t('journeyComplete')}</p>
          </div>
        ) : currentStep ? (
          <>
            <div className="sheet-city">{currentStep.city[lang]}</div>
            <div className="sheet-country">{currentStep.country[lang]}</div>
            <div className="sheet-preview">{currentStep.cardText[lang]}</div>
            <button className="sheet-cta" onClick={() => onOpenStep(currentStep.id)}>
              {t('nextStep')} &rarr;
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
