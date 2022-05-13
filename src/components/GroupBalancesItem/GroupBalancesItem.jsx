import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import './GroupBalancesItem.css';

const GroupBalancesItem = ({ balance, currency }) => {
  let symbol = '';
  if (balance.balance > 0) {
    symbol = '+';
  }
  if (balance.balance < 0) {
    symbol = '-';
  }

  return (
    <div className="group-balances-item">
      <h4>{balance.user.firstName}</h4>
      <p>
        <span>{symbol}</span>
        {getSymbolFromCurrency(currency)}
        {Math.abs(balance.balance)}
      </p>
    </div>
  );
};

export default GroupBalancesItem;