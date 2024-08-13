import axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,        
    CONTACT_SUBMIT_SUCCESS,
    CONTACT_SUBMIT_FAIL,
    EMAIL_SUBSCRIBE_SUCCESS,
    EMAIL_SUBSCRIBE_FAIL,
    LOGOUT
    } from '../actions/types'

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            Headers: {
                'content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    }
    else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const googleAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www.form-urlencoded'
            }
        }

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);

            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        }catch (err) {
            dispatch({
                type: GOOGLE_AUTH_FAIL
            });
        }
    }
};

export const facebookAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?${formBody}`, config);

            dispatch({
                type: FACEBOOK_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        }catch (err) {
            dispatch({
                type: FACEBOOK_AUTH_FAIL
            });
        }
    }
};

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')){
        const config = {
            Headers: {
                'content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({ 
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({ 
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({ 
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        Headers: {
            'content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
        Headers: {
            'content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        Headers: {
            'content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({ 
            type: PASSWORD_RESET_SUCCESS
        });

    } catch(err) {
        dispatch({ 
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config)

        dispatch({ 
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch(err) {
        dispatch({ 
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

export const submitContactForm = (name, email, message) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, message });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/contact`, body, config);

        if (res.data.status === 'success') {
            dispatch({
                type: CONTACT_SUBMIT_SUCCESS,
                payload: res.data
            });
            alert('Message Sent.');
        } else {
            dispatch({
                type: CONTACT_SUBMIT_FAIL
            });
            alert('Message failed to send.');
        }
    } catch (err) {
        dispatch({
            type: CONTACT_SUBMIT_FAIL
        });
        alert('Error submitting form.');
    }
};

export const subscribe = (email) => async dispatch => {
    const config = {
        Headers: {
            'Content-Type': 'application/json'
        }
    };

    if (!validateEmail(email)) {
        dispatch({
            type: EMAIL_SUBSCRIBE_FAIL,
            payload: 'Invalid email address'
        });
        return;
    }

    const body = JSON.stringify({ email });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/subscribe/`, body, config);

        dispatch({
            type: EMAIL_SUBSCRIBE_SUCCESS,
            payload: res.data
        });
        alert('Subscribed successfully!');
    } catch (err) {
        dispatch({
            type: EMAIL_SUBSCRIBE_FAIL,
            payload: 'Failed to subscribe'
        });
        alert("Error");
    }
};

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}