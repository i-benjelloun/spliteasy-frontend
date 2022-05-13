import React, { useContext, useState } from 'react';
import { createGroup, deleteGroup, updateGroup } from '../../api/groups';
import GroupCategoryInput from '../GroupCategoryInput/GroupCategoryInput';
import GroupCurrencyInput from '../GroupCurrencyInput/GroupCurrencyInput';
import GroupMembersInput from '../GroupMembersInput/GroupMembersInput';
import GroupTitleInput from '../GroupTitleInput/GroupTitleInput';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/auth.context';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import './GroupForm.css';
import { useNavigate } from 'react-router-dom';

const GroupForm = ({ status, setPageStatus, group }) => {
  const navigate = useNavigate();
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
    if (status === 'create') {
      const { success, errorMessage } = await createGroup({
        title: capitalizeFirstLetter(title),
        currency,
        category,
        members,
      });
      if (!success) {
        toast.error(errorMessage);
      } else {
        setPageStatus('groups');
      }
    }
    if (status === 'edit') {
      const { success, errorMessage } = await updateGroup(
        group?._id.toString(),
        { title: capitalizeFirstLetter(title), members }
      );
      if (!success) {
        toast.error(errorMessage);
      } else {
        setPageStatus('expenses');
      }
    }
  };

  const handleDeleteBtn = async (e) => {
    e.preventDefault();
    const { success, errorMessage } = await deleteGroup(group?._id.toString());
    if (!success) {
      toast.error(errorMessage);
    } else {
      navigate('/groups');
    }
  };

  const handleCancelBtn = async (e) => {
    e.preventDefault();
    if (status === 'create') {
      setPageStatus('groups');
    }
    if (status === 'edit') {
      setPageStatus('expenses');
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
            Save
          </button>
          <button onClick={handleCancelBtn} className="btn" type="button">
            Cancel
          </button>
        </div>
        {status === 'edit' && (
          <button onClick={handleDeleteBtn} className="btn" type="button">
            {'Delete'}
          </button>
        )}
      </form>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default GroupForm;
