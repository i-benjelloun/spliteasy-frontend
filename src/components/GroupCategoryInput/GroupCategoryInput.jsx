import React from 'react';
import { GROUP_CATEGORIES } from '../../utils/consts';
import Select from 'react-select';

const GroupCategoryInput = ({ handleCategoryChange }) => {
  // Get categories
  const options = GROUP_CATEGORIES.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <div className="form-label-input">
      <Select
        closeMenuOnSelect={true}
        onChange={handleCategoryChange}
        options={options}
        placeholder={'Category'}
      />
    </div>
  );
};

export default GroupCategoryInput;
