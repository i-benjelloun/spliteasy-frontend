import React from 'react';
import './GroupTitleInput.css';

const GroupTitleInput = ({ title, handleTitleChange }) => {
  return (
    <div className="form-label-input">
      <label className="label" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        id="title-input"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />
    </div>
  );
};

export default GroupTitleInput;
