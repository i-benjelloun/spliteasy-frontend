import React from 'react';
import { Link } from 'react-router-dom';
import './GroupCard.css';

const GroupCard = ({ groupId, title, category }) => {
  return (
    <Link className="text-link" to={`/groups/${groupId}`}>
      <div className="group-card">
        <h3>{title}</h3>
        <p>{category}</p>
      </div>
    </Link>
  );
};

export default GroupCard;
