import React, { useState } from 'react';

export const CpiIntelligenceHub: React.FC = () => {
  const [scenario, setScenario] = useState<'hot' | 'inline' | 'soft'>('inline');

  const scenarioData = {
    hot: { bias: 'Bearish Risk-Off', assetImpact: 'USD Spike, Gold/Equities Drop', fedOdds: 'Hike Probability Rises' },
    inline: { bias: 'Neutral Consolidation', assetImpact: 'Range-bound Action', fedOdds: 'Pause Priced In' },
    soft: { bias: 'Bullish Risk-On', assetImpact: 'USD Weakness, Gold/Equities Rally', fedOdds: 'Rate Cuts Accelerated' }
  };

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eaeaea', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>📊 CPI Intelligence & Scenario Briefing</h3>
        <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' }}>Live Macro Model</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
        <div style={{ height: '220px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <iframe 
            src="https://s.tradingview.com/embed-widget/mini-symbol-overview/?symbol=ECONOMICS:USCPIY&locale=en&colorTheme=light" 
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="US CPI Trend"
          />
        </div>

        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px' }}>Pre-Report Scenario Simulator</h4>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            {(['hot', 'inline', 'soft'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setScenario(s)}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  background: scenario === s ? '#0f172a' : '#fff',
                  color: scenario === s ? '#fff' : '#334155',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div><strong>Market Bias:</strong> {scenarioData[scenario].bias}</div>
            <div><strong>Asset Impact:</strong> {scenarioData[scenario].assetImpact}</div>
            <div><strong>Fed Outlook:</strong> {scenarioData[scenario].fedOdds}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
