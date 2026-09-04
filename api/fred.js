export default async function handler(req, res) {
  const key = process.env.FRED_API_KEY || '6e86d61a91271a60ef92da75259fb7b3';
  const { series = 'DGS2' } = req.query || {};

  try {
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${series}&api_key=${key}&file_type=json&sort_order=desc&limit=5`;
    const r = await fetch(url);
    const data = await r.json();

    if (!data.observations || data.observations.length === 0) {
      return res.status(404).json({ error: 'Series not found' });
    }

    const validObs = data.observations.find(o => o.value !== '.');

    return res.status(200).json({
      series,
      value: validObs ? Number(validObs.value) : null,
      date: validObs ? validObs.date : null
    });
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
