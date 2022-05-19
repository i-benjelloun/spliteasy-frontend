import React, { useContext } from 'react';
import './GroupHeader.css';
import { AuthContext } from '../../context/auth.context';
import toast, { Toaster } from 'react-hot-toast';
import encryptId from '../../utils/encryptId';
import { archiveGroup } from '../../api/groups';
import { useNavigate } from 'react-router-dom';
import GroupsPage from '../../pages/GroupsPage/GroupsPage';

const GroupHeader = ({ group, pageStatus, setPageStatus }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  // Handle archive button
  const handleArchiveBtn = async (e) => {
    e.preventDefault();
    if (window.confirm('Confirm group archiving ?')) {
      const { success, errorMessage } = await archiveGroup(
        group?._id.toString()
      );
      if (!success) {
        toast.error(errorMessage);
      } else {
        navigate('/groups');
      }
    }
  };

  return (
    <div className="group-header">
      <div className="full-width">
        <div className="title-edit">
          <h1 className="group-title">{group?.title} </h1>
          {user._id === group?.owner._id.toString() && (
            <button onClick={handleEditBtn} className="icon-btn">
              <i className="fa-solid fa-pen-to-square fa-2x"></i>
            </button>
          )}
        </div>

        <button onClick={handleArchiveBtn} className="icon-btn" type="button">
          <i className="fa-solid fa-box-archive fa-2x"></i>
        </button>
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
        {group?.members.length === 1 && (
          <button
            onClick={() => setPageStatus('members')}
            type="button"
            className="btn"
          >
            Add Members
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
