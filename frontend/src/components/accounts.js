import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

export default function AccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    id: '',
    account_number: '',
    account_type: 'savings',
    balance: 0,
    person: {
      id: '',
      first_name: '',
      last_name: '',
      date_of_birth: '',
      email: '',
      phone_number: '',
      address: '',
    },
    person_id: '', // For handling person selection when creating/updating an account
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        if (id) {
          const response = await axios.get(`/api/accounts/${id}/`);
          setAccount({
            ...response.data,
            person_id: response.data.person.id,
          });
          setIsEditMode(false);
        } else {
          setIsEditMode(true);
        }
      } catch (error) {
        console.error('Error fetching account data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('person.')) {
      const personField = name.split('.')[1];
      setAccount((prevState) => ({
        ...prevState,
        person: {
          ...prevState.person,
          [personField]: value,
        },
      }));
    } else {
      setAccount((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const accountData = {
      ...account,
      person: undefined, // Remove the nested person object
      person_id: account.person_id, // Ensure person_id is sent correctly
    };

    try {
      const url = id ? `/api/accounts/${id}/` : '/api/accounts/';
      const method = id ? 'put' : 'post';
      await axios({ method, url, data: accountData, headers: { 'Content-Type': 'application/json' } });
      alert(`Account ${id ? 'updated' : 'created'} successfully!`);
      navigate('/accounts');
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      alert('There was an error submitting the form.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      setIsLoading(true);
      try {
        await axios.delete(`/api/accounts/${id}/`);
        alert('Account deleted successfully!');
        navigate('/accounts');
      } catch (error) {
        console.error('There was an error deleting the account!', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className='container mt-5 text-center'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className='container mt-5'>
      <h1>{id ? 'Edit Account' : 'Create Account'}</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='first_name' className='form-label'>
            First Name
          </label>
          <input
            type='text'
            className='form-control'
            id='first_name'
            name='person.first_name'
            value={account.person.first_name}
            onChange={handleChange}
            readOnly={!isEditMode}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='last_name' className='form-label'>
            Last Name
          </label>
          <input
            type='text'
            className='form-control'
            id='last_name'
            name='person.last_name'
            value={account.person.last_name}
            onChange={handleChange}
            readOnly={!isEditMode}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='account_number' className='form-label'>
            Account Number
          </label>
          <input
            type='text'
            className='form-control'
            id='account_number'
            name='account_number'
            value={account.account_number}
            onChange={handleChange}
            readOnly={!isEditMode}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='person.email'
            value={account.person.email}
            onChange={handleChange}
            readOnly={!isEditMode}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='phone_number' className='form-label'>
            Contact Number
          </label>
          <input
            type='text'
            className='form-control'
            id='phone_number'
            name='person.phone_number'
            value={account.person.phone_number}
            onChange={handleChange}
            readOnly={!isEditMode}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='account_type' className='form-label'>
            Account Type
          </label>
          <select
            className='form-select'
            id='account_type'
            name='account_type'
            value={account.account_type}
            onChange={handleChange}
            disabled={!isEditMode}
          >
            <option value='savings'>Savings</option>
            <option value='current'>Current</option>
          </select>
        </div>
        {isEditMode && (
          <button type='submit' className='btn btn-primary'>
            {id ? 'Update' : 'Create'} Account
          </button>
        )}
        {!isEditMode && id && (
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => setIsEditMode(true)}
          >
            Edit
          </button>
        )}
        {id && (
          <button
            type='button'
            className='btn btn-danger ms-2'
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </form>
      <Link to='/accounts' className='btn btn-link mt-3'>
        Back to Accounts
      </Link>
    </div>
  );
}
