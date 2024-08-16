// src/components/AccountDetail.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccount, updateAccount } from '../redux/actions/accountActions';
import { useParams } from 'react-router-dom';

const AccountDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { account, loading, error } = useSelector(state => state.account);
  const [editData, setEditData] = useState(account || {});

  useEffect(() => {
    dispatch(fetchAccount(id));
  }, [dispatch, id]);

  useEffect(() => {
    setEditData(account || {});
  }, [account]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateAccount(id, editData));
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
