export default async function handler(req, res) {
  const url = new URL('https://api.coingecko.com/api/v3/simple/price');
  url.searchParams.set('ids', 'bitcoin,ethereum,solana');
  url.searchParams.set('vs_currencies', 'usd');
  url.searchParams.set('include_24hr_change', 'true');
  url.searchParams.set('include_last_updated_at', 'true');
  if (process.env.COINGECKO_API_KEY) url.searchParams.set('x_cg_demo_api_key', process.env.COINGECKO_API_KEY);

  try {
    const r = await fetch(url, { headers: process.env.COINGECKO_API_KEY ? { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY } : {} });
    if (!r.ok) throw new Error(`CoinGecko returned ${r.status}`);
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=60');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}
