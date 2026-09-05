import React, { useEffect, useRef } from 'react';

export const NgxMarketFeed: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: 550,
      symbolsGroups: [
        {
          name: 'Nigerian Equities (NGX)',
          symbols: [
            { name: 'NSENG:ASI', displayName: 'NGX All-Share Index' },
            { name: 'NSENG:DANGCEM', displayName: 'Dangote Cement' },
            { name: 'NSENG:MTNN', displayName: 'MTN Nigeria' },
            { name: 'NSENG:GTCO', displayName: 'Guaranty Trust (GTCO)' },
            { name: 'NSENG:ZENITHBANK', displayName: 'Zenith Bank' },
            { name: 'NSENG:UBA', displayName: 'United Bank for Africa' },
            { name: 'NSENG:ACCESSCORP', displayName: 'Access Holdings' },
            { name: 'NSENG:ARADEL', displayName: 'Aradel Holdings' },
            { name: 'NSENG:NGXGROUP', displayName: 'NGX Group Plc' }
          ]
        }
      ],
      showSymbolLogo: true,
      colorTheme: 'light',
      isTransparent: false,
      locale: 'en'
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};
