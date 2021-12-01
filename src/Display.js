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
        <p><span className="redText">{volumeDate}</span> was the highest trading volume of <span className="redText"><NumberFormat value={largestVolume[1]} displayType={'text'} thousandSeparator={' '} suffix={'€'} decimalScale={2} /></span></p>
      </div>

      <div className="box">
        <p>The price decreased <span className="redText">{downwardDays}</span> days in a row for the inputs from <span className="redText">{downwardFrom}</span> and to <span className="redText">{downwardTo}</span></p>
      </div>

      {maxProfit > 0 ? (
        <>
          <div className="box">
            <p>Best day to buy <span className="redText">{buydayFormatted}</span> at price <span className="redText"><NumberFormat value={buyPrice} displayType={'text'} thousandSeparator={' '} suffix={'€'} decimalScale={2} /></span></p>
          </div>
          <div className="box">
            <p>Best day to sell <span className="redText">{selldayFormatted}</span> at price <span className="redText"><NumberFormat value={sellPrice} displayType={'text'} thousandSeparator={' '} suffix={'€'} decimalScale={2} /></span></p>
          </div>
        </>
      ) : (
        <div className="box boxFullWidth">
          <p>Best thing to do in this timeframe is to sit back, relax and wait.</p>
        </div>
      )}
    </div>
  )

}

export default Display;
