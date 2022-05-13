import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../../api/groups';
import ExpenseForm from '../../components/ExpenseForm/ExpenseForm';
import ExpensesList from '../../components/ExpensesList/ExpensesList';
import GroupForm from '../../components/GroupForm/GroupForm';
import GroupHeader from '../../components/GroupHeader/GroupHeader';
import Navbar from '../../components/Navbar/Navbar';
import './GroupByIdPage.css';

const GroupByIdPage = () => {
  const { groupId } = useParams();
  const [isShowingGroupForm, setIsShowingGroupForm] = useState(false);
  const [isShowingExpenseForm, setIsShowingExpenseForm] = useState(false);
  const [group, setGroup] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateExpenseBtn = () => {
    setIsShowingExpenseForm(true);
  };

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
  }, [groupId, isShowingGroupForm, isShowingExpenseForm]);

  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="spinner">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}
      <div className="group-by-id-page">
        {!isShowingGroupForm && !isShowingExpenseForm && (
          <>
            <GroupHeader
              group={group}
              setGroup={setGroup}
              setIsShowingGroupForm={setIsShowingGroupForm}
            />
            <ExpensesList groupId={groupId} currency={group?.currency} />
            <button
              type="button"
              onClick={handleCreateExpenseBtn}
              className="create-btn create-expense"
            >
              <i className="fa-solid fa-circle-plus fa-4x"></i>
            </button>
          </>
        )}

        {isShowingGroupForm && (
          <GroupForm
            status={'edit'}
            group={group}
            setGroup={setGroup}
            setIsShowingGroupForm={setIsShowingGroupForm}
          />
        )}

        {isShowingExpenseForm && (
          <ExpenseForm
            group={group}
            setIsShowingExpenseForm={setIsShowingExpenseForm}
          />
        )}
      </div>
    </>
  );
};

export default GroupByIdPage;
