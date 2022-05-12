const validateExpense = (expense_amount, shares) => {
  const totalShares = shares.reduce((a, b) => a + b.share_amount, 0);
  return totalShares === Number(expense_amount);
};

export { validateExpense };
