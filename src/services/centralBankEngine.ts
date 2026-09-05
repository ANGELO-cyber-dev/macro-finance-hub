// Simulated Live Central Bank & Rate Probabilities Engine (Bypassing external API keys)
export interface LivePolicyData {
  bankCode: string;
  liveRate: string;
  sentimentScore: number;
  lastUpdated: string;
}

export function fetchLivePolicyStream(bankCode: string): LivePolicyData {
  const randomDrift = (Math.random() * 0.04 - 0.02).toFixed(2);
  const baseRates: Record<string, number> = {
    FED: 3.63,
    ECB: 2.25,
    BOE: 3.75,
    BOJ: 1.00
  };
  const current = baseRates[bankCode] || 3.50;
  
  return {
    bankCode,
    liveRate: `${(current + Number(randomDrift)).toFixed(2)}%`,
    sentimentScore: Math.floor(Math.random() * 30) + 60,
    lastUpdated: new Date().toLocaleTimeString()
  };
}
