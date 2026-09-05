import React, { useState } from 'react';
import { currencies, laborMetrics } from './data/macroDatabase';

export default function App() {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [activeTab, setActiveTab] = useState<'matrix' | 'labor' | 'conflict'>('matrix');

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'Inter, system-ui, sans-serif', padding: '20px' }}>
      {/* Top Institutional Header */}
      <header style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', background: '#0f172a', color: '#fff', display: 'grid', placeItems: 'center', borderRadius: '8px', fontWeight: 900, fontSize: '14px' }}>MS</div>
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 900, margin: 0 }}>MACRO SIGNAL DASHBOARD</h1>
            <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 800, marginTop: '2px' }}>● TERMINAL ENGINE LIVE</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ padding: '6px 12px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
            Confidence Score: 84%
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {(['matrix', 'labor', 'conflict'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              background: activeTab === tab ? '#0f172a' : '#ffffff',
              color: activeTab === tab ? '#ffffff' : '#475569',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            {tab === 'matrix' ? 'Currency-Strength Matrix' : tab === 'labor' ? 'US Labor Engine' : 'Macro Conflict Detector'}
          </button>
        ))}
      </div>

      {activeTab === 'matrix' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Currency Matrix Grid */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 15px 0' }}>G10 Currency Macro Scores & Yields</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currencies.map(c => (
                <div
                  key={c.code}
                  onClick={() => setSelectedCurrency(c)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: selectedCurrency.code === c.code ? '#f1f5f9' : '#f8fafc',
                    border: selectedCurrency.code === c.code ? '2px solid #0f172a' : '1px solid #e2e8f0',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 900 }}>{c.code} <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>({c.name})</span></div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Rate Outlook: {c.rateExpectation}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>2Y / 10Y</div>
                      <div style={{ fontSize: '11px', fontWeight: 800 }}>{c.yield2Y} / {c.yield10Y}</div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '70px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 900, color: c.bias === 'Bullish' ? '#10b981' : c.bias === 'Bearish' ? '#ef4444' : '#d97706' }}>
                        {c.score}/100
                      </div>
                      <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase' }}>{c.bias}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Pair Panel & Top/Worst Pick */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 15px 0' }}>Selected: {selectedCurrency.name} ({selectedCurrency.code})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b' }}>Macro Score</span>
                  <strong style={{ fontSize: '14px' }}>{selectedCurrency.score} / 100</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b' }}>Signal Bias</span>
                  <strong style={{ color: selectedCurrency.bias === 'Bullish' ? '#10b981' : selectedCurrency.bias === 'Bearish' ? '#ef4444' : '#d97706' }}>{selectedCurrency.bias}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b' }}>2Y Benchmark Yield</span>
                  <strong>{selectedCurrency.yield2Y}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ color: '#64748b' }}>10Y Benchmark Yield</span>
                  <strong>{selectedCurrency.yield10Y}</strong>
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 10px 0' }}>Best & Worst Currency Pairs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                <div style={{ padding: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>🟢 Strongest Pair Spread:</span>
                  <strong style={{ color: '#166534' }}>USD/JPY (Bullish Convergence)</strong>
                </div>
                <div style={{ padding: '10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>🔴 Weakest Pair Spread:</span>
                  <strong style={{ color: '#dc2626' }}>CAD/CHF (Bearish Divergence)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'labor' && (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 900, margin: 0 }}>US Labor Market Engine & NFP Reliability</h3>
            <span style={{ fontSize: '11px', background: '#fef3c7', color: '#b45309', padding: '4px 8px', borderRadius: '6px', fontWeight: 800 }}>NFP Reliability Score: 74% (Moderate Noise)</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
            {laborMetrics.map(m => (
              <div key={m.indicator} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800 }}>{m.indicator}</div>
                <div style={{ fontSize: '18px', fontWeight: 900, margin: '6px 0' }}>{m.value}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                  <span style={{ color: '#64748b' }}>Prev: {m.previous}</span>
                  <strong style={{ color: '#0f172a' }}>{m.impact}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'conflict' && (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 15px 0' }}>Macro Conflict Detector</h3>
          <div style={{ padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#dc2626', marginBottom: '4px' }}>⚠️ Conflict Detected: USD vs Rate Expectations</div>
            <p style={{ fontSize: '11px', color: '#7f1d1d', margin: 0, lineHeight: 1.5 }}>
              Federal Reserve rate cut projections are currently pricing in aggressive easing, but sticky wage growth and robust NFP prints create a divergence. Expect heightened volatility in USD crosses.
            </p>
          </div>
          <div style={{ padding: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#166534', marginBottom: '4px' }}>✅ Alignment: Commodity Currencies & Global Growth</div>
            <p style={{ fontSize: '11px', color: '#14532d', margin: 0, lineHeight: 1.5 }}>
              AUD and industrial demand metrics are perfectly aligned with structural deficits, supporting a high-confidence bullish bias.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
