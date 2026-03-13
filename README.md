# AdPulse PH — Meta Ads Manager

Manage all your Facebook/Meta ad accounts, Business Managers, and Fan Pages from one dashboard. Built for Philippine advertisers, media buyers, and agencies.

## Project Structure

```
adpulse/
├── extension/          # Chrome Extension (Plasmo + React + TypeScript)
│   ├── src/
│   │   ├── popup.tsx                 # Main popup UI (3 tabs)
│   │   ├── components/
│   │   │   ├── AccountTable.tsx      # Sortable/filterable account table + CSV export
│   │   │   └── StatusBadge.tsx       # Color-coded status badges
│   │   ├── contents/
│   │   │   └── facebook-token.ts     # Content script: captures FB access token
│   │   ├── background/
│   │   │   └── index.ts             # Service worker: API calls, 30-min auto-refresh
│   │   └── lib/
│   │       ├── types.ts             # TypeScript interfaces
│   │       ├── facebook-api.ts      # Graph API v21.0 wrappers
│   │       └── storage.ts           # chrome.storage.local helpers
│   └── package.json
├── web/                # Landing Page + Dashboard (Next.js 14)
│   ├── src/app/
│   │   ├── page.tsx                 # Landing page (features, pricing, FAQ)
│   │   ├── dashboard/page.tsx       # Web dashboard (4 tabs, demo data)
│   │   ├── privacy/page.tsx         # Privacy Policy (required for CWS)
│   │   └── terms/page.tsx           # Terms of Service
│   ├── vercel.json                  # Vercel deployment config
│   └── package.json
├── api/                # Backend API (Express + TypeScript)
│   ├── src/
│   │   ├── index.ts                 # Server entry + route mounting
│   │   ├── middleware/auth.ts       # JWT auth middleware
│   │   └── routes/
│   │       ├── auth.ts              # POST /login (FB token → JWT)
│   │       ├── accounts.ts          # GET /accounts, /business-managers, /pages, /health
│   │       ├── export.ts            # GET /csv (CSV export)
│   │       └── payments.ts          # PayMongo checkout + webhooks
│   ├── Dockerfile                   # Multi-stage Docker build
│   ├── railway.toml                 # Railway deployment config
│   └── package.json
└── chrome-web-store-listing.md      # CWS listing copy + screenshot guide
```

## Quick Start (Development)

### Prerequisites
- Node.js 18+ and npm
- A Facebook account with ad account access

### 1. Chrome Extension
```bash
cd extension
npm install
npm run dev        # Dev mode with hot reload (loads in chrome://extensions)
```
Load the unpacked extension: Chrome → Extensions → Developer Mode → Load Unpacked → select `extension/build/chrome-mv3-dev`

### 2. Web (Landing + Dashboard)
```bash
cd web
cp .env.example .env.local
npm install
npm run dev        # http://localhost:3000
```

### 3. API Server
```bash
cd api
cp .env.example .env
# Edit .env with your JWT_SECRET and PayMongo keys
npm install
npm run dev        # http://localhost:3001
```

## Deployment

### Deploy Web to Vercel
```bash
cd web
npx vercel --prod
```
Or connect the repo on [vercel.com](https://vercel.com):
- Framework: Next.js
- Root Directory: `web`
- Environment variable: `NEXT_PUBLIC_API_URL` = your API URL

### Deploy API to Railway
```bash
cd api
# Railway auto-detects the Dockerfile
railway up
```
Or connect the repo on [railway.app](https://railway.app):
- Root Directory: `api`
- Set environment variables: `JWT_SECRET`, `FRONTEND_URL`, `PAYMONGO_SECRET_KEY`
- Health check: `/api/health`

### Deploy API to Render (Alternative)
- New Web Service → connect repo → Root Directory: `api`
- Build: `npm ci && npm run build`
- Start: `node dist/index.js`
- Set environment variables as above

### Submit Extension to Chrome Web Store
1. `cd extension && npm run build && npm run package`
2. Go to [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole) ($5 one-time fee)
3. Upload the `.zip` from `extension/build`
4. Use copy from `chrome-web-store-listing.md`
5. Privacy policy URL: `https://yourdomain.com/privacy`

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | No | Exchange FB token for JWT |
| GET | `/api/accounts` | JWT | List all ad accounts |
| GET | `/api/accounts/business-managers` | JWT | List Business Managers |
| GET | `/api/accounts/pages` | JWT | List Fan Pages |
| GET | `/api/accounts/health` | JWT | Account health summary |
| GET | `/api/export/csv` | JWT | Export accounts to CSV |
| GET | `/api/payments/plans` | No | List pricing plans |
| POST | `/api/payments/checkout` | JWT | Create PayMongo checkout |
| POST | `/api/payments/webhook` | No | PayMongo webhook handler |
| GET | `/api/payments/status` | JWT | Subscription status |
| GET | `/api/health` | No | Health check |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Extension | Plasmo, React 18, TypeScript, Tailwind CSS |
| Web | Next.js 14 (App Router), Tailwind CSS |
| API | Express, TypeScript, JWT |
| Facebook | Marketing API v21.0 (Graph API) |
| Payments | PayMongo (GCash, Maya, GrabPay, Cards, BillEase) |
| Deploy | Vercel (web), Railway/Render (API), Chrome Web Store |

## Environment Variables

### API (`api/.env`)
```
PORT=3001
JWT_SECRET=your-secure-secret
FRONTEND_URL=https://adpulse.ph
PAYMONGO_SECRET_KEY=sk_live_xxx
PAYMONGO_PUBLIC_KEY=pk_live_xxx
PAYMONGO_WEBHOOK_SECRET=whsec_xxx
```

### Web (`web/.env.local`)
```
NEXT_PUBLIC_API_URL=https://api.adpulse.ph
```

## Security Architecture

- **Zero server storage** — All FB data stays in `chrome.storage.local`
- **Minimal permissions** — Only `facebook.com`, `business.facebook.com`, `adsmanager.facebook.com`
- **No wildcard hosts** — We never request `<all_urls>`
- **No dangerous permissions** — No `webRequest`, `tabs`, `cookies`, or `webNavigation`
- **JWT wrapping** — FB access tokens wrapped in short-lived JWTs, never persisted
- **PayMongo handles PCI** — We never touch card numbers or wallet credentials

## Pricing (Philippine Peso)

| Plan | Price | Accounts | Key Features |
|------|-------|----------|-------------|
| Free | ₱0/forever | 5 | Status checker, search, sort |
| Starter | ₱499/mo | 50 | CSV export, health alerts, web dashboard |
| Pro | ₱1,499/mo | Unlimited | Bulk actions, API access, 3 team seats |
| Agency | ₱3,999/mo | Unlimited | White-label, unlimited team, dedicated support |

## Pre-Launch Checklist

- [ ] Register Facebook App at [developers.facebook.com](https://developers.facebook.com)
  - Permissions needed: `ads_management`, `ads_read`, `business_management`, `pages_show_list`
- [ ] Deploy API to Railway/Render
- [ ] Deploy web to Vercel, connect custom domain
- [ ] Create PayMongo account at [paymongo.com](https://paymongo.com)
- [ ] Set up PayMongo webhook → `https://api.yourdomain.com/api/payments/webhook`
- [ ] Build and submit Chrome Extension ($5 developer fee)
- [ ] Register domain (adpulse.ph)
- [ ] Set up transactional email (welcome, subscription confirmations)

## License

MIT
