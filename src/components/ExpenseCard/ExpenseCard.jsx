import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import './ExpenseCard.css';

const ExpenseCard = ({ expense, currency }) => {
  return (
    <div className="expense-card">
      <div className="expense-card-subdiv">
        <h3>{expense.title}</h3>
        <h4>
          <span>{getSymbolFromCurrency(currency)}</span>
          {expense.expense_amount}
        </h4>
      </div>
      <div className="expense-card-subdiv">
        <p>Paid by {expense.paid_by.firstName}</p>
        <p>{new Date(expense.date).toLocaleDateString('fr')}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
