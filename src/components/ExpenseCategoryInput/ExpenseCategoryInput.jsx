import React from 'react';
import { EXPENSE_CATEGORIES } from '../../utils/consts';
import Select from 'react-select';

const ExpenseCategoryInput = ({ handleCategoryChange }) => {
  // Get categories
  const options = EXPENSE_CATEGORIES.map((category) => ({
    value: category,
    label: category,
  }));
  return (
    <div className="form-label-input">
      <label className="form-label">Category</label>
      <Select
        closeMenuOnSelect={true}
        onChange={handleCategoryChange}
        options={options}
      />
    </div>
  );
};

export default ExpenseCategoryInput;
