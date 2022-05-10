import React, { useState } from 'react';
import { createGroup } from '../../api/groups';
import GroupCategoryInput from '../GroupCategoryInput/GroupCategoryInput';
import GroupCurrencyInput from '../GroupCurrencyInput/GroupCurrencyInput';
import GroupMembersInput from '../GroupMembersInput/GroupMembersInput';
import GroupTitleInput from '../GroupTitleInput/GroupTitleInput';
import toast, { Toaster } from 'react-hot-toast';
import './GroupForm.css';

const GroupForm = ({ status, setIsShowingForm, setGroups }) => {
  const [title, setTitle] = useState('');
  const [currency, setCurrency] = useState('');
  const [category, setCategory] = useState('');
  const [members, setMembers] = useState([]);

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
    const { success, createdGroup, errorMessage } = await createGroup(body);
    if (!success) {
      toast.error(errorMessage);
    } else {
      setGroups((prev) => {
        return [...prev, createdGroup];
      });
      setIsShowingForm(false);
    }
  };

  return (
    <div className="group-form-container">
      <h1>{status === 'create' ? 'Create group' : 'Edit group'}</h1>
      <form onSubmit={handleFormSubmit} className="group-form">
        <GroupTitleInput title={title} handleTitleChange={handleTitleChange} />

        <GroupCurrencyInput
          currency={currency}
          handleCurrencyChange={handleCurrencyChange}
        />
        <GroupCategoryInput
          category={category}
          handleCategoryChange={handleCategoryChange}
        />

        <GroupMembersInput
          members={members}
          handleMembersChange={handleMembersChange}
        />
        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setIsShowingForm(false)}>
            Cancel
          </button>
        </div>
      </form>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default GroupForm;
