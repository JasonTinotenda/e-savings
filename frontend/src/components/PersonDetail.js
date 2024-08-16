import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerson, updatePerson } from '../redux/personSlice';
import { useParams } from 'react-router-dom';

const PersonDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Accessing state from Redux store
  const { person, loading, error } = useSelector(state => state.persons);

  const [editData, setEditData] = React.useState({}); // Local state for editable data

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPerson(id)); // Fetch person data using Redux action
      } catch (err) {
        console.error('Failed to fetch person:', err);
      }
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (person) {
      setEditData(person); // Initialize editData with the fetched person data
    }
  }, [person]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updatePerson({ personId: id, personData: editData }))
      .then(() => {
        // Optionally handle success message
      })
      .catch(err => console.error('Failed to update person:', err)); // Handle any errors during update
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
