import React from 'react';
import { updateGroup } from '../../api/groups';
import toast, { Toaster } from 'react-hot-toast';
import './GroupHeader.css';
import { useNavigate } from 'react-router-dom';

const GroupHeader = ({ group, setIsShowingForm, setGroup }) => {
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
        <button onClick={handleEditBtn} className="btn" type="button">
          Edit
        </button>
        <button onClick={handleArchiveBtn} className="btn" type="button">
          {group?.isArchived ? 'Unarchive' : 'Archive'}
        </button>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default GroupHeader;
