import React, { useState, useEffect } from 'react';
import { centralBanks, CentralBankInfo } from './data/centralBanksData';
import { fetchLivePolicyStream } from './services/centralBankEngine';

export default function App() {
  const [selectedBank, setSelectedBank] = useState<CentralBankInfo>(centralBanks[0]);
  const [activeTab, setActiveTab] = useState<'tracker' | 'divergence' | 'speeches'>('tracker');
  const [liveStreamData, setLiveStreamData] = useState<Record<string, { liveRate: string; score: number; time: string }>>({});
  const [tick, setTick] = useState<number>(0);

  // Live simulation loop bypassing external API keys
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => (t + 1) % 100);
      const updated: Record<string, { liveRate: string; score: number; time: string }> = {};
      centralBanks.forEach(cb => {
        const data = fetchLivePolicyStream(cb.code);
        updated[cb.code] = { liveRate: data.liveRate, score: data.sentimentScore, time: data.lastUpdated };
      });
      setLiveStreamData(updated);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'Inter, system-ui, sans-serif', padding: '20px' }}>
      {/* Institutional Header */}
      <header style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', background: '#0f172a', color: '#fff', display: 'grid', placeItems: 'center', borderRadius: '8px', fontWeight: 900, fontSize: '13px' }}>CB</div>
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 900, margin: 0 }}>GLOBAL CENTRAL BANK POLICY TERMINAL</h1>
            <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 800, marginTop: '2px' }}>● BYPASSED SIMULATED FEED LIVE [seq:{tick}]</div>
          </div>
        </div>
        <div style={{ padding: '6px 12px', background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>
          Global Policy Divergence: Active
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {(['tracker', 'divergence', 'speeches'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              background: activeTab === tab ? '#0f172a' : '#ffffff',
              color: activeTab === tab ? '#ffffff' : '#475569',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            {tab === 'tracker' ? 'Rate Expectations & Odds' : tab === 'divergence' ? 'Cross-Border Divergence Matrix' : 'Hawkometer Speech Sentiment'}
          </button>
        ))}
      </div>

      {activeTab === 'tracker' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Central Banks List */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 15px 0' }}>Major Central Bank Meeting Odds & Live Rates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {centralBanks.map(cb => {
                const live = liveStreamData[cb.code];
                return (
                  <div
                    key={cb.code}
                    onClick={() => setSelectedBank(cb)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '14px 16px',
                      background: selectedBank.code === cb.code ? '#f1f5f9' : '#f8fafc',
                      border: selectedBank.code === cb.code ? '2px solid #0f172a' : '1px solid #e2e8f0',
                      borderRadius: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 900 }}>{cb.bankName} <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>({cb.region})</span></div>
                      <div style={{ fontSize: '10px', color: '#64748b', marginTop: '3px' }}>Next Meeting: <strong>{cb.nextMeeting}</strong></div>
                    </div>
                    <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 700 }}>LIVE RATE FEED</div>
                        <div style={{ fontSize: '13px', fontWeight: 900, color: '#10b981' }}>{live ? live.liveRate : cb.currentRate}</div>
                      </div>
                      <div style={{ textAlign: 'right', minWidth: '70px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 900, color: cb.stance === 'Hawkish' ? '#10b981' : cb.stance === 'Dovish' ? '#ef4444' : '#d97706' }}>
                          {cb.stance}
                        </div>
                        <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 800 }}>STANCE</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Bank Details Panel */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 15px 0' }}>{selectedBank.bankName} Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Current Policy Rate</span>
                <strong>{liveStreamData[selectedBank.code]?.liveRate || selectedBank.currentRate}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Next Meeting</span>
                <strong>{selectedBank.nextMeeting}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Hike Probability</span>
                <strong style={{ color: '#10b981' }}>{selectedBank.rateOddsHike}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Hold Probability</span>
                <strong>{selectedBank.rateOddsHold}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ color: '#64748b' }}>Cut Probability</span>
                <strong style={{ color: '#ef4444' }}>{selectedBank.rateOddsCut}</strong>
              </div>
            </div>

            <h4 style={{ fontSize: '12px', fontWeight: 900, margin: '0 0 8px 0' }}>Implied Rate Path</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {selectedBank.impliedPath.map((rate, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <div style={{ fontSize: '8px', color: '#64748b', fontWeight: 800 }}>Mtg +{idx}</div>
                  <div style={{ fontSize: '12px', fontWeight: 900, marginTop: '2px' }}>{rate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'divergence' && (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 15px 0' }}>Cross-Border Policy Divergence Matrix</h3>
          <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '15px' }}>Comparing central bank policy stances to identify high-conviction forex and yield spread opportunities.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 900, color: '#166534', marginBottom: '6px' }}>🟢 Hawkish vs Dovish Spread (ECB / FED)</div>
              <p style={{ fontSize: '11px', color: '#14532d', margin: 0, lineHeight: 1.4 }}>
                ECB tightening expectations contrast sharply with the Federal Reserve's pause stance, supporting EUR relative strength against USD crosses.
              </p>
            </div>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 900, color: '#dc2626', marginBottom: '6px' }}>🔴 Normalization Divergence (BOJ / FED)</div>
              <p style={{ fontSize: '11px', color: '#7f1d1d', margin: 0, lineHeight: 1.4 }}>
                Bank of Japan gradually normalizing rates while US yields hover near 4.3% creates ongoing carry trade re-evaluations and sudden volatility spikes.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'speeches' && (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 15px 0' }}>Hawkometer Speech Sentiment Tracker</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}>
              <div>
                <strong>Federal Reserve (Powell / Officials)</strong>
                <div style={{ color: '#64748b', fontSize: '10px', marginTop: '2px' }}>Recent transcripts lean cautious/accommodative</div>
              </div>
              <strong style={{ color: '#d97706' }}>Neutral (+3.8)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}>
              <div>
                <strong>European Central Bank (Lagarde)</strong>
                <div style={{ color: '#64748b', fontSize: '10px', marginTop: '2px' }}>Focus on sticky inflation and second-round wage effects</div>
              </div>
              <strong style={{ color: '#10b981' }}>Hawkish (+6.2)</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
