import React from 'react';
import { EXPENSE_CATEGORIES } from '../../utils/consts';
import Select from 'react-select';

const ExpenseCategoryInput = ({
  handleCategoryChange,
  defaultValue,
  status,
}) => {
  // Get categories
  const options = EXPENSE_CATEGORIES.map((category) => ({
    value: category,
    label: category,
  }));

  function isDefaultCategory(option) {
    if (status === 'create') {
      return option.value === 'Other';
    } else {
      return option.value === defaultValue;
    }
  }

  return (
    <div className="form-label-input">
      <label className="form-label">Category</label>
      <Select
        closeMenuOnSelect={true}
        onChange={handleCategoryChange}
        options={options}
        defaultValue={options.find(isDefaultCategory)}
      />
    </div>
  );
};

export default ExpenseCategoryInput;
