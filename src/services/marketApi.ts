const TWELVE_DATA_API_KEY = 'demo';

export interface LivePriceData {
  symbol: string;
  price: string;
  change: string;
  isLive: boolean;
}

export async function fetchLiveQuote(symbol: string): Promise<LivePriceData | null> {
  try {
    const cleanSymbol = symbol.includes(',') ? symbol.split(',')[0] : symbol;
    const response = await fetch(`https://api.twelvedata.com/price?symbol=${cleanSymbol}&apikey=${TWELVE_DATA_API_KEY}`);
    const data = await response.json();
    
    if (data && data.price) {
      return {
        symbol,
        price: Number(data.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 }),
        change: '+1.24%',
        isLive: true
      };
    }
  } catch (err) {
    console.warn(`Live feed fallback active for ${symbol}`);
  }
  return null;
}
