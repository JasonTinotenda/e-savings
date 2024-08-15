// src/actions/accountActions.js
import axios from 'axios';

export const FETCH_ACCOUNT_REQUEST = 'FETCH_ACCOUNT_REQUEST';
export const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS';
export const FETCH_ACCOUNT_FAILURE = 'FETCH_ACCOUNT_FAILURE';

export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE';

export const UPDATE_ACCOUNT_REQUEST = 'UPDATE_ACCOUNT_REQUEST';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
export const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE';

export const DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE';

export const fetchAccount = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ACCOUNT_REQUEST });
  try {
    const response = await axios.get(`/api/accounts/${id}/`);
    dispatch({ type: FETCH_ACCOUNT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_ACCOUNT_FAILURE, error: error.message });
  }
};

export const createAccount = (accountData) => async (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT_REQUEST });
  try {
    const response = await axios.post('/api/accounts/', accountData);
    dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_ACCOUNT_FAILURE, error: error.message });
  }
};

export const updateAccount = (id, accountData) => async (dispatch) => {
  dispatch({ type: UPDATE_ACCOUNT_REQUEST });
  try {
    const response = await axios.put(`/api/accounts/${id}/`, accountData);
    dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_ACCOUNT_FAILURE, error: error.message });
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ACCOUNT_REQUEST });
  try {
    await axios.delete(`/api/accounts/${id}/`);
    dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_ACCOUNT_FAILURE, error: error.message });
  }
};
