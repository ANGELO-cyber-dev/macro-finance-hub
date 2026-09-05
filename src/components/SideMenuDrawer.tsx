import React from 'react';
import { InvestorTracker } from './InvestorTracker';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideMenuDrawer: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'flex-start',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)',
      transition: 'all 0.3s ease-in-out'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        height: '100vh',
        background: '#ffffff',
        boxShadow: '10px 0 30px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: '24px'
      }}>
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111', margin: 0 }}>Investor Command Center</h2>
            <p style={{ fontSize: '12px', color: '#666', margin: '2px 0 0 0' }}>Live Calendar & MT5 Performance</p>
          </div>
          <button 
            onClick={onClose}
            style={{ background: '#f3f4f6', color: '#111', border: 'none', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
          >
            ✕ Close
          </button>
        </div>

        {/* Economic Calendar Section */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px' }}>📅</span>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#111', margin: 0 }}>Global Economic Calendar</h3>
          </div>
          <div style={{ width: '100%', height: '380px', background: '#fafafa', borderRadius: '12px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
            <iframe 
              src="https://s.tradingview.com/embed-widget/events/?locale=en" 
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Economic Calendar"
            />
          </div>
        </div>

        {/* Trade History Analytics Section */}
        <div>
          <InvestorTracker />
        </div>
      </div>
    </div>
  );
};
