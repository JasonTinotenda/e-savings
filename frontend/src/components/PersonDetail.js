import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerson, updatePerson } from '../redux/personSlice';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing state from Redux store
  const { person, loading, error } = useSelector(state => state.persons);

  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    phone_number: '',
    address: ''
  });

  // Fetch person data either from Redux or API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Attempting Redux fetch first
        const result = await dispatch(fetchPerson(id));
        if (result?.payload) {
          setEditData(result.payload); // Populate local state with Redux data
        } else {
          // Fallback to Axios if Redux fetch fails or no data is found
          const response = await axios.get(`/api/persons/${id}/`);
          setEditData(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch person:', err);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Attempt to update via Redux first
      await dispatch(updatePerson({ personId: id, personData: editData }));
      // Optionally handle success message or navigate
      navigate('/persons');
    } catch (err) {
      console.error('Failed to update person via Redux:', err);
      // Fallback to Axios if Redux update fails
      axios.put(`/api/persons/${id}/`, editData)
        .then(() => navigate('/persons'))
        .catch(error => console.error('Failed to update person via Axios:', error));
    }
  };

  return (
    <div>
      <h2>Edit Person</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default PersonDetail;
