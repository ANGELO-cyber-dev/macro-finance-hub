export default async function handler(req, res) {
  const key = process.env.TWELVE_DATA_API_KEY || 'b1e082f789294e8386b69610368832fb';
  const symbols = req.query.symbols || 'XAU/USD,XAG/USD,EUR/USD,GBP/USD,USD/JPY';

  try {
    const upstream = await fetch(
      `https://api.twelvedata.com/price?symbol=${encodeURIComponent(symbols)}&apikey=${key}`
    );
    const data = await upstream.json();

    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
