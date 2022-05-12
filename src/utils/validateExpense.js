const validateExpense = (expense_amount, shares) => {
  const totalShares = shares
    .map((e) => {
      return e.share_amount;
    })
    .reduce((a, b) => Number(a) + Number(b));
  return totalShares === Number(expense_amount);
};

export { validateExpense };
