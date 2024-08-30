// src/components/PersonList.js

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { load_persons } from '../actions/personActions';
import { checkAuthenticated, load_user } from '../actions/auth';
import { Link, Navigate } from 'react-router-dom';
import { getAuthConfig } from '../utils/authConfig'; // Utility to get auth config

const PersonList = ({ checkAuthenticated, load_user, load_persons, persons, loading, error, isAuthenticated }) => {
    useEffect(() => {
        const authenticateAndLoad = async () => {
            await checkAuthenticated();
            if (isAuthenticated) {
                load_user();
                load_persons();
            }
        };
        authenticateAndLoad();
    }, [checkAuthenticated, load_user, load_persons, isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading persons: {error.message}</p>;

    return (
        <div className='container mt-5'>
            <h1>Persons</h1>
            <ul className='list-group'>
                {persons.length > 0 ? (
                    persons.map(person => (
                        <li key={person.id} className='list-group-item'>
                            <Link to={`/person/${person.id}`}>{`${person.first_name} ${person.last_name}`}</Link>
                        </li>
                    ))
                ) : (
                    <li className='list-group-item'>No persons available</li>
                )}
            </ul>
        </div>
    );
};

const mapStateToProps = state => ({
    persons: state.person.persons,
    loading: state.person.loading,
    error: state.person.error,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated, load_user, load_persons })(PersonList);
