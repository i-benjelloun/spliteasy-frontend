import React from 'react';
import DatePicker from 'react-date-picker';
import './ExpenseDateInput.css';

const ExpenseDateInput = ({ date, handleDateChange }) => {
  return (
    <div className="form-label-input">
      <label className="form-label">Date</label>
      <DatePicker
        value={date}
        onChange={handleDateChange}
        format="dd/MM/yyyy"
      />
    </div>
  );
};

export default ExpenseDateInput;
