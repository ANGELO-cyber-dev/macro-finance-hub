// Real Production API Connectors for FRED and FMP
const FRED_KEY = import.meta.env.VITE_FRED_API_KEY || '';
const FMP_KEY = import.meta.env.VITE_FMP_API_KEY || '';

export async function fetchFredSeries(seriesId: string) {
  if (!FRED_KEY) return { value: 'API Key Missing', date: 'N/A' };
  try {
    const res = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_KEY}&file_type=json`);
    const data = await res.json();
    const obs = data.observations?.[data.observations.length - 1];
    return { value: obs?.value || 'N/A', date: obs?.date || 'N/A' };
  } catch (e) {
    console.error('FRED fetch error:', e);
    return { value: 'Error', date: 'N/A' };
  }
}

export async function fetchFmpQuote(symbol: string) {
  if (!FMP_KEY) return null;
  try {
    const res = await fetch(`https://financialmodelingprep.com/stable/quote?symbol=${symbol}&apikey=${FMP_KEY}`);
    const data = await res.json();
    return data?.[0] || null;
  } catch (e) {
    console.error('FMP fetch error:', e);
    return null;
  }
}
