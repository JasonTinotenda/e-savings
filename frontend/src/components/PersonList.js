// src/components/PersonList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersons, createPerson, updatePerson, deletePerson } from '../redux/actions/accountActions';

const PersonList = () => {
  const dispatch = useDispatch();
  const { persons, loading, error } = useSelector(state => state.person);

  useEffect(() => {
    dispatch(fetchPersons());
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
    dispatch(createPerson(personData));
  };

  const handleUpdatePerson = (personId) => {
    const updatedData = { email: 'new.email@example.com' };
    dispatch(updatePerson(personId, updatedData));
  };

  const handleDeletePerson = (personId) => {
    dispatch(deletePerson(personId));
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
