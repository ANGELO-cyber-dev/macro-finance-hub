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
    symbol: 'XAU/USD,XAG/USD',
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
    symbol: 'BRENT/USD',
    name: 'Brent Crude Oil Spot',
    category: 'COMMODITIES',
    price: '$78.40',
    change: '-0.30%',
    atr: '$1.35',
    rsi: '50.2',
    volatility: 'Moderate',
    bias: 'Neutral (+54)',
    score: '+54',
    fredDelta: '4.34%',
    regimeTone: 'Balanced Supply',
    consensus: '55%',
    rationale: 'Global maritime route adjustments balancing prompt physical delivery premiums.'
  }
];
