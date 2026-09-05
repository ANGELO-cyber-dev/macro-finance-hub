import React, { useMemo, useState } from 'react';
import { ForexLotCalculator } from './ForexLotCalculator';
import { CpiIntelligenceHub } from './CpiIntelligenceHub';
import { forexPairs } from '../data/pairs';
import { macroEvents } from '../data/macroData';

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
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'COMMODITIES' | 'FOREX'>('ALL');
  const [selectedPair, setSelectedPair] = useState(forexPairs[0].symbol);

  const filteredPairs = useMemo(() => {
    if (selectedCategory === 'ALL') return forexPairs;
    return forexPairs.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const activePair = useMemo(() => {
    return forexPairs.find(p => p.symbol === selectedPair) || forexPairs[0];
  }, [selectedPair]);

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
            <div style={{ width: 29, height: 29, display: 'grid', placeItems: 'center', borderRadius: 8, background: '#0f172a', color: '#fff', fontSize: 12, fontWeight: 900 }}>FX</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 900 }}>MACRO SIGNAL</div>
              <div style={{ fontSize: 9, color: '#10b981', fontWeight: 800 }}>TWELVE DATA FEED LIVE</div>
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
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid #e2e8f0', marginBottom: 17 }}>
          <div>
            <div style={{ fontSize: 9, color: '#64748b', fontWeight: 800 }}>MACRO SIGNAL / {page.toUpperCase()}</div>
            <h1 style={{ margin: '5px 0 0', fontSize: 22, fontWeight: 900, color: '#0f172a' }}>{pageTitles[page]}</h1>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ padding: '6px 10px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', borderRadius: 999, fontSize: 9, fontWeight: 800 }}>🟢 Twelve Data Feed Live</span>
          </div>
        </header>

        {page === 'overview' && (
          <>
            <div style={{ marginBottom: 20 }}>
              <CpiIntelligenceHub />
            </div>

            {/* ASSET SCREENER MATRIX SUMMARY */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 900, margin: 0 }}>Asset Screener Matrix ({filteredPairs.length})</h3>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Real-time institutional valuation & consensus</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(['ALL', 'COMMODITIES', 'FOREX'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '6px 12px',
                        background: selectedCategory === cat ? '#0f172a' : '#f8fafc',
                        color: selectedCategory === cat ? '#fff' : '#475569',
                        border: '1px solid #cbd5e1',
                        borderRadius: 6,
                        fontSize: 10,
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filteredPairs.map((p) => (
                  <div
                    key={p.symbol}
                    onClick={() => { setSelectedPair(p.symbol); setPage('pairs'); }}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 10,
                      padding: 16,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 900, color: '#0f172a' }}>{p.symbol}</div>
                        <div style={{ fontSize: 10, color: '#64748b' }}>{p.name}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: '#0f172a' }}>{p.price}</div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: p.change.startsWith('+') ? '#10b981' : '#ef4444' }}>
                          {p.bias}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, background: '#fff', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                      <div>
                        <div style={{ fontSize: 8, color: '#64748b', fontWeight: 700 }}>FRED 2Y DELTA</div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#0f172a' }}>{p.fredDelta}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 8, color: '#64748b', fontWeight: 700 }}>REGIME TONE</div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#0f172a' }}>{p.regimeTone}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 8, color: '#64748b', fontWeight: 700 }}>CONSENSUS</div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#10b981' }}>{p.consensus}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 10, color: '#475569', lineHeight: 1.4 }}>
                      <strong>Fundamental Rationale:</strong> {p.rationale}
                    </div>
                  </div>
                ))}
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

        {page === 'pairs' && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>{activePair.symbol} Institutional Breakdown</h2>
              <select
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontWeight: 800 }}
              >
                {forexPairs.map((p) => (
                  <option key={p.symbol} value={p.symbol}>{p.symbol} - {p.name}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 9, color: '#64748b', fontWeight: 700 }}>CURRENT PRICE</div>
                <div style={{ fontSize: 15, fontWeight: 900, marginTop: 4 }}>{activePair.price}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 9, color: '#64748b', fontWeight: 700 }}>REGIME TONE</div>
                <div style={{ fontSize: 15, fontWeight: 900, marginTop: 4, color: '#10b981' }}>{activePair.regimeTone}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 9, color: '#64748b', fontWeight: 700 }}>CONSENSUS ODDS</div>
                <div style={{ fontSize: 15, fontWeight: 900, marginTop: 4 }}>{activePair.consensus}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 9, color: '#64748b', fontWeight: 700 }}>VALUATION SCORE</div>
                <div style={{ fontSize: 15, fontWeight: 900, marginTop: 4, color: '#10b981' }}>{activePair.score} pts</div>
              </div>
            </div>
            <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>Fundamental Rationale</div>
              <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{activePair.rationale}</div>
            </div>
          </div>
        )}

        {page === 'calculator' && <ForexLotCalculator />}
      </main>
    </div>
  );
};
