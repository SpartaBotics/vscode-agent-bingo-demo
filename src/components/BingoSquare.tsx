import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex min-h-[60px] select-none items-center justify-center rounded-md border p-1 text-center text-xs leading-tight transition-all duration-200 sm:min-h-[66px]';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'border-bingo bg-bingo/18 text-bingo shadow-[0_0_16px_rgb(255_79_216_/_0.35)]'
      : 'border-marked-border bg-marked text-accent shadow-[0_0_14px_rgb(0_240_255_/_0.18)]'
    : 'border-border-subtle bg-bg-panel-soft text-text-primary hover:border-accent/70 hover:text-accent active:translate-y-px';

  const freeSpaceClasses = square.isFreeSpace ? 'font-display text-sm font-semibold tracking-[0.09em] text-accent' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute right-0.5 top-0.5 text-xs text-accent">✦</span>
      )}
    </button>
  );
}
