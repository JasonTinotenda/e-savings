import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAccount, updateAccount } from '../redux/actions/accountActions';
import { useParams } from 'react-router-dom';

const AccountDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [account, setAccount] = useState(null); // Local state for account data
  const [loading, setLoading] = useState(false); // Local state for loading status
  const [error, setError] = useState(null); // Local state for error handling
  const [editData, setEditData] = useState({}); // Local state for editable data

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const result = await dispatch(fetchAccount(id)); // Fetch account data using Redux action
        setAccount(result.payload); // Update local state with fetched data
        setEditData(result.payload); // Initialize editData with the fetched account data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message); // Set error message if fetching data fails
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, [dispatch, id]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateAccount(id, editData))
      .then(() => {
        // Optionally refetch the account data after update or handle success message
        setAccount(editData); // Update local account data with the updated values
      })
      .catch(err => setError(err.message)); // Handle any errors during update
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
