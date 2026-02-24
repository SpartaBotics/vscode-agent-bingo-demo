import { useState, useCallback } from 'react';
import { questions } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
}

const STEPS = [
  { num: '01', title: 'Scout', body: 'Find colleagues who match each prompt on your board.' },
  { num: '02', title: 'Mark', body: 'Tap a square when you find your match — build the grid.' },
  { num: '03', title: 'Bingo', body: 'Five in a row triggers the BINGO celebration sequence.' },
] as const;

function sample(arr: string[], n: number): string[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [rulesOpen, setRulesOpen] = useState(false);
  const [useMagenta, setUseMagenta] = useState(false);
  const [previewCards, setPreviewCards] = useState<string[]>(() => sample(questions, 6));

  const shuffleCards = useCallback(() => setPreviewCards(sample(questions, 6)), []);

  const accentText = useMagenta ? 'text-bingo' : 'text-accent';
  const accentTextFaint = useMagenta ? 'text-bingo/60' : 'text-accent/60';
  const accentTextMid = useMagenta ? 'text-bingo/70' : 'text-accent/70';
  const accentBorder = useMagenta ? 'border-bingo/20' : 'border-accent/20';

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-7 px-4 py-10 sm:px-8">

      {/* ── Hero ── */}
      <header className="w-full max-w-xl text-center">
        <p className="mb-2 text-[10px] font-semibold tracking-[0.3em] uppercase text-text-muted">
          Session Protocol
        </p>
        <h1 className={`neon-heading font-display text-5xl sm:text-7xl font-bold uppercase tracking-[0.07em] ${accentText}`}>
          Soc Ops
        </h1>
        <p className="mt-1 text-xl font-semibold text-text-muted tracking-wide">Social Bingo</p>

        {/* Theme switcher */}
        <div
          className="mt-4 inline-flex items-center gap-1 rounded-full border border-border-subtle/60 bg-bg-panel/70 p-1"
          role="group"
          aria-label="Accent theme"
        >
          <button
            onClick={() => setUseMagenta(false)}
            aria-pressed={!useMagenta}
            className={`rounded-full px-3 py-0.5 text-[11px] font-display tracking-[0.15em] transition-all duration-200 ${
              !useMagenta
                ? 'bg-accent/20 text-accent border border-accent/50'
                : 'text-text-muted hover:text-accent/70'
            }`}
          >
            CYAN
          </button>
          <button
            onClick={() => setUseMagenta(true)}
            aria-pressed={useMagenta}
            className={`rounded-full px-3 py-0.5 text-[11px] font-display tracking-[0.15em] transition-all duration-200 ${
              useMagenta
                ? 'bg-bingo/20 text-bingo border border-bingo/50'
                : 'text-text-muted hover:text-bingo/70'
            }`}
          >
            MAGENTA
          </button>
        </div>
      </header>

      {/* ── Journey steps ── */}
      <section className="w-full max-w-xl" aria-label="How it works">
        <div className="grid grid-cols-3 gap-3">
          {STEPS.map(({ num, title, body }) => (
            <div key={num} className="cyber-panel rounded-xl p-3 sm:p-4 text-center">
              <span className={`block font-display text-[10px] font-bold tracking-[0.25em] ${accentTextFaint}`}>
                {num}
              </span>
              <p className="mt-0.5 font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-text-primary">
                {title}
              </p>
              <p className="mt-1 text-[11px] sm:text-xs text-text-muted leading-snug">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Board preview ── */}
      <section className="w-full max-w-xl" aria-label="Board preview">
        <div className="mb-2 flex items-center justify-between">
          <p className={`text-[10px] font-semibold tracking-[0.25em] uppercase ${accentTextMid}`}>
            Board Preview
          </p>
          <button
            onClick={shuffleCards}
            aria-label="Shuffle board preview cards"
            className={`text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors ${
              useMagenta ? 'text-bingo/60 hover:text-bingo' : 'text-accent/60 hover:text-accent'
            }`}
          >
            ↺ Shuffle
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {previewCards.map((card) => (
            <div
              key={card}
              className={`cyber-panel rounded-lg p-2 text-center border ${accentBorder}`}
            >
              <p className="text-[11px] text-text-muted leading-snug">{card}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rules toggle ── */}
      <section className="w-full max-w-xl" aria-label="Rules">
        <button
          onClick={() => setRulesOpen((v) => !v)}
          aria-expanded={rulesOpen}
          className={`flex items-center gap-2 text-sm font-semibold tracking-[0.15em] uppercase transition-colors ${
            useMagenta ? 'text-bingo/70 hover:text-bingo' : 'text-accent/70 hover:text-accent'
          }`}
        >
          <span className="text-xs">{rulesOpen ? '▾' : '▸'}</span>
          How to play
        </button>
        {rulesOpen && (
          <div className="mt-3 cyber-panel rounded-xl p-4">
            <ul className="space-y-2 text-sm text-text-muted">
              <li>• Find people who match the prompts on your board</li>
              <li>• Tap each square when you get a match</li>
              <li>• Complete five in a row to hit BINGO</li>
              <li>• The center square starts marked as a free space</li>
            </ul>
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <div className="w-full max-w-xl">
        <button
          onClick={onStart}
          className="neon-button w-full rounded-xl px-8 py-4 text-lg font-display font-semibold uppercase tracking-[0.18em] text-text-primary"
        >
          Initialize Game
        </button>
      </div>
    </div>
  );
}
