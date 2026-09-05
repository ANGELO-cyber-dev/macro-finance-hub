export default async function handler(req, res) {
  const { series_id } = req.query;
  if (!series_id) {
    return res.status(400).json({ error: "Missing series_id" });
  }
  const apiKey = process.env.FRED_API_KEY;
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}&api_key=${apiKey}&file_type=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
