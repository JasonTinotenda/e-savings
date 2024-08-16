import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccount, updateAccount } from '../redux/accountSlice';
import { useParams } from 'react-router-dom';

const AccountDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Accessing state from Redux store
  const { account, loading, error } = useSelector(state => state.accounts);
  const [editData, setEditData] = React.useState({}); // Local state for editable data

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAccount(id)); // Fetch account data using Redux action
      } catch (err) {
        console.error('Failed to fetch account:', err);
      }
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (account) {
      setEditData(account); // Initialize editData with the fetched account data
    }
  }, [account]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateAccount({ accountId: id, accountData: editData }))
      .then(() => {
        // Optionally handle success message
      })
      .catch(err => console.error('Failed to update account:', err)); // Handle any errors during update
  };

  return (
    <div>
      <h1>Account Detail</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {account && (
        <div>
          <input
            type="text"
            name="account_number"
            value={editData.account_number || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="account_type"
            value={editData.account_type || ''}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default AccountDetail;
