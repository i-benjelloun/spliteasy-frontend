import React from 'react';
import './GroupHeader.css';

const GroupHeader = ({ group }) => {
  return (
    <div className="group-header">
      <h1>{group?.title}</h1>
      <ul>
        {group?.members.map((member) => (
          <li key={member._id}>{member.firstName}</li>
        ))}
      </ul>
      <div className="group-header-btns">
        <button className="btn" type="button">
          Edit
        </button>
        <button className="btn" type="button">
          Archive
        </button>
      </div>
    </div>
  );
};

export default GroupHeader;
