import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getUserInfo } from '../../api/userInfo';

const GroupMembersInput = ({ members, handleMembersChange }) => {
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
    value: friend._id,
    label: friend.firstName,
  }));

  return (
    <div className="form-label-input">
      <label className="label" htmlFor="members">
        Members
      </label>
      <Select
        closeMenuOnSelect={false}
        onChange={handleMembersChange}
        options={options}
        isMulti
      />
    </div>
  );
};

export default GroupMembersInput;
