import React, { useContext } from 'react';
import './GroupHeader.css';
import { AuthContext } from '../../context/auth.context';

const GroupHeader = ({ group, setPageStatus }) => {
  const { user } = useContext(AuthContext);

  // Handle edit button
  const handleEditBtn = () => {
    setPageStatus('groupForm');
  };

  return (
    <div className="group-header">
      <h1>{group?.title}</h1>
      <ul>
        {group?.members.map((member, index) => (
          <li key={index}>
            {member.firstName}
            {member._id.toString() === group?.owner._id.toString() && (
              <span style={{ fontWeight: 'normal' }}>(owner)</span>
            )}
          </li>
        ))}
      </ul>
      <div className="group-header-btns">
        {user._id === group?.owner._id.toString() && (
          <button onClick={handleEditBtn} className="btn" type="button">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupHeader;
