import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPerson, updatePerson } from '../redux/actions/accountActions';
import { useParams } from 'react-router-dom';

const PersonDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [person, setPerson] = useState(null); // Local state for person data
  const [loading, setLoading] = useState(false); // Local state for loading status
  const [error, setError] = useState(null); // Local state for error handling
  const [editData, setEditData] = useState({}); // Local state for editable data

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const result = await dispatch(fetchPerson(id)); // Fetch person data using Redux action
        setPerson(result.payload); // Update local state with fetched data
        setEditData(result.payload); // Initialize editData with the fetched person data
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
    dispatch(updatePerson(id, editData))
      .then(() => {
        // Optionally refetch the person data after update or handle success message
        setPerson(editData); // Update local person data with the updated values
      })
      .catch(err => setError(err.message)); // Handle any errors during update
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
