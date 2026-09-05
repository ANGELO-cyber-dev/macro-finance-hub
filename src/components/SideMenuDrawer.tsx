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
      zIndex: 99999,
      display: 'flex',
      justifyContent: 'flex-start',
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(6px)',
    }}>
      <div style={{
        width: '100vw',
        maxWidth: '440px',
        height: '100vh',
        background: '#ffffff',
        boxShadow: '20px 0 50px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        {/* Professional Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.025em' }}>INVESTOR COMMAND CENTER</h2>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0', fontWeight: '500' }}>Live Economic Matrix & Trade Performance</p>
          </div>
          <button 
            onClick={onClose}
            style={{ background: '#0f172a', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Economic Calendar Module */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
            📅 Global Economic Calendar
          </div>
          <div style={{ width: '100%', height: '340px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <iframe 
              src="https://s.tradingview.com/embed-widget/events/?locale=en" 
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Economic Calendar"
            />
          </div>
        </div>

        {/* Trade Analytics Module */}
        <div>
          <InvestorTracker />
        </div>
      </div>
    </div>
  );
};
