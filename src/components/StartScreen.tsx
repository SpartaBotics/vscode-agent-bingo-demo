import { useState, useCallback } from 'react';
import { questions } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
}

function samplePreview(count: number): string[] {
  const arr = [...questions];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [showRules, setShowRules] = useState(false);
  const [dimNeon, setDimNeon] = useState(false);
  const [preview, setPreview] = useState(() => samplePreview(4));

  const shufflePreview = useCallback(() => {
    setPreview(samplePreview(4));
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center p-5 sm:p-8">
      <div className="w-full max-w-3xl animate-reveal">
        <div className="cyber-panel rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">

            {/* Left column: headline + value prop + secondary actions */}
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-semibold tracking-[0.26em] text-accent/85">SESSION PROTOCOL</p>
              <h1 className={['mb-2 font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.07em] text-text-primary', !dimNeon && 'neon-heading'].filter(Boolean).join(' ')}>
                Soc Ops
              </h1>
              <p className="mb-5 text-lg font-semibold text-bingo/90">Social Bingo</p>
              <p className="mb-6 text-sm leading-relaxed text-text-muted">
                Break the ice, meet your team, and earn your BINGO. Find people who match the prompts and be the first to complete five in a row.
              </p>

              {/* Secondary actions */}
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowRules(v => !v)}
                  className="flex items-center gap-1.5 rounded-md border border-border-subtle/70 bg-bg-panel-soft/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <span>{showRules ? '▾' : '▸'}</span>
                  {showRules ? 'Hide Rules' : 'Show Rules'}
                </button>
                <button
                  onClick={() => setDimNeon(v => !v)}
                  className="flex items-center gap-1.5 rounded-md border border-border-subtle/70 bg-bg-panel-soft/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  aria-label="Toggle neon intensity"
                >
                  {dimNeon ? '◐ Full Neon' : '◑ Dim Neon'}
                </button>
              </div>

              {showRules && (
                <div className="mt-3 rounded-xl border border-border-subtle/90 bg-bg-panel-soft/75 p-4">
                  <h2 className="mb-2.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">How to play</h2>
                  <ul className="space-y-1.5 text-sm text-text-muted">
                    <li>• Find people who match the prompts</li>
                    <li>• Tap each square when you get a match</li>
                    <li>• Complete five in a row to hit BINGO</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Right column: board preview + CTA */}
            <div className="flex w-full flex-col gap-5 lg:w-60">
              <div className="rounded-xl border border-border-subtle/70 bg-bg-panel-soft/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70">Board Preview</p>
                  <button
                    onClick={shufflePreview}
                    className="rounded px-2 py-1 text-xs text-text-muted transition-colors hover:text-accent"
                    aria-label="Shuffle preview squares"
                  >
                    ⟳ shuffle
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {preview.map((text, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border-subtle/60 bg-bg-panel/70 p-2.5 text-center text-xs leading-snug text-text-muted"
                    >
                      {text}
                    </div>
                  ))}
                  <div className="col-span-2 rounded-lg border border-accent/25 bg-accent/5 p-2 text-center text-xs font-semibold uppercase tracking-widest text-accent/70">
                    Free Space
                  </div>
                </div>
              </div>

              <button
                onClick={onStart}
                className="neon-button w-full rounded-xl px-8 py-3.5 font-display text-lg font-semibold uppercase tracking-[0.18em] text-text-primary"
              >
                Initialize Game
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
