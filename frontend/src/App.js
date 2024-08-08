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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/loans/application" component={LoanApplication} />
        <Route path="/loans/tracking" component={LoanTracking} />
        <Route path="/loans/repayment/:loanId" component={LoanRepayment} />
        <Route path="/members/register" component={RegisterMember} />
        <Route path="/members/profile/:memberId" component={MemberProfile} />
        <Route path="/reports/monthly" component={MonthlyReport} />
        <Route path="/reports/quarterly" component={QuarterlyReport} />
        <Route path="/reports/annual" component={AnnualReport} />
        <Route path="/savings/deposit/:accountNumber" component={DepositFunds} />
        <Route path="/savings/withdraw/:accountNumber" component={WithdrawFunds} />
        <Route path="/savings/balance/:accountNumber" component={AccountBalance} />
      </Routes>
    </Router>
  );
};

export default App;
