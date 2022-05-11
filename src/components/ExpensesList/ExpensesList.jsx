import React, { useEffect, useState } from 'react';
import { getExpenses } from '../../api/expenses';
import ExpenseCard from '../ExpenseCard/ExpenseCard';
import './ExpensesList.css';

const ExpensesList = ({ groupId, currency }) => {
  const [expenses, setExpenses] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  // Get group expenses data
  useEffect(() => {
    const getGroupExpensesData = async () => {
      const { success, expenses, errorMessage } = await getExpenses(groupId);
      setIsLoading(false);
      if (success) {
        setExpenses(expenses);
      } else {
        setErrorMessage(errorMessage);
      }
    };
    getGroupExpensesData();
  }, [groupId]);

  return (
    <div className="expenses-list">
      {expenses?.length === 0 && <p>There are no expenses in this group</p>}
      {expenses?.map((expense) => (
        <ExpenseCard key={expense._id} expense={expense} currency={currency} />
      ))}
    </div>
  );
};

export default ExpensesList;
