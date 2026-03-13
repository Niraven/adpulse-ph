# AdPulse — Meta Ads Manager

Manage all your Facebook/Meta ad accounts, Business Managers, and Fan Pages from one dashboard.

## Project Structure

```
adpulse/
├── extension/     # Chrome Extension (Plasmo + React + TypeScript)
│   ├── src/
│   │   ├── popup.tsx              # Main popup UI
│   │   ├── components/            # React components
│   │   ├── contents/              # Content scripts (FB token capture)
│   │   ├── background/            # Service worker (API calls, caching)
│   │   └── lib/                   # Shared types, FB API, storage
│   └── package.json
├── web/           # Landing Page + Web Dashboard (Next.js 14)
│   ├── src/app/
│   │   ├── page.tsx               # Landing page
│   │   └── dashboard/page.tsx     # Web dashboard
│   └── package.json
└── api/           # Backend API (Express + TypeScript)
    ├── src/
    │   ├── index.ts               # Server entry point
    │   ├── routes/                 # Auth, accounts, export routes
    │   └── middleware/             # JWT auth middleware
    └── package.json
```

## Quick Start

### Chrome Extension
```bash
cd extension
npm install
npm run dev      # Dev mode with hot reload
npm run build    # Production build
npm run package  # Create .zip for Chrome Web Store
```

### Web (Landing Page + Dashboard)
```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
```

### API Server
```bash
cd api
cp .env.example .env  # Edit with your secrets
npm install
npm run dev      # http://localhost:3001
```

## Tech Stack
- **Extension**: Plasmo, React 18, TypeScript, Tailwind CSS
- **Web**: Next.js 14 (App Router), Tailwind CSS
- **API**: Express, TypeScript, JWT, Facebook Marketing API
- **Payments**: PayMongo (GCash, Maya, Cards)

## Security
- All ad account data stays in the browser (chrome.storage.local)
- Extension only requests permissions for Facebook domains
- No wildcard host permissions
- Backend only stores JWT tokens (no FB data persisted)
