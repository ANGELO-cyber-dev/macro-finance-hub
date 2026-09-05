export interface AssetMarketItem {
  symbol: string;
  name: string;
  category: 'FOREX' | 'COMMODITIES' | 'NYSE' | 'NGX';
  price: string;
  change: string;
  bias: string;
}

export const allMarketsData: AssetMarketItem[] = [
  // FOREX MAJORS & CROSSES
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', category: 'FOREX', price: '1.0845', change: '+0.15%', bias: 'Neutral' },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', category: 'FOREX', price: '1.2680', change: '+0.28%', bias: 'Bullish' },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', category: 'FOREX', price: '155.20', change: '-0.32%', bias: 'Bearish' },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', category: 'FOREX', price: '0.6620', change: '+0.42%', bias: 'Bullish' },
  { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', category: 'FOREX', price: '1.3650', change: '-0.11%', bias: 'Neutral' },
  { symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', category: 'FOREX', price: '0.6110', change: '+0.19%', bias: 'Bullish' },
  { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', category: 'FOREX', price: '0.9020', change: '-0.05%', bias: 'Neutral' },
  { symbol: 'EUR/GBP', name: 'Euro / British Pound', category: 'FOREX', price: '0.8550', change: '-0.08%', bias: 'Bearish' },

  // COMMODITIES
  { symbol: 'XAU/USD', name: 'Spot Gold / US Dollar', category: 'COMMODITIES', price: '$2,348.50', change: '+1.45%', bias: 'Bullish' },
  { symbol: 'XAG/USD', name: 'Spot Silver / US Dollar', category: 'COMMODITIES', price: '$29.65', change: '+2.10%', bias: 'Bullish' },
  { symbol: 'WTI/USD', name: 'WTI Crude Oil', category: 'COMMODITIES', price: '$78.40', change: '-0.85%', bias: 'Bearish' },
  { symbol: 'BRENT/USD', name: 'Brent Crude Oil', category: 'COMMODITIES', price: '$82.30', change: '-0.62%', bias: 'Bearish' },
  { symbol: 'COPPER', name: 'Copper Spot', category: 'COMMODITIES', price: '$4.42', change: '+0.78%', bias: 'Bullish' },
  { symbol: 'NATGAS', name: 'Natural Gas', category: 'COMMODITIES', price: '$2.28', change: '+1.10%', bias: 'Neutral' },

  // NYSE STOCKS
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', category: 'NYSE', price: '$210.40', change: '+0.85%', bias: 'Bullish' },
  { symbol: 'XOM', name: 'Exxon Mobil Corp.', category: 'NYSE', price: '$116.80', change: '-0.40%', bias: 'Neutral' },
  { symbol: 'BRK.A', name: 'Berkshire Hathaway', category: 'NYSE', price: '$620,000', change: '+0.25%', bias: 'Bullish' },
  { symbol: 'V', name: 'Visa Inc.', category: 'NYSE', price: '$278.10', change: '+1.15%', bias: 'Bullish' },
  { symbol: 'WMT', name: 'Walmart Inc.', category: 'NYSE', price: '$67.90', change: '+0.50%', bias: 'Bullish' },
  { symbol: 'UNH', name: 'UnitedHealth Group', category: 'NYSE', price: '$512.30', change: '-0.90%', bias: 'Bearish' },

  // NIGERIAN STOCK EXCHANGE (NGX)
  { symbol: 'DANGCEM', name: 'Dangote Cement Plc', category: 'NGX', price: '₦1,034.00', change: '+0.00%', bias: 'Bullish' },
  { symbol: 'GTCO', name: 'Guaranty Trust Holding Co', category: 'NGX', price: '₦132.70', change: '+1.20%', bias: 'Bullish' },
  { symbol: 'ZENITHBANK', name: 'Zenith Bank Plc', category: 'NGX', price: '₦128.60', change: '+0.85%', bias: 'Bullish' },
  { symbol: 'MTNN', name: 'MTN Nigeria Communications', category: 'NGX', price: '₦813.00', change: '-0.50%', bias: 'Neutral' },
  { symbol: 'BUACEMENT', name: 'BUA Cement Plc', category: 'NGX', price: '₦309.00', change: '+0.00%', bias: 'Neutral' },
  { symbol: 'ACCESSCORP', name: 'Access Holdings Plc', category: 'NGX', price: '₦30.00', change: '-0.15%', bias: 'Neutral' },
  { symbol: 'ARADEL', name: 'Aradel Holdings', category: 'NGX', price: '₦1,489.80', change: '+2.74%', bias: 'Bullish' },
  { symbol: 'FBNH', name: 'First HoldCo Plc', category: 'NGX', price: '₦149.95', change: '+0.00%', bias: 'Bullish' }
];
