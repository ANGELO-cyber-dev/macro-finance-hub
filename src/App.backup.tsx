import { useEffect, useState } from 'react'

const FRED_KEY = import.meta.env.VITE_FRED_API_KEY
const FMP_KEY = import.meta.env.VITE_FMP_API_KEY

function App() {
  const [gdp, setGdp] = useState([])
  const [spy, setSpy] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if(!FRED_KEY ||!FMP_KEY) {
      setError("API KEY is not configured. Check.env file")
      return
    }

    // Get GDP from FRED
    fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=GDP&api_key=${FRED_KEY}&file_type=json&limit=20`)
   .then(res => res.json())
   .then(data => setGdp(data.observations || []))
   .catch(err => console.log(err))

    // Get SPY from FMP
    fetch(`https://financialmodelingprep.com/api/v3/quote/SPY?apikey=${FMP_KEY}`)
   .then(res => res.json())
   .then(data => setSpy(data[0]))
   .catch(err => console.log(err))

  }, [])

  return (
    <div style={{padding: 20, background: '#111', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif'}}>
      <h1>LIVE US MACRO & MARKETS</h1>
      <h2>Economic Calendar</h2>
      <p>What can move markets next?</p>
      
      {error && <p style={{color: 'orange'}}>⚠️ {error}</p>}
      
      <div style={{marginTop: 20}}>
        <h3>SPY Price</h3>
        {spy? <pre>{JSON.stringify(spy, null, 2)}</pre> : <p>Loading...</p>}
      </div>

      <div style={{marginTop: 20}}>
        <h3>GDP Last 20 Quarters</h3>
        {gdp.length > 0? <pre>{JSON.stringify(gdp, null, 2)}</pre> : <p>Loading...</p>}
      </div>
    </div>
  )
}

export default App
