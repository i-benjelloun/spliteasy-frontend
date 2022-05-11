import React from 'react';
import Select from 'react-select';

const ExpensePaidByInput = ({ handlePaidByChange, members }) => {
  const options = members.map((member) => ({
    label: member.firstName,
    value: member._id,
  }));
  return (
    <div className="form-label-input">
      <label className="form-label">Paid By</label>
      <Select
        closeMenuOnSelect={true}
        onChange={handlePaidByChange}
        options={options}
      />
    </div>
  );
};

export default ExpensePaidByInput;
