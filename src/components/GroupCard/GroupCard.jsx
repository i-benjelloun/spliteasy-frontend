import React from 'react';
import './GroupCard.css';

const GroupCard = ({ title, category }) => {
  return (
    <div className="group-card">
      <h3>{title}</h3>
      <p>{category}</p>
    </div>
  );
};

export default GroupCard;
