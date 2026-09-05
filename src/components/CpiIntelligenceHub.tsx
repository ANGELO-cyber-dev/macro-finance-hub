import React, { useMemo, useState } from 'react';

type Scenario = 'hot' | 'inline' | 'soft';

interface ScenarioInfo {
  label: string;
  shortLabel: string;
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
      shortLabel: 'HOT',
      bias: 'Bearish · Risk-Off',
      assetImpact: 'USD ↑  ·  Gold ↓  ·  Equities ↓',
      fedOdds: 'Hike probability rises',
      probability: 24,
      description:
        'Inflation exceeds expectations, increasing pressure on the Federal Reserve to maintain restrictive policy.',
      tone: 'negative',
    },
    inline: {
      label: 'Inline CPI',
      shortLabel: 'INLINE',
      bias: 'Neutral · Consolidation',
      assetImpact: 'Range-bound action',
      fedOdds: 'Pause priced in',
      probability: 51,
      description:
        'Data lands close to consensus, leaving markets focused on positioning, yields and forward Fed guidance.',
      tone: 'neutral',
    },
    soft: {
      label: 'Soft CPI',
      shortLabel: 'SOFT',
      bias: 'Bullish · Risk-On',
      assetImpact: 'USD ↓  ·  Gold ↑  ·  Equities ↑',
      fedOdds: 'Rate cuts accelerated',
      probability: 25,
      description:
        'Cooling inflation supports a more accommodative policy outlook and improves broader risk appetite.',
      tone: 'positive',
    },
  };

  const active = scenarioData[scenario];

  const toneColor = useMemo(() => {
    if (active.tone === 'negative') return '#dc3545';
    if (active.tone === 'positive') return '#159570';
    return '#b7791f';
  }, [active.tone]);

  const signalColor = (signal: string) => {
    if (signal === 'BULLISH' || signal === 'RISK-ON') return '#159570';
    if (signal === 'BEARISH' || signal === 'RISK-OFF') return '#dc3545';
    return '#b7791f';
  };

  const signals = [
    [
      'USD',
      scenario === 'hot'
        ? 'BULLISH'
        : scenario === 'soft'
          ? 'BEARISH'
          : 'NEUTRAL',
    ],
    [
      'GOLD',
      scenario === 'hot'
        ? 'BEARISH'
        : scenario === 'soft'
          ? 'BULLISH'
          : 'NEUTRAL',
    ],
    [
      'EQUITIES',
      scenario === 'hot'
        ? 'RISK-OFF'
        : scenario === 'soft'
          ? 'RISK-ON'
          : 'RANGE',
    ],
    [
      'FED',
      scenario === 'hot'
        ? 'HAWKISH'
        : scenario === 'soft'
          ? 'DOVISH'
          : 'PAUSE',
    ],
  ];

  const styles = {
    shell: {
      width: '100%',
      boxSizing: 'border-box',
      background: '#ffffff',
      border: '1px solid #dfe5ec',
      borderRadius: '14px',
      padding: '20px',
      marginBottom: '20px',
      color: '#172033',
      boxShadow:
        '0 8px 24px rgba(15, 23, 42, 0.055), 0 1px 2px rgba(15, 23, 42, 0.04)',
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    } as React.CSSProperties,

    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '18px',
      flexWrap: 'wrap',
    } as React.CSSProperties,

    titleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '11px',
      minWidth: 0,
    } as React.CSSProperties,

    icon: {
      width: '36px',
      height: '36px',
      flex: '0 0 36px',
      display: 'grid',
      placeItems: 'center',
      borderRadius: '9px',
      background: '#f7f9fc',
      border: '1px solid #dbe2ea',
      color: '#253047',
      fontSize: '15px',
      boxShadow: '0 1px 2px rgba(15,23,42,.03)',
    } as React.CSSProperties,

    title: {
      margin: 0,
      fontSize: '15px',
      lineHeight: 1.25,
      fontWeight: 800,
      letterSpacing: '-0.02em',
      color: '#172033',
    } as React.CSSProperties,

    subtitle: {
      marginTop: '4px',
      color: '#7a8699',
      fontSize: '10.5px',
      lineHeight: 1.35,
      fontWeight: 500,
    } as React.CSSProperties,

    live: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '7px',
      padding: '6px 10px',
      borderRadius: '999px',
      background: '#f5faf8',
      border: '1px solid #cfe8df',
      color: '#28765f',
      fontSize: '9px',
      fontWeight: 800,
      letterSpacing: '.075em',
      whiteSpace: 'nowrap',
    } as React.CSSProperties,

    dot: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#159570',
      boxShadow: '0 0 0 3px rgba(21,149,112,.09)',
    } as React.CSSProperties,

    grid: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.35fr) minmax(300px, .9fr)',
      gap: '14px',
    } as React.CSSProperties,

    panel: {
      background: '#f8fafc',
      border: '1px solid #e1e7ee',
      borderRadius: '11px',
      overflow: 'hidden',
    } as React.CSSProperties,

    panelHeader: {
      padding: '13px 14px',
      borderBottom: '1px solid #e3e8ef',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '10px',
      background: '#ffffff',
    } as React.CSSProperties,

    panelLabel: {
      fontSize: '9.5px',
      color: '#526078',
      textTransform: 'uppercase',
      letterSpacing: '.075em',
      fontWeight: 800,
    } as React.CSSProperties,

    panelSub: {
      marginTop: '3px',
      color: '#8a95a6',
      fontSize: '10px',
      lineHeight: 1.35,
    } as React.CSSProperties,

    ticker: {
      fontSize: '9px',
      color: '#526078',
      background: '#f7f9fc',
      border: '1px solid #dce3eb',
      padding: '4px 7px',
      borderRadius: '5px',
      fontWeight: 800,
      letterSpacing: '.04em',
      whiteSpace: 'nowrap',
    } as React.CSSProperties,
  };

  return (
    <section style={styles.shell}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <div style={styles.icon}>▥</div>

          <div>
            <h3 style={styles.title}>
              CPI Intelligence &amp; Scenario Briefing
            </h3>

            <div style={styles.subtitle}>
              Inflation regime analysis · USD macro transmission · Fed policy
              sensitivity
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
        {/* MARKET PANEL */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <div>
              <div style={styles.panelLabel}>US Dollar Index</div>

              <div style={styles.panelSub}>
                DXY · Macro transmission signal
              </div>
            </div>

            <div style={styles.ticker}>FX:DXY</div>
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderTop: '1px solid #e3e8ef',
              background: '#ffffff',
            }}
          >
            {[
              ['DXY', 'Live', '#159570'],
              ['CPI', 'Pending', '#b7791f'],
              ['FED', 'Priced', '#3b67b1'],
            ].map(([label, value, color], index) => (
              <div
                key={label}
                style={{
                  padding: '10px 12px',
                  borderRight:
                    index < 2 ? '1px solid #e3e8ef' : 'none',
                }}
              >
                <div
                  style={{
                    color: '#8792a3',
                    fontSize: '8.5px',
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    fontWeight: 800,
                  }}
                >
                  {label}
                </div>

                <div
                  style={{
                    color,
                    fontSize: '11px',
                    fontWeight: 800,
                    marginTop: '3px',
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

              <div style={styles.panelSub}>
                Select expected CPI regime
              </div>
            </div>

            <span
              style={{
                color: '#8a95a6',
                fontSize: '9px',
                fontWeight: 800,
                letterSpacing: '.05em',
              }}
            >
              MODEL v2.4
            </span>
          </div>

          <div style={{ padding: '14px' }}>
            {/* SEGMENTED CONTROL */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '4px',
                padding: '4px',
                background: '#f1f4f8',
                border: '1px solid #dce3eb',
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
                        ? '1px solid #202a3b'
                        : '1px solid transparent',
                      background: selected ? '#202a3b' : 'transparent',
                      color: selected ? '#ffffff' : '#69758a',
                      padding: '8px 4px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '9.5px',
                      fontWeight: 800,
                      letterSpacing: '.055em',
                      transition:
                        'background .16s ease, color .16s ease, border .16s ease',
                    }}
                  >
                    {scenarioData[s].shortLabel}
                  </button>
                );
              })}
            </div>

            {/* ACTIVE SCENARIO */}
            <div
              style={{
                marginTop: '12px',
                padding: '13px',
                background: '#ffffff',
                border: '1px solid #dce3eb',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(15,23,42,.025)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    color: toneColor,
                    fontSize: '12px',
                    fontWeight: 800,
                  }}
                >
                  {active.label}
                </div>

                <div
                  style={{
                    color: '#7a8699',
                    fontSize: '9.5px',
                    fontWeight: 700,
                  }}
                >
                  {active.probability}% probability
                </div>
              </div>

              <div
                style={{
                  height: '5px',
                  background: '#edf1f5',
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
                marginTop: '11px',
                display: 'grid',
                gap: '1px',
                background: '#dce3eb',
                border: '1px solid #dce3eb',
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
                    gridTemplateColumns: '92px 1fr',
                    gap: '8px',
                    padding: '9px 11px',
                    background: '#ffffff',
                  }}
                >
                  <span
                    style={{
                      color: '#8994a5',
                      fontSize: '8.5px',
                      fontWeight: 800,
                      letterSpacing: '.035em',
                    }}
                  >
                    {label}
                  </span>

                  <strong
                    style={{
                      color: '#263146',
                      fontSize: '10px',
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
                marginTop: '11px',
                color: '#69758a',
                fontSize: '10px',
                lineHeight: 1.55,
              }}
            >
              <span style={{ color: '#263146', fontWeight: 800 }}>
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
          gap: '7px',
          marginTop: '14px',
        }}
      >
        {signals.map(([asset, signal]) => (
          <div
            key={asset}
            style={{
              background: '#ffffff',
              border: '1px solid #dfe5ec',
              borderRadius: '8px',
              padding: '10px 11px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 2px rgba(15,23,42,.025)',
            }}
          >
            <span
              style={{
                color: '#7a8699',
                fontSize: '8.5px',
                fontWeight: 800,
                letterSpacing: '.045em',
              }}
            >
              {asset}
            </span>

            <span
              style={{
                color: signalColor(signal),
                fontSize: '8.5px',
                fontWeight: 850,
                letterSpacing: '.035em',
              }}
            >
              {signal}
            </span>
          </div>
        ))}
      </div>

      {/* RESPONSIVE OVERRIDE */}
      <style>
        {`
          @media (max-width: 900px) {
            .cpi-intelligence-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 600px) {
            .cpi-intelligence-shell {
              padding: 14px !important;
              border-radius: 11px !important;
            }

            .cpi-intelligence-grid {
              grid-template-columns: 1fr !important;
            }

            .cpi-signal-strip {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}
      </style>
    </section>
  );
};
