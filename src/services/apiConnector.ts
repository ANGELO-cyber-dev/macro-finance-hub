// Real-world API Connectors for Deriv, FRED, and FMP
const FRED_API_KEY = import.meta.env.VITE_FRED_API_KEY || '';
const FMP_API_KEY = import.meta.env.VITE_FMP_API_KEY || '';
const DERIV_APP_ID = import.meta.env.VITE_DERIV_APP_ID || '1089'; // Default public test app ID if needed

export async function fetchFredMacroData(seriesId: string = 'CPIAUCSL') {
  if (!FRED_API_KEY) {
    console.warn('FRED API key is not configured. Falling back to baseline proxy data.');
    return null;
  }
  try {
    const response = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json`);
    const data = await response.json();
    return data.observations?.[data.observations.length - 1] || null;
  } catch (error) {
    console.error('Error fetching FRED data:', error);
    return null;
  }
}

export async function fetchFmpStockQuote(symbol: string) {
  if (!FMP_API_KEY) {
    console.warn('FMP API key is not configured.');
    return null;
  }
  try {
    const response = await fetch(`https://financialmodelingprep.com/stable/quote?symbol=${symbol}&apikey=${FMP_API_KEY}`);
    const data = await response.json();
    return data?.[0] || null;
  } catch (error) {
    console.error('Error fetching FMP stock quote:', error);
    return null;
  }
}

export function createDerivWebSocket(onMessage: (data: any) => void) {
  const ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${DERIV_APP_ID}`);
  
  ws.onopen = () => {
    // Subscribe to active forex ticks or symbols
    ws.send(JSON.stringify({ ticks: 'frxEURUSD' }));
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  return ws;
}
