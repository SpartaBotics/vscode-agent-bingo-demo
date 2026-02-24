# Copilot Instructions for Soc Ops

## Mandatory development checklist
- [ ] Use Node.js 22+ before running tooling (`npm run lint`, `npm run build`, `npm run test`).
- [ ] Run `npm run lint` after code edits.
- [ ] Run `npm run build` for type + production build verification.
- [ ] Run `npm run test` to keep game logic behavior stable.

## Project big picture
- This is a single-page React + TypeScript app with one central state hook and presentational components.
- App flow is `start -> playing -> bingo`, controlled in `src/hooks/useBingoGame.ts` and rendered in `src/App.tsx`.
- Game logic is intentionally separated from UI in `src/utils/bingoLogic.ts`; UI components should not duplicate bingo rules.
- Types are centralized in `src/types/index.ts` and reused by hooks/components/utils.

## State and data flow
- `useBingoGame` is the source of truth for board state, winning line, modal visibility, and transitions.
- Board generation and updates go through pure utility functions (`generateBoard`, `toggleSquare`, `checkBingo`, `getWinningSquareIds`).
- Persistence is localStorage-backed (`bingo-game-state`) with explicit schema/version validation in `useBingoGame`.
- On square click, bingo detection happens immediately and winning state updates are queued via `queueMicrotask`.

## Component boundaries
- Keep `src/components/*` mostly presentational with props-in/events-out patterns.
- `StartScreen`, `GameScreen`, `BingoBoard`, `BingoSquare`, and `BingoModal` should stay UI-focused.
- Add new game mechanics in hook/utils first, then wire to components.

## Styling conventions
- Tailwind v4 is configured via CSS-first setup (`@import 'tailwindcss'` + `@theme`) in `src/index.css`.
- Prefer existing theme tokens (for example `bg-accent`, `bg-marked`) over new hardcoded color classes.
- Use utility classes directly in components; avoid introducing a separate CSS architecture unless needed.

## Design guide
- Current visual direction is **Cyberpunk Neon**: dark atmospheric backgrounds, cyan/magenta accents, and high-contrast UI states.
- Treat `src/index.css` as the single source of truth for design tokens (`@theme`) and shared effect classes (`cyber-panel`, `neon-button`, `neon-heading`, `cyber-grid`).
- Prefer token-driven classes (`bg-bg-panel`, `text-text-muted`, `border-border-subtle`, `text-bingo`) over raw Tailwind color scales.
- Typography hierarchy: use `font-display` for titles/labels that need futuristic emphasis, and `font-body` for interaction copy and body text.
- Motion should stay medium and purposeful (reveal/focus/celebration), avoiding excessive animation on frequently tapped elements.
- Preserve gameplay readability first: marked, winning, and free-space states must remain immediately distinguishable at mobile sizes.
- For new UI surfaces, match the existing panel language (rounded neon-bordered cards, subtle glow, glass-like layers) before introducing new visual motifs.
- Keep accessibility in mind when extending the theme: maintain strong contrast and clear button affordances despite neon effects.

## Tests and quality gates
- Vitest runs in `jsdom` with global APIs enabled; setup is in `src/test/setup.ts`.
- Existing tests in `src/utils/bingoLogic.test.ts` emphasize pure logic contracts; follow this pattern for behavior changes.
- When game rules change, update/add utility tests first, then adapt hook/component behavior.

## Build and runtime workflow
- Scripts: `dev` (Vite), `build` (`tsc -b && vite build`), `lint` (ESLint flat config), `test` (Vitest run).
- Vite base path is environment-aware via `VITE_REPO_NAME` in `vite.config.ts` for GitHub Pages deployments.
- If host shell cannot switch to Node 22 yet, a temporary fallback is running scripts with `npx -y node@22 ...`.

## Agent-specific guidance
- Make targeted, minimal edits; preserve current file structure and naming unless a task explicitly requests refactor.
- Prefer extending existing patterns (hook + utils + typed props) over introducing new state libraries.
- When adding modes/features, ensure `GameState`, persistence validation, and UI conditionals stay in sync.
