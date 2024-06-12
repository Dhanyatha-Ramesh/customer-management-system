import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerById, createCustomer, updateCustomer } from '../services/api';

const CustomerForm = () => {
    const [customer, setCustomer] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '' });
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate(); // Using useNavigate hook for navigation

    useEffect(() => {
        if (id) {
            loadCustomer();
        }
    }, [id]);

    const loadCustomer = async () => {
        const result = await getCustomerById(id);
        setCustomer(result.data);
    };

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address'];
        const errors = {};
        requiredFields.forEach(field => {
            if (!customer[field]) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });
        setErrors(errors);

        // If there are no errors, proceed with form submission
        if (Object.keys(errors).length === 0) {
            if (id) {
                await updateCustomer(id, customer);
            } else {
                await createCustomer(customer);
            }
            navigate('/'); // Using navigate function to redirect to the home page
        }
    };

    return (
        <div className="container mt-5">
            <h2>{id ? 'Edit' : 'Add'} Customer</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control col-md-4" id="firstName" name="firstName" value={customer.firstName} onChange={handleChange} />
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control col-md-4" id="lastName" name="lastName" value={customer.lastName} onChange={handleChange} />
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control col-md-4" id="email" name="email" value={customer.email} onChange={handleChange} />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control col-md-4" id="phone" name="phone" value={customer.phone} onChange={handleChange} />
                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control col-md-4" id="address" name="address" value={customer.address} onChange={handleChange} />
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );

};

export default CustomerForm;
