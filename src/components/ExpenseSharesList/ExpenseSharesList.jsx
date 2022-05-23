import React from 'react';
import ExpenseSharesItem from '../ExpenseSharesItem/ExpenseSharesItem';
import './ExpenseSharesList.css';

const ExpenseSharesList = ({ shares, currency }) => {
  return (
    <div className="expense-shares-list">
      <h4>Shared with</h4>
      {shares?.map((share, index) => (
        <ExpenseSharesItem key={index} share={share} currency={currency} />
      ))}
    </div>
  );
};

export default ExpenseSharesList;
