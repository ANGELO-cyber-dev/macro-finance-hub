export default async function handler(req, res) {
  const key = process.env.FMP_API_KEY || 'VnV0MFdE3b8IimG5qiw8XleUXopJromz';
  let { symbols, symbol } = req.query || {};

  const queryList = symbols || symbol || '^GSPC,^IXIC,^DJI,^VIX';
  const isIndex = queryList.includes('^') || queryList.includes('DX-Y');

  try {
    // If querying indices, use FMP's dedicated index endpoint
    const url = isIndex
      ? `https://financialmodelingprep.com/api/v3/quotes/index?apikey=${key}`
      : `https://financialmodelingprep.com/api/v3/quote/${encodeURIComponent(queryList)}?apikey=${key}`;

    const r = await fetch(url);
    const data = await r.json();

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Unexpected FMP response' });
    }

    const mapped = {};
    data.forEach(item => {
      if (item && item.symbol) {
        mapped[item.symbol] = {
          symbol: item.symbol,
          price: Number(item.price),
          change: Number(item.change),
          changesPercentage: Number(item.changesPercentage),
          name: item.name
        };
      }
    });

    return res.status(200).json(mapped);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
