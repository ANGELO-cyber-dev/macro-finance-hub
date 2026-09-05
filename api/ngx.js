export default async function handler(req, res) {
  const token = process.env.NGN_API_KEY;
  try {
    const response = await fetch('https://api.ngnmarket.com/v1/companies', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch NGX data" });
  }
}
