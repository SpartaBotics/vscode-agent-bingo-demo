import { useState, useCallback, useEffect } from 'react';
import { questions } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
}

function getRandomPrompts(count: number): string[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

const THEME_KEY = 'bingo-theme';

export function StartScreen({ onStart }: StartScreenProps) {
  const [showRules, setShowRules] = useState(false);
  const [previewPrompts, setPreviewPrompts] = useState<string[]>(() =>
    getRandomPrompts(3)
  );
  const [isDimmed, setIsDimmed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(THEME_KEY) === 'dim';
  });

  useEffect(() => {
    document.body.classList.toggle('theme-dim', isDimmed);
    try {
      localStorage.setItem(THEME_KEY, isDimmed ? 'dim' : 'vivid');
    } catch {
      // ignore storage errors
    }
  }, [isDimmed]);

  const shufflePreview = useCallback(() => {
    setPreviewPrompts(getRandomPrompts(3));
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center p-5 sm:p-8">
      <div className="w-full max-w-sm">

        {/* Theme toggle */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setIsDimmed((d) => !d)}
            aria-label={isDimmed ? 'Switch to vivid theme' : 'Switch to dim theme'}
            className="rounded-lg border border-border-subtle/60 px-3 py-1 text-xs font-semibold tracking-widest text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            {isDimmed ? 'VIVID' : 'DIM'}
          </button>
        </div>

        {/* Hero */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold tracking-[0.26em] text-accent/85">
            SESSION PROTOCOL
          </p>
          <h1 className="neon-heading mb-2 font-display text-5xl font-bold uppercase tracking-[0.07em] text-text-primary">
            Soc Ops
          </h1>
          <p className="text-base text-text-muted">
            Connect with the people around you
          </p>
        </div>

        {/* Preview prompts */}
        <div className="mb-5 rounded-xl border border-border-subtle/60 bg-bg-panel-soft/50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">
              Sample Prompts
            </span>
            <button
              onClick={shufflePreview}
              aria-label="Shuffle sample prompts"
              className="text-xs text-text-muted transition-colors hover:text-accent"
            >
              ↻ Shuffle
            </button>
          </div>
          <ul className="space-y-2">
            {previewPrompts.map((prompt) => (
              <li key={prompt} className="flex items-start gap-2 text-sm text-text-muted">
                <span className="mt-px shrink-0 text-accent/50">›</span>
                <span>{prompt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="neon-button mb-4 w-full rounded-xl px-8 py-3.5 font-display text-lg font-semibold uppercase tracking-[0.18em] text-text-primary"
        >
          Initialize Game
        </button>

        {/* Rules toggle */}
        <button
          onClick={() => setShowRules((v) => !v)}
          className="w-full text-center text-sm text-text-muted transition-colors hover:text-accent"
          aria-expanded={showRules}
        >
          {showRules ? '▲ Hide Rules' : '▼ How to Play'}
        </button>

        {showRules && (
          <div className="mt-3 rounded-xl border border-border-subtle/90 bg-bg-panel-soft/75 p-4 text-left">
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <span className="text-accent/60">•</span>Find people who match the prompts
              </li>
              <li className="flex gap-2">
                <span className="text-accent/60">•</span>Tap each square when you get a match
              </li>
              <li className="flex gap-2">
                <span className="text-accent/60">•</span>Complete five in a row to hit BINGO
              </li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
