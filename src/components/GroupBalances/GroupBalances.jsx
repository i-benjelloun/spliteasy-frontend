import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupBalances } from '../../api/groups';
import getSymbolFromCurrency from 'currency-symbol-map';

const GroupBalances = ({ currency }) => {
  const { groupId } = useParams();
  const [balances, setBalances] = useState([]);
  const [reimbursements, setReimbursements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const getBalancesData = async () => {
      const { success, balances, reimbursements, errorMessage } =
        await getGroupBalances(groupId);
      setIsLoading(false);
      if (success) {
        setBalances(balances);
        setReimbursements(reimbursements);
      } else {
        setErrorMessage(errorMessage);
      }
    };
    getBalancesData();
  });
  return (
    <div className="group-balances">
      <h1>Balances</h1>
      {isLoading && (
        <div className="spinner">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}
      {balances?.map((balance) => (
        <div>
          <h3>
            {balance.user.firstName}
            <span>
              {balance.balance}
              {getSymbolFromCurrency(currency)}
            </span>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default GroupBalances;
