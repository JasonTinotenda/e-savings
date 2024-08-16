import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, createAccount, updateAccount, deleteAccount } from '../redux/accountSlice';

const AccountList = () => {
  const dispatch = useDispatch();
  
  // Accessing state from Redux store
  const { accounts, loading, error } = useSelector(state => state.accounts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAccounts()); // Fetch accounts using Redux action
      } catch (err) {
        console.error('Failed to fetch accounts:', err);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleCreateAccount = async () => {
    const accountData = {
      person_id: '1',
      account_number: '0002',
      account_type: 'SAVINGS'
    };
    try {
      const result = await dispatch(createAccount(accountData));
      // Handle success (e.g., display success message)
    } catch (err) {
      console.error('Failed to create account:', err);
    }
  };

  const handleUpdateAccount = async (accountId) => {
    const updatedData = { account_type: 'CURRENT' };
    try {
      const result = await dispatch(updateAccount({ accountId, accountData: updatedData }));
      // Handle success (e.g., display success message)
    } catch (err) {
      console.error('Failed to update account:', err);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      await dispatch(deleteAccount(accountId));
      // Handle success (e.g., display success message)
    } catch (err) {
      console.error('Failed to delete account:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Accounts</h1>
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
