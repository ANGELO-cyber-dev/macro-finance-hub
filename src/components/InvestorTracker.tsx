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
    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #eaeaea', marginTop: '20px' }}>
      <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>Trade history analytics</h3>
      <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
        Paste your exported MT5 deal history or rows below to instantly review your win rate, profit factor, and net performance metrics.
      </p>

      <textarea
        rows={6}
        placeholder="Paste exported MT5 report contents or table rows here..."
        onChange={(e) => analyzeHistory(e.target.value)}
        style={{ width: '100%', padding: '12px', fontFamily: 'monospace', fontSize: '12px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '16px' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
        <div style={{ background: '#f9fafb', padding: '14px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>Total Trades</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px' }}>{stats.totalTrades}</div>
        </div>
        <div style={{ background: '#f9fafb', padding: '14px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>Win Rate</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px', color: stats.winRate >= 50 ? '#10b981' : '#ef4444' }}>
            {stats.winRate}%
          </div>
        </div>
        <div style={{ background: '#f9fafb', padding: '14px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>Net P&L</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px', color: stats.netProfit >= 0 ? '#10b981' : '#ef4444' }}>
            ${stats.netProfit}
          </div>
        </div>
        <div style={{ background: '#f9fafb', padding: '14px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>Profit Factor</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px' }}>{stats.profitFactor}</div>
        </div>
      </div>
    </div>
  );
};
