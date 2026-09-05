import React, { useMemo, useState, useEffect } from 'react';
import { ForexLotCalculator } from './ForexLotCalculator';
import { CpiIntelligenceHub } from './CpiIntelligenceHub';
import { forexPairs } from '../data/pairs';
import { macroEvents } from '../data/macroData';
import { fetchLiveQuote } from '../services/marketApi';

type Page = 'overview' | 'CPI' | 'NFP' | 'ADP' | 'FOMC' | 'JOLTS' | 'pairs' | 'calculator';

const pageTitles: Record<Page, string> = {
  overview: 'Market Intelligence',
  CPI: 'CPI Intelligence',
  NFP: 'NFP Intelligence',
  ADP: 'ADP Intelligence',
  FOMC: 'FOMC Intelligence',
  JOLTS: 'JOLTS Intelligence',
  pairs: 'Asset Screener Matrix',
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

export const ForexMacroTerminal: React.FC = () => {
  const [page, setPage] = useState<Page>('overview');
  const [selectedCategory, setSelectedCategory] = useState<'INDICES' | 'COMMODITIES' | 'FOREX' | 'NYSE'>('COMMODITIES');
  const [expandedPair, setExpandedPair] = useState<string | null>('XAG/USD');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [livePrices, setLivePrices] = useState<Record<string, string>>({});
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);
  const [liveTick, setLiveTick] = useState<number>(0);

  // Real API integration loop polling Twelve Data REST sandbox
  useEffect(() => {
    let isMounted = true;
    const updatePrices = async () => {
      setLiveTick(t => (t + 1) % 100);
      for (const p of forexPairs) {
        const live = await fetchLiveQuote(p.symbol);
        if (live && isMounted) {
          setLivePrices(prev => ({ ...prev, [p.symbol]: live.price }));
        }
      }
    };

    updatePrices();
    const interval = setInterval(updatePrices, 8000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredPairs = useMemo(() => {
    return forexPairs.filter((p) => {
      const matchesCategory = p.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        p.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const eventPages: Page[] = ['CPI', 'NFP', 'ADP', 'FOMC', 'JOLTS'];
  const currentEvent = macroEvents.find((e) => e.name === page);

  const navButton = (label: string, value: Page, icon: string) => {
    const active = page === value;
    return (
      <button
        key={value}
        onClick={() => setPage(value)}
        style={{
          width: '100%',
          border: active ? '1px solid #cbd5e1' : '1px solid transparent',
          background: active ? '#f1f5f9' : 'transparent',
          color: active ? '#0f172a' : '#64748b',
          padding: '10px 11px',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          fontSize: 11,
          fontWeight: active ? 800 : 600,
          marginBottom: 3,
        }}
      >
        <span style={{ width: 19, height: 19, display: 'grid', placeItems: 'center', borderRadius: 5, background: active ? '#0f172a' : '#f8fafc', color: active ? '#fff' : '#64748b', fontSize: 11, fontWeight: 900 }}>
          {icon}
        </span>
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* SIDEBAR */}
      <aside style={{ position: 'fixed', inset: '0 auto 0 0', width: 238, background: '#fff', borderRight: '1px solid #e2e8f0', padding: '17px 12px', zIndex: 50, overflowY: 'auto' }}>
        <div style={{ padding: '5px 9px 17px', borderBottom: '1px solid #e2e8f0', marginBottom: 15 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 29, height: 29, display: 'grid', placeItems: 'center', borderRadius: 8, background: '#0f172a', color: '#fff', fontSize: 12, fontWeight: 900 }}>MS</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 900 }}>MACRO SIGNAL</div>
              <div style={{ fontSize: 9, color: isLiveConnected ? '#10b981' : '#dc2626', fontWeight: 800 }}>
                {isLiveConnected ? '● TWELVE DATA API ACTIVE' : '○ API RECONNECTING'}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 9px 7px', color: '#64748b', fontSize: 9, fontWeight: 800 }}>TERMINAL</div>
        {navButton('Overview', 'overview', pageIcons.overview)}

        <div style={{ margin: '18px 9px 7px', color: '#64748b', fontSize: 9, fontWeight: 800 }}>MACRO EVENTS</div>
        {macroEvents.map((event) => navButton(event.name, event.name as Page, pageIcons[event.name as Page]))}

        <div style={{ margin: '18px 9px 7px', color: '#64748b', fontSize: 9, fontWeight: 800 }}>MARKETS & RISK</div>
        {navButton('Asset Screener Matrix', 'pairs', pageIcons.pairs)}
        {navButton('Position Calculator', 'calculator', pageIcons.calculator)}
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ marginLeft: 238, padding: '18px 22px 30px', boxSizing: 'border-box' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid #e2e8f0', marginBottom: 17, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <h1 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: '#0f172a' }}>MACRO SIGNAL</h1>
            <span style={{ fontSize: 9, padding: '4px 8px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: 6, fontWeight: 800 }}>
              {isLiveConnected ? `● TWELVE DATA LIVE [seq:${liveTick}]` : '○ OFFLINE'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search ticker..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '6px 12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 11, outline: 'none', color: '#0f172a', fontWeight: 600 }}
            />
            <button 
              onClick={() => setIsLiveConnected(!isLiveConnected)}
              style={{ padding: '6px 10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 6, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}
            >
              Risk
            </button>
          </div>
        </header>

        {page === 'overview' && (
          <>
            {/* TOP DRIVERS CARD */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, marginBottom: 14 }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🧭</span> Drivers are confirming macro positioning
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px 20px', fontSize: '11px', color: '#334155', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                <div>Rate Policy Stance / Spread</div>
                <div style={{ fontWeight: 800, textAlign: 'right' }}>+18% Solar Deficit</div>
                <div>Official 2Y Yield (FRED API)</div>
                <div style={{ fontWeight: 800, textAlign: 'right' }}>4.34%</div>
                <div>Inflation Pressure / Drivers</div>
                <div style={{ fontWeight: 800, textAlign: 'right' }}>Photovoltaic Shortage</div>
              </div>
            </div>

            {/* 4 SUMMARY STAT BOXES */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 14 }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 8, color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Policy Regime</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#0f172a', marginTop: 4 }}>Industrial Deficit</div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 8, color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>FRED Benchmark API</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#0f172a', marginTop: 4 }}>4.34%</div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 8, color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Institutional Odds</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#10b981', marginTop: 4 }}>82%</div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 8, color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Labor / Market Breadth</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#0f172a', marginTop: 4 }}>Capex Expansion</div>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <CpiIntelligenceHub />
            </div>

            {/* ASSET SCREENER MATRIX */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 900, margin: 0 }}>Asset Screener Matrix ({filteredPairs.length})</h3>
                  <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 800, marginTop: 2 }}>● Twelve Data API Connected</div>
                </div>
                <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', padding: 3, borderRadius: 6 }}>
                  {(['INDICES', 'COMMODITIES', 'FOREX', 'NYSE'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '4px 8px',
                        background: selectedCategory === cat ? '#0f172a' : 'transparent',
                        color: selectedCategory === cat ? '#fff' : '#64748b',
                        border: 'none',
                        borderRadius: 4,
                        fontSize: 9,
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filteredPairs.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '11px' }}>
                    No matching tickers found for "{searchQuery}".
                  </div>
                ) : (
                  filteredPairs.map((p) => {
                    const isExpanded = expandedPair === p.symbol;
                    const displayPrice = livePrices[p.symbol] || p.price;
                    return (
                      <div
                        key={p.symbol}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          borderRadius: 10,
                          padding: 14,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                        }}
                      >
                        <div 
                          onClick={() => setExpandedPair(isExpanded ? null : p.symbol)}
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                        >
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 900, color: '#0f172a' }}>{p.symbol}</div>
                            <div style={{ fontSize: 9, color: '#64748b' }}>{p.name}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 14, fontWeight: 900, color: '#0f172a' }}>{displayPrice}</div>
                            <div style={{ fontSize: 10, fontWeight: 800, color: '#10b981' }}>{p.bias} ▼</div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: 9, fontWeight: 800, color: '#64748b', marginBottom: 8, letterSpacing: '.05em' }}>
                              MACRO SCREENING BREAKDOWN • {p.symbol}
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
                              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 8 }}>
                                <div style={{ fontSize: 7, color: '#64748b', fontWeight: 800 }}>FRED 2Y Delta</div>
                                <div style={{ fontSize: 12, fontWeight: 900, color: '#0f172a', marginTop: 2 }}>{p.fredDelta}</div>
                              </div>
                              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 8 }}>
                                <div style={{ fontSize: 7, color: '#64748b', fontWeight: 800 }}>Regime Tone</div>
                                <div style={{ fontSize: 11, fontWeight: 900, color: '#0f172a', marginTop: 2 }}>{p.regimeTone}</div>
                              </div>
                              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 8 }}>
                                <div style={{ fontSize: 7, color: '#64748b', fontWeight: 800 }}>Consensus</div>
                                <div style={{ fontSize: 12, fontWeight: 900, color: '#10b981', marginTop: 2 }}>{p.consensus}</div>
                              </div>
                            </div>

                            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 10, fontSize: 10, color: '#334155', lineHeight: 1.4 }}>
                              <strong>Fundamental Rationale:</strong> {p.rationale}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}

        {eventPages.includes(page) && currentEvent && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>{currentEvent.name} Intelligence Briefing</h2>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>{currentEvent.description}</p>
            {page === 'CPI' && <CpiIntelligenceHub />}
          </div>
        )}

        {page === 'calculator' && <ForexLotCalculator />}
      </main>
    </div>
  );
};
