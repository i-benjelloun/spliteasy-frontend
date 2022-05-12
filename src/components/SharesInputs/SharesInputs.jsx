import React, { useEffect, useState } from 'react';
import SplitByShares from '../../utils/splitByShares';
import SharesInputsItem from '../SharesInputsItem/SharesInputsItem';

const SharesInputs = ({
  members,
  expense_amount,
  setShares,
  currency,
  shares,
}) => {
  const [sharesByMember, setSharesByMember] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    const sharesByMember = members.map(() => 1);
    const selectedMembers = members.map(() => true);
    setSharesByMember(sharesByMember);
    setSelectedMembers(selectedMembers);
  }, [members]);

  useEffect(() => {
    if (sharesByMember.length > 0) {
      const amountsByMember = SplitByShares(2, expense_amount, sharesByMember);
      const shares = members.map((member, index) => ({
        shared_with: member._id,
        share_amount: amountsByMember[index],
      }));
      setShares(shares);
    }
  }, [expense_amount, sharesByMember, members, setShares]);

  return (
    <div>
      <p>Shares</p>
      {members.map((member, index) => (
        <SharesInputsItem
          key={member._id}
          member={member}
          index={index}
          currency={currency}
          shareAmount={shares[index]?.share_amount}
          setSharesByMember={setSharesByMember}
          setSelectedMembers={setSelectedMembers}
        />
      ))}
    </div>
  );
};

export default SharesInputs;
