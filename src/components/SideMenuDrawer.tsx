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
      top: 0,
      right: 0,
      width: '100%',
      maxWidth: '420px',
      height: '100vh',
      background: '#ffffff',
      boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      padding: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Investor Tooling & Calendar</h2>
        <button 
          onClick={onClose}
          style={{ background: '#000', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
        >
          Close
        </button>
      </div>

      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '10px' }}>Economic Calendar</h3>
        <div style={{ width: '100%', height: '350px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
          <iframe 
            src="https://s.tradingview.com/embed-widget/events/?locale=en" 
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Economic Calendar"
          />
        </div>
      </div>

      <div>
        <InvestorTracker />
      </div>
    </div>
  );
};
