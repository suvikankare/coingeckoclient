import React, { useState } from 'react';
import { fetchMarketChartRangeFunction } from './api';
import { DateTime } from 'luxon';

export const Form = () => {
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

  return { bitcoin, handleSubmit, handleSetFromDate, handleSetToDate }

}


export const FormHTML = () => {
  const { handleSubmit, handleSetFromDate, handleSetToDate } = Form;
  return (
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
  )
}