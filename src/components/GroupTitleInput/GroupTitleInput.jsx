import React from 'react';
import './GroupTitleInput.css';

const GroupTitleInput = ({ title, handleTitleChange }) => {
  return (
    <div className="form-label-input">
      <label className="form-label" htmlFor="title">
        Title
      </label>
      <input
        className="form-input"
        type="text"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />
    </div>
  );
};

export default GroupTitleInput;
