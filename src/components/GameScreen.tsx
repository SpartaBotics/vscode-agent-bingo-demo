import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex min-h-full flex-col bg-transparent">
      <header className="mx-4 mt-4 flex items-center justify-between rounded-xl border border-border-subtle/95 bg-bg-panel/85 p-3 shadow-neon">
        <button
          onClick={onReset}
          className="rounded-lg border border-border-subtle px-3 py-1.5 text-sm font-semibold tracking-wide text-text-muted transition-colors hover:text-accent active:bg-bg-panel-soft"
        >
          ← Back
        </button>
        <h1 className="neon-heading font-display text-base font-bold uppercase tracking-[0.16em] text-text-primary">Soc Ops</h1>
        <div className="w-16" />
      </header>

      <p className="px-6 py-3 text-center text-sm font-medium tracking-wide text-text-muted">
        Match a person to a prompt, then activate that square.
      </p>

      {hasBingo && (
        <div className="mx-4 rounded-lg border border-bingo/70 bg-bingo/12 py-2 text-center text-sm font-display font-semibold uppercase tracking-[0.17em] text-bingo shadow-[0_0_20px_rgb(255_79_216_/_0.26)] animate-reveal">
          ✦ Bingo Line Locked In ✦
        </div>
      )}

      <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
