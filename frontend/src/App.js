import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoanApplication from './functions/loan_application';
import LoanTracking from './functions/loan_tracking';
import LoanRepayment from './functions/loan_repayment';
import RegisterMember from './functions/register_member';
import MemberProfile from './functions/member_profile';
import MonthlyReport from './functions/monthly_report';
import QuarterlyReport from './functions/quarterly_report';
import AnnualReport from './functions/annual_report';
import DepositFunds from './functions/savings_deposit';
import WithdrawFunds from './functions/savings_withdraw';
import AccountBalance from './functions/account_balance';

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
            <Route exact path="/loans/application" element={<LoanApplication/>} />
            <Route exact path="/loans/tracking" element={<LoanTracking/>} />
            <Route exact path="/loans/repayment/:loanId" element={<LoanRepayment/>} />
            <Route exact path="/members/register" element={<RegisterMember/>} />
            <Route exact path="/members/profile/:memberId" element={<MemberProfile/>} />
            <Route exact path="/reports/monthly" element={<MonthlyReport/>} />
            <Route exact path="/reports/quarterly" element={<QuarterlyReport/>} />
            <Route exact path="/reports/annual" element={<AnnualReport/>} />
            <Route exact path="/savings/deposit/:accountNumber" element={<DepositFunds/>} />
            <Route exact path="/savings/withdraw/:accountNumber" element={<WithdrawFunds/>} />
            <Route exact path="/savings/balance/:accountNumber" element={<AccountBalance/>} />
          </Routes>
        </Router>
      </Provider>
  );
};

export default App;
