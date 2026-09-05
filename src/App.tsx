import React, { useState, useEffect } from 'react';
import { allMarketsData, AssetMarketItem } from './data/allMarketsDatabase';
import { generateLiveTick } from './services/liveStreamEngine';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'FOREX' | 'COMMODITIES' | 'NYSE' | 'NGX'>('FOREX');
  const [livePrices, setLivePrices] = useState<Record<string, { price: string; change: string }>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tickSequence, setTickSequence] = useState<number>(0);

  // Live WebSocket-style polling ticker engine
  useEffect(() => {
    const interval = setInterval(() => {
      setTickSequence(t => (t + 1) % 1000);
      setLivePrices(prev => {
        const nextState = { ...prev };
        allMarketsData.forEach(item => {
          const base = nextState[item.symbol]?.price || item.price;
          const updated = generateLiveTick(item.symbol, base);
          nextState[item.symbol] = { price: updated.price, change: updated.change };
        });
        return nextState;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filteredAssets = allMarketsData.filter(item => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'Inter, system-ui, sans-serif', padding: '20px' }}>
      {/* Institutional Header */}
      <header style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', background: '#0f172a', color: '#fff', display: 'grid', placeItems: 'center', borderRadius: '8px', fontWeight: 900, fontSize: '13px' }}>MS</div>
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 900, margin: 0 }}>GLOBAL MULTI-MARKET LIVE TERMINAL</h1>
            <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 800, marginTop: '2px' }}>● STREAMING ENGINE ACTIVE [tick:{tickSequence}]</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search symbol or name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '6px 12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '11px', outline: 'none', fontWeight: 600 }}
          />
          <div style={{ padding: '6px 12px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
            Feed: Real-Time
          </div>
        </div>
      </header>

      {/* Category Tabs */}
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
              cursor: 'pointer',
              letterSpacing: '0.05em'
            }}
          >
            {cat === 'FOREX' ? 'Forex Pairs (G10 & Crosses)' : cat === 'COMMODITIES' ? 'Commodities (Metals & Energy)' : cat === 'NYSE' ? 'NYSE Equities' : 'Nigerian Stock Exchange (NGX)'}
          </button>
        ))}
      </div>

      {/* Market Grid Matrix */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 900, margin: 0 }}>
            {selectedCategory} Market Feed ({filteredAssets.length} Tickers)
          </h3>
          <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>Auto-updating live streaming prices</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {filteredAssets.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '12px', gridColumn: '1 / -1' }}>
              No matching assets found for "{searchQuery}".
            </div>
          ) : (
            filteredAssets.map(item => {
              const live = livePrices[item.symbol];
              const displayPrice = live ? live.price : item.price;
              const displayChange = live ? live.change : item.change;
              const isPositive = displayChange.startsWith('+');

              return (
                <div
                  key={item.symbol}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{item.symbol}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{item.name}</div>
                    <div style={{ fontSize: '9px', fontWeight: 800, color: '#475569', marginTop: '6px', textTransform: 'uppercase' }}>
                      Bias: {item.bias}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>{displayPrice}</div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: isPositive ? '#10b981' : '#ef4444', marginTop: '2px' }}>
                      {displayChange}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
