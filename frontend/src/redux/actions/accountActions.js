// src/redux/actions.js

import axios from 'axios';
import { PERSON_ACTIONS, ACCOUNT_ACTIONS } from '../types/accountTypes';

const apiUrl = 'http://localhost:8000/api';

// Person Actions
export const fetchPersons = () => async (dispatch) => {
  dispatch({ type: PERSON_ACTIONS.FETCH_PERSONS_REQUEST });
  try {
    const response = await axios.get(`${apiUrl}/persons/`);
    dispatch({
      type: PERSON_ACTIONS.FETCH_PERSONS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PERSON_ACTIONS.FETCH_PERSONS_FAILURE,
      payload: error.message
    });
  }
};

export const fetchPerson = (personId) => async (dispatch) => {
  dispatch({ type: PERSON_ACTIONS.FETCH_PERSON_REQUEST });
  try {
    const response = await axios.get(`${apiUrl}/persons/${personId}/`);
    dispatch({
      type: PERSON_ACTIONS.FETCH_PERSON_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PERSON_ACTIONS.FETCH_PERSON_FAILURE,
      payload: error.message
    });
  }
};

export const createPerson = (personData) => async (dispatch) => {
  dispatch({ type: PERSON_ACTIONS.CREATE_PERSON_REQUEST });
  try {
    const response = await axios.post(`${apiUrl}/persons/`, personData);
    dispatch({
      type: PERSON_ACTIONS.CREATE_PERSON_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PERSON_ACTIONS.CREATE_PERSON_FAILURE,
      payload: error.message
    });
  }
};

export const updatePerson = (personId, personData) => async (dispatch) => {
  dispatch({ type: PERSON_ACTIONS.UPDATE_PERSON_REQUEST });
  try {
    const response = await axios.put(`${apiUrl}/persons/${personId}/`, personData);
    dispatch({
      type: PERSON_ACTIONS.UPDATE_PERSON_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PERSON_ACTIONS.UPDATE_PERSON_FAILURE,
      payload: error.message
    });
  }
};

export const deletePerson = (personId) => async (dispatch) => {
  dispatch({ type: PERSON_ACTIONS.DELETE_PERSON_REQUEST });
  try {
    await axios.delete(`${apiUrl}/persons/${personId}/`);
    dispatch({
      type: PERSON_ACTIONS.DELETE_PERSON_SUCCESS,
      payload: personId
    });
  } catch (error) {
    dispatch({
      type: PERSON_ACTIONS.DELETE_PERSON_FAILURE,
      payload: error.message
    });
  }
};

// Account Actions
export const fetchAccounts = () => async (dispatch) => {
  dispatch({ type: ACCOUNT_ACTIONS.FETCH_ACCOUNTS_REQUEST });
  try {
    const response = await axios.get(`${apiUrl}/accounts/`);
    dispatch({
      type: ACCOUNT_ACTIONS.FETCH_ACCOUNTS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_ACTIONS.FETCH_ACCOUNTS_FAILURE,
      payload: error.message
    });
  }
};

export const fetchAccountBalance = (accountId) => async (dispatch) => {
  try {
      const response = await axios.get(`/api/accounts/${accountId}/balance`);
      dispatch({
          type: ACCOUNT_ACTIONS.FETCH_ACCOUNT_BALANCE_SUCCESS,
          payload: response.data,
      });
  } catch (error) {
      dispatch({
          type: ACCOUNT_ACTIONS.FETCH_ACCOUNT_BALANCE_FAILURE,
          payload: error.message,
      });
  }
};


export const fetchAccount = (accountId) => async (dispatch) => {
  dispatch({ type: ACCOUNT_ACTIONS.FETCH_ACCOUNT_REQUEST });
  try {
    const response = await axios.get(`${apiUrl}/accounts/${accountId}/`);
    dispatch({
      type: ACCOUNT_ACTIONS.FETCH_ACCOUNT_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_ACTIONS.FETCH_ACCOUNT_FAILURE,
      payload: error.message
    });
  }
};

export const createAccount = (accountData) => async (dispatch) => {
  dispatch({ type: ACCOUNT_ACTIONS.CREATE_ACCOUNT_REQUEST });
  try {
    const response = await axios.post(`${apiUrl}/accounts/`, accountData);
    dispatch({
      type: ACCOUNT_ACTIONS.CREATE_ACCOUNT_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_ACTIONS.CREATE_ACCOUNT_FAILURE,
      payload: error.message
    });
  }
};

export const updateAccount = (accountId, accountData) => async (dispatch) => {
  dispatch({ type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT_REQUEST });
  try {
    const response = await axios.put(`${apiUrl}/accounts/${accountId}/`, accountData);
    dispatch({
      type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT_FAILURE,
      payload: error.message
    });
  }
};

export const deleteAccount = (accountId) => async (dispatch) => {
  dispatch({ type: ACCOUNT_ACTIONS.DELETE_ACCOUNT_REQUEST });
  try {
    await axios.delete(`${apiUrl}/accounts/${accountId}/`);
    dispatch({
      type: ACCOUNT_ACTIONS.DELETE_ACCOUNT_SUCCESS,
      payload: accountId
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_ACTIONS.DELETE_ACCOUNT_FAILURE,
      payload: error.message
    });
  }
};
