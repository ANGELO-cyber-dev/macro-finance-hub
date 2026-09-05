import React, { useState, useEffect } from 'react';
import { allMarketsData } from './data/allMarketsDatabase';
import { fetchFredMacroData, fetchFmpStockQuote, createDerivWebSocket } from './services/apiConnector';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'FOREX' | 'COMMODITIES' | 'NYSE' | 'NGX'>('FOREX');
  const [fredCpi, setFredCpi] = useState<string>('Loading FRED...');
  const [fmpData, setFmpData] = useState<any>(null);
  const [derivTick, setDerivTick] = useState<string>('Connecting Deriv WS...');

  useEffect(() => {
    // Fetch FRED Macro Data
    fetchFredMacroData('CPIAUCSL').then(obs => {
      if (obs) setFredCpi(`${obs.value} (${obs.date})`);
      else setFredCpi('API Key Missing / Simulated Mode');
    });

    // Fetch FMP Sample Stock Quote (e.g. JPMorgan JPM)
    fetchFmpStockQuote('JPM').then(quote => {
      if (quote) setFmpData(quote);
    });

    // Connect Deriv WebSocket for real-time forex streaming
    const ws = createDerivWebSocket((data) => {
      if (data.tick) {
        setDerivTick(`${data.tick.symbol}: ${data.tick.quote}`);
      }
    });

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'Inter, system-ui, sans-serif', padding: '20px' }}>
      {/* Header with API Status */}
      <header style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '15px', fontWeight: 900, margin: 0 }}>LIVE MULTI-API TERMINAL (DERIV, FRED, FMP)</h1>
          <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 800, marginTop: '2px' }}>● FRED CPI: {fredCpi} | Deriv Stream: {derivTick}</div>
        </div>
        <div style={{ fontSize: '11px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '6px 12px', borderRadius: '8px', fontWeight: 800 }}>
          {fmpData ? `FMP Connected: JPM $${fmpData.price}` : 'Configuring API Keys...'}
        </div>
      </header>

      {/* Category Selection Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {(['FOREX', 'COMMODITIES', 'NYSE', 'NGX'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '10px 20px',
              background: selectedCategory === cat ? '#0f172a' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : '#475569',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asset Display */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 15px 0' }}>{selectedCategory} Market Feed</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {allMarketsData.filter(i => i.category === selectedCategory).map(item => (
            <div key={item.symbol} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 900 }}>{item.symbol}</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>{item.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: 900 }}>{item.price}</div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>{item.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
