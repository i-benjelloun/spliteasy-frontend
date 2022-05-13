import React from 'react';

const ExpenseAmountInput = ({
  handleExpenseAmountChange,
  status,
  defaultValue,
}) => {
  return (
    <div className="form-label-input">
      <label className="form-label">Amount</label>
      <input
        className="form-input"
        type="number"
        min="0"
        step="0.01"
        defaultValue={status === 'create' ? 0 : defaultValue}
        onChange={handleExpenseAmountChange}
        required
      />
    </div>
  );
};

export default ExpenseAmountInput;
