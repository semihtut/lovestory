import { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  photoSrc: string;
  onClose: () => void;
}

const SIZE = 3;
const TOTAL = SIZE * SIZE;

function isSolvable(tiles: number[]): boolean {
  let inversions = 0;
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] !== TOTAL - 1 && tiles[j] !== TOTAL - 1 && tiles[i] > tiles[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0;
}

function shuffle(): number[] {
  let arr: number[];
  do {
    arr = Array.from({ length: TOTAL }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (!isSolvable(arr) || isWin(arr));
  return arr;
}

function isWin(tiles: number[]): boolean {
  return tiles.every((t, i) => t === i);
}

export default function PhotoPuzzle({ photoSrc, onClose }: Props) {
  const { t } = useLanguage();
  const [tiles, setTiles] = useState(() => shuffle());
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const emptyIdx = useMemo(() => tiles.indexOf(TOTAL - 1), [tiles]);

  const canMove = useCallback((idx: number) => {
    const row = Math.floor(idx / SIZE);
    const col = idx % SIZE;
    const eRow = Math.floor(emptyIdx / SIZE);
    const eCol = emptyIdx % SIZE;
    return (Math.abs(row - eRow) + Math.abs(col - eCol)) === 1;
  }, [emptyIdx]);

  const moveTile = useCallback((idx: number) => {
    if (won || !canMove(idx)) return;
    const next = [...tiles];
    [next[idx], next[emptyIdx]] = [next[emptyIdx], next[idx]];
    setTiles(next);
    setMoves(m => m + 1);
    if (isWin(next)) setWon(true);
  }, [tiles, emptyIdx, won, canMove]);

  const containerSize = Math.min(window.innerWidth - 48, 320);
  const tileSize = containerSize / SIZE;

  return (
    <div className="puzzle-overlay" onClick={onClose}>
      <div className="puzzle-card" onClick={e => e.stopPropagation()}>
        <h3 className="puzzle-title">{won ? t('puzzleWin') : t('puzzleTitle')}</h3>
        <div className="puzzle-grid" style={{ width: containerSize, height: containerSize }}>
          {tiles.map((tile, idx) => {
            if (tile === TOTAL - 1) return <div key="empty" className="puzzle-tile puzzle-empty" style={{ width: tileSize, height: tileSize }} />;
            const srcRow = Math.floor(tile / SIZE);
            const srcCol = tile % SIZE;
            return (
              <div
                key={tile}
                className={`puzzle-tile${canMove(idx) ? ' movable' : ''}`}
                style={{
                  width: tileSize,
                  height: tileSize,
                  backgroundImage: `url(${photoSrc})`,
                  backgroundSize: `${containerSize}px ${containerSize}px`,
                  backgroundPosition: `-${srcCol * tileSize}px -${srcRow * tileSize}px`,
                }}
                onClick={() => moveTile(idx)}
              />
            );
          })}
        </div>
        <div className="puzzle-info">
          <span>{t('puzzleMoves')}: {moves}</span>
        </div>
        {won && (
          <div className="puzzle-win">
            <img src={photoSrc} alt="" className="puzzle-win-img" style={{ width: containerSize }} />
          </div>
        )}
        <button className="puzzle-close" onClick={onClose}>{t('close')}</button>
      </div>
    </div>
  );
}
