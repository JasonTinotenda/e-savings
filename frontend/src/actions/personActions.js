import axios from 'axios';
import {
    PERSONS_LOADED_SUCCESS,
    PERSONS_LOADED_FAIL,
    PERSON_LOADED_SUCCESS,
    PERSON_LOADED_FAIL,
    PERSON_CREATED_SUCCESS,
    PERSON_CREATED_FAIL,
    PERSON_UPDATED_SUCCESS,
    PERSON_UPDATED_FAIL,
    PERSON_DELETED_SUCCESS,
    PERSON_DELETED_FAIL
} from './types';

// Helper function to get token from localStorage
const getAuthToken = () => localStorage.getItem('access');

// Set headers with authorization token
const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${getAuthToken()}`,
            'Accept': 'application/json'
        }
    };
};

export const load_persons = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/persons/`, getConfig());

        dispatch({
            type: PERSONS_LOADED_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PERSONS_LOADED_FAIL
        });
    }
};

export const load_person = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/persons/${id}/`, getConfig());

        dispatch({
            type: PERSON_LOADED_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PERSON_LOADED_FAIL
        });
    }
};

export const create_person = (personData) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/persons/`, personData, getConfig());

        dispatch({
            type: PERSON_CREATED_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PERSON_CREATED_FAIL
        });
    }
};

export const update_person = (id, personData) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/persons/${id}/`, personData, getConfig());

        dispatch({
            type: PERSON_UPDATED_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PERSON_UPDATED_FAIL
        });
    }
};

export const delete_person = (id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/persons/${id}/`, getConfig());

        dispatch({
            type: PERSON_DELETED_SUCCESS,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: PERSON_DELETED_FAIL
        });
    }
};
