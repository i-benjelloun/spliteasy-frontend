import React, { useContext } from 'react';
import Select from 'react-select';
import { AuthContext } from '../../context/auth.context';

const ExpensePaidByInput = ({ handlePaidByChange, members }) => {
  const { user } = useContext(AuthContext);
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
        defaultValue={options.find((option) => {
          return option.value === user._id;
        })}
      />
    </div>
  );
};

export default ExpensePaidByInput;
