import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Activate from './containers/Activate';
import Signup from './containers/Signup';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Facebook from './containers/Facebook'
import Google from './containers/Google'
import { Provider } from 'react-redux';
import store from './store';
import LoanManagement from './components/loans';
import AccountPage from './components/accounts';
import Transactions from './components/transaction';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/facebook" element={<Facebook />} />
            <Route exact path="/google" element={<Google />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
            <Route exact path="/activate/:uid/:token" element={<Activate />} />
            <Route exact path="/loans" element={<LoanManagement/>} />
            <Route exact path="/accounts" element={<AccountPage/>} />
            <Route exact path="/transactions" element={<Transactions/>} />
          </Routes>
        </Router>
      </Provider>
  );
};

export default App;
