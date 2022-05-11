import React, { useContext, useState } from 'react';
import { createGroup, updateGroup } from '../../api/groups';
import GroupCategoryInput from '../GroupCategoryInput/GroupCategoryInput';
import GroupCurrencyInput from '../GroupCurrencyInput/GroupCurrencyInput';
import GroupMembersInput from '../GroupMembersInput/GroupMembersInput';
import GroupTitleInput from '../GroupTitleInput/GroupTitleInput';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/auth.context';
import './GroupForm.css';

const GroupForm = ({
  status,
  setIsShowingForm,
  setGroups,
  setGroup,
  group,
}) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState(status === 'edit' ? group?.title : '');
  const [currency, setCurrency] = useState('');
  const [category, setCategory] = useState('');
  const [members, setMembers] = useState(
    status === 'edit'
      ? group?.members
          .map((member) => member.email)
          .filter((member) => {
            return member !== user.email;
          })
      : []
  );

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCurrencyChange = (e) => {
    setCurrency(e.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.value);
  };
  const handleMembersChange = (e) => {
    setMembers(e.map((member) => member.value));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = { title, currency, category, members };
    if (status === 'create') {
      const { success, createdGroup, errorMessage } = await createGroup(body);
      if (!success) {
        toast.error(errorMessage);
      } else {
        setGroups((prev) => {
          return [...prev, createdGroup];
        });
        setIsShowingForm(false);
      }
    }
    if (status === 'edit') {
      const { success, updatedGroup, errorMessage } = await updateGroup(
        group._id.toString(),
        { title, members }
      );
      if (!success) {
        toast.error(errorMessage);
      } else {
        setGroup((prev) => {
          return {
            ...prev,
            title: updatedGroup.title,
            members: updatedGroup.members,
          };
        });
        setIsShowingForm(false);
      }
    }
  };

  return (
    <div className="group-form-container">
      <h1>{status === 'create' ? 'Create group' : 'Edit group'}</h1>
      <form onSubmit={handleFormSubmit} className="group-form">
        <GroupTitleInput title={title} handleTitleChange={handleTitleChange} />

        {status === 'create' && (
          <>
            <GroupCurrencyInput
              currency={currency}
              handleCurrencyChange={handleCurrencyChange}
            />
            <GroupCategoryInput
              category={category}
              handleCategoryChange={handleCategoryChange}
            />
          </>
        )}

        <GroupMembersInput
          handleMembersChange={handleMembersChange}
          defaultMembers={group?.members}
          status={status}
        />
        <div className="form-buttons">
          <button className="btn" type="submit">
            Submit
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => setIsShowingForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default GroupForm;
