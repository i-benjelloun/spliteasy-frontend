import React, { useContext } from 'react';
import { updateGroup } from '../../api/groups';
import toast, { Toaster } from 'react-hot-toast';
import './GroupHeader.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const GroupHeader = ({ group, setIsShowingForm, setGroup }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle edit button
  const handleEditBtn = () => {
    setIsShowingForm(true);
  };

  // Handle archive button
  const handleArchiveBtn = async () => {
    const { success, updatedGroup, errorMessage } = await updateGroup(
      group?._id.toString(),
      { isArchived: !group?.isArchived }
    );
    if (!success) {
      toast.error(errorMessage);
    } else {
      setGroup((prev) => {
        return {
          ...prev,
          isArchived: updatedGroup.isArchived,
        };
      });
      navigate('/groups');
    }
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
        <button onClick={handleArchiveBtn} className="btn" type="button">
          {group?.isArchived ? 'Restore' : 'Archive'}
        </button>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default GroupHeader;
