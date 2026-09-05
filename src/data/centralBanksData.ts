export interface CentralBankInfo {
  code: string;
  bankName: string;
  region: string;
  currentRate: string;
  nextMeeting: string;
  stance: 'Hawkish' | 'Dovish' | 'Neutral';
  rateOddsHike: string;
  rateOddsHold: string;
  rateOddsCut: string;
  impliedPath: string[];
}

export const centralBanks: CentralBankInfo[] = [
  {
    code: 'FED',
    bankName: 'Federal Reserve',
    region: 'United States',
    currentRate: '3.63%',
    nextMeeting: 'Sep 16, 2026',
    stance: 'Dovish',
    rateOddsHike: '4.2%',
    rateOddsHold: '72.5%',
    rateOddsCut: '23.3%',
    impliedPath: ['3.63%', '3.50%', '3.25%']
  },
  {
    code: 'ECB',
    bankName: 'European Central Bank',
    region: 'Eurozone',
    currentRate: '2.25%',
    nextMeeting: 'Sep 10, 2026',
    stance: 'Hawkish',
    rateOddsHike: '88.3%',
    rateOddsHold: '11.7%',
    rateOddsCut: '0.0%',
    impliedPath: ['2.25%', '2.50%', '2.50%']
  },
  {
    code: 'BOE',
    bankName: 'Bank of England',
    region: 'United Kingdom',
    currentRate: '3.75%',
    nextMeeting: 'Sep 17, 2026',
    stance: 'Neutral',
    rateOddsHike: '14.2%',
    rateOddsHold: '85.8%',
    rateOddsCut: '0.0%',
    impliedPath: ['3.75%', '3.75%', '3.50%']
  },
  {
    code: 'BOJ',
    bankName: 'Bank of Japan',
    region: 'Japan',
    currentRate: '1.00%',
    nextMeeting: 'Sep 17, 2026',
    stance: 'Hawkish',
    rateOddsHike: '57.2%',
    rateOddsHold: '42.8%',
    rateOddsCut: '0.0%',
    impliedPath: ['1.00%', '1.10%', '1.25%']
  }
];
