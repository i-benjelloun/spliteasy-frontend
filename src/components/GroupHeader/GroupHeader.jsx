import React, { useContext } from 'react';
import './GroupHeader.css';
import { AuthContext } from '../../context/auth.context';

const GroupHeader = ({ group, setIsShowingForm, setGroup }) => {
  const { user } = useContext(AuthContext);

  // Handle edit button
  const handleEditBtn = () => {
    setIsShowingForm(true);
  };

  return (
    <div className="group-header">
      <h1>{group?.title}</h1>
      <ul>
        {group?.members.map((member, index) => (
          <li key={index}>{member.firstName}</li>
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
