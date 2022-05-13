import React from 'react';

const ExpenseTitleInput = ({ handleTitleChange, status, defaultValue }) => {
  return (
    <div className="form-label-input">
      <label className="form-label">Title</label>
      <input
        onChange={handleTitleChange}
        className="form-input"
        type="text"
        name="title"
        placeholder="Enter expense title"
        defaultValue={status === 'edit' ? defaultValue : ''}
        required
      />
    </div>
  );
};

export default ExpenseTitleInput;
