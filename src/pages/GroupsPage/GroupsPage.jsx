import React, { useEffect, useState } from 'react';
import { getGroups } from '../../api/groups';
import GroupCard from '../../components/GroupCard/GroupCard';
import GroupForm from '../../components/GroupForm/GroupForm';
import './GroupsPage.css';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageStatus, setPageStatus] = useState('groups');

  const getGroupsData = async () => {
    const groups = await getGroups();
    setGroups(groups);
    setIsLoading(false);
  };

  // Get groups data
  useEffect(() => {
    getGroupsData();
  }, [pageStatus]);

  // Handle create group button
  const handleCreateBtn = () => {
    setPageStatus('groupForm');
  };

  return (
    <>
      {pageStatus === 'groupForm' && (
        <GroupForm status={'create'} setPageStatus={setPageStatus} />
      )}
      {pageStatus === 'groups' && (
        <section className="groups-page">
          <h1>Groups</h1>

          {isLoading && (
            <div className="spinner">
              <i className="fas fa-spinner fa-spin fa-3x"></i>
            </div>
          )}

          {!isLoading && groups.length > 0 && (
            <>
              {groups.map((group) => {
                return (
                  <GroupCard
                    key={group._id}
                    groupId={group._id}
                    title={group.title}
                    category={group.category}
                  />
                );
              })}
            </>
          )}

          {!isLoading && groups.length === 0 && <h3>You have no groups yet</h3>}

          <button
            onClick={handleCreateBtn}
            className="create-btn create-expense"
          >
            <i className="fa-solid fa-circle-plus fa-4x"></i>
          </button>
        </section>
      )}
    </>
  );
};

export default GroupsPage;
