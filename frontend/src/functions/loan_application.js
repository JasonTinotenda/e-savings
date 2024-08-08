import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanApplicationListCreateView = () => {
    const [applications, setApplications] = useState([]);
    const [formData, setFormData] = useState({
        amount: '',
        status: 'Pending', // Default status
    });
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        axios.get('/api/loan-applications/')
            .then(response => setApplications(response.data))
            .catch(error => console.error(error));
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simple validation
        const newErrors = {};
        if (!formData.amount) newErrors.amount = 'Amount is required';
        if (isNaN(formData.amount) || Number(formData.amount) <= 0) newErrors.amount = 'Amount must be a positive number';
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length > 0) return;
        
        axios.post('/api/loan-applications/', formData)
            .then(response => {
                setApplications([...applications, response.data]);
                setFormData({
                    amount: '',
                    status: 'Pending',
                });
                setErrors({});
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Loan Applications</h1>
            
            {/* List of existing loan applications */}
            <ul>
                {applications.map(app => (
                    <li key={app.id}>
                        Application ID: {app.id} - Amount: ${app.amount} - Status: {app.status} - Application Date: {app.application_date}
                    </li>
                ))}
            </ul>
            
            {/* Form to create a new loan application */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        step="0.01" // For decimal input
                    />
                    {errors.amount && <p>{errors.amount}</p>}
                </div>
                
                <div>
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LoanApplicationListCreateView;
