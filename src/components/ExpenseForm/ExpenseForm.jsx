import React, { useEffect, useState } from 'react';
import ExpenseAmountInput from '../ExpenseAmountInput/ExpenseAmountInput';
import ExpenseCategoryInput from '../ExpenseCategoryInput/ExpenseCategoryInput';
import ExpenseDateInput from '../ExpenseDateInput/ExpenseDateInput';
import ExpensePaidByInput from '../ExpensePaidByInput/ExpensePaidByInput';
import ExpenseSharesInput from '../SharesInputs/SharesInputs';
import ExpenseTitleInput from '../ExpenseTitleInput/ExpenseTitleInput';
import { validateExpense } from '../../utils/validateExpense';

const ExpenseForm = ({ group }) => {
  const [title, setTitle] = useState('');
  const [paid_by, setPaidBy] = useState('');
  const [category, setCategory] = useState('Other');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateExpense(expense_amount, shares);
    console.log(isValid);
  };

  useEffect(() => {
    const shares = group?.members.map((member) => ({
      shared_with: member._id,
      share_amount: 0,
    }));
    setShares(shares);
  }, []);

  return (
    <div className="group-form-container">
      <h1>Expense form</h1>
      <form onSubmit={handleSubmit} className="group-form">
        <ExpenseTitleInput handleTitleChange={handleTitleChange} />

        <ExpensePaidByInput
          handlePaidByChange={handlePaidByChange}
          members={group?.members}
        />

        <ExpenseCategoryInput handleCategoryChange={handleCategoryChange} />

        <ExpenseAmountInput
          handleExpenseAmountChange={handleExpenseAmountChange}
        />

        <ExpenseDateInput handleDateChange={handleDateChange} date={date} />

        <ExpenseSharesInput
          members={group?.members}
          expense_amount={expense_amount}
          setShares={setShares}
          currency={group?.currency}
          shares={shares}
        />

        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
