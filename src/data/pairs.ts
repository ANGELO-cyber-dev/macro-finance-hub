export interface ForexPair {
  symbol: string;
  name: string;
  category: 'COMMODITIES' | 'FOREX' | 'INDICES' | 'NYSE';
  price: string;
  change: string;
  atr: string;
  rsi: string;
  volatility: string;
  bias: string;
  score: string;
  fredDelta: string;
  regimeTone: string;
  consensus: string;
  rationale: string;
}

export const forexPairs: ForexPair[] = [
  {
    symbol: 'XAU/USD',
    name: 'Spot Gold / US Dollar',
    category: 'COMMODITIES',
    price: '$4,428.894',
    change: '+1.45%',
    atr: '$38.2',
    rsi: '68.4',
    volatility: 'High',
    bias: 'Strong Bullish (+88)',
    score: '+88',
    fredDelta: '4.34%',
    regimeTone: 'Industrial Deficit',
    consensus: '86%',
    rationale: 'Massive solar panel industrial uptake combined with physical vault depletion underpins structural upside.'
  },
  {
    symbol: 'XAG/USD',
    name: 'Spot Silver / US Dollar',
    category: 'COMMODITIES',
    price: '$29.65',
    change: '+2.10%',
    atr: '$0.85',
    rsi: '72.1',
    volatility: 'High',
    bias: 'Strong Bullish (+82)',
    score: '+82',
    fredDelta: '4.34%',
    regimeTone: 'Industrial Deficit',
    consensus: '86%',
    rationale: 'Massive solar panel industrial uptake combined with physical vault depletion underpins structural upside.'
  },
  {
    symbol: 'WTI/USD',
    name: 'Crude Oil (WTI Spot)',
    category: 'COMMODITIES',
    price: '$74.80',
    change: '-0.45%',
    atr: '$1.42',
    rsi: '49.5',
    volatility: 'Moderate',
    bias: 'Neutral (+52)',
    score: '+52',
    fredDelta: '4.34%',
    regimeTone: 'Balanced Supply',
    consensus: '54%',
    rationale: 'OPEC+ production adjustments offset by sluggish global manufacturing demand indicators.'
  },
  {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    category: 'FOREX',
    price: '1.0845',
    change: '+0.15%',
    atr: '48 pips',
    rsi: '52.0',
    volatility: 'Moderate',
    bias: 'Neutral (0)',
    score: '0',
    fredDelta: '4.34%',
    regimeTone: 'Consolidation',
    consensus: '50%',
    rationale: 'ECB and Federal Reserve rate expectations remain closely balanced ahead of upcoming employment data.'
  },
  {
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar',
    category: 'FOREX',
    price: '1.2680',
    change: '+0.28%',
    atr: '62 pips',
    rsi: '55.3',
    volatility: 'Moderate',
    bias: 'Bullish (+14)',
    score: '+14',
    fredDelta: '4.34%',
    regimeTone: 'Resilient Growth',
    consensus: '58%',
    rationale: 'Sticky UK wage growth keeps BoE pivot pricing subdued relative to peer central banks.'
  }
];
