export default async function handler(req, res) {
  const key = process.env.TWELVE_DATA_API_KEY || 'b1e082f789294e8386b69610368832fb';
  let { symbols } = req.query || {};
  if (!symbols) symbols = 'XAU/USD,EUR/USD';

  const symbolList = symbols.split(',').map(s => s.trim());
  const results = {};

  const tdBatch = symbolList.slice(0, 8).join(',');
  try {
    const url = `https://api.twelvedata.com/price?symbol=${encodeURIComponent(tdBatch)}&apikey=${key}`;
    const r = await fetch(url);
    const data = await r.json();

    if (data && typeof data === 'object' && data.status !== 'error') {
      if (data.price) {
        results[tdBatch] = { price: Number(data.price) };
      } else {
        Object.entries(data).forEach(([k, v]) => {
          if (v && v.price) results[k] = { price: Number(v.price) };
        });
      }
    }
  } catch (err) {
    console.error('TwelveData API Error:', err.message);
  }

  // Supplementary public liquidity backup for instant spot matching
  const publicFeeds = [
    { target: 'XAU/USD', query: 'PAXGUSDT' },
    { target: 'EUR/USD', query: 'EURUSDT' },
    { target: 'GBP/USD', query: 'GBPUSDT' }
  ];

  await Promise.all(
    publicFeeds.map(async ({ target, query }) => {
      if (!results[target] && symbolList.includes(target)) {
        try {
          const r = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${query}`);
          const d = await r.json();
          if (d.price) results[target] = { price: Number(d.price) };
        } catch (e) {}
      }
    })
  );

  return res.status(200).json(results);
}
