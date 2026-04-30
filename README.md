# Support Operations Dashboard

A static, single-page Next.js dashboard surfacing a Q1 2026 customer support analysis built on synthetic ticket data.

## Live demo

Deployed on Vercel: see repository description for the live URL.

## The story

Across 16,000 tickets and four channels, chat carries 43% of volume but generates 50% of cost, 60% of negative CSAT, and 100% of reopens. The dashboard walks through that finding from headline to recommendation:

1. Top-line KPIs (16,000 tickets, 66.4% CSAT, 12.7 min AHT, 16.9% reopen rate)
2. Channel scorecard, four panels plus detail table
3. Monthly trend showing flat KPIs (the issue is structural, not a Q1 decline)
4. AHT vs CSAT combo chart (long tickets are bad tickets)
5. Issue-type quadrant splitting complexity vs wait-state failure modes
6. Channel x issue heatmap (CSAT diverging color scale)
7. Five operational recommendations
8. Data quality footer

## Tech

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- Recharts 3
- TypeScript

Static site, no API routes, no runtime data fetching. Pre-aggregated data lives at `app/lib/dashboard.json` and is bundled at build time.

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deploy

Push to GitHub and import the repo at vercel.com, or run `npx vercel` from the project root. Default Next.js settings work without modification.

## Data

The dataset is synthetic and does not represent any real company's operations. Channel volumes, CSAT scores, handle times, and reopen rates were generated to match a plausible support-operations distribution.
