export interface CurrencyMacro {
  code: string;
  name: string;
  score: number;
  bias: 'Bullish' | 'Bearish' | 'Neutral';
  rateExpectation: string;
  yield2Y: string;
  yield10Y: string;
}

export interface LaborMetric {
  indicator: string;
  value: string;
  previous: string;
  impact: string;
}

export const currencies: CurrencyMacro[] = [
  { code: 'USD', name: 'US Dollar', score: 62, bias: 'Bullish', rateExpectation: 'Pause / Higher for Longer', yield2Y: '4.34%', yield10Y: '4.22%' },
  { code: 'EUR', name: 'Euro', score: 48, bias: 'Neutral', rateExpectation: 'Easing Expected', yield2Y: '2.85%', yield10Y: '2.45%' },
  { code: 'GBP', name: 'British Pound', score: 55, bias: 'Bullish', rateExpectation: 'Sticky Inflation / Slow Cuts', yield2Y: '4.10%', yield10Y: '3.98%' },
  { code: 'JPY', name: 'Japanese Yen', score: 32, bias: 'Bearish', rateExpectation: 'Ultra-Loose / Minor Normalization', yield2Y: '0.35%', yield10Y: '0.95%' },
  { code: 'CHF', name: 'Swiss Franc', score: 50, bias: 'Neutral', rateExpectation: 'Balanced Easing', yield2Y: '0.92%', yield10Y: '0.70%' },
  { code: 'CAD', name: 'Canadian Dollar', score: 45, bias: 'Bearish', rateExpectation: 'Active Rate Cuts', yield2Y: '3.65%', yield10Y: '3.50%' },
  { code: 'AUD', name: 'Australian Dollar', score: 58, bias: 'Bullish', rateExpectation: 'Hawkish Hold', yield2Y: '3.90%', yield10Y: '4.12%' },
  { code: 'NZD', name: 'New Zealand Dollar', score: 42, bias: 'Bearish', rateExpectation: 'Cooling Growth / Easing', yield2Y: '4.20%', yield10Y: '4.35%' },
];

export const laborMetrics: LaborMetric[] = [
  { indicator: 'ADP Non-Farm Employment', value: '142K', previous: '111K', impact: 'Moderate Positive' },
  { indicator: 'Non-Farm Payrolls (NFP)', value: '175K', previous: '114K', impact: 'High Volatility' },
  { indicator: 'Unemployment Rate', value: '4.2%', previous: '4.3%', impact: 'Stable' },
  { indicator: 'Average Hourly Earnings (YoY)', value: '3.8%', previous: '3.6%', impact: 'Inflationary' },
  { indicator: 'JOLTS Job Openings', value: '7.68M', previous: '7.91M', impact: 'Cooling Labor' },
  { indicator: 'Initial Jobless Claims', value: '231K', previous: '232K', impact: 'Neutral' },
];
