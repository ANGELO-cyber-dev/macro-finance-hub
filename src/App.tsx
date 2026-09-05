
async function fetchInlineForex() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    const rates = data.rates;
    if (rates) {
      const live = {
        "EUR/USD": Number((1 / rates.EUR).toFixed(4)),
        "GBP/USD": Number((1 / rates.GBP).toFixed(4)),
        "USD/JPY": Number(rates.JPY.toFixed(2)),
        "AUD/USD": Number((1 / rates.AUD).toFixed(4)),
        "USD/CAD": Number((1 / rates.CAD).toFixed(4)),
        "NZD/USD": Number((1 / rates.NZD).toFixed(4))
      };
      Object.entries(live).forEach(([sym, price]) => {
        setFmpPrices(prev => ({ ...prev, [sym]: { price: String(price), change: "+0.10%" } }));
      });
    }
  } catch (e) {
    console.error(e);
  }
}

import React, { useState, useEffect } from 'react';
import { allMarketsData } from './data/allMarketsDatabase';
import { fetchFredSeries, fetchFmpQuote } from './services/realApiConnector';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'FOREX' | 'COMMODITIES' | 'NYSE' | 'NGX'>('FOREX');
  const [fredCpi, setFredCpi] = useState<{ value: string; date: string }>({ value: 'Loading...', date: '' });
  const [fredUnrate, setFredUnrate] = useState<{ value: string; date: string }>({ value: 'Loading...', date: '' });
  const [fmpPrices, setFmpPrices] = useState<Record<string, { price: number; change: number }>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Fetch fundamental data from FRED
    fetchFredSeries('CPIAUCSL').then(setFredCpi);
    fetchFredSeries('UNRATE').then(setFredUnrate);
    getLiveForexRates().then(rates => {
      if (rates) {
        Object.entries(rates).forEach(([sym, price]) => {
          setFmpPrices(prev => ({ ...prev, [sym]: { price: String(price), change: "+0.10%" } }));
        });
      }
    });

    // Fetch live stock quotes from FMP for NYSE stocks
    const nyseSymbols = allMarketsData.filter(i => i.category === 'NYSE').map(i => i.symbol);
    nyseSymbols.forEach(async (sym) => {
      const quote = await fetchFmpQuote(sym);
      if (quote) {
        setFmpPrices(prev => ({ ...prev, [sym]: { price: quote.price, change: quote.changesPercentage } }));
      }
    });
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
      {/* Top Macro Banner using FRED */}
      <header style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '15px', fontWeight: 900, margin: 0 }}>INSTITUTIONAL MACRO & LIVE STOCK TERMINAL</h1>
          <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 800, marginTop: '2px' }}>
            ● FRED CPI: {fredCpi.value} ({fredCpi.date}) | UNRATE: {fredUnrate.value} ({fredUnrate.date})
          </div>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Search assets..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '6px 12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '11px', outline: 'none', fontWeight: 600 }}
          />
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
              cursor: 'pointer'
            }}
          >
            {cat === 'FOREX' ? 'Forex Pairs' : cat === 'COMMODITIES' ? 'Commodities' : cat === 'NYSE' ? 'NYSE Equities (FMP Live)' : 'Nigerian Stock Exchange (NGX)'}
          </button>
        ))}
      </div>

      {/* Market Grid Matrix */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 15px 0' }}>{selectedCategory} Market Feed</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {filteredAssets.map(item => {
            const fmp = fmpPrices[item.symbol];
            const displayPrice = fmp ? `$${fmp.price.toFixed(2)}` : item.price;
            const displayChange = fmp ? `${fmp.change >= 0 ? '+' : ''}${fmp.change.toFixed(2)}%` : item.change;
            const isPositive = displayChange.startsWith('+');

            return (
              <div key={item.symbol} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 900 }}>{item.symbol}</div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>{item.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 900 }}>{displayPrice}</div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: isPositive ? '#10b981' : '#ef4444' }}>{displayChange}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
