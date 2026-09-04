# Macro Finance Hub — Live React + Vite MVP

A mobile-first US macro + markets dashboard for African traders.

## Live data integrations

- **FRED**: CPI, Federal Funds Rate, 2-Year Treasury yield, NFP payroll change, unemployment rate.
- **Financial Modeling Prep (FMP)**: US equity quotes, company profiles and economic calendar.
- **CoinGecko**: BTC, ETH and SOL prices + 24h changes.

API credentials are kept server-side in Vercel Functions under `/api`. Do not put provider secrets in `VITE_*` variables.

## Local setup

1. Install Node.js 18+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add your provider keys.
5. Run `npm run dev`.

For local Vite development, the `/api` functions require a Vercel runtime. The easiest local workflow is `vercel dev` after installing the Vercel CLI. Alternatively deploy to Vercel and test there.

## Environment variables

```text
FRED_API_KEY=...
FMP_API_KEY=...
COINGECKO_API_KEY=...   # optional; CoinGecko public endpoint can work without it
```

### Vercel

In Vercel: Project → Settings → Environment Variables. Add the same variables for Production (and Preview if desired), then redeploy.

## Important data notes

FRED requires an API key for web service requests. FRED observations can also be revised, so the UI uses the latest available observations returned by FRED.

CoinGecko's public API supports the `/simple/price` endpoint; polling is intentionally kept at a conservative 60-second interval in the UI.

FMP endpoint availability depends on your FMP plan. If your plan does not include the economic calendar or a requested company metric, the UI will show the API error or `—` instead of fabricating data.

## Production next steps

- Add a database/cache for historical macro snapshots.
- Add release forecasts from a licensed/economics-calendar provider.
- Add authentication and saved watchlists.
- Add USD/NGN and other African FX pairs from a suitable market-data provider.
- Add alerting for CPI/NFP/FOMC surprises.
