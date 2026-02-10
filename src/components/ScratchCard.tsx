import { useRef, useEffect, useState, useCallback } from 'react';

interface Props {
  onRevealed: () => void;
  children: React.ReactNode;
}

export default function ScratchCard({ onRevealed, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const scratchingRef = useRef(false);
  const initRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || initRef.current) return;
    initRef.current = true;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d')!;
    // Dark overlay with sparkles
    ctx.fillStyle = '#160d2b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(168, 85, 247, ${0.08 + Math.random() * 0.12})`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
    ctx.font = '600 15px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨', canvas.width / 2 - 70, canvas.height / 2);
    ctx.fillText('Scratch to reveal', canvas.width / 2, canvas.height / 2);
    ctx.fillText('✨', canvas.width / 2 + 70, canvas.height / 2);
  }, []);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Check every 16th pixel for performance
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    const total = data.length / 4;
    for (let i = 3; i < data.length; i += 64) {
      if (data[i] === 0) cleared++;
    }
    if (cleared / (total / 16) > 0.4) {
      setRevealed(true);
      onRevealed();
    }
  }, [revealed, onRevealed]);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const onDown = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    scratchingRef.current = true;
    const pos = getPos(e);
    if (pos) scratch(pos.x, pos.y);
  };
  const onMoveHandler = (e: React.TouchEvent | React.MouseEvent) => {
    if (!scratchingRef.current) return;
    e.preventDefault();
    const pos = getPos(e);
    if (pos) scratch(pos.x, pos.y);
  };
  const onUp = () => { scratchingRef.current = false; };

  return (
    <div className="scratch-wrap" style={{ position: 'relative' }}>
      {children}
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          onTouchStart={onDown}
          onTouchMove={onMoveHandler}
          onTouchEnd={onUp}
          onMouseDown={onDown}
          onMouseMove={onMoveHandler}
          onMouseUp={onUp}
          onMouseLeave={onUp}
        />
      )}
    </div>
  );
}
