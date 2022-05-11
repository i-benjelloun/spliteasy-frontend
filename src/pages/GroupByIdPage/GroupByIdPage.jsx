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
  const [isShowingForm, setIsShowingForm] = useState(false);
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
  }, [groupId, isShowingForm]);

  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="spinner">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}
      <div className="group-by-id-page">
        {!isShowingForm && !isShowingExpenseForm && (
          <>
            <GroupHeader
              group={group}
              setGroup={setGroup}
              setIsShowingForm={setIsShowingForm}
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

        {isShowingForm && (
          <GroupForm
            status={'edit'}
            group={group}
            setGroup={setGroup}
            setIsShowingForm={setIsShowingForm}
          />
        )}

        {isShowingExpenseForm && <ExpenseForm group={group} />}
      </div>
    </>
  );
};

export default GroupByIdPage;
