import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div className="cyber-panel w-full max-w-md rounded-2xl p-2.5 sm:p-3.5">
      <div className="grid aspect-square w-full grid-cols-5 gap-1.5 sm:gap-2">
        {board.map((square) => (
          <BingoSquare
            key={square.id}
            square={square}
            isWinning={winningSquareIds.has(square.id)}
            onClick={() => onSquareClick(square.id)}
          />
        ))}
      </div>
    </div>
  );
}
