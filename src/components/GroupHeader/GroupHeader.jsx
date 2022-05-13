import React, { useContext } from 'react';
import './GroupHeader.css';
import { AuthContext } from '../../context/auth.context';
import encryptId from '../../utils/encryptId';

const GroupHeader = ({ group, pageStatus, setPageStatus }) => {
  const { user } = useContext(AuthContext);

  // Handle edit button
  const handleEditBtn = () => {
    setPageStatus('groupForm');
  };

  const handleExpBalChange = (e) => {
    e.preventDefault();
    switch (e.target.textContent) {
      case 'Expenses':
        setPageStatus('expenses');
        break;
      case 'Balances':
        setPageStatus('balances');
        break;
      default:
        setPageStatus('expenses');
        break;
    }
  };

  const handleShareBtn = (e) => {
    e.preventDefault();
    const encryptedId = encryptId(group._id.toString());
    console.log(group._id.toString(), encryptedId);
    navigator.clipboard.writeText(`localhost:3000/groups/${encryptedId}/join`);
    window.alert('Link copied to clipboard');
  };

  return (
    <div className="group-header">
      <h1>{group?.title}</h1>
      <button onClick={handleShareBtn} className="btn">
        Share
      </button>
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

      <div className="form-buttons">
        <button
          onClick={handleExpBalChange}
          className={`btn ${pageStatus === 'expenses' ? 'btn-selected' : ''}`}
          type="button"
        >
          Expenses
        </button>
        <button
          onClick={handleExpBalChange}
          className={`btn ${pageStatus === 'balances' ? 'btn-selected' : ''}`}
          type="button"
        >
          Balances
        </button>
      </div>
    </div>
  );
};

export default GroupHeader;
