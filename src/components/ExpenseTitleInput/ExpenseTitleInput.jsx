import React from 'react';

const ExpenseTitleInput = ({ handleTitleChange }) => {
  return (
    <div className="form-label-input">
      <label className="form-label">Title</label>
      <input
        onChange={handleTitleChange}
        className="form-input"
        type="text"
        name="title"
      />
    </div>
  );
};

export default ExpenseTitleInput;
