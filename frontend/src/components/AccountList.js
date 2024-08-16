// src/components/AccountList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, createAccount, updateAccount, deleteAccount } from '../redux/actions/accountActions';

const AccountList = () => {
  const dispatch = useDispatch();
  const { accounts , loading, error } = useSelector(state => state.accounts.list);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleCreateAccount = () => {
    const accountData = {
      person_id: '1',
      account_number: '0002',
      account_type: 'SAVINGS'
    };
    dispatch(createAccount(accountData));
  };

  const handleUpdateAccount = (accountId) => {
    const updatedData = { account_type: 'CURRENT' };
    dispatch(updateAccount(accountId, updatedData));
  };

  const handleDeleteAccount = (accountId) => {
    dispatch(deleteAccount(accountId));
  };

  return (
    <div>
      <h1>Accounts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleCreateAccount}>Create Account</button>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>
            Account Number: {account.account_number}, Type: {account.account_type}
            <button onClick={() => handleUpdateAccount(account.id)}>Update</button>
            <button onClick={() => handleDeleteAccount(account.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
