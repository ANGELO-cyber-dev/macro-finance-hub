import React, { useState } from 'react';

export const InvestorTracker: React.FC = () => {
  const [stats, setStats] = useState({
    totalTrades: 0,
    winRate: 0,
    netProfit: 0,
    profitFactor: 0
  });

  const analyzeHistory = (input: string) => {
    const lines = input.split('\n');
    let wins = 0;
    let losses = 0;
    let totalProfit = 0;
    let grossProfit = 0;
    let grossLoss = 0;
    let count = 0;

    lines.forEach(line => {
      const cols = line.split(/[\t,]/);
      if (cols.length >= 5) {
        const profit = parseFloat(cols[cols.length - 1]);
        if (!isNaN(profit) && !line.toLowerCase().includes('balance')) {
          count++;
          totalProfit += profit;
          if (profit > 0) {
            wins++;
            grossProfit += profit;
          } else if (profit < 0) {
            losses++;
            grossLoss += Math.abs(profit);
          }
        }
      }
    });

    const winRate = count > 0 ? (wins / count) * 100 : 0;
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 100 : 0;

    setStats({
      totalTrades: count,
      winRate: Number(winRate.toFixed(2)),
      netProfit: Number(totalProfit.toFixed(2)),
      profitFactor: Number(profitFactor.toFixed(2))
    });
  };

  return (
    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <div style={{ fontSize: '12px', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>
        📈 Trade History Analytics
      </div>
      <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>
        Paste your exported MT5 deal history report below to review live win-rate and P&L metrics.
      </p>

      <textarea
        rows={4}
        placeholder="Paste MT5 statement rows here..."
        onChange={(e) => analyzeHistory(e.target.value)}
        style={{ width: '100%', padding: '10px', fontFamily: 'monospace', fontSize: '11px', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '14px', boxSizing: 'border-box', background: '#ffffff' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
        <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Trades</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>{stats.totalTrades}</div>
        </div>
        <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Win Rate</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: stats.winRate >= 50 ? '#10b981' : '#ef4444', marginTop: '2px' }}>
            {stats.winRate}%
          </div>
        </div>
        <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Net P&L</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: stats.netProfit >= 0 ? '#10b981' : '#ef4444', marginTop: '2px' }}>
            ${stats.netProfit}
          </div>
        </div>
        <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Profit Factor</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>{stats.profitFactor}</div>
        </div>
      </div>
    </div>
  );
};
