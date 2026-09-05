import React, { useEffect, useRef } from 'react';

export default function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 550,
      symbolsGroups: [
        {
          name: "US Equities",
          symbols: [
            { name: "NASDAQ:AAPL", displayName: "Apple" },
            { name: "NASDAQ:NVDA", displayName: "Nvidia" },
            { name: "NASDAQ:MSFT", displayName: "Microsoft" },
            { name: "NYSE:TSM", displayName: "TSMC" }
          ]
        },
        {
          name: "Nigerian Equities (NGX)",
          symbols: [
            { name: "NGX:DANGCEM", displayName: "Dangote Cement" },
            { name: "NGX:GTCO", displayName: "GTCO" },
            { name: "NGX:ZENITHBANK", displayName: "Zenith Bank" },
            { name: "NGX:MTNN", displayName: "MTN Nigeria" },
            { name: "NGX:BUACEMENT", displayName: "BUA Cement" }
          ]
        },
        {
          name: "Commodities & Forex",
          symbols: [
            { name: "OANDA:XAUUSD", displayName: "Gold" },
            { name: "FX_IDC:EURUSD", displayName: "EUR/USD" },
            { name: "FX_IDC:GBPUSD", displayName: "GBP/USD" },
            { name: "FX_IDC:USDNGN", displayName: "USD/NGN" }
          ]
        }
      ],
      showSymbolLogo: true,
      isTransparent: false,
      colorTheme: "light",
      locale: "en"
    });

    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ width: "100%", minHeight: "550px" }}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}
