// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import PersonList from './components/PersonList';
import PersonDetail from './components/PersonDetail';
import AccountList from './components/AccountList';
import AccountDetail from './components/AccountDetail';
import AccountComponent from './components/AccountComponent';
import TransactionTypes from './components/TransactionTypes';
import LoanTypes from './components/LoanTypes';
import LoanList from './components/LoanList';
import LoanDetail from './components/LoanDetail';
import CreateLoan from './components/CreateLoan';
import ApprovalLoan from './components/ApprovalLoan';
import CreateRepayment from './components/CreateRepayment';
import Home from './pages/Home';
import TransactionsComponent from './components/Transaction';
import TransactionTypeComponent from './components/TransactionTypes';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/persons" element={<PersonList/>} />
      <Route path="/persons/:id" element={<PersonDetail/>} />
      <Route path="/account-list" element={<AccountList/>} />
      <Route path="/accounts/:id" element={<AccountDetail/>} />
      <Route path="/accounts" element={<AccountComponent />} />
      <Route path="/transaction-types" element={<TransactionTypes/>} />
      <Route path="/loan-types" element={<LoanTypes />} />
      <Route path="/loans" element={<LoanList />} />
      <Route path="/loan/:loanId" element={<LoanDetail />} />
      <Route path="/create-loan" element={<CreateLoan />} />
      <Route path="/approve-loan/:loanId" element={<ApprovalLoan />} />
      <Route path="/create-repayment/:loanId" element={<CreateRepayment />} />
      <Route path="/transactions" element={<TransactionsComponent/>} />
      <Route path="/transaction-types" element={<TransactionTypeComponent/>} />
    </Routes>
  </Router>
);

export default App;
