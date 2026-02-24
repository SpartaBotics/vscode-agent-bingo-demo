interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex min-h-full items-center justify-center p-5 sm:p-8">
      <div className="w-full max-w-md animate-float">
        <div className="cyber-panel rounded-2xl p-6 sm:p-8 text-center">
          <p className="mb-2 text-xs font-semibold tracking-[0.26em] text-accent/85">SESSION PROTOCOL</p>
          <h1 className="neon-heading mb-2 font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.07em] text-text-primary">
            Soc Ops
          </h1>
          <p className="mb-7 text-lg font-semibold text-bingo/90">Social Bingo</p>

          <div className="rounded-xl border border-border-subtle/90 bg-bg-panel-soft/75 p-5 text-left">
            <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent">How to play</h2>
            <ul className="space-y-2 text-base text-text-muted">
              <li>• Find people who match the prompts</li>
              <li>• Tap each square when you get a match</li>
              <li>• Complete five in a row to hit BINGO</li>
            </ul>
          </div>

          <button
            onClick={onStart}
            className="neon-button mt-7 w-full rounded-xl px-8 py-3.5 text-lg font-display font-semibold uppercase tracking-[0.18em] text-text-primary"
          >
            Initialize Game
          </button>
        </div>
      </div>
    </div>
  );
}
