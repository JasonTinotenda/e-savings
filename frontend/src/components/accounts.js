import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccount, createAccount, updateAccount, deleteAccount } from '../actions/accountActions';

export default function AccountPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Accessing the Redux state and providing default values
    const { account = {}, loading, error } = useSelector((state) => state.account || {});

    const [localAccount, setLocalAccount] = useState({
        id: '',
        account_number: '',
        account_type: 'savings',
        balance: 0,
        person: {
            id: '',
            first_name: '',
            last_name: '',
            date_of_birth: '',
            email: '',
            phone_number: '',
            address: '',
        },
        person_id: '',
    });

    const [isEditMode, setIsEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchAccount(id));
        } else {
            setIsEditMode(true);
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (account && account.person) {
            setLocalAccount({
                ...account,
                person_id: account.person.id,
            });
            setIsEditMode(false);
        }
    }, [account]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('person.')) {
            const personField = name.split('.')[1];
            setLocalAccount((prevState) => ({
                ...prevState,
                person: {
                    ...prevState.person,
                    [personField]: value,
                },
            }));
        } else {
            setLocalAccount((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const accountData = {
            ...localAccount,
            person: undefined,
            person_id: localAccount.person_id,
        };

        if (id) {
            dispatch(updateAccount(id, accountData));
        } else {
            dispatch(createAccount(accountData));
        }
        navigate('/accounts');
    };

    const handleDelete = () => {
        dispatch(deleteAccount(id));
        navigate('/accounts');
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1>{id ? 'Edit Account' : 'Create Account'}</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="row g-3">
                {/* Form fields */}
                {/* Example field: */}
                <div className="col-12">
                    <label htmlFor="account_number">Account Number</label>
                    <input
                        type="text"
                        id="account_number"
                        name="account_number"
                        value={localAccount.account_number}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                {/* Other fields here */}
                {isEditMode && (
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            {id ? 'Update' : 'Create'} Account
                        </button>
                    </div>
                )}
                {!isEditMode && id && (
                    <div className="col-12">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsEditMode(true)}
                        >
                            Edit
                        </button>
                    </div>
                )}
                {id && (
                    <div className="col-12 mt-2">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleShowModal}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </form>
            <Link to="/accounts" className="btn btn-link mt-3">
                Back to Accounts
            </Link>

            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
