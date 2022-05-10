import React, { useEffect, useState } from 'react';
import { getGroups } from '../../api/groups';
import GroupCard from '../../components/GroupCard/GroupCard';
import GroupForm from '../../components/GroupForm/GroupForm';
import './GroupsPage.css';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [archivedFilter, setArchivedFilter] = useState(false);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingForm, setIsShowingForm] = useState(false);

  const getGroupsData = async () => {
    const groups = await getGroups();
    setGroups(groups);
    setIsLoading(false);
  };

  // Get groups data
  useEffect(() => {
    getGroupsData();
  }, []);

  // Filter groups based on archived status
  useEffect(() => {
    if (groups.length > 0) {
      let filteredGroups = [];
      if (archivedFilter) {
        filteredGroups = groups.filter((group) => {
          return group.isArchived === true;
        });
      } else {
        filteredGroups = groups.filter((group) => {
          return group.isArchived === false;
        });
      }
      setFilteredGroups(filteredGroups);
    }
  }, [groups, archivedFilter]);

  const groupsLeft = (groups.length || 0) - (filteredGroups.length || 0);

  // Handle archived filter
  const handleArchivedFilter = () => {
    setArchivedFilter(!archivedFilter);
  };

  // Handle create group button
  const handleCreateGroupBtn = () => {
    setIsShowingForm(true);
  };

  return (
    <>
      {isShowingForm && (
        <GroupForm
          status={'create'}
          setIsShowingForm={setIsShowingForm}
          setGroups={setGroups}
        />
      )}
      {!isShowingForm && (
        <section className="groups-page">
          <h1>Groups</h1>

          {isLoading && <i className="fas fa-spinner fa-spin fa-3x"></i>}

          {!isLoading && groups.length > 0 && (
            <>
              <button onClick={handleArchivedFilter}>
                {archivedFilter
                  ? `Active (${groupsLeft})`
                  : `Archived (${groupsLeft})`}
              </button>
              {filteredGroups.map((group) => {
                return (
                  <GroupCard
                    key={group._id}
                    title={group.title}
                    category={group.category}
                  ></GroupCard>
                );
              })}
            </>
          )}

          {!isLoading && groups.length === 0 && <h3>You have no groups yet</h3>}

          <button onClick={handleCreateGroupBtn} className="create-group-btn">
            <i className="fa-solid fa-circle-plus fa-4x"></i>
          </button>
        </section>
      )}
    </>
  );
};

export default GroupsPage;