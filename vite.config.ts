import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-proxy-handler',
      configureServer(server) {
        // 1. FMP Proxy
        server.middlewares.use('/api/fmp', async (req, res) => {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const symbols = urlObj.searchParams.get('symbols') || '^GSPC,^IXIC,^DJI,^VIX';
          const key = process.env.FMP_API_KEY || 'VnV0MFdE3b8IimG5qiw8XleUXopJromz';

          const isIndex = symbols.includes('^') || symbols.includes('DX-Y');
          const targetUrl = isIndex
            ? `https://financialmodelingprep.com/api/v3/quotes/index?apikey=${key}`
            : `https://financialmodelingprep.com/api/v3/quote/${encodeURIComponent(symbols)}?apikey=${key}`;

          try {
            const upstream = await fetch(targetUrl);
            const data = await upstream.json();
            const mapped: Record<string, any> = {};

            if (Array.isArray(data)) {
              data.forEach((item: any) => {
                if (item?.symbol) {
                  mapped[item.symbol] = {
                    symbol: item.symbol,
                    price: Number(item.price),
                    change: Number(item.change),
                    changesPercentage: Number(item.changesPercentage),
                    name: item.name
                  };
                }
              });
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(mapped));
          } catch (e: any) {
            res.statusCode = 502;
            res.end(JSON.stringify({ error: e.message }));
          }
        });

        // 2. Twelve Data Proxy
        server.middlewares.use('/api/twelve', async (req, res) => {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const symbols = urlObj.searchParams.get('symbols') || 'XAU/USD,EUR/USD';
          const key = process.env.TWELVE_DATA_API_KEY || 'b1e082f789294e8386b69610368832fb';

          try {
            const upstream = await fetch(`https://api.twelvedata.com/price?symbol=${encodeURIComponent(symbols)}&apikey=${key}`);
            const data = await upstream.json();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          } catch (e: any) {
            res.statusCode = 502;
            res.end(JSON.stringify({ error: e.message }));
          }
        });

        // 3. FRED Proxy
        server.middlewares.use('/api/fred', async (req, res) => {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const series = urlObj.searchParams.get('series') || 'DGS2';
          const key = process.env.FRED_API_KEY || '6e86d61a91271a60ef92da75259fb7b3';

          try {
            const upstream = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${series}&api_key=${key}&file_type=json&sort_order=desc&limit=5`);
            const data = await upstream.json();
            const valid = data.observations?.find((o: any) => o.value !== '.');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ series, value: valid ? Number(valid.value) : null }));
          } catch (e: any) {
            res.statusCode = 502;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      }
    }
  ]
});
