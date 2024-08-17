import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerson, updatePerson, createPerson } from '../redux/personSlice';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfilePictureUpload from './ProfilePictureUpload';
import { validatePersonForm } from '../utils/validation';
import { useRole } from '../hooks/useRoles';
import { GoogleMapAutocomplete } from './GoogleMapAutoComplete';
import AuditLogs from './AuditLogs';
import {useNotification} from '../hooks/useNotifications';
import Spinner from './Spinner';
import { Chart } from 'react-chartjs-2';
import { useTheme } from '../hooks/useTheme';

const usePersonData = (id) => {
  const dispatch = useDispatch();
  const { person, loading, error } = useSelector(state => state.persons);

  const fetchPersonData = useCallback(async () => {
    try {
      const result = await dispatch(fetchPerson(id));
      if (result?.payload) {
        return result.payload;
      } else {
        const response = await axios.get(`/api/persons/${id}/`);
        return response.data;
      }
    } catch (err) {
      throw new Error('Failed to fetch person');
    }
  }, [dispatch, id]);

  return { person, loading, error, fetchPersonData };
};

const PersonDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { person, loading, error, fetchPersonData } = usePersonData(id);
  const role = useRole(); // Custom hook to get user role
  const notify = useNotification(); // Custom notification hook
  const { isDarkMode, toggleTheme } = useTheme(); // Custom hook for theme management

  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    phone_number: '',
    address: '',
    profile_picture: ''
  });
  const [updating, setUpdating] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (id) {
      const loadPersonData = async () => {
        try {
          const data = await fetchPersonData();
          setEditData(data);
        } catch (err) {
          console.error(err.message);
          notify('Error loading person data', 'error');
        }
      };
      loadPersonData();
    }
  }, [fetchPersonData, id, notify]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleAddressSelect = (address) => {
    setEditData({ ...editData, address });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    
    const errors = validatePersonForm(editData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setUpdating(true);
    try {
      await dispatch(updatePerson({ personId: id, personData: editData })).unwrap();
      notify('Person updated successfully', 'success');
      navigate('/persons');
    } catch (err) {
      console.error('Failed to update person via Redux:', err);
      try {
        await axios.put(`/api/persons/${id}/`, editData);
        notify('Person updated via Axios', 'success');
        navigate('/persons');
      } catch (error) {
        console.error('Failed to update person via Axios:', error);
        notify('Failed to update person', 'error');
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    
    const errors = validatePersonForm(editData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setUpdating(true);
    try {
      await dispatch(createPerson(editData)).unwrap();
      notify('Person created successfully', 'success');
      navigate('/persons');
    } catch (err) {
      console.error('Failed to create person via Redux:', err);
      try {
        await axios.post(`/api/persons/`, editData);
        notify('Person created via Axios', 'success');
        navigate('/persons');
      } catch (error) {
        console.error('Failed to create person via Axios:', error);
        notify('Failed to create person', 'error');
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <h2>{id ? 'Edit' : 'Create'} Person</h2>
      <form onSubmit={id ? handleUpdate : handleCreate}>
        <input
          type="text"
          name="first_name"
          value={editData.first_name || ''}
          onChange={handleChange}
          disabled={updating}
          placeholder="First Name"
        />
        {validationErrors.first_name && <p>{validationErrors.first_name}</p>}
        
        <input
          type="text"
          name="last_name"
          value={editData.last_name || ''}
          onChange={handleChange}
          disabled={updating}
          placeholder="Last Name"
        />
        {validationErrors.last_name && <p>{validationErrors.last_name}</p>}
        
        <input
          type="date"
          name="date_of_birth"
          value={editData.date_of_birth || ''}
          onChange={handleChange}
          disabled={updating}
        />
        {validationErrors.date_of_birth && <p>{validationErrors.date_of_birth}</p>}
        
        <input
          type="email"
          name="email"
          value={editData.email || ''}
          onChange={handleChange}
          disabled={updating}
          placeholder="Email"
        />
        {validationErrors.email && <p>{validationErrors.email}</p>}
        
        <input
          type="text"
          name="phone_number"
          value={editData.phone_number || ''}
          onChange={handleChange}
          disabled={updating}
          placeholder="Phone Number"
        />
        {validationErrors.phone_number && <p>{validationErrors.phone_number}</p>}
        
        <GoogleMapAutocomplete onSelect={handleAddressSelect} />
        <input
          type="text"
          name="address"
          value={editData.address || ''}
          onChange={handleChange}
          disabled={updating}
          placeholder="Address"
        />
        {validationErrors.address && <p>{validationErrors.address}</p>}
        
        <ProfilePictureUpload
          currentPicture={editData.profile_picture}
          onUpload={(url) => setEditData({ ...editData, profile_picture: url })}
        />
        
        <button type="submit" disabled={updating}>
          {id ? 'Update' : 'Create'}
        </button>
      </form>

      {updating && <p>{id ? 'Updating' : 'Creating'} person...</p>}
      {role === 'admin' && <AuditLogs personId={id} />}
      
      {/* Dark Mode Toggle */}
      <button onClick={toggleTheme}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      {/* Example chart for person-related data */}
      <Chart
        type="bar"
        data={{
          labels: ['Savings', 'Loans', 'Transactions'],
          datasets: [{
            label: 'Financial Overview',
            data: [person.savings, person.loans, person.transactions],
            backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
          }],
        }}
        options={{ responsive: true }}
      />
    </div>
  );
};

export default PersonDetail;
