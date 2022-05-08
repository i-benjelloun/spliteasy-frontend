import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const groups = await axios.get();
    };
  });
  return <div>GroupsPage</div>;
};

export default GroupsPage;
