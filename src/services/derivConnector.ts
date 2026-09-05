const DERIV_APP_ID = 1089; // Default public testing app_id

// Deriv Forex symbol mapping
export const DERIV_SYMBOLS: Record<string, string> = {
  "EUR/USD": "frxEURUSD",
  "GBP/USD": "frxGBPUSD",
  "USD/JPY": "frxUSDJPY",
  "AUD/USD": "frxAUDUSD",
  "USD/CAD": "frxUSDCAD",
  "NZD/USD": "frxNZDUSD"
};

export function subscribeDerivTicks(onTick: (symbol: string, quote: number) => void) {
  const ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${DERIV_APP_ID}`);

  ws.onopen = () => {
    Object.values(DERIV_SYMBOLS).forEach((derivSymbol) => {
      ws.send(JSON.stringify({ ticks: derivSymbol, subscribe: 1 }));
    });
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.msg_type === 'tick' && data.tick) {
      const { symbol, quote } = data.tick;
      const displaySymbol = Object.keys(DERIV_SYMBOLS).find(
        (key) => DERIV_SYMBOLS[key] === symbol
      );
      if (displaySymbol) {
        onTick(displaySymbol, quote);
      }
    }
  };

  ws.onerror = (err) => {
    console.error("Deriv WebSocket Error:", err);
  };

  return () => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  };
}
