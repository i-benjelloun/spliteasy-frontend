import React, { useState } from 'react';
import ExpenseAmountInput from '../ExpenseAmountInput/ExpenseAmountInput';
import ExpenseCategoryInput from '../ExpenseCategoryInput/ExpenseCategoryInput';
import ExpenseDateInput from '../ExpenseDateInput/ExpenseDateInput';
import ExpensePaidByInput from '../ExpensePaidByInput/ExpensePaidByInput';
import ExpenseTitleInput from '../ExpenseTitleInput/ExpenseTitleInput';

const ExpenseForm = ({ group }) => {
  const [title, setTitle] = useState('');
  const [paid_by, setPaidBy] = useState('');
  const [category, setCategory] = useState('');
  const [expense_amount, setExpenseAmount] = useState(0);
  const [shares, setShares] = useState([]);
  const [date, setDate] = useState(new Date());

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePaidByChange = (e) => {
    setPaidBy(e.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.value);
  };

  const handleDateChange = (e) => {
    // setDate(e.target.valueAsDate);
    setDate(e);
  };

  const handleExpenseAmountChange = (e) => {
    const amount = e.target.value;
    if (
      amount.indexOf('.') === -1 ||
      amount.indexOf('.') >= amount.length - 3
    ) {
      return setExpenseAmount(amount);
    }
  };

  return (
    <div className="group-form-container">
      <h1>Expense form</h1>
      <form className="group-form">
        <ExpenseTitleInput handleTitleChange={handleTitleChange} />

        <ExpensePaidByInput
          handlePaidByChange={handlePaidByChange}
          members={group?.members}
        />

        <ExpenseCategoryInput handleCategoryChange={handleCategoryChange} />

        <ExpenseAmountInput
          handleExpenseAmountChange={handleExpenseAmountChange}
        />

        <ExpenseDateInput date={date} handleDateChange={handleDateChange} />
      </form>
    </div>
  );
};

export default ExpenseForm;
