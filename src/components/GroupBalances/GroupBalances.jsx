import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupBalances } from '../../api/groups';
import GroupBalancesList from '../GroupBalancesList/GroupBalancesList';
import GroupReimbursementsList from '../GroupReimbursementsList/GroupReimbursementsList';

const GroupBalances = ({ currency, setPageStatus }) => {
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
  }, [groupId]);

  return (
    <div className="group-balances">
      {isLoading && (
        <div className="spinner">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}
      <GroupBalancesList balances={balances} currency={currency} />
      <GroupReimbursementsList
        reimbursements={reimbursements}
        currency={currency}
        setPageStatus={setPageStatus}
      />
    </div>
  );
};

export default GroupBalances;
