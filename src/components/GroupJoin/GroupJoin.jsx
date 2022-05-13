import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { joinGroup } from '../../api/groups';

const GroupJoin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { encryptedId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const { success, groupId, errorMessage } = await joinGroup(encryptedId);
      setIsLoading(false);
      if (success) {
        navigate(`/groups/${groupId}`);
      } else {
        setErrorMessage(errorMessage);
        navigate(`/groups`);
      }
    };
    getData();
  }, [encryptedId]);

  return (
    <div className="group-join">
      {isLoading && (
        <div className="spinner">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}
    </div>
  );
};

export default GroupJoin;
