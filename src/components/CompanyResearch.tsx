import React, { useState } from 'react';

export const CompanyResearch: React.FC = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [inputVal, setInputVal] = useState('AAPL');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) setTicker(inputVal.toUpperCase().trim());
  };

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eaeaea', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>🔎 Company Research & Technical Matrix</h3>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '6px' }}>
          <input 
            type="text" 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter Ticker (e.g. TSLA, NVDA)"
            style={{ padding: '6px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
          />
          <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
            Analyze
          </button>
        </form>
      </div>

      <div style={{ width: '100%', height: '400px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <iframe 
          key={ticker}
          src={`https://s.tradingview.com/widgetembed/?symbol=${ticker}&interval=D&hidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=light&style=1&timezone=Etc%2FUTC&locale=en`}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Company Research Widget"
        />
      </div>
    </div>
  );
};
