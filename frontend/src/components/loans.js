import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoans, deleteLoan } from "../actions/loanActions";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const LoanManagement = () => {
    const dispatch = useDispatch();
    const { loans, loading: loansLoading, error } = useSelector((state) => state.loanList);

    const baseUrl = process.env.REACT_APP_API_URL + "/api/loans"; // Ensure you replace with your API base URL

    let navigate = useNavigate();
    const { loanId } = useParams();
    const [loan, setLoan] = useState({
        loanType: "",
        amount: "",
        interestRate: "",
        status: "",
        account: "",
    });
    const [loanTypes, setLoanTypes] = useState([]);
    const [readOnly, setReadOnly] = useState(true);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loanTypesResponse = await axios.get(`${baseUrl}/types/`);
                setLoanTypes(loanTypesResponse.data);

                if (loanId) {
                    const loanResponse = await axios.get(`${baseUrl}/${loanId}/`);
                    setLoan(loanResponse.data);
                }
            } catch (error) {
                console.error("Error fetching loan data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [loanId]);

    useEffect(() => {
        dispatch(fetchLoans());
    }, [dispatch]);

    const handleChange = (e) => {
        setLoan({
            ...loan,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        setReadOnly(false);
        inputRef.current.focus();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this loan?")) {
            try {
                await axios.delete(`${baseUrl}/${id}/`);
                alert("Loan deleted successfully.");
                navigate("/loans");
                dispatch(deleteLoan(id));
            } catch (error) {
                console.error("Error deleting loan", error);
                alert("Failed to delete loan.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (loanId) {
                // Update loan
                await axios.put(`${baseUrl}/${loanId}/`, loan);
                alert("Loan updated successfully.");
            } else {
                // Create loan
                await axios.post(baseUrl, loan);
                alert("Loan created successfully.");
            }
            navigate("/loans");
        } catch (error) {
            console.error("Error saving loan", error);
            alert("Failed to save loan.");
        }
    };

    if (loansLoading || loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container m-auto row mt-5 d-flex align-items-center col-lg-6">
            <div className="col-8">
                <h1 className="text-start">Loan Management</h1>
            </div>
            <div className="col-4 text-end">
                {!readOnly && (
                    <button className="btn btn-outline-primary" onClick={handleEdit}>
                        Edit
                    </button>
                )}
            </div>

            <div id="loan-form" className="row col-auto">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-12 mt-lg-3">
                        <label htmlFor="loanType" className="form-label">
                            Loan Type
                        </label>
                        <select
                            id="loanType"
                            className="form-select"
                            name="loanType"
                            value={loan.loanType}
                            onChange={handleChange}
                            disabled={readOnly}
                            ref={inputRef}
                        >
                            {loanTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name} - {type.interestRate}% interest
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 mt-lg-4">
                        <label htmlFor="amount" className="form-label">
                            Loan Amount
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            value={loan.amount}
                            onChange={handleChange}
                            readOnly={readOnly}
                        />
                    </div>
                    <div className="col-md-6 mt-lg-4">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="status"
                            name="status"
                            value={loan.status}
                            readOnly={true} // Status is set by admin, so it's read-only
                        />
                    </div>

                    <div className="col-12 my-4 mt-lg-5 d-flex justify-content-between">
                        <button type="submit" className="btn btn-outline-success">
                            {loanId ? "Update Loan" : "Create Loan"}
                        </button>
                        {loanId && (
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => handleDelete(loanId)}
                            >
                                Delete Loan
                            </button>
                        )}
                        <Link type="button" className="btn btn-outline-info" to="/loans">
                            Back to Loans
                        </Link>
                    </div>
                </form>
            </div>

            <h2 className="mt-5">Loans List</h2>
            <ul>
                {loans.map((loanItem) => (
                    <li key={loanItem.id}>
                        {loanItem.name}{" "}
                        <button onClick={() => handleDelete(loanItem.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LoanManagement;
