import React, { useContext } from 'react';
import './GroupHeader.css';
import { AuthContext } from '../../context/auth.context';
import toast, { Toaster } from 'react-hot-toast';
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
    navigator.clipboard.writeText(`localhost:3000/groups/${encryptedId}/join`);
    toast.success('Link copied to clipboard');
  };

  return (
    <div className="group-header">
      <div className="full-width">
        <h1 className="group-title">{group?.title}</h1>
        {user._id === group?.owner._id.toString() && (
          <button onClick={handleEditBtn} className="icon-btn">
            <i className="fa-solid fa-pen-to-square fa-2x"></i>
          </button>
        )}
      </div>
      <ul className="group-header-members">
        {group?.members.map((member, index) => (
          <li key={index}>
            {member.firstName}
            {member._id.toString() === group?.owner._id.toString() && (
              <span style={{ fontWeight: 'normal' }}> (owner)</span>
            )}
          </li>
        ))}
      </ul>

      <div className="group-header-btns">
        {user._id === group?.owner._id.toString() && (
          <button onClick={handleShareBtn} className="btn share-btn">
            <i className="fa-solid fa-share-from-square"></i>
            Share
          </button>
        )}
      </div>

      <div className="nav">
        <div
          onClick={handleExpBalChange}
          className={pageStatus === 'expenses' ? 'view-selected' : ''}
        >
          Expenses
        </div>
        <div
          onClick={handleExpBalChange}
          className={pageStatus === 'balances' ? 'view-selected' : ''}
        >
          Balances
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default GroupHeader;
