import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersons, createPerson, updatePerson, deletePerson } from '../redux/personSlice'; // Updated import

const PersonList = () => {
  const dispatch = useDispatch();

  // Use useSelector to get data from Redux state
  const { persons, loading, error } = useSelector(state => state.persons); // Updated selector

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPersons());
      } catch (err) {
        console.error('Failed to fetch persons:', err);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleCreatePerson = async () => {
    const personData = {
      first_name: 'John',
      last_name: 'Doe',
      date_of_birth: '1990-01-01',
      email: 'john.doe@example.com',
      phone_number: '1234567890',
      address: '123 Main St'
    };
    try {
      await dispatch(createPerson(personData));
      await dispatch(fetchPersons()); // Refresh the person list after creation
    } catch (err) {
      console.error('Failed to create person:', err);
    }
  };

  const handleUpdatePerson = async (personId) => {
    const updatedData = { email: 'new.email@example.com' };
    try {
      await dispatch(updatePerson({ personId, personData: updatedData }));
      await dispatch(fetchPersons()); // Refresh the person list after update
    } catch (err) {
      console.error('Failed to update person:', err);
    }
  };

  const handleDeletePerson = async (personId) => {
    try {
      await dispatch(deletePerson(personId));
      await dispatch(fetchPersons()); // Refresh the person list after deletion
    } catch (err) {
      console.error('Failed to delete person:', err);
    }
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
