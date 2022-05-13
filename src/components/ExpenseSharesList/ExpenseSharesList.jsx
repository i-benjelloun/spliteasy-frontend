import React from 'react';
import ExpenseSharesItem from '../ExpenseSharesItem/ExpenseSharesItem';

const ExpenseSharesList = ({ shares, currency }) => {
  return (
    <div className="expense-shares-list">
      {shares?.map((share, index) => (
        <ExpenseSharesItem key={index} share={share} currency={currency} />
      ))}
    </div>
  );
};

export default ExpenseSharesList;
