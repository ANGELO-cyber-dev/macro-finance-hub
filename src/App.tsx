import React, { useState } from 'react';
import { SideMenuDrawer } from './components/SideMenuDrawer';
import { CpiIntelligenceHub } from './components/CpiIntelligenceHub';
import { CompanyResearch } from './components/CompanyResearch';

export default function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('AUD');
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header Bar */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>📊</span>
          <h1 style={{ fontSize: '15px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>MACRO SIGNAL DASHBOARD</h1>
        </div>
        <button 
          onClick={() => setIsSideMenuOpen(true)} 
          style={{ display: 'flex', alignItems: 'center', gap: '6px', px: '12px', py: '6px', background: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
        >
          <span>📈</span> Menu / Analytics
        </button>
      </header>

      <div style={{ display: 'flex', flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        {/* Sidebar Navigation */}
        <aside style={{ width: '220px', background: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '20px 12px', display: 'none', flexDirection: 'column', gap: '8px' }} className="md:flex">
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Workspace</div>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0f172a', marginBottom: '12px', padding: '6px 8px', background: '#f1f5f9', borderRadius: '6px' }}>Global Macro</div>
          
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', margin: '12px 0 6px 0', letterSpacing: '0.05em' }}>Navigation</div>
          {['Overview', 'Rates & Yields', 'Labor Engine', 'Event Monitor', 'Signal History'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                textAlign: 'left',
                background: activeTab === tab ? '#f1f5f9' : 'transparent',
                color: activeTab === tab ? '#0f172a' : '#64748b',
                border: 'none',
                padding: '8px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '20px', boxSizing: 'border-box', overflowX: 'hidden' }}>
          {/* Selected Currency Card */}
          <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Selected Currency</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{ fontSize: '16px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
                >
                  <option value="AUD">AUD</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>🟢 Bullish Mode</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginTop: '6px' }}>-12</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>MACRO SCORE / 100 • +16 pts 30D</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>58%</div>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold' }}>+2% pts</div>
            </div>
          </div>

          {/* Core Hubs */}
          <CpiIntelligenceHub />
          <CompanyResearch />
        </main>
      </div>

      {/* Side Command Center Drawer */}
      <SideMenuDrawer isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
    </div>
  );
}
