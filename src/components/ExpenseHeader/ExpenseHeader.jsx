import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';

const ExpenseHeader = ({ expense, setPageStatus }) => {
  // Handle edit button
  const handleEditBtn = () => {
    setPageStatus('expenseForm');
  };

  return (
    <div className="expense-header">
      <h1>{expense?.title}</h1>
      <h3>
        <span>{getSymbolFromCurrency(expense?.group.currency)}</span>
        {expense?.expense_amount}
      </h3>
      <p>Paid by {expense?.paid_by.firstName}</p>
      <p>{new Date(expense?.date).toLocaleDateString('fr')}</p>
      <p>{expense?.category}</p>
      <button onClick={handleEditBtn} className="btn" type="button">
        Edit
      </button>
    </div>
  );
};

export default ExpenseHeader;
