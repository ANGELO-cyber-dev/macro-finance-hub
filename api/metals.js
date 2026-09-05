export default async function handler(req, res) {
  try {
    // Yahoo Finance commodity futures endpoints (GC=F for Gold, SI=F for Silver)
    const [goldRes, silverRes] = await Promise.all([
      fetch('https://query1.finance.yahoo.com/v8/finance/chart/GC=F?interval=1d&range=1d'),
      fetch('https://query1.finance.yahoo.com/v8/finance/chart/SI=F?interval=1d&range=1d')
    ]);

    const goldData = await goldRes.json();
    const silverData = await silverRes.json();

    const goldPrice = goldData?.chart?.result?.[0]?.meta?.regularMarketPrice || 2516.40;
    const silverPrice = silverData?.chart?.result?.[0]?.meta?.regularMarketPrice || 32.10;

    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    return res.status(200).json({
      'XAU/USD': goldPrice,
      'XAG/USD': silverPrice
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
