import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';

function App() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();

  return (
    <div className="relative min-h-full overflow-hidden cyber-grid">
      <div className="pointer-events-none absolute -left-28 top-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-36 h-64 w-64 rounded-full bg-bingo/12 blur-3xl" />

      <div className="relative z-10 min-h-full animate-reveal">
        {gameState === 'start' ? (
          <StartScreen onStart={startGame} />
        ) : (
          <>
            <GameScreen
              board={board}
              winningSquareIds={winningSquareIds}
              hasBingo={gameState === 'bingo'}
              onSquareClick={handleSquareClick}
              onReset={resetGame}
            />
            {showBingoModal && (
              <BingoModal onDismiss={dismissModal} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
