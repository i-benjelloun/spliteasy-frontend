import React, { useEffect, useState } from 'react';
import { getGroupById } from '../../api/groups';
import './GroupHeader.css';

const GroupHeader = ({ groupId }) => {
  const [group, setGroup] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  // Get group data
  useEffect(() => {
    const getGroupData = async () => {
      const { success, group, errorMessage } = await getGroupById(groupId);
      setIsLoading(false);
      if (success) {
        setGroup(group);
      } else {
        setErrorMessage(errorMessage);
      }
    };
    getGroupData();
  }, [groupId]);

  return (
    <div className="group-header">
      {isLoading && <i className="fas fa-spinner fa-spin fa-3x"></i>}
      {!isLoading && (
        <>
          <h1>{group?.title}</h1>
          <ul>
            {group?.members.map((member) => (
              <li key={member._id}>{member.firstName}</li>
            ))}
          </ul>
          <button type="button">Edit</button>
          <button type="button">Archive</button>
        </>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default GroupHeader;
