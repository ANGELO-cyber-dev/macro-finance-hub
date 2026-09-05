import React, { useMemo, useState } from 'react';

type Scenario = 'hot' | 'inline' | 'soft';

interface ScenarioInfo {
  label: string;
  bias: string;
  assetImpact: string;
  fedOdds: string;
  probability: number;
  description: string;
  tone: 'negative' | 'neutral' | 'positive';
}

export const CpiIntelligenceHub: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>('inline');

  const scenarioData: Record<Scenario, ScenarioInfo> = {
    hot: {
      label: 'Hot CPI',
      bias: 'Bearish · Risk-Off',
      assetImpact: 'USD ↑  ·  Gold ↓  ·  Equities ↓',
      fedOdds: 'Hike probability rises',
      probability: 24,
      description: 'Inflation comes in above expectations, increasing pressure on the Fed to maintain or tighten policy.',
      tone: 'negative',
    },
    inline: {
      label: 'Inline CPI',
      bias: 'Neutral · Consolidation',
      assetImpact: 'Range-bound action',
      fedOdds: 'Pause priced in',
      probability: 51,
      description: 'Data lands close to consensus, leaving markets focused on positioning and forward Fed guidance.',
      tone: 'neutral',
    },
    soft: {
      label: 'Soft CPI',
      bias: 'Bullish · Risk-On',
      assetImpact: 'USD ↓  ·  Gold ↑  ·  Equities ↑',
      fedOdds: 'Rate cuts accelerated',
      probability: 25,
      description: 'Cooling inflation supports a more accommodative policy outlook and improves risk appetite.',
      tone: 'positive',
    },
  };

  const active = scenarioData[scenario];

  const toneColor = useMemo(() => {
    switch (active.tone) {
      case 'negative': return '#ef4444';
      case 'positive': return '#10b981';
      default: return '#d97706';
    }
  }, [active.tone]);

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '20px', color: '#0f172a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 800, margin: 0 }}>CPI Intelligence & Scenario Briefing</h3>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Inflation regime analysis · USD macro transmission</div>
        </div>
        <div style={{ fontSize: '9px', fontWeight: 800, color: '#166534', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '4px 8px', borderRadius: '6px' }}>
          LIVE MACRO MODEL
        </div>
      </div>

      {/* STACKED COLUMN LAYOUT FOR MOBILE */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* DXY MARKET PANEL */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#334155' }}>US Dollar Index (DXY)</div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#10b981', background: '#f0fdf4', padding: '2px 6px', borderRadius: '4px' }}>FX:DXY</div>
          </div>
          <div style={{ height: '200px', background: '#ffffff' }}>
            <iframe
              src="https://s.tradingview.com/embed-widget/mini-symbol-overview/?symbol=FX:DXY&locale=en&colorTheme=light&isTransparent=true&autosize=true"
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="US Dollar Index Trend"
              loading="lazy"
            />
          </div>
        </div>

        {/* SCENARIO ENGINE */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#334155' }}>Pre-Report Scenario Engine</div>
            <span style={{ fontSize: '9px', color: '#64748b', fontWeight: 700 }}>MODEL v2.4</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '10px' }}>
            {(['hot', 'inline', 'soft'] as Scenario[]).map((s) => {
              const selected = scenario === s;
              return (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  style={{
                    border: selected ? '1px solid #0f172a' : '1px solid #cbd5e1',
                    background: selected ? '#0f172a' : '#ffffff',
                    color: selected ? '#ffffff' : '#334155',
                    padding: '8px 4px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: toneColor, fontSize: '12px', fontWeight: 800 }}>{active.label}</span>
              <span style={{ color: '#64748b', fontSize: '10px', fontWeight: 700 }}>{active.probability}% probability</span>
            </div>
            <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: `${active.probability}%`, height: '100%', background: toneColor, borderRadius: '99px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#ffffff', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <span style={{ color: '#64748b', fontWeight: 700 }}>MARKET BIAS</span>
              <strong style={{ color: '#0f172a', fontWeight: 800 }}>{active.bias}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#ffffff', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <span style={{ color: '#64748b', fontWeight: 700 }}>ASSET IMPACT</span>
              <strong style={{ color: '#0f172a', fontWeight: 800 }}>{active.assetImpact}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#ffffff', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <span style={{ color: '#64748b', fontWeight: 700 }}>FED OUTLOOK</span>
              <strong style={{ color: '#0f172a', fontWeight: 800 }}>{active.fedOdds}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
