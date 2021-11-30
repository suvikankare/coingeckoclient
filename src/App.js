import React, { useState } from 'react';
import { fetchMarketChartRangeFunction } from './api';
import './App.css';
import { DateTime } from 'luxon';
import Display from './Display';
import scrooge from './scrooge.png';

const App = () => {
  const [fromDate, setFromDate] = useState(0)
  const [toDate, setToDate] = useState(0)
  const [bitcoin, setBitcoin] = useState()

  // Format dates from user input
  const handleSetFromDate = (e) => {
    const formattedFromDate = DateTime.fromISO(e.target.value + 'T00:00').toSeconds();
    setFromDate(formattedFromDate)
  }

  const handleSetToDate = (e) => {
    const formattedToDate = DateTime.fromISO(e.target.value + 'T00:00').toSeconds();
    setToDate(formattedToDate)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchMarketChartRangeFunction(fromDate, toDate)
    setBitcoin(data)
  }

  return (
    <div className="main">
      <h1>Scrooge McDuck's CoinGeckoClient</h1>
      <div className="container">
        <div className="form">
          <p>Place the dates you want information from. Please use format YYYY-MM-DD.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-inputs">
              <div className="form-inputs__input">
                From <input type="text" placeholder="2020-01-01" onChange={handleSetFromDate} />
              </div>
              <div className="form-inputs__input">
                To <input type="text" placeholder="2020-12-31" onChange={handleSetToDate} />
              </div>
            </div>
            <button type="submit">Select days</button>
          </form>
        </div>
        <div className="content">
          {bitcoin && <Display bitcoin={bitcoin} />}
        </div>
      </div>
      <img src={scrooge} className="footer-img" />
    </div>
  )

}

export default App;
