// src/components/PersonDetail.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerson, updatePerson } from '../redux/actions/accountActions';
import { useParams } from 'react-router-dom';

const PersonDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { person, loading, error } = useSelector(state => state.person);
  const [editData, setEditData] = useState(person || {});

  useEffect(() => {
    dispatch(fetchPerson(id));
  }, [dispatch, id]);

  useEffect(() => {
    setEditData(person || {});
  }, [person]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updatePerson(id, editData));
  };

  return (
    <div>
      <h1>Person Detail</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {person && (
        <div>
          <input
            type="text"
            name="first_name"
            value={editData.first_name || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            value={editData.last_name || ''}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date_of_birth"
            value={editData.date_of_birth || ''}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={editData.email || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone_number"
            value={editData.phone_number || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            value={editData.address || ''}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default PersonDetail;
