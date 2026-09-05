export async function getLiveForexRates() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    const rates = data.rates;

    return {
      "EUR/USD": Number((1 / rates.EUR).toFixed(4)),
      "GBP/USD": Number((1 / rates.GBP).toFixed(4)),
      "USD/JPY": Number(rates.JPY.toFixed(2)),
      "AUD/USD": Number((1 / rates.AUD).toFixed(4)),
      "USD/CAD": Number(rates.CAD.toFixed(4)),
      "NZD/USD": Number((1 / rates.NZD).toFixed(4))
    };
  } catch (err) {
    console.error("Forex fetch error:", err);
    return null;
  }
}
