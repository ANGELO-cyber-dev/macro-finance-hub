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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        width: '100vw',
        maxWidth: '480px',
        height: '100vh',
        background: '#ffffff',
        boxShadow: '10px 0 30px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: '20px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eaeaea', paddingBottom: '12px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111', margin: 0 }}>Investor Command Center</h2>
            <p style={{ fontSize: '11px', color: '#666', margin: '2px 0 0 0' }}>Cross-device Live Analytics & Calendar</p>
          </div>
          <button 
            onClick={onClose}
            style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
          >
            ✕ Close
          </button>
        </div>

        {/* Economic Calendar */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Global Economic Calendar</h3>
          <div style={{ width: '100%', height: '340px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <iframe 
              src="https://s.tradingview.com/embed-widget/events/?locale=en" 
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Economic Calendar"
            />
          </div>
        </div>

        {/* Trade History Analyzer */}
        <div>
          <InvestorTracker />
        </div>
      </div>
    </div>
  );
};
