# Star Wars Explorer

A single-page application for exploring the Star Wars universe — films, characters, planets, and starships.

Built with React 19, TypeScript, and the [SWAPI](https://swapi.info) open API. UI/UX design, collectible 3D cards, and all stylized character images are original work.

**[Live Demo](https://star-wars-explorer-chi.vercel.app/)** · **[Repository](https://github.com/ayanbaryshev02-dev/star-wars-explorer)**

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 19, TypeScript (strict) |
| Styling | Tailwind CSS 3, custom fonts (ITC Avant Garde, Stellar) |
| Routing | React Router DOM 7 |
| HTTP | Axios with in-memory cache |
| Build | Vite 7 |
| Animations | CSS @keyframes, Tailwind utilities |

## Features

- **Responsive design** — adaptive layouts for phone, tablet, and desktop via JS-based breakpoint system
- **Modal overlay architecture** — detail cards open over the home page, preserving scroll position and cached data
- **Shareable URLs** — each entity is accessible via `?type=character&id=10` search params
- **In-memory API cache** — every entity is fetched once per session; opening a card is instant if data was already loaded
- **Swipe navigation** — touch gestures on mobile for both section pagination and modal card switching
- **3D card rotation** — collectible character cards respond to mouse movement on desktop
- **Animated lightsaber accents** — color-coded SVG lightsabers with CSS clip-path ignite animation
- **Original design** — custom UI layout, hand-stylized character photos, and collectible card artwork

## Quick Start

```bash
git clone https://github.com/ayanbaryshev02-dev/star-wars-explorer.git
cd star-wars-explorer
npm install
npm run dev
```

Open `http://localhost:5173`

## Project Structure

```
src/
├── components/          # UI components (desktop/mobile variants)
│   ├── desktop/         # Desktop-specific card and modal components
│   ├── mobile/          # Mobile-specific card and modal components
│   └── overlays/        # Detail overlay components (Film, Character, Planet, Starship)
├── config/              # Responsive layout configuration
├── constants/           # Image mappings, display settings, entity IDs
├── hooks/               # Custom hooks (useBreakpoint, useCharacters, useCardRotation, etc.)
├── pages/               # Page components (Home, DetailOverlay, NotFound)
├── sections/            # Home page sections with desktop/mobile variants
├── services/            # API layer with caching (swapi.ts)
└── types/               # TypeScript interfaces
```

## Architecture

**Routing** — Single route (`/`) with search params for detail views. Home stays mounted, modals render on top.

**Data flow** — Sections call custom hooks → hooks use cached service functions → `Promise.all` for parallel requests → `useState` stores results → cards render → click sets search params → overlay fetches (cache hit) and renders modal.

**Responsiveness** — `useBreakpoint` hook detects 8 device types by window width. A centralized `RESPONSIVE_CONFIG` maps each device to grid columns, gaps, card sizes, and items per page. Components use a proxy pattern to render desktop or mobile variants.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## API

Data is fetched from [SWAPI](https://swapi.info/api) (Star Wars API). No API key required.

## Author

**Ayan Baryshev** — [GitHub](https://github.com/ayanbaryshev02-dev)

Design, stylized artwork, and development by the author.