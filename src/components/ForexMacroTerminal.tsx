import React, { useMemo, useState } from 'react';
import { ForexLotCalculator } from './ForexLotCalculator';
import { CpiIntelligenceHub } from './CpiIntelligenceHub';
import { forexPairs } from '../data/pairs';
import { macroEvents, MacroEvent } from '../data/macroData';

type Page =
  | 'overview'
  | 'CPI'
  | 'NFP'
  | 'ADP'
  | 'FOMC'
  | 'JOLTS'
  | 'pairs'
  | 'calculator';

const pageTitles: Record<Page, string> = {
  overview: 'Market Intelligence',
  CPI: 'CPI Intelligence',
  NFP: 'NFP Intelligence',
  ADP: 'ADP Intelligence',
  FOMC: 'FOMC Intelligence',
  JOLTS: 'JOLTS Intelligence',
  pairs: 'Forex Pair Intelligence',
  calculator: 'Position Risk Calculator',
};

const pageIcons: Record<Page, string> = {
  overview: '⌂',
  CPI: '◈',
  NFP: '▣',
  ADP: '◫',
  FOMC: '◎',
  JOLTS: '◌',
  pairs: '⇄',
  calculator: '⌁',
};

const signalColor = (value: string) => {
  const v = value.toUpperCase();

  if (
    v.includes('BULL') ||
    v.includes('POSITIVE') ||
    v.includes('RISK-ON') ||
    v.includes('LOW')
  ) {
    return '#10b981';
  }

  if (
    v.includes('BEAR') ||
    v.includes('NEGATIVE') ||
    v.includes('RISK-OFF') ||
    v.includes('HIGH')
  ) {
    return '#ef4444';
  }

  return '#d97706';
};

export const ForexMacroTerminal: React.FC = () => {
  const [page, setPage] = useState<Page>('overview');
  const [selectedPair, setSelectedPair] = useState('EUR/USD');

  const pair = useMemo(
    () =>
      forexPairs.find((p) => p.symbol === selectedPair) ||
      forexPairs[0],
    [selectedPair]
  );

  const currentEvent = macroEvents.find(
    (event) => event.name === page
  );

  const selectPair = (symbol: string) => {
    setSelectedPair(symbol);
    setPage('pairs');
  };

  const navButton = (
    label: string,
    value: Page,
    icon: string
  ) => {
    const active = page === value;

    return (
      <button
        key={value}
        onClick={() => setPage(value)}
        aria-label={label}
        style={{
          width: '100%',
          border: active
            ? '1px solid #cbd5e1'
            : '1px solid transparent',
          background: active ? '#f1f5f9' : 'transparent',
          color: active ? '#0f172a' : '#64748b',
          padding: '10px 11px',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textAlign: 'left',
          cursor: 'pointer',
          fontSize: 11,
          fontWeight: active ? 800 : 600,
          marginBottom: 3,
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            width: 19,
            minWidth: 19,
            height: 19,
            display: 'grid',
            placeItems: 'center',
            borderRadius: 5,
            background: active ? '#0f172a' : '#f8fafc',
            color: active ? '#fff' : '#64748b',
            fontSize: 11,
            fontWeight: 900,
          }}
        >
          {icon}
        </span>

        <span>{label}</span>

        {active && (
          <span
            style={{
              marginLeft: 'auto',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#10b981',
            }}
          />
        )}
      </button>
    );
  };

  const metric = (
    label: string,
    value: string | number,
    accent?: string
  ) => (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 9,
        padding: '12px 13px',
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontSize: 9,
          color: '#64748b',
          fontWeight: 700,
          letterSpacing: '.08em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 5,
          fontSize: 14,
          color: accent || '#0f172a',
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );

  const sectionTitle = (
    title: string,
    subtitle?: string
  ) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 12,
        marginBottom: 11,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '.05em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </div>

        {subtitle && (
          <div
            style={{
              marginTop: 3,
              fontSize: 10,
              color: '#64748b',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: 9,
          color: '#10b981',
          fontWeight: 800,
          letterSpacing: '.06em',
        }}
      >
        LIVE DATA
      </div>
    </div>
  );

  return (
    <div
      className="fx-terminal"
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        color: '#0f172a',
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* SIDEBAR */}
      <aside
        className="fx-sidebar"
        style={{
          position: 'fixed',
          inset: '0 auto 0 0',
          width: 238,
          background: '#fff',
          borderRight: '1px solid #e2e8f0',
          padding: '17px 12px',
          boxSizing: 'border-box',
          overflowY: 'auto',
          zIndex: 50,
        }}
      >
        <div
          style={{
            padding: '5px 9px 17px',
            borderBottom: '1px solid #e2e8f0',
            marginBottom: 15,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
            }}
          >
            <div
              style={{
                width: 29,
                height: 29,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 8,
                background: '#0f172a',
                color: '#fff',
                fontSize: 12,
                fontWeight: 900,
              }}
            >
              FX
            </div>

            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: '-.02em',
                }}
              >
                FX MACRO
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: '#64748b',
                  fontWeight: 700,
                  letterSpacing: '.02em',
                }}
              >
                INTELLIGENCE TERMINAL
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 9,
              color: '#10b981',
              fontWeight: 800,
              letterSpacing: '.08em',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 0 3px #ecfdf5',
              }}
            />
            MARKET ENGINE ONLINE
          </div>
        </div>

        <div
          style={{
            padding: '0 9px 7px',
            color: '#64748b',
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: '.1em',
          }}
        >
          TERMINAL
        </div>

        {navButton('Overview', 'overview', pageIcons.overview)}

        <div
          style={{
            margin: '18px 9px 7px',
            color: '#64748b',
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: '.1em',
          }}
        >
          MACRO EVENTS
        </div>

        {macroEvents.map((event) =>
          navButton(
            event.name,
            event.name as Page,
            pageIcons[event.name as Page]
          )
        )}

        <div
          style={{
            margin: '18px 9px 7px',
            color: '#64748b',
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: '.1em',
          }}
        >
          MARKETS & RISK
        </div>

        {navButton('Forex Pairs', 'pairs', pageIcons.pairs)}
        {navButton(
          'Position Calculator',
          'calculator',
          pageIcons.calculator
        )}

        <div
          style={{
            position: 'absolute',
            left: 18,
            right: 18,
            bottom: 16,
            borderTop: '1px solid #e2e8f0',
            paddingTop: 11,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 9,
              color: '#64748b',
            }}
          >
            <span>MODEL</span>
            <strong style={{ color: '#0f172a' }}>
              MACRO v2.4
            </strong>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main
        className="fx-main"
        style={{
          marginLeft: 238,
          minWidth: 0,
          padding: '18px 22px 30px',
          boxSizing: 'border-box',
        }}
      >
        {/* TOP BAR */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 15,
            paddingBottom: 16,
            borderBottom: '1px solid #e2e8f0',
            marginBottom: 17,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 9,
                color: '#64748b',
                fontWeight: 800,
                letterSpacing: '.1em',
              }}
            >
              FX MACRO TERMINAL / {page.toUpperCase()}
            </div>

            <h1
              style={{
                margin: '5px 0 0',
                fontSize: 22,
                lineHeight: 1.1,
                letterSpacing: '-.035em',
                fontWeight: 900,
                color: '#0f172a',
              }}
            >
              {pageTitles[page]}
            </h1>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
            }}
          >
            <div
              className="top-status"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '7px 10px',
                border: '1px solid #e2e8f0',
                background: '#fff',
                borderRadius: 999,
                fontSize: 9,
                color: '#10b981',
                fontWeight: 800,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#10b981',
                }}
              />
              SYSTEM ONLINE
            </div>

            <div
              style={{
                padding: '7px 10px',
                background: '#0f172a',
                color: '#fff',
                borderRadius: 7,
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: '.04em',
              }}
            >
              USD DESK
            </div>
          </div>
        </header>

        {/* OVERVIEW */}
        {page === 'overview' && (
          <>
            {/* MACRO SNAPSHOT */}
            <div style={{ marginBottom: 19 }}>
              {sectionTitle(
                'Macro Event Center',
                'US data releases driving the current FX regime'
              )}

              <div
                className="macro-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(5, minmax(0, 1fr))',
                  gap: 9,
                }}
              >
                {macroEvents.map((event) => (
                  <button
                    key={event.name}
                    onClick={() => setPage(event.name as Page)}
                    style={{
                      textAlign: 'left',
                      border: '1px solid #e2e8f0',
                      background: '#fff',
                      borderRadius: 10,
                      padding: 13,
                      cursor: 'pointer',
                      boxShadow:
                        '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          width: 25,
                          height: 25,
                          display: 'grid',
                          placeItems: 'center',
                          borderRadius: 7,
                          background: '#f1f5f9',
                          color: '#0f172a',
                          fontSize: 11,
                          fontWeight: 900,
                        }}
                      >
                        {pageIcons[event.name as Page]}
                      </span>

                      <span
                        style={{
                          fontSize: 8,
                          color: '#d97706',
                          fontWeight: 900,
                          letterSpacing: '.06em',
                        }}
                      >
                        {event.importance}
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: 10,
                        fontSize: 13,
                        fontWeight: 900,
                        color: '#0f172a',
                      }}
                    >
                      {event.name}
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 9,
                        lineHeight: 1.4,
                        color: '#64748b',
                      }}
                    >
                      {event.description}
                    </div>

                    <div
                      style={{
                        marginTop: 10,
                        paddingTop: 8,
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 9,
                      }}
                    >
                      <span style={{ color: '#64748b' }}>
                        MARKET IMPACT
                      </span>

                      <strong
                        style={{
                          color: signalColor(event.marketImpact),
                        }}
                      >
                        {event.marketImpact}
                      </strong>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CPI INTELLIGENCE HUB */}
            <CpiIntelligenceHub />

            {/* MARKET + RISK */}
            <div
              className="overview-grid"
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'minmax(0, 1.65fr) minmax(285px, .7fr)',
                gap: 14,
              }}
            >
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 11,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '13px 15px',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: '.06em',
                        color: '#0f172a',
                      }}
                    >
                      FOREX MARKET MATRIX
                    </div>

                    <div
                      style={{
                        marginTop: 3,
                        fontSize: 9,
                        color: '#64748b',
                      }}
                    >
                      Price action and technical regime
                    </div>
                  </div>

                  <span
                    style={{
                      padding: '5px 8px',
                      borderRadius: 5,
                      background: '#f0fdf4',
                      color: '#10b981',
                      fontSize: 8,
                      fontWeight: 900,
                    }}
                  >
                    LIVE
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table
                    style={{
                      width: '100%',
                      minWidth: 720,
                      borderCollapse: 'collapse',
                      fontSize: 10,
                    }}
                  >
                    <thead>
                      <tr>
                        {[
                          'PAIR',
                          'PRICE',
                          'CHANGE',
                          'ATR',
                          'RSI',
                          'VOL',
                          'BIAS',
                        ].map((heading) => (
                          <th
                            key={heading}
                            style={{
                              padding: '9px 11px',
                              textAlign: 'left',
                              color: '#64748b',
                              fontSize: 8,
                              fontWeight: 800,
                              letterSpacing: '.07em',
                              borderBottom:
                                '1px solid #e2e8f0',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {forexPairs.map((p) => (
                        <tr
                          key={p.symbol}
                          onClick={() => selectPair(p.symbol)}
                          style={{
                            cursor: 'pointer',
                            borderBottom:
                              '1px solid #f1f5f9',
                          }}
                        >
                          <td
                            style={{
                              padding: '11px',
                              fontWeight: 900,
                              color: '#0f172a',
                            }}
                          >
                            {p.symbol}
                          </td>
                          <td style={{ padding: '11px', fontWeight: 700 }}>
                            {p.price}
                          </td>
                          <td
                            style={{
                              padding: '11px',
                              fontWeight: 700,
                              color: p.change.startsWith('+')
                                ? '#10b981'
                                : '#ef4444',
                            }}
                          >
                            {p.change}
                          </td>
                          <td style={{ padding: '11px', color: '#64748b' }}>
                            {p.atr}
                          </td>
                          <td style={{ padding: '11px', color: '#64748b' }}>
                            {p.rsi}
                          </td>
                          <td style={{ padding: '11px', color: '#64748b' }}>
                            {p.volatility}
                          </td>
                          <td style={{ padding: '11px' }}>
                            <span
                              style={{
                                padding: '3px 8px',
                                borderRadius: 4,
                                background: p.bias.includes('Bullish')
                                  ? '#f0fdf4'
                                  : '#fef2f2',
                                color: p.bias.includes('Bullish')
                                  ? '#10b981'
                                  : '#ef4444',
                                fontSize: 9,
                                fontWeight: 800,
                              }}
                            >
                              {p.bias}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SIDE METRICS PANEL */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 11,
                    padding: 15,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: '.06em',
                      color: '#0f172a',
                      marginBottom: 12,
                    }}
                  >
                    DESK RISK METRICS
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: 8,
                    }}
                  >
                    {metric('Active Bias', 'USD Bullish', '#10b981')}
                    {metric('Risk Regime', 'Risk-On', '#10b981')}
                    {metric('Avg ATR', '42 pips')}
                    {metric('Liquidity', 'Optimal', '#10b981')}
                  </div>
                </div>

                <div
                  style={{
                    background: '#0f172a',
                    color: '#fff',
                    borderRadius: 11,
                    padding: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '.06em',
                      color: '#94a3b8',
                      marginBottom: 6,
                    }}
                  >
                    MACRO INSIGHT
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      lineHeight: 1.4,
                      marginBottom: 10,
                    }}
                  >
                    US Dollar remains resilient ahead of upcoming labor and inflation prints.
                  </div>

                  <div
                    style={{
                      fontSize: 10,
                      color: '#94a3b8',
                      lineHeight: 1.4,
                    }}
                  >
                    Monitor major technical support zones on EUR/USD and GBP/USD for continuation setups.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* EVENT PAGES (CPI, NFP, ADP, FOMC, JOLTS) */}
        {eventPages.includes(page) && currentEvent && (
          <div
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 20,
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: 6,
                    background: '#fef3c7',
                    color: '#d97706',
                    fontSize: 9,
                    fontWeight: 900,
                    marginBottom: 8,
                  }}
                >
                  IMPACT: {currentEvent.importance}
                </span>

                <h2
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 900,
                    color: '#0f172a',
                  }}
                >
                  {currentEvent.name} Intelligence Briefing
                </h2>

                <p
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: '#64748b',
                    maxWidth: 600,
                  }}
                >
                  {currentEvent.description}
                </p>
              </div>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '10px 14px',
                  borderRadius: 8,
                  textAlign: 'right',
                }}
              >
                <div style={{ fontSize: 9, color: '#64748b', fontWeight: 700 }}>
                  MARKET REACTION
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 900,
                    color: signalColor(currentEvent.marketImpact),
                    marginTop: 2,
                  }}
                >
                  {currentEvent.marketImpact}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
                marginBottom: 24,
              }}
            >
              {metric('Previous Release', currentEvent.previous)}
              {metric('Consensus Forecast', currentEvent.consensus)}
              {metric('Actual Release', currentEvent.actual || 'Pending Release', '#2563eb')}
            </div>

            {page === 'CPI' && <CpiIntelligenceHub />}
          </div>
        )}

        {/* PAIRS */}
        {page === 'pairs' && (
          <div
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 900,
                    color: '#0f172a',
                  }}
                >
                  {pair.symbol} Detailed Analysis
                </h2>
                <p
                  style={{
                    marginTop: 4,
                    fontSize: 12,
                    color: '#64748b',
                  }}
                >
                  Real-time metrics and technical outlook
                </p>
              </div>

              <select
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #cbd5e1',
                  background: '#fff',
                  fontWeight: 800,
                  fontSize: 12,
                }}
              >
                {forexPairs.map((p) => (
                  <option key={p.symbol} value={p.symbol}>
                    {p.symbol}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 12,
                marginBottom: 24,
              }}
            >
              {metric('Current Price', pair.price)}
              {metric('Session Change', pair.change, pair.change.startsWith('+') ? '#10b981' : '#ef4444')}
              {metric('Daily ATR', pair.atr)}
              {metric('RSI (14)', pair.rsi)}
            </div>

            <div
              style={{
                padding: 16,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                Technical Bias Outlook
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: pair.bias.includes('Bullish') ? '#10b981' : '#ef4444',
                }}
              >
                {pair.bias}
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR */}
        {page === 'calculator' && <ForexLotCalculator />}
      </main>
    </div>
  );
};
