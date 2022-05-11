import React, { useState } from 'react';
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

  return (
    <div className="group-form-container">
      <h1>Expense form</h1>
      <form className="group-form">
        <ExpenseTitleInput handleTitleChange={handleTitleChange} />
        <ExpensePaidByInput
          handlePaidByChange={handlePaidByChange}
          members={group?.members}
        />
      </form>
    </div>
  );
};

export default ExpenseForm;
