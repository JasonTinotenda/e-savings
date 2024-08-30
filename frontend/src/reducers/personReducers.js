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
} from '../actions/types';

const initialState = {
    persons: [], 
    person: null,
    error: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PERSONS_LOADED_SUCCESS:
            return {
                ...state,
                persons: payload
            };
        case PERSON_LOADED_SUCCESS:
            return {
                ...state,
                person: payload
            };
        case PERSON_CREATED_SUCCESS:
        case PERSON_UPDATED_SUCCESS:
            return {
                ...state,
                person: payload
            };
        case PERSON_DELETED_SUCCESS:
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== payload)
            };
        case PERSONS_LOADED_FAIL:
        case PERSON_LOADED_FAIL:
        case PERSON_CREATED_FAIL:
        case PERSON_UPDATED_FAIL:
        case PERSON_DELETED_FAIL:
            return {
                ...state,
                error: payload // Ensure that you handle errors properly
            };
        default:
            return state;
    }
};
