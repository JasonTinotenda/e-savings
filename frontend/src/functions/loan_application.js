import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';

const LoanApplication = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLoanApplications();
  }, []);

  const fetchLoanApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/loans/applications/');
      setLoanApplications(response.data);
    } catch (err) {
      setError('Error fetching loan applications.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/loans/applications/', { amount });
      setMessage('Loan application submitted successfully!');
      fetchLoanApplications(); // Refresh the list
      setAmount(''); // Clear the form
    } catch (err) {
      setError('Error submitting loan application.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center my-4">Loan Applications</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Card className="mb-4">
            <Card.Header as="h5">Submit New Application</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAmount">
                  <Form.Label>Loan Amount</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                    placeholder="Enter amount" 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Apply
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <h3 className="my-4">Your Applications</h3>
          {loanApplications.map((application) => (
            <Card key={application.id} className="mb-3">
              <Card.Body>
                <Card.Title>Application ID: {application.id}</Card.Title>
                <Card.Text>
                  <strong>Applicant:</strong> {application.applicant_name}<br />
                  <strong>Amount:</strong> ${application.amount}<br />
                  <strong>Status:</strong> {application.status}<br />
                  <strong>Date:</strong> {application.application_date}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default LoanApplication;
