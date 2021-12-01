import React, { useState } from 'react';
import { fetchMarketChartRangeFunction } from './api';
import './App.css';
import { DateTime } from 'luxon';
import Display from './Display';
import scrooge from './scrooge.png';
import Datepicker from "react-datepicker";
import { formatISO, addDays, subDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [fromCalendarDate, setFromCalendarDate] = useState(new Date('2021-01-01'));
  const [toCalendarDate, setToCalendarDate] = useState(new Date());
  const [bitcoin, setBitcoin] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromDate = DateTime.fromISO(formatISO(fromCalendarDate)).toSeconds();
    const toDate = DateTime.fromISO(formatISO(toCalendarDate)).toSeconds();
    const data = await fetchMarketChartRangeFunction(fromDate, toDate);
    setBitcoin(data);
  }

  return (
    <div className="main">
      <h1>Scrooge McDuck's CoinGeckoClient</h1>
      <div className="container">
        <div className="form">
          <p>Place the dates you want information from. Date range minimum 91 days and maximum 365 days.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-inputs">
              <div className="form-inputs__input">
                <Datepicker selected={fromCalendarDate} dateFormat="yyyy-MM-dd" selectsStart startDate={fromCalendarDate} endDate={toCalendarDate} minDate={subDays(toCalendarDate, 365)} onChange={(date) => { setFromCalendarDate(date) }} />
              </div>
              <div className="form-inputs__input">
                <Datepicker selected={toCalendarDate} dateFormat="yyyy-MM-dd" selectsEnd startDate={fromCalendarDate} endDate={toCalendarDate} minDate={addDays(fromCalendarDate, 91)} maxDate={addDays(fromCalendarDate, 365)} onChange={(date) => setToCalendarDate(date)} />
              </div>
            </div>
            <button type="submit">Select days</button>
          </form>
        </div>
        <div className="content">
          {bitcoin && <Display bitcoin={bitcoin} />}
        </div>
      </div>
      <img src={scrooge} className="footer-img" alt="Scrooge McDuck's CoinGeckoClient" />
    </div>
  )

}

export default App;
