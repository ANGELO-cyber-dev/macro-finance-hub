import React, { useEffect, useRef } from 'react';

export const NyseScreener: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: 550,
      defaultColumn: 'overview',
      defaultScreen: 'most_capitalized',
      market: 'america',
      showToolbar: true,
      colorTheme: 'light',
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
