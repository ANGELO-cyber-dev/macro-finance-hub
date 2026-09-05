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
      description:
        'Inflation comes in above expectations, increasing pressure on the Fed to maintain or tighten policy.',
      tone: 'negative',
    },
    inline: {
      label: 'Inline CPI',
      bias: 'Neutral · Consolidation',
      assetImpact: 'Range-bound action',
      fedOdds: 'Pause priced in',
      probability: 51,
      description:
        'Data lands close to consensus, leaving markets focused on positioning and forward Fed guidance.',
      tone: 'neutral',
    },
    soft: {
      label: 'Soft CPI',
      bias: 'Bullish · Risk-On',
      assetImpact: 'USD ↓  ·  Gold ↑  ·  Equities ↑',
      fedOdds: 'Rate cuts accelerated',
      probability: 25,
      description:
        'Cooling inflation supports a more accommodative policy outlook and improves risk appetite.',
      tone: 'positive',
    },
  };

  const active = scenarioData[scenario];

  const toneColor = useMemo(() => {
    switch (active.tone) {
      case 'negative':
        return '#ff5c70';
      case 'positive':
        return '#27d7a0';
      default:
        return '#eab657';
    }
  }, [active.tone]);

  const styles = {
    shell: {
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      color: '#0f172a',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    } as React.CSSProperties,

    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '17px',
      flexWrap: 'wrap',
    } as React.CSSProperties,

    titleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    } as React.CSSProperties,

    icon: {
      width: '34px',
      height: '34px',
      display: 'grid',
      placeItems: 'center',
      borderRadius: '8px',
      background: '#f1f5f9',
      border: '1px solid #cbd5e1',
      fontSize: '16px',
    } as React.CSSProperties,

    title: {
      margin: 0,
      fontSize: '15px',
      fontWeight: 800,
      letterSpacing: '-0.01em',
      color: '#0f172a',
    } as React.CSSProperties,

    subtitle: {
      marginTop: '3px',
      color: '#64748b',
      fontSize: '11px',
    } as React.CSSProperties,

    live: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '5px 9px',
      borderRadius: '999px',
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      color: '#166534',
      fontSize: '10px',
      fontWeight: 700,
      letterSpacing: '.04em',
    } as React.CSSProperties,

    dot: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#10b981',
      boxShadow: '0 0 6px rgba(16,185,129,.5)',
    } as React.CSSProperties,

    grid: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.35fr) minmax(320px, .9fr)',
      gap: '15px',
    } as React.CSSProperties,

    panel: {
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      overflow: 'hidden',
    } as React.CSSProperties,

    panelHeader: {
      padding: '12px 14px',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#ffffff',
    } as React.CSSProperties,

    panelLabel: {
      fontSize: '11px',
      color: '#334155',
      textTransform: 'uppercase',
      letterSpacing: '.05em',
      fontWeight: 700,
    } as React.CSSProperties,
  };

  return (
    <section style={styles.shell}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <div style={styles.icon}>📊</div>

          <div>
            <h3 style={styles.title}>
              CPI Intelligence & Scenario Briefing
            </h3>

            <div style={styles.subtitle}>
              Real-time inflation regime analysis · USD macro impact
            </div>
          </div>
        </div>

        <div style={styles.live}>
          <span style={styles.dot} />
          LIVE MACRO MODEL
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={styles.grid}>
        {/* DXY MARKET PANEL */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <div>
              <div style={styles.panelLabel}>US Dollar Index</div>

              <div
                style={{
                  marginTop: '2px',
                  fontSize: '11px',
                  color: '#64748b',
                }}
              >
                DXY · Macro transmission signal
              </div>
            </div>

            <div
              style={{
                fontSize: '10px',
                color: '#166534',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                padding: '4px 8px',
                borderRadius: '6px',
                fontWeight: 'bold',
              }}
            >
              FX:DXY
            </div>
          </div>

          <div
            style={{
              height: '235px',
              background: '#ffffff',
            }}
          >
            <iframe
              src="https://s.tradingview.com/embed-widget/mini-symbol-overview/?symbol=FX:DXY&locale=en&colorTheme=light&isTransparent=true&autosize=true"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="US Dollar Index Live Macro Trend"
              loading="lazy"
            />
          </div>

          {/* QUICK MARKET METRICS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderTop: '1px solid #e2e8f0',
              background: '#ffffff',
            }}
          >
            {[
              ['DXY', 'Live', '#10b981'],
              ['CPI', 'Pending', '#d97706'],
              ['FED', 'Priced', '#2563eb'],
            ].map(([label, value, color]) => (
              <div
                key={label}
                style={{
                  padding: '10px 12px',
                  borderRight: '1px solid #e2e8f0',
                }}
              >
                <div
                  style={{
                    color: '#64748b',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>

                <div
                  style={{
                    color,
                    fontSize: '12px',
                    fontWeight: 800,
                    marginTop: '2px',
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SCENARIO ENGINE */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <div>
              <div style={styles.panelLabel}>
                Pre-Report Scenario Engine
              </div>

              <div
                style={{
                  color: '#64748b',
                  fontSize: '11px',
                  marginTop: '2px',
                }}
              >
                Select expected CPI regime
              </div>
            </div>

            <span
              style={{
                color: '#64748b',
                fontSize: '10px',
                fontWeight: 600,
              }}
            >
              MODEL v2.4
            </span>
          </div>

          <div style={{ padding: '15px' }}>
            {/* SEGMENTED CONTROL */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '6px',
                padding: '4px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
              }}
            >
              {(['hot', 'inline', 'soft'] as Scenario[]).map((s) => {
                const selected = scenario === s;

                return (
                  <button
                    key={s}
                    onClick={() => setScenario(s)}
                    style={{
                      border: selected
                        ? '1px solid #0f172a'
                        : '1px solid transparent',
                      background: selected ? '#0f172a' : 'transparent',
                      color: selected ? '#ffffff' : '#475569',
                      padding: '8px 5px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      transition: 'all .18s ease',
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {/* ACTIVE SCENARIO */}
            <div
              style={{
                marginTop: '14px',
                padding: '12px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    color: toneColor,
                    fontSize: '13px',
                    fontWeight: 800,
                  }}
                >
                  {active.label}
                </div>

                <div
                  style={{
                    color: '#64748b',
                    fontSize: '11px',
                    fontWeight: 600,
                  }}
                >
                  {active.probability}% probability
                </div>
              </div>

              {/* PROBABILITY BAR */}
              <div
                style={{
                  height: '6px',
                  background: '#f1f5f9',
                  borderRadius: '99px',
                  overflow: 'hidden',
                  marginTop: '9px',
                }}
              >
                <div
                  style={{
                    width: `${active.probability}%`,
                    height: '100%',
                    background: toneColor,
                    borderRadius: '99px',
                    transition: 'width .25s ease',
                  }}
                />
              </div>
            </div>

            {/* SIGNAL ROWS */}
            <div
              style={{
                marginTop: '12px',
                display: 'grid',
                gap: '1px',
                background: '#cbd5e1',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              {[
                ['MARKET BIAS', active.bias],
                ['ASSET IMPACT', active.assetImpact],
                ['FED OUTLOOK', active.fedOdds],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '105px 1fr',
                    gap: '8px',
                    padding: '10px 12px',
                    background: '#ffffff',
                  }}
                >
                  <span
                    style={{
                      color: '#64748b',
                      fontSize: '10px',
                      fontWeight: 700,
                    }}
                  >
                    {label}
                  </span>

                  <strong
                    style={{
                      color: '#0f172a',
                      fontSize: '11px',
                      fontWeight: 750,
                    }}
                  >
                    {value}
                  </strong>
                </div>
              ))}
            </div>

            {/* MODEL EXPLANATION */}
            <div
              style={{
                marginTop: '12px',
                color: '#475569',
                fontSize: '11px',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: '#0f172a', fontWeight: 700 }}>
                Model view:
              </span>{' '}
              {active.description}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SIGNAL STRIP */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          marginTop: '15px',
        }}
      >
        {[
          ['USD', scenario === 'hot' ? 'BULLISH' : scenario === 'soft' ? 'BEARISH' : 'NEUTRAL'],
          ['GOLD', scenario === 'hot' ? 'BEARISH' : scenario === 'soft' ? 'BULLISH' : 'NEUTRAL'],
          ['EQUITIES', scenario === 'hot' ? 'RISK-OFF' : scenario === 'soft' ? 'RISK-ON' : 'RANGE'],
          ['FED', scenario === 'hot' ? 'HAWKISH' : scenario === 'soft' ? 'DOVISH' : 'PAUSE'],
        ].map(([asset, signal]) => (
          <div
            key={asset}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '10px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                color: '#64748b',
                fontSize: '10px',
                fontWeight: 750,
              }}
            >
              {asset}
            </span>

            <span
              style={{
                color:
                  signal === 'BULLISH' || signal === 'RISK-ON'
                    ? '#10b981'
                    : signal === 'BEARISH' || signal === 'RISK-OFF'
                      ? '#ef4444'
                      : '#d97706',
                fontSize: '10px',
                fontWeight: 800,
              }}
            >
              {signal}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
