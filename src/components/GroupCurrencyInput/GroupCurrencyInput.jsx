import React from 'react';
import { CURRENCIES } from '../../utils/consts';
import Select from 'react-select';

const GroupCurrencyInput = ({ handleCurrencyChange }) => {
  // Get currencies
  const options = CURRENCIES.map((currency) => ({
    value: currency,
    label: currency,
  }));

  return (
    <div className="form-label-input">
      <label className="label" htmlFor="currency">
        Currency
      </label>
      <Select
        closeMenuOnSelect={true}
        onChange={handleCurrencyChange}
        options={options}
      />
    </div>
  );
};

export default GroupCurrencyInput;
