import React, { useState, useEffect, useRef } from 'react';

type AssetClass = 'INDICES' | 'COMMODITIES' | 'FOREX' | 'NYSE';

interface MacroAsset {
  symbol: string;
  name: string;
  class: AssetClass;
  price: number;
  macroScore: number;
  momentum: string;
  consensus: number;
  bias: 'Strong Bullish' | 'Bullish' | 'Neutral' | 'Bearish' | 'Strong Bearish';
  tone: string;
  twoYearYield: string;
  rateOdds: string;
  laborTrend: string;
  rateSpread: string;
  inflationPressure: string;
  warningNote?: string;
  rationale: string;
}

const MASTER_INSTRUMENTS: MacroAsset[] = [
  // --- INDICES (FMP REAL-TIME) ---
  {
    symbol: '^GSPC',
    name: 'S&P 500 Index',
    class: 'INDICES',
    price: 5648.40,
    macroScore: 78,
    momentum: '+16 pts 30D',
    consensus: 85,
    bias: 'Bullish',
    tone: 'Broad Large-Cap Expansion',
    twoYearYield: 'ERP 1.25%',
    rateOdds: 'Soft Landing Priced',
    laborTrend: 'Earnings Resilient',
    rateSpread: '21.4x Fwd P/E',
    inflationPressure: 'Corporate Margin Retention',
    rationale: 'Robust mega-cap corporate balance sheets and expected policy accommodation anchor broad benchmark resilience.'
  },
  {
    symbol: '^IXIC',
    name: 'Nasdaq Composite',
    class: 'INDICES',
    price: 17713.60,
    macroScore: 82,
    momentum: '+22 pts 30D',
    consensus: 88,
    bias: 'Strong Bullish',
    tone: 'AI Infrastructure Capex',
    twoYearYield: '28.8x Fwd P/E',
    rateOdds: 'Tech Multiple Support',
    laborTrend: 'Productivity Gains',
    rateSpread: 'Cloud Scale Out',
    inflationPressure: 'Pricing Power High',
    rationale: 'Hyperscaler capital expenditures in compute infrastructure continue driving secular enterprise tech growth.'
  },
  {
    symbol: '^DJI',
    name: 'Dow Jones Industrial Average',
    class: 'INDICES',
    price: 41563.00,
    macroScore: 72,
    momentum: '+12 pts 30D',
    consensus: 79,
    bias: 'Bullish',
    tone: 'Cyclical Value Rotation',
    twoYearYield: '18.2x Fwd P/E',
    rateOdds: 'Broad Breadth',
    laborTrend: 'Industrial Base Solid',
    rateSpread: 'Dividend Yield 1.9%',
    inflationPressure: 'Input Cost Normalization',
    rationale: 'Broadening market breadth into industrials, financials, and consumer healthcare buffers late-cycle risks.'
  },
  {
    symbol: '^VIX',
    name: 'CBOE Volatility Index',
    class: 'INDICES',
    price: 15.40,
    macroScore: 35,
    momentum: '-8 pts 30D',
    consensus: 58,
    bias: 'Neutral',
    tone: 'Complacent Vol Regime',
    twoYearYield: 'Sub-20 Mean',
    rateOdds: 'Tail Risk Low',
    laborTrend: 'Put/Call Ratios Muted',
    rateSpread: 'Low Realized Vol',
    inflationPressure: 'Hedging Costs Cheap',
    rationale: 'Subdued options implied volatility reflects institutional complacency, leaving tactical risk-on intact.'
  },
  {
    symbol: 'DX-Y.NYB',
    name: 'US Dollar Index (DXY)',
    class: 'INDICES',
    price: 101.40,
    macroScore: 54,
    momentum: '-5 pts 30D',
    consensus: 62,
    bias: 'Neutral',
    tone: 'Global Easing Divergence',
    twoYearYield: 'Fed Benchmark Spread',
    rateOdds: 'Rate Cut Pacing',
    laborTrend: 'US Payrolls Normalizing',
    rateSpread: '+0.85% Transatlantic Gap',
    inflationPressure: 'Headline Cooling',
    rationale: 'Relative US economic resilience balances rate-cut pricing against weak European and Asian counterpart currencies.'
  },
  {
    symbol: '^RUT',
    name: 'Russell 2000 (Small Cap)',
    class: 'INDICES',
    price: 2217.50,
    macroScore: 68,
    momentum: '+14 pts 30D',
    consensus: 74,
    bias: 'Bullish',
    tone: 'Rate Cut Sensitivity',
    twoYearYield: 'Refinancing Relief',
    rateOdds: 'Aggressive Cuts',
    laborTrend: 'Domestic Employment',
    rateSpread: 'High Floating Debt',
    inflationPressure: 'Margin Squeeze Easing',
    rationale: 'Small caps carry elevated floating-rate debt loads, making them outsized beneficiaries of easing central bank rates.'
  },

  // --- COMMODITIES ---
  {
    symbol: 'XAU/USD',
    name: 'Spot Gold / US Dollar',
    class: 'COMMODITIES',
    price: 2516.40,
    macroScore: 88,
    momentum: '+24 pts 30D',
    consensus: 92,
    bias: 'Strong Bullish',
    tone: 'Reserve Hedging',
    twoYearYield: '-0.35% Real',
    rateOdds: '88%',
    laborTrend: 'Defensive Anchor',
    rateSpread: '+483t Inflows',
    inflationPressure: 'Physical Squeeze',
    rationale: 'Sovereign central bank diversification and negative real yields sustain structural demand.'
  },
  {
    symbol: 'XAG/USD',
    name: 'Spot Silver / US Dollar',
    class: 'COMMODITIES',
    price: 29.65,
    macroScore: 82,
    momentum: '+19 pts 30D',
    consensus: 86,
    bias: 'Strong Bullish',
    tone: 'Industrial Deficit',
    twoYearYield: 'G/S Ratio 84x',
    rateOdds: '82%',
    laborTrend: 'Capex Expansion',
    rateSpread: '+18% Solar Deficit',
    inflationPressure: 'Photovoltaic Shortage',
    rationale: 'Massive solar panel industrial uptake combined with physical vault depletion underpins structural upside.'
  },
  {
    symbol: 'WTI/USD',
    name: 'Crude Oil (WTI Spot)',
    class: 'COMMODITIES',
    price: 74.80,
    macroScore: 52,
    momentum: '-3 pts 30D',
    consensus: 58,
    bias: 'Neutral',
    tone: 'OPEC+ Restraint',
    twoYearYield: 'Curve Backwardation',
    rateOdds: '55%',
    laborTrend: 'Refinery Balanced',
    rateSpread: 'Quota Compliance',
    inflationPressure: 'Geopolitical Risk',
    rationale: 'Voluntary OPEC+ supply cuts are counterbalanced by sluggish non-OECD manufacturing demand.'
  },
  {
    symbol: 'BRENT/USD',
    name: 'Brent Crude Oil Spot',
    class: 'COMMODITIES',
    price: 78.40,
    macroScore: 54,
    momentum: '-1 pts 30D',
    consensus: 60,
    bias: 'Neutral',
    tone: 'Red Sea Routing',
    twoYearYield: 'Seaborne Premium',
    rateOdds: '58%',
    laborTrend: 'Tanker Disruption',
    rateSpread: 'Brent/WTI +$3.60',
    inflationPressure: 'Freight Inflation',
    rationale: 'Red Sea shipping diversions sustain transport arbitrage while refined stocks remain adequate.'
  },

  // --- FOREX ---
  {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    class: 'FOREX',
    price: 1.0845,
    macroScore: -34,
    momentum: '-22 pts 30D',
    consensus: 74,
    bias: 'Bearish',
    tone: 'Dovish ECB Cycle',
    twoYearYield: '2.42% ECB',
    rateOdds: '78%',
    laborTrend: 'Industrial Drag',
    rateSpread: '-1.30% vs Fed',
    inflationPressure: 'Core Disinflation',
    rationale: 'ECB rate cutting acceleration due to German export slowdown outpaces US adjustments.'
  },
  {
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar',
    class: 'FOREX',
    price: 1.3120,
    macroScore: 58,
    momentum: '+10 pts 30D',
    consensus: 62,
    bias: 'Bullish',
    tone: 'Sticky Services CPI',
    twoYearYield: '4.15% BoE',
    rateOdds: '42%',
    laborTrend: 'Wage Resilient',
    rateSpread: '+0.15% Spread',
    inflationPressure: 'Services CPI +5.2%',
    rationale: 'Persistent UK services inflation prevents aggressive BoE easing, supporting sterling.'
  },
  {
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    class: 'FOREX',
    price: 156.24,
    macroScore: 72,
    momentum: '+16 pts 30D',
    consensus: 81,
    bias: 'Bullish',
    tone: 'Wide Carry Gap',
    twoYearYield: '0.38% BoJ',
    rateOdds: '35%',
    laborTrend: 'Wage Catchup',
    rateSpread: '+3.45% Fed/BoJ Gap',
    inflationPressure: 'Tokyo CPI +2.2%',
    rationale: 'Transatlantic interest carry differentials favor USD despite BoJ intervention commentary.'
  },
  {
    symbol: 'AUD/USD',
    name: 'Australian Dollar / US Dollar',
    class: 'FOREX',
    price: 0.6725,
    macroScore: -12,
    momentum: '-18 pts 30D',
    consensus: 84,
    bias: 'Bearish',
    tone: 'Hawkish Fed / Neutral RBA',
    twoYearYield: '3.72%',
    rateOdds: '68%',
    laborTrend: 'Cooling',
    rateSpread: '-0.85% Spread',
    inflationPressure: 'CPI Subdued (2.7%)',
    warningNote: 'NFP is contradicting the broader signal',
    rationale: 'US interest rate expectations maintain downward pressure on trade-exposed currencies.'
  },
  {
    symbol: 'USD/CAD',
    name: 'US Dollar / Canadian Dollar',
    class: 'FOREX',
    price: 1.3580,
    macroScore: 65,
    momentum: '+14 pts 30D',
    consensus: 75,
    bias: 'Bullish',
    tone: 'BoC Rate Cuts',
    twoYearYield: '3.10% BoC',
    rateOdds: '72%',
    laborTrend: 'Unemployment 6.4%',
    rateSpread: '+0.80% Fed Edge',
    inflationPressure: 'Shelter Cooling',
    rationale: 'Bank of Canada rate cuts due to consumer debt fragility widen the yield spread in favor of USD.'
  },

  // --- NYSE STOCKS ---
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    class: 'NYSE',
    price: 218.50,
    macroScore: 74,
    momentum: '+15 pts 30D',
    consensus: 86,
    bias: 'Strong Bullish',
    tone: 'NIM Expansion',
    twoYearYield: '12.4x P/E',
    rateOdds: 'High Liquidity',
    laborTrend: 'Stable Payrolls',
    rateSpread: 'Tier-1 Capital 15.3%',
    inflationPressure: 'Advisory Rev +18%',
    rationale: 'Fortress balance sheet and net interest margin retention sustain outperformance.'
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    class: 'NYSE',
    price: 75.30,
    macroScore: 70,
    momentum: '+14 pts 30D',
    consensus: 82,
    bias: 'Bullish',
    tone: 'Trade-Down Play',
    twoYearYield: '31.2x P/E',
    rateOdds: 'Defensive Quality',
    laborTrend: 'Automation',
    rateSpread: 'Share Capture',
    inflationPressure: 'Grocery Cooling',
    rationale: 'Middle and high income consumer trade-down protects margins in late-cycle environments.'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    class: 'NYSE',
    price: 119.30,
    macroScore: 84,
    momentum: '+26 pts 30D',
    consensus: 90,
    bias: 'Strong Bullish',
    tone: 'Datacenter Capex',
    twoYearYield: '38.5x P/E',
    rateOdds: 'AI Hyper-growth',
    laborTrend: 'Hyperscale Scale',
    rateSpread: 'Architecture Lead',
    inflationPressure: '75%+ Gross Margin',
    rationale: 'Hyperscaler GPU capital expenditures and Blackwell platform demand anchor fundamental upside.'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    class: 'NYSE',
    price: 224.20,
    macroScore: 68,
    momentum: '+11 pts 30D',
    consensus: 78,
    bias: 'Bullish',
    tone: 'Services Ecosystem',
    twoYearYield: '33.4x P/E',
    rateOdds: 'Cash Flow Anchor',
    laborTrend: 'Global Supply Lead',
    rateSpread: 'Share Buybacks',
    inflationPressure: 'High Unit Margin',
    rationale: 'High-margin services expansion and recurring share repurchases mitigate hardware cycle lags.'
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    class: 'NYSE',
    price: 114.50,
    macroScore: 56,
    momentum: '+2 pts 30D',
    consensus: 60,
    bias: 'Neutral',
    tone: 'Permian Efficiency',
    twoYearYield: '13.8x P/E',
    rateOdds: 'Yield 3.4%',
    laborTrend: 'Low Cost Basin',
    rateSpread: 'Upstream Margin',
    inflationPressure: 'Refining Compression',
    rationale: 'Permian Basin production scale offset by refining margin consolidation.'
  }
];

const TWELVE_KEY = 'b1e082f789294e8386b69610368832fb';

export default function App() {
  const [selectedAsset, setSelectedAsset] = useState<MacroAsset>(MASTER_INSTRUMENTS[0]);
  const [livePricesMap, setLivePricesMap] = useState<Record<string, number>>({});
  const [expandedSym, setExpandedSym] = useState<string | null>(MASTER_INSTRUMENTS[0].symbol);
  const [classFilter, setClassFilter] = useState<AssetClass>('INDICES');
  const [search, setSearch] = useState('');
  const [showCalc, setShowCalc] = useState(false);
  const [fredYield, setFredYield] = useState<number | null>(null);
  const [syncStatus, setSyncStatus] = useState<string>('Syncing Global Feeds...');

  // Active spotlight chart
  const [activePrice, setActivePrice] = useState<number>(MASTER_INSTRUMENTS[0].price);
  const [ticks, setTicks] = useState<number[]>([MASTER_INSTRUMENTS[0].price]);

  // Position Sizing inputs
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [stopLossUnit, setStopLossUnit] = useState<number>(25.0);

  const wsRef = useRef<WebSocket | null>(null);

  // 1. FRED Macro Yield Initializer
  useEffect(() => {
    fetch('/api/fred?series=DGS2')
      .then(res => res.json())
      .then(d => {
        if (d?.value) setFredYield(Number(d.value));
      })
      .catch(e => console.error('FRED Error', e));
  }, []);

  // 2. Multi-Provider Batch Poller (FMP handles INDICES + NYSE; Twelve Data handles COMMODITIES + FOREX)
  const syncActiveBatch = async () => {
    const isFmpClass = classFilter === 'INDICES' || classFilter === 'NYSE';
    const symbols = MASTER_INSTRUMENTS.filter(i => i.class === classFilter).map(i => i.symbol).join(',');

    if (isFmpClass) {
      try {
        setSyncStatus(`Syncing FMP ${classFilter}...`);
        const res = await fetch(`/api/fmp?symbols=${encodeURIComponent(symbols)}`);
        const data = await res.json();
        if (data && typeof data === 'object') {
          const updated: Record<string, number> = {};
          Object.entries(data).forEach(([sym, obj]: [string, any]) => {
            if (obj?.price) updated[sym] = Number(obj.price);
          });
          setLivePricesMap(prev => ({ ...prev, ...updated }));
          setSyncStatus(`FMP ${classFilter} Connected`);
          if (updated[selectedAsset.symbol]) setActivePrice(updated[selectedAsset.symbol]);
        }
      } catch (e) {
        console.error('FMP Sync Failed', e);
      }
    } else {
      try {
        setSyncStatus(`Syncing Twelve Data ${classFilter}...`);
        const res = await fetch(`/api/metals`);
        const data = await res.json();
        if (data && typeof data === 'object') {
          const updated: Record<string, number> = {};
          Object.entries(data).forEach(([sym, obj]: [string, any]) => {
            if (obj?.price) updated[sym] = Number(obj.price);
          });
          setLivePricesMap(prev => ({ ...prev, ...updated }));
          setSyncStatus('Twelve Data Feed Live');
          if (updated[selectedAsset.symbol]) setActivePrice(updated[selectedAsset.symbol]);
        }
      } catch (e) {
        console.error('TwelveData Sync Failed', e);
      }
    }
  };

  useEffect(() => {
    syncActiveBatch();
    const interval = setInterval(syncActiveBatch, 15000);
    return () => clearInterval(interval);
  }, [classFilter]);

  // 3. Sub-Second WebSocket for Commodity/Forex streaming
  useEffect(() => {
    if (selectedAsset.class === 'NYSE' || selectedAsset.class === 'INDICES') return;

    const ws = new WebSocket(`wss://ws.twelvedata.com/v1/quotes/price?apikey=${TWELVE_KEY}`);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: 'subscribe', params: { symbols: selectedAsset.symbol } }));
    };

    ws.onmessage = (e) => {
      try {
        const d = JSON.parse(e.data);
        if (d.event === 'price' && d.price) {
          const np = Number(d.price);
          setActivePrice(np);
          setLivePricesMap(prev => ({ ...prev, [selectedAsset.symbol]: np }));
          setTicks(prev => [...prev.slice(-35), np]);
        }
      } catch (err) {
        console.error('WS Tick Error', err);
      }
    };

    return () => ws.close();
  }, [selectedAsset.symbol]);

  const selectInstrument = (item: MacroAsset) => {
    setSelectedAsset(item);
    const currPrice = livePricesMap[item.symbol] || item.price;
    setActivePrice(currPrice);
    setExpandedSym(prev => (prev === item.symbol ? null : item.symbol));

    if (item.class === 'INDICES') {
      setStopLossUnit(15.0);
    } else if (item.class === 'NYSE') {
      setStopLossUnit(4.5);
    } else if (item.symbol.includes('XAU')) {
      setStopLossUnit(15.0);
    } else {
      setStopLossUnit(25.0);
    }

    const step = item.class === 'FOREX' ? 0.0002 : item.price > 1000 ? 1.8 : 0.45;
    const initial: number[] = [];
    let p = currPrice;
    for (let i = 0; i < 24; i++) {
      p += (Math.random() - 0.495) * step;
      initial.push(Number(p.toFixed(item.class === 'FOREX' ? 4 : 2)));
    }
    setTicks(initial);
  };

  const getBiasBadge = (bias: MacroAsset['bias']) => {
    switch (bias) {
      case 'Strong Bullish': return { bg: '#F0FDF4', border: '#BBF7D0', text: '#15803D' };
      case 'Bullish': return { bg: '#F0FDF4', border: '#DCFCE7', text: '#16A34A' };
      case 'Neutral': return { bg: '#FFFBEB', border: '#FEF3C7', text: '#D97706' };
      case 'Bearish': return { bg: '#FEF2F2', border: '#FEE2E2', text: '#DC2626' };
      case 'Strong Bearish': return { bg: '#FEF2F2', border: '#FECACA', text: '#B91C1C' };
    }
  };

  const currentTheme = getBiasBadge(selectedAsset.bias);

  // Dynamic Position Sizing
  const cashRisk = balance * (riskPercent / 100);
  const isStock = selectedAsset.class === 'NYSE';
  const isIndex = selectedAsset.class === 'INDICES';
  const isGold = selectedAsset.symbol.includes('XAU');

  let calculatedVolume = '';
  let notionalExposure = 0;

  if (isIndex) {
    const contracts = stopLossUnit > 0 ? (cashRisk / (stopLossUnit * 5)) : 0;
    calculatedVolume = `${contracts.toFixed(1)} Contracts`;
    notionalExposure = contracts * activePrice * 5;
  } else if (isStock) {
    const shares = stopLossUnit > 0 ? Math.floor(cashRisk / stopLossUnit) : 0;
    calculatedVolume = `${shares.toLocaleString()} Shares`;
    notionalExposure = shares * activePrice;
  } else if (isGold) {
    const lots = stopLossUnit > 0 ? cashRisk / (stopLossUnit * 100) : 0;
    calculatedVolume = `${lots.toFixed(2)} Lots`;
    notionalExposure = lots * 100 * activePrice;
  } else {
    const lots = stopLossUnit > 0 ? cashRisk / (stopLossUnit * 10) : 0;
    calculatedVolume = `${lots.toFixed(2)} Lots`;
    notionalExposure = lots * 100000;
  }

  // Sparkline Builder
  const minTick = Math.min(...ticks);
  const maxTick = Math.max(...ticks);
  const range = maxTick - minTick || 0.0001;
  const svgW = 340;
  const svgH = 65;

  const points = ticks
    .map((v, i) => {
      const x = (i / (ticks.length - 1 || 1)) * svgW;
      const y = svgH - ((v - minTick) / range) * (svgH - 16) - 8;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,${svgH} ${points} ${svgW},${svgH}`;

  const filtered = MASTER_INSTRUMENTS.filter(a => {
    const matchesClass = a.class === classFilter;
    const matchesSearch =
      a.symbol.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', color: '#18181B', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* Top Header */}
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E4E4E7', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#09090B' }}>MACRO SIGNAL</div>
            <div style={{ fontSize: '0.62rem', color: '#16A34A', fontWeight: 700 }}>
              ● {syncStatus.toUpperCase()}
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: '220px' }}>
            <input
              type="text"
              placeholder="Search ticker..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', background: '#F4F4F5', border: 'none', padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button
            onClick={() => setShowCalc(!showCalc)}
            style={{
              background: showCalc ? '#09090B' : '#F4F4F5',
              color: showCalc ? '#FAFAFA' : '#18181B',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '16px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {showCalc ? 'Close' : '🧮 Risk'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '14px', boxSizing: 'border-box' }}>

        {/* RISK & POSITION SIZING CALCULATOR */}
        {showCalc && (
          <section style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E4E7', padding: '16px', marginBottom: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#09090B' }}>Risk & Position Sizing</div>
                <div style={{ fontSize: '0.68rem', color: '#71717A' }}>
                  Calibrated for {selectedAsset.symbol} ({isIndex ? 'Index Contracts' : isStock ? 'Equity Shares' : 'Lots'})
                </div>
              </div>
              <button onClick={() => setShowCalc(false)} style={{ background: '#F4F4F5', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#71717A' }}>Balance ($)</label>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  style={{ width: '100%', padding: '7px 8px', borderRadius: '6px', border: '1px solid #E4E4E7', fontSize: '0.8rem', fontWeight: 700, marginTop: '2px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#71717A' }}>Risk (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Number(e.target.value))}
                  style={{ width: '100%', padding: '7px 8px', borderRadius: '6px', border: '1px solid #E4E4E7', fontSize: '0.8rem', fontWeight: 700, marginTop: '2px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#71717A' }}>{isIndex || isStock ? 'Stop (Pts/$)' : 'Stop (Pips)'}</label>
                <input
                  type="number"
                  step="0.5"
                  value={stopLossUnit}
                  onChange={(e) => setStopLossUnit(Number(e.target.value))}
                  style={{ width: '100%', padding: '7px 8px', borderRadius: '6px', border: '1px solid #E4E4E7', fontSize: '0.8rem', fontWeight: 700, marginTop: '2px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: '#F8FAFC', padding: '10px', borderRadius: '10px', border: '1px solid #F1F5F9' }}>
              <div>
                <div style={{ fontSize: '0.6rem', color: '#71717A', fontWeight: 600 }}>CASH RISK</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#DC2626' }}>${cashRisk.toFixed(2)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.6rem', color: '#71717A', fontWeight: 600 }}>VOLUME</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#2563EB' }}>{calculatedVolume}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.6rem', color: '#71717A', fontWeight: 600 }}>NOTIONAL</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#09090B' }}>${notionalExposure.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              </div>
            </div>
          </section>
        )}

        {/* HERO SPECIFICATION CARD */}
        <section style={{ background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E4E4E7', padding: '18px', marginBottom: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', color: '#A1A1AA' }}>ACTIVE SPECIFICATION</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#09090B', letterSpacing: '-0.02em' }}>{selectedAsset.symbol}</span>
                <span style={{ fontSize: '0.62rem', fontWeight: 800, padding: '2px 7px', borderRadius: '6px', background: currentTheme.bg, color: currentTheme.text, border: `1px solid ${currentTheme.border}` }}>
                  {selectedAsset.bias.toUpperCase()}
                </span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#71717A', marginTop: '1px' }}>{selectedAsset.name}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#A1A1AA' }}>CONSENSUS</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090B' }}>{selectedAsset.consensus}%</div>
              <div style={{ width: '70px', height: '4px', background: '#F4F4F5', borderRadius: '3px', overflow: 'hidden', marginTop: '4px' }}>
                <div style={{ width: `${selectedAsset.consensus}%`, height: '100%', background: '#10B981' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: '#09090B' }}>
                {selectedAsset.macroScore > 0 ? `+${selectedAsset.macroScore}` : selectedAsset.macroScore}
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#A1A1AA', marginTop: '4px' }}>
                MACRO SCORE / 100 • {selectedAsset.momentum}
              </div>
            </div>

            <div style={{ flex: 1, maxWidth: '240px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#71717A', marginBottom: '2px' }}>
                <span>{selectedAsset.class === 'INDICES' || selectedAsset.class === 'NYSE' ? 'FMP Real-Time' : 'Twelve Data Feed'}</span>
                <span style={{ fontWeight: 800, color: '#09090B' }}>
                  {selectedAsset.class === 'FOREX' ? '' : '$'}{activePrice.toLocaleString(undefined, { minimumFractionDigits: selectedAsset.class === 'FOREX' ? 4 : 2 })}
                </span>
              </div>
              <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', height: '42px', display: 'block' }}>
                <defs>
                  <linearGradient id="liveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polygon points={areaPoints} fill="url(#liveFill)" />
                <polyline fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" points={points} />
              </svg>
            </div>
          </div>
        </section>

        {/* DECISION DRIVERS */}
        <section style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E4E4E7', padding: '14px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem' }}>🧭</span>
            <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#09090B' }}>Drivers are confirming macro positioning</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.74rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F4F4F5', paddingBottom: '3px' }}>
              <span style={{ color: '#71717A' }}>Rate Policy Stance / Spread</span>
              <span style={{ fontWeight: 700, color: '#09090B' }}>{selectedAsset.rateSpread}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F4F4F5', paddingBottom: '3px' }}>
              <span style={{ color: '#71717A' }}>Official 2Y Yield (FRED)</span>
              <span style={{ fontWeight: 700, color: '#09090B' }}>
                {fredYield ? `${fredYield.toFixed(2)}%` : selectedAsset.twoYearYield}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#71717A' }}>Inflation Pressure / Drivers</span>
              <span style={{ fontWeight: 700, color: '#09090B' }}>{selectedAsset.inflationPressure}</span>
            </div>
          </div>
        </section>

        {/* 4-TILE PILLARS */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '14px' }}>
          <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E4E4E7' }}>
            <div style={{ fontSize: '0.62rem', color: '#A1A1AA', fontWeight: 700 }}>POLICY REGIME</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#09090B', marginTop: '2px' }}>{selectedAsset.tone}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E4E4E7' }}>
            <div style={{ fontSize: '0.62rem', color: '#A1A1AA', fontWeight: 700 }}>FRED BENCHMARK</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#09090B', marginTop: '2px' }}>
              {fredYield ? `${fredYield.toFixed(2)}%` : selectedAsset.twoYearYield}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E4E4E7' }}>
            <div style={{ fontSize: '0.62rem', color: '#A1A1AA', fontWeight: 700 }}>INSTITUTIONAL ODDS</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#10B981', marginTop: '2px' }}>{selectedAsset.rateOdds}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E4E4E7' }}>
            <div style={{ fontSize: '0.62rem', color: '#A1A1AA', fontWeight: 700 }}>LABOR / MARKET BREADTH</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#09090B', marginTop: '2px' }}>{selectedAsset.laborTrend}</div>
          </div>
        </section>

        {/* SCREENING MATRIX (WITH INDICES INCLUDED) */}
        <section style={{ background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E4E4E7', padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#09090B' }}>Asset Screener Matrix ({filtered.length})</div>
              <div style={{ fontSize: '0.62rem', color: '#16A34A', fontWeight: 600 }}>
                ● {classFilter === 'INDICES' || classFilter === 'NYSE' ? 'FMP Real-Time' : 'Twelve Data Live'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '3px' }}>
              {(['INDICES', 'COMMODITIES', 'FOREX', 'NYSE'] as AssetClass[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setClassFilter(tab);
                    const firstOfClass = MASTER_INSTRUMENTS.find(i => i.class === tab);
                    if (firstOfClass) selectInstrument(firstOfClass);
                  }}
                  style={{
                    padding: '4px 7px',
                    borderRadius: '6px',
                    border: classFilter === tab ? '1px solid #09090B' : '1px solid #E4E4E7',
                    background: classFilter === tab ? '#09090B' : '#FFFFFF',
                    color: classFilter === tab ? '#FAFAFA' : '#71717A',
                    fontWeight: 600,
                    fontSize: '0.62rem',
                    cursor: 'pointer'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {filtered.map((asset) => {
              const isSelected = selectedAsset.symbol === asset.symbol;
              const isExpanded = expandedSym === asset.symbol;
              const assetTheme = getBiasBadge(asset.bias);
              const realPrice = livePricesMap[asset.symbol] || asset.price;

              return (
                <div key={asset.symbol} style={{ borderRadius: '10px', border: isSelected ? '1px solid #18181B' : '1px solid #F4F4F5', overflow: 'hidden' }}>
                  
                  <div
                    onClick={() => selectInstrument(asset)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: isSelected ? '#FAFAFA' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#09090B' }}>{asset.symbol}</div>
                      <div style={{ fontSize: '0.64rem', color: '#71717A' }}>{asset.name}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#09090B' }}>
                          {asset.class === 'FOREX' ? '' : '$'}{realPrice.toLocaleString(undefined, { minimumFractionDigits: asset.class === 'FOREX' ? 4 : 2 })}
                        </div>
                        <div style={{ fontSize: '0.62rem', fontWeight: 700, color: assetTheme.text }}>
                          {asset.bias} ({asset.macroScore > 0 ? `+${asset.macroScore}` : asset.macroScore})
                        </div>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#A1A1AA' }}>{isExpanded ? '▲' : '▼'}</div>
                    </div>
                  </div>

                  {/* INLINE SCREENING DRAWER */}
                  {isExpanded && (
                    <div style={{ background: '#F8FAFC', borderTop: '1px solid #E4E4E7', padding: '12px' }}>
                      <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#09090B', letterSpacing: '0.04em', marginBottom: '6px' }}>
                        MACRO SCREENING BREAKDOWN • {asset.symbol}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '8px' }}>
                        <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
                          <div style={{ fontSize: '0.58rem', color: '#71717A' }}>FRED 2Y Delta</div>
                          <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#09090B' }}>
                            {fredYield ? `${fredYield.toFixed(2)}%` : asset.twoYearYield}
                          </div>
                        </div>
                        <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
                          <div style={{ fontSize: '0.58rem', color: '#71717A' }}>Regime Tone</div>
                          <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#09090B' }}>{asset.tone}</div>
                        </div>
                        <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
                          <div style={{ fontSize: '0.58rem', color: '#71717A' }}>Consensus</div>
                          <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#10B981' }}>{asset.consensus}%</div>
                        </div>
                      </div>

                      <div style={{ background: '#FFFFFF', padding: '8px', borderRadius: '6px', border: '1px solid #E4E4E7', fontSize: '0.7rem', color: '#374151', lineHeight: 1.4 }}>
                        <strong>Fundamental Rationale:</strong> {asset.rationale}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
