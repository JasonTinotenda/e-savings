import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPersons, createPerson, updatePerson, deletePerson } from '../redux/actions/accountActions';

const PersonList = () => {
  const [persons, setPersons] = useState([]); // Local state for persons
  const [loading, setLoading] = useState(false); // Local state for loading status
  const [error, setError] = useState(null); // Local state for error handling
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const result = await dispatch(fetchPersons()); // Fetch data using Redux action
        setPersons(result.payload); // Update local state with fetched data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message); // Set error message if fetching data fails
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, [dispatch]);

  const handleCreatePerson = () => {
    const personData = {
      first_name: 'John',
      last_name: 'Doe',
      date_of_birth: '1990-01-01',
      email: 'john.doe@example.com',
      phone_number: '1234567890',
      address: '123 Main St'
    };
    dispatch(createPerson(personData))
      .then(() => dispatch(fetchPersons())) // Re-fetch data after creation
      .then(result => setPersons(result.payload)) // Update local state with the new list
      .catch(err => setError(err.message));
  };

  const handleUpdatePerson = (personId) => {
    const updatedData = { email: 'new.email@example.com' };
    dispatch(updatePerson(personId, updatedData))
      .then(() => dispatch(fetchPersons())) // Re-fetch data after update
      .then(result => setPersons(result.payload)) // Update local state with the updated list
      .catch(err => setError(err.message));
  };

  const handleDeletePerson = (personId) => {
    dispatch(deletePerson(personId))
      .then(() => dispatch(fetchPersons())) // Re-fetch data after deletion
      .then(result => setPersons(result.payload)) // Update local state with the updated list
      .catch(err => setError(err.message));
  };

  return (
    <div>
      <h1>Persons</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleCreatePerson}>Create Person</button>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.first_name} {person.last_name}
            <button onClick={() => handleUpdatePerson(person.id)}>Update</button>
            <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
