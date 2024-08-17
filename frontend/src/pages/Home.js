import React from 'react';
import { Link } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-5">
      <h1>Welcome to the Dashboard</h1>
      <ListGroup>
        <ListGroup.Item>
          <Link to="/persons">Persons List</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/persons">Persons List</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/account-list">Accounts List</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/transaction-types">Transaction Types</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/loan-types">Loan Types</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/loans">Loans List</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/create-loan">Create Loan</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/create-repayment/1">Create Repayment</Link> {/* Adjust loanId as needed */}
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/approve-loan/1">Approve Loan</Link> {/* Adjust loanId as needed */}
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default Home;
