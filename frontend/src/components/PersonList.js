import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPersons, createPerson, updatePerson, deletePerson } from '../redux/personSlice';
import { useNotification } from '../hooks/useNotifications';
import { Spinner, Alert, Form, Button, Pagination, InputGroup, FormControl } from 'react-bootstrap';

const PersonList = () => {
  const dispatch = useDispatch();
  const { persons, loading, error } = useSelector(state => state.persons);
  const { notifySuccess, notifyError } = useNotification();

  const [newPerson, setNewPerson] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    phone_number: '',
    address: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const personsPerPage = 5;

  useEffect(() => {
    dispatch(fetchPersons());
  }, [dispatch]);

  const handleCreatePerson = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPerson(newPerson)).unwrap();
      notifySuccess('Person created successfully');
      setNewPerson({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        phone_number: '',
        address: ''
      });
    } catch (err) {
      notifyError('Failed to create person');
      console.error('Failed to create person:', err);
    }
  };

  const handleUpdatePerson = async (personId) => {
    const updatedData = { email: 'new.email@example.com' };
    try {
      await dispatch(updatePerson({ personId, personData: updatedData })).unwrap();
      notifySuccess('Person updated successfully');
    } catch (err) {
      notifyError('Failed to update person');
      console.error('Failed to update person:', err);
    }
  };

  const handleDeletePerson = async (personId) => {
    try {
      await dispatch(deletePerson(personId)).unwrap();
      notifySuccess('Person deleted successfully');
    } catch (err) {
      notifyError('Failed to delete person');
      console.error('Failed to delete person:', err);
    }
  };

  const filteredPersons = persons.filter(person => 
    person.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPerson = currentPage * personsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - personsPerPage;
  const currentPersons = filteredPersons.slice(indexOfFirstPerson, indexOfLastPerson);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <div>
      <h1>Persons List</h1>
      <Form onSubmit={handleCreatePerson} className="mb-4">
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={newPerson.first_name}
            onChange={(e) => setNewPerson({ ...newPerson, first_name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={newPerson.last_name}
            onChange={(e) => setNewPerson({ ...newPerson, last_name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={newPerson.date_of_birth}
            onChange={(e) => setNewPerson({ ...newPerson, date_of_birth: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={newPerson.email}
            onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={newPerson.phone_number}
            onChange={(e) => setNewPerson({ ...newPerson, phone_number: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={newPerson.address}
            onChange={(e) => setNewPerson({ ...newPerson, address: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Create Person</Button>
      </Form>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search persons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      <ul className="list-group">
        {currentPersons.map(person => (
          <li key={person.id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/persons/${person.id}`}>
              {person.first_name} {person.last_name}
            </Link>
            <div>
              <Button variant="warning" size="sm" className="mx-1" onClick={() => handleUpdatePerson(person.id)}>Update</Button>
              <Button variant="danger" size="sm" onClick={() => handleDeletePerson(person.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>

      <Pagination className="mt-3">
        {Array.from({ length: Math.ceil(filteredPersons.length / personsPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default PersonList;
