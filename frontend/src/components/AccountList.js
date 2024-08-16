import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAccounts, createAccount, updateAccount, deleteAccount } from '../redux/actions/accountActions';

const AccountList = () => {
  const dispatch = useDispatch();
  const [accounts, setAccounts] = useState([]); // Local state for accounts
  const [loading, setLoading] = useState(false); // Local state for loading status
  const [error, setError] = useState(null); // Local state for error handling

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const result = await dispatch(fetchAccounts()); // Fetch accounts using Redux action
        setAccounts(result.payload); // Update local state with fetched accounts
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message); // Set error message if fetching data fails
        setLoading(false); // Set loading to false in case of error
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
      setAccounts([...accounts, result.payload]); // Update state with new account
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateAccount = async (accountId) => {
    const updatedData = { account_type: 'CURRENT' };
    try {
      const result = await dispatch(updateAccount(accountId, updatedData));
      setAccounts(
        accounts.map(account => 
          account.id === accountId ? { ...account, ...result.payload } : account
        )
      ); // Update state with updated account data
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      await dispatch(deleteAccount(accountId));
      setAccounts(accounts.filter(account => account.id !== accountId)); // Update state by removing the deleted account
    } catch (err) {
      setError(err.message);
    }
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
