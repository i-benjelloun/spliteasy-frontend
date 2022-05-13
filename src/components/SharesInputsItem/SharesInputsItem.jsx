import React, { useEffect, useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import './ShatesInputsItem.css';

const SharesInputsItem = ({
  splitMethod,
  member,
  index,
  setSharesByMember,
  setSelectedMembers,
  setAmountsByMember,
  currency,
  shareAmount,
}) => {
  const [numberOfShares, setNumberOfShares] = useState(1);
  const [isSelected, setIsSelected] = useState(true);

  useEffect(() => {
    setSharesByMember((prev) => {
      const copy = [...prev];
      copy[index] = Number(numberOfShares);
      return copy;
    });
  }, [index, numberOfShares, setSharesByMember]);

  useEffect(() => {
    setSelectedMembers((prev) => {
      const copy = [...prev];
      copy[index] = isSelected;
      return copy;
    });
  }, [index, isSelected, setSelectedMembers]);

  const handleChangeMemberShares = (e) => {
    setNumberOfShares(e.target.value);
  };

  const handleChangeIsSelected = () => {
    if (isSelected) {
      setNumberOfShares(0);
    } else {
      setNumberOfShares(1);
    }
    setIsSelected(!isSelected);
  };

  const handleChangeAmount = (e) => {
    const amount = e.target.value;
    if (
      amount.indexOf('.') === -1 ||
      amount.indexOf('.') >= amount.length - 3
    ) {
      setAmountsByMember((prev) => {
        const copy = [...prev];
        copy[index] = Number(amount);
        return copy;
      });
    }
  };

  return (
    <div className="shares-inputs-item">
      <div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleChangeIsSelected}
        />
        <label>{member.firstName}</label>
      </div>
      <div>
        <input
          className="form-input shares-input middle-input"
          type="number"
          min="0"
          value={numberOfShares}
          onChange={handleChangeMemberShares}
          disabled={splitMethod !== 'shares'}
          required
        />
        <input
          className="form-input shares-input"
          type="number"
          min="0"
          step="0.01"
          value={shareAmount || 0}
          onChange={handleChangeAmount}
          disabled={splitMethod !== 'manually'}
          required
        />
        <span>{getSymbolFromCurrency(currency)}</span>
      </div>
    </div>
  );
};

export default SharesInputsItem;
