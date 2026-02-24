interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="cyber-panel w-full max-w-xs animate-[reveal_260ms_ease-out] rounded-2xl p-6 text-center shadow-neon">
        <div className="mb-3 text-5xl animate-float">✦</div>
        <h2 className="neon-heading mb-2 font-display text-3xl font-bold uppercase tracking-[0.19em] text-bingo">BINGO</h2>
        <p className="mb-6 text-lg text-text-muted">Signal complete. You closed a full line.</p>

        <button
          onClick={onDismiss}
          className="neon-button w-full rounded-xl px-6 py-3 font-display text-base font-semibold uppercase tracking-[0.14em] text-text-primary"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
