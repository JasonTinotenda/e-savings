import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './hocs/Layout';
import PersonList from './components/PersonList'
import PersonDetail from './components/PersonDetail'
import AccountsList from './components/AccountsList'
import AccountsDetail from './components/AccountsDetail'
import TransactionList from './components/TransactionList'
import TransactionDetail from './components/TransactionDetail'

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/reset-password' element={<ResetPassword/>} />
                    <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
                    <Route exact path='/person-list' element={<PersonList/>} />
                    <Route exact path='/person-detail/:id' element={<PersonDetail/>} />
                    <Route exact path='/accounts-list' element={<AccountsList/>} />
                    <Route exact path='/accounts-detail/:id' element={<AccountsDetail/>} />
                    <Route exact path='/transaction-list' element={<TransactionList/>} />
                    <Route exact path='/transaction-detail/:id' element={<TransactionDetail/>} />
                </Routes>
            </Layout>
        </Router>
    </Provider>
);

export default App;