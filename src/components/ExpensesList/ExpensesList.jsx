import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExpenses } from '../../api/expenses';
import ExpenseCard from '../ExpenseCard/ExpenseCard';
import './ExpensesList.css';

const ExpensesList = ({ currency }) => {
  const { groupId } = useParams();
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
      {!isLoading && expenses?.length === 0 && (
        <div className="no-expenses-message">
          <h3>This group is empty.</h3>
          <p>Tap the "+" button to add a new expense.</p>
          <i className="fa-solid fa-arrow-down-long fa-4x "></i>
        </div>
      )}
      {expenses?.map((expense) => (
        <ExpenseCard
          key={expense._id}
          groupId={groupId}
          expense={expense}
          currency={currency}
        />
      ))}
    </div>
  );
};

export default ExpensesList;
