import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../../api/groups';
import ExpensesList from '../../components/ExpensesList/ExpensesList';
import GroupHeader from '../../components/GroupHeader/GroupHeader';
import Navbar from '../../components/Navbar/Navbar';
import './GroupByIdPage.css';

const GroupByIdPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isShowingForm, setIsShowingForm] = useState(false);

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

  // Handle create button
  const handleCreateBtn = () => {
    setIsShowingForm(true);
  };

  return (
    <>
      <Navbar />
      <div className="group-by-id-page">
        {isLoading && <i className="fas fa-spinner fa-spin fa-3x"></i>}
        {!isLoading && (
          <>
            <GroupHeader group={group} />
            <ExpensesList groupId={groupId} currency={group.currency} />
          </>
        )}
      </div>
      <button onClick={handleCreateBtn} className="create-btn create-expense">
        <i className="fa-solid fa-circle-plus fa-4x"></i>
      </button>
    </>
  );
};

export default GroupByIdPage;
