import { useState, useCallback } from 'react';
import { questions } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
}

function randomPreview(count: number): string[] {
  const pool = [...questions];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [showRules, setShowRules] = useState(false);
  const [dimMode, setDimMode] = useState(false);
  const [preview, setPreview] = useState(() => randomPreview(4));

  const shufflePreview = useCallback(() => {
    setPreview(randomPreview(4));
  }, []);

  return (
    <div className={['flex min-h-full items-center justify-center p-5 sm:p-8 transition-opacity duration-300', dimMode && 'opacity-60'].filter(Boolean).join(' ')}>
      <div className="w-full max-w-md animate-float">
        <div className="cyber-panel rounded-2xl p-6 sm:p-8">

          {/* Utility bar */}
          <div className="mb-5 flex items-center justify-between">
            <span className="text-xs font-semibold tracking-[0.22em] text-accent/80 uppercase">Session Protocol</span>
            <button
              onClick={() => setDimMode(d => !d)}
              className="rounded border border-border-subtle px-2 py-0.5 text-xs font-semibold text-text-muted transition-colors hover:border-accent hover:text-accent"
              aria-label={dimMode ? 'Switch to bright mode' : 'Switch to dim mode'}
            >
              {dimMode ? '◑ Bright' : '◑ Dim'}
            </button>
          </div>

          {/* Hero */}
          <div className="mb-6 text-center">
            <h1 className="neon-heading mb-1 font-display text-4xl font-bold uppercase tracking-[0.07em] text-text-primary sm:text-5xl">
              Soc Ops
            </h1>
            <p className="text-lg font-semibold text-bingo/90">Social Bingo</p>
          </div>

          {/* Preview panel */}
          <div className="mb-5 rounded-xl border border-border-subtle/70 bg-bg-panel-soft/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">Card Preview</span>
              <button
                onClick={shufflePreview}
                className="rounded border border-border-subtle px-2 py-0.5 text-xs font-semibold text-text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="Shuffle preview squares"
              >
                ↻ Shuffle
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {preview.map((q) => (
                <div
                  key={q}
                  className="rounded-lg border border-border-subtle/50 bg-bg-panel/70 p-2.5 text-center text-xs leading-tight text-text-muted"
                >
                  {q}
                </div>
              ))}
            </div>
          </div>

          {/* Rules toggle */}
          <div className="mb-5">
            <button
              onClick={() => setShowRules(r => !r)}
              aria-expanded={showRules}
              className="flex w-full items-center gap-2 py-1 text-sm font-semibold text-text-muted transition-colors hover:text-text-primary"
            >
              <span className="text-xs text-accent">{showRules ? '▼' : '▶'}</span>
              How to play
            </button>
            {showRules && (
              <div className="mt-2 rounded-xl border border-border-subtle/80 bg-bg-panel-soft/60 p-4">
                <ul className="space-y-2 text-sm text-text-muted">
                  <li>• Find people who match the prompts</li>
                  <li>• Tap each square when you get a match</li>
                  <li>• Complete five in a row to hit BINGO</li>
                </ul>
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={onStart}
            className="neon-button w-full rounded-xl px-8 py-3.5 font-display text-lg font-semibold uppercase tracking-[0.18em] text-text-primary"
          >
            Initialize Game
          </button>

        </div>
      </div>
    </div>
  );
}
