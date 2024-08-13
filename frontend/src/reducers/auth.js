import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
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

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    message: null,
    error: null,
    isSubscribed: false
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
        case GOOGLE_AUTH_SUCCESS:
        case FACEBOOK_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case AUTHENTICATED_FAIL:
                return {
                    ...state,
                    isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case FACEBOOK_AUTH_FAIL:
        case GOOGLE_AUTH_FAIL:
        case LOGOUT:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case CONTACT_SUBMIT_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null
            };
        case CONTACT_SUBMIT_FAIL:
            return {
                ...state,
                message: null,
                error: 'Message failed to send.'
            };
        case EMAIL_SUBSCRIBE_SUCCESS:
            return {
                ...state,
                isSubscribed: true,
                error: null
            };
        case EMAIL_SUBSCRIBE_FAIL:
            return {
                ...state,
                isSubscribed: false,
                error: payload
            };
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case ACTIVATION_FAIL:
        case ACTIVATION_SUCCESS:
            return {
                ...state
            }
        default:
            return state
    }
};

export default authReducer;
