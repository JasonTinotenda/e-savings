import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
            <Route exact path="/loans" element={<LoanManagement/>} />
            <Route exact path="/accounts" element={<AccountPage/>} />
            <Route exact path="/transactions" element={<Transactions/>} />
          </Routes>
        </Router>
      </Provider>
  );
};

export default App;
