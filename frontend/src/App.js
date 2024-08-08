import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoanApplication from './LoanApplication';
import LoanTracking from './LoanTracking';
import LoanRepayment from './LoanRepayment';
import RegisterMember from './RegisterMember';
import MemberProfile from './MemberProfile';
import MonthlyReport from './MonthlyReport';
import QuarterlyReport from './QuarterlyReport';
import AnnualReport from './AnnualReport';
import DepositFunds from './DepositFunds';
import WithdrawFunds from './WithdrawFunds';
import AccountBalance from './AccountBalance';

const App = () => {
  return (
    <Router>
      <Switch>
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
      </Switch>
    </Router>
  );
};

export default App;
