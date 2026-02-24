# 🎉 Soc Ops — Social Bingo

> **Break the ice. Make connections. Get BINGO!**

A fast, mobile-friendly Social Bingo game designed for in-person mixers, team events, and networking sessions. Each player gets a unique randomized board — find people who match the prompts, tap to mark them, and race to get **5 in a row**!

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js 22+](https://img.shields.io/badge/node-22%2B-brightgreen.svg)](https://nodejs.org/)
[![React 19](https://img.shields.io/badge/react-19-61dafb.svg)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/tailwind-v4-06b6d4.svg)](https://tailwindcss.com/)

---

## ✨ Features

- 🃏 **Randomized boards** — every player gets a unique 5×5 card shuffle
- 🆓 **Free space** — center square is always free to kick-start the game
- 🏆 **Instant BINGO detection** — rows, columns, and diagonals all count
- 💾 **Auto-save** — board state persists across refreshes via `localStorage`
- 📱 **Mobile-first** — smooth tap interactions, works great on any phone
- ⚡ **Zero backend** — fully static, deploys to GitHub Pages with one push

---

## 🕹️ How to Play

1. **Share the link** — everyone opens the game on their own device
2. **Mingle!** — walk around and find people who match each square's description
3. **Tap to mark** — tap a square when you've found a match
4. **BINGO!** — get 5 squares in a row (across, down, or diagonal) to win 🎊

---

## 🚀 Quick Start

### Prerequisites

- [Node.js 22](https://nodejs.org/) or higher

### Run locally

```bash
npm install
npm run dev
```

### Build for production

```bash
npm run build
```

Pushes to `main` automatically deploy to **GitHub Pages** via the included workflow.

---

## 🎨 Customization

Edit `src/data/questions.ts` to swap in your own prompts — themed around your event, team, or community:

```ts
export const questions: string[] = [
  "bikes to work",
  "has lived in another country",
  "speaks more than 2 languages",
  // ... add your own!
];
```

**Theme ideas:** Skill Bingo · Personality Bingo · Office Humor · Tech Life · Travel · Fandom · and many more.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first config) |
| Build | [Vite 7](https://vitejs.dev/) |
| Tests | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| Deploy | GitHub Actions → GitHub Pages |

---

## 🧪 Development

```bash
npm run lint    # ESLint
npm run test    # Vitest unit tests
npm run build   # Type-check + production build
```

---

## 📖 Workshop Lab Guide

This project is also used as a **VS Code Agent Lab** demo. If you're running the workshop, see the [Lab Guide](.lab/GUIDE.md) for step-by-step instructions on using GitHub Copilot agent features.

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.
