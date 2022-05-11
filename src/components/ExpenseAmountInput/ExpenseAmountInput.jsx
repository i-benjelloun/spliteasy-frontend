import React from 'react';

const ExpenseAmountInput = ({ handleExpenseAmountChange }) => {
  return (
    <div className="form-label-input">
      <label className="form-label">Amount</label>
      <input
        className="form-input"
        type="number"
        min="0"
        step="0.01"
        onChange={handleExpenseAmountChange}
        required
      />
    </div>
  );
};

export default ExpenseAmountInput;
