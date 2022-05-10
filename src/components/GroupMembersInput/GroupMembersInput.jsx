import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { getUserInfo } from '../../api/userInfo';

const GroupMembersInput = ({ handleMembersChange }) => {
  const [userInfo, setUserInfo] = useState();

  const getUserData = async () => {
    const userInfo = await getUserInfo();
    setUserInfo(userInfo);
  };

  // Get user info
  useEffect(() => {
    getUserData();
  }, []);

  // Get users friends
  const options = userInfo?.friends.map((friend) => ({
    label: friend.firstName,
    value: friend.email,
  }));

  return (
    <div className="form-label-input">
      <label className="label" htmlFor="members">
        Members
      </label>
      <CreatableSelect
        closeMenuOnSelect={false}
        onChange={handleMembersChange}
        options={options}
        isMulti
      />
    </div>
  );
};

export default GroupMembersInput;
