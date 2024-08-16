import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; // or redux-saga if using saga
import rootReducer from './reducers';  // This imports the combined reducers

// Redux DevTools extension setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store with middleware and DevTools support
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) // Add other middlewares here if needed
);

export default store;
