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
        <Route path="/loans/application" element={<LoanApplication/>} />
        <Route path="/loans/tracking" element={<LoanTracking/>} />
        <Route path="/loans/repayment/:loanId" element={<LoanRepayment/>} />
        <Route path="/members/register" element={<RegisterMember/>} />
        <Route path="/members/profile/:memberId" element={<MemberProfile/>} />
        <Route path="/reports/monthly" element={<MonthlyReport/>} />
        <Route path="/reports/quarterly" element={<QuarterlyReport/>} />
        <Route path="/reports/annual" element={<AnnualReport/>} />
        <Route path="/savings/deposit/:accountNumber" element={<DepositFunds/>} />
        <Route path="/savings/withdraw/:accountNumber" element={<WithdrawFunds/>} />
        <Route path="/savings/balance/:accountNumber" element={<AccountBalance/>} />
      </Routes>
    </Router>
  );
};

export default App;
