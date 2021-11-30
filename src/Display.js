import React from 'react';
import './App.css';
import { DateTime } from 'luxon';
import NumberFormat from 'react-number-format';
import { sorted } from './Trend';
import { profit } from './Profit';
import { volume } from './Volume';

const Display = ({ bitcoin }) => {

  const { downwardDays, downwardFrom, downwardTo } = sorted(bitcoin);
  const { sellDay, buyDay, buyPrice, sellPrice, maxProfit } = profit(bitcoin.prices);
  const largestVolume = volume(bitcoin);

  const volumeDate = DateTime.fromMillis(largestVolume[0]).toLocaleString();
  const buydayFormatted = DateTime.fromMillis(buyDay[0]).toLocaleString();
  const selldayFormatted = DateTime.fromMillis(sellDay[0]).toLocaleString();

  return (
    <div className="box-container">
      <div className="box">
        <h2>{volumeDate}</h2> was the highest trading volume of <h3><NumberFormat value={largestVolume[1]} displayType={'text'} thousandSeparator={' '} suffix={'€'} decimalScale={2} /></h3>
      </div>

      <div className="box">
        The price decreased <h2>{downwardDays}</h2> days in a row for the inputs from <h3>{downwardFrom}</h3> and to <h3>{downwardTo}</h3>
      </div>

      {maxProfit > 0 ? (
        <div className="box">
          <p>Best day to buy {buydayFormatted} at price <NumberFormat value={buyPrice} displayType={'text'} thousandSeparator={' '} suffix={'€'} decimalScale={2} /></p>
          <p>Best day to sell {selldayFormatted} at price <NumberFormat value={sellPrice} displayType={'text'} thousandSeparator={' '} suffix={'€'} decimalScale={2} /></p>
        </div>
      ) : (
        <div className="box">
          <p>Best thing to do in this timeframe is to sit back, relax and wait.</p>
        </div>
      )}
    </div>
  )

}

export default Display;
