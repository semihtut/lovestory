import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  onComplete: () => void;
}

/* Approximate SVG coordinates (Mercator-ish projection, viewBox 0 0 500 400) */
const HEL = { x: 213, y: 77 };
const MOW = { x: 395, y: 148 };
const SAR = { x: 119, y: 339 };

const P1 = `M${HEL.x},${HEL.y} C170,155 128,260 ${SAR.x},${SAR.y}`;
const P2 = `M${MOW.x},${MOW.y} C355,240 208,318 ${SAR.x},${SAR.y}`;

export default function IntroAnimation({ onComplete }: Props) {
  const { lang } = useLanguage();
  const [fadeOut, setFadeOut] = useState(false);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setFadeOut(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    const t = setTimeout(finish, 5200);
    return () => clearTimeout(t);
  }, [finish]);

  return (
    <div className={`intro-screen${fadeOut ? ' intro-fade-out' : ''}`} onClick={finish}>
      <svg viewBox="0 0 500 400" className="intro-svg" aria-hidden="true">
        {/* Faint dashed route preview */}
        <path d={P1} fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.08" strokeDasharray="4 6" />
        <path d={P2} fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.08" strokeDasharray="4 6" />

        {/* Animated flight paths (draw themselves via SMIL) */}
        <path
          id="hp" d={P1} fill="none" stroke="#a855f7" strokeWidth="2"
          strokeLinecap="round" opacity="0.8" pathLength={1}
          strokeDasharray="1" strokeDashoffset="1" className="intro-path-violet"
        >
          <animate attributeName="stroke-dashoffset" from="1" to="0" dur="2.8s" begin="0.5s" fill="freeze" />
        </path>
        <path
          id="mp" d={P2} fill="none" stroke="#ec4899" strokeWidth="2"
          strokeLinecap="round" opacity="0.8" pathLength={1}
          strokeDasharray="1" strokeDashoffset="1" className="intro-path-pink"
        >
          <animate attributeName="stroke-dashoffset" from="1" to="0" dur="2.8s" begin="0.5s" fill="freeze" />
        </path>

        {/* Plane 1: Helsinki → Sarajevo */}
        <g opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.1s" begin="0.5s" fill="freeze" />
          <animate attributeName="opacity" from="1" to="0" dur="0.2s" begin="3.3s" fill="freeze" />
          <animateMotion dur="2.8s" begin="0.5s" fill="freeze" rotate="auto">
            <mpath xlinkHref="#hp" />
          </animateMotion>
          <circle r="5" fill="#a855f7" opacity="0.2" />
          <polygon points="5,0 -3,-2.5 -3,2.5" fill="#a855f7" />
        </g>

        {/* Plane 2: Moscow → Sarajevo */}
        <g opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.1s" begin="0.5s" fill="freeze" />
          <animate attributeName="opacity" from="1" to="0" dur="0.2s" begin="3.3s" fill="freeze" />
          <animateMotion dur="2.8s" begin="0.5s" fill="freeze" rotate="auto">
            <mpath xlinkHref="#mp" />
          </animateMotion>
          <circle r="5" fill="#ec4899" opacity="0.2" />
          <polygon points="5,0 -3,-2.5 -3,2.5" fill="#ec4899" />
        </g>

        {/* City dots */}
        <circle cx={HEL.x} cy={HEL.y} r="4" fill="#a855f7" opacity="0">
          <animate attributeName="opacity" from="0" to="0.9" dur="0.4s" begin="0.2s" fill="freeze" />
        </circle>
        <circle cx={MOW.x} cy={MOW.y} r="4" fill="#ec4899" opacity="0">
          <animate attributeName="opacity" from="0" to="0.9" dur="0.4s" begin="0.2s" fill="freeze" />
        </circle>
        {/* Sarajevo ring + dot */}
        <circle cx={SAR.x} cy={SAR.y} r="8" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0">
          <animate attributeName="opacity" from="0" to="0.2" dur="0.4s" begin="0.2s" fill="freeze" />
        </circle>
        <circle cx={SAR.x} cy={SAR.y} r="3" fill="#a855f7" opacity="0">
          <animate attributeName="opacity" from="0" to="0.5" dur="0.4s" begin="0.2s" fill="freeze" />
        </circle>

        {/* City labels */}
        <text x={HEL.x} y={HEL.y - 14} textAnchor="middle" fill="#b9b2d6"
          fontFamily="Inter, sans-serif" fontSize="13" opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.3s" fill="freeze" />
          {lang === 'ru' ? 'Хельсинки' : 'Helsinki'}
        </text>
        <text x={MOW.x} y={MOW.y - 14} textAnchor="middle" fill="#b9b2d6"
          fontFamily="Inter, sans-serif" fontSize="13" opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.3s" fill="freeze" />
          {lang === 'ru' ? 'Москва' : 'Moscow'}
        </text>
        <text x={SAR.x} y={SAR.y + 26} textAnchor="middle" fill="#f2efff"
          fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.3s" fill="freeze" />
          {lang === 'ru' ? 'Босния' : 'Bosnia'}
        </text>

        {/* Meeting heart (bounce in at arrival) */}
        <g transform={`translate(${SAR.x},${SAR.y - 10})`}>
          <path
            d="M0 14C0 14 -16 2 -16 -4C-16 -10 -12 -14 -8 -14C-4 -14 0 -11 0 -7C0 -11 4 -14 8 -14C12 -14 16 -10 16 -4C16 2 0 14 0 14Z"
            fill="#a855f7" className="intro-heart" opacity="0" transform="scale(0)"
          >
            <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="3.5s" fill="freeze" />
            <animateTransform
              attributeName="transform" type="scale"
              values="0; 1.5; 0.9; 1.1; 1"
              keyTimes="0; 0.35; 0.65; 0.85; 1"
              dur="0.8s" begin="3.5s" fill="freeze"
            />
          </path>
        </g>
      </svg>
    </div>
  );
}
