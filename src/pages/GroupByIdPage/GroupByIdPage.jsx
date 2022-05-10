import React from 'react';
import { useParams } from 'react-router-dom';
import GroupHeader from '../../components/GroupHeader/GroupHeader';

const GroupByIdPage = () => {
  const { groupId } = useParams();
  return (
    <div className="group-by-id-page">
      <GroupHeader groupId={groupId} />
    </div>
  );
};

export default GroupByIdPage;
