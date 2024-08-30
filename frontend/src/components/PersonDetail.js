// src/components/PersonDetail.js

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { load_person, update_person, delete_person } from '../actions/personActions';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getAuthConfig } from '../utils/authConfig'; // Utility to get auth config

const PersonDetail = ({ load_person, update_person, delete_person, person, loading, error }) => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        address: ''
    });
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        load_person(id);
    }, [load_person, id]);

    useEffect(() => {
        if (person) {
            setFormData({
                first_name: person.first_name || '',
                last_name: person.last_name || '',
                email: person.email || '',
                date_of_birth: person.date_of_birth || '',
                address: person.address || ''
            });
        }
    }, [person]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        update_person(id, formData);
    };

    const onDelete = () => {
        delete_person(id);
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to='/persons' />;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (!person) {
        return <Navigate to='/persons' />;
    }

    return (
        <div className='container mt-5'>
            <h1>Person Details</h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>First Name</label>
                    <input 
                        type='text'
                        name='first_name'
                        value={formData.first_name}
                        onChange={onChange}
                        className='form-control'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Last Name</label>
                    <input 
                        type='text'
                        name='last_name'
                        value={formData.last_name}
                        onChange={onChange}
                        className='form-control'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input 
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={onChange}
                        className='form-control'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Date of Birth</label>
                    <input 
                        type='date'
                        name='date_of_birth'
                        value={formData.date_of_birth}
                        onChange={onChange}
                        className='form-control'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Address</label>
                    <textarea 
                        name='address'
                        value={formData.address}
                        onChange={onChange}
                        className='form-control'
                        rows='3'
                        required
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Update</button>
            </form>
            <Link to={`/person/edit/${id}`} className='btn btn-primary mt-3'>Edit</Link>
            <button onClick={onDelete} className='btn btn-danger mt-3'>Delete</button>
        </div>
    );
};

const mapStateToProps = state => ({
    person: state.person.person,
    loading: state.person.loading,
    error: state.person.error
});

export default connect(mapStateToProps, { load_person, update_person, delete_person })(PersonDetail);
