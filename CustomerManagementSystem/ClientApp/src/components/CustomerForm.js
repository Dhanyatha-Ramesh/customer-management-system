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

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePhone = (phone) => {
        const phonePattern = /^\d{10}$/; // Example pattern for a 10-digit phone number
        return phonePattern.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for required fields
        const errors = {};
        if (!customer.firstName) errors.firstName = "First Name is required";
        if (!customer.lastName) errors.lastName = "Last Name is required";
        if (!customer.email) {
            errors.email = "Email is required";
        } else if (!validateEmail(customer.email)) {
            errors.email = "Invalid email format";
        }
        if (!customer.phone) {
            errors.phone = "Phone is required";
        } else if (!validatePhone(customer.phone)) {
            errors.phone = "Invalid phone format (10 digits required)";
        }
        if (!customer.address) errors.address = "Address is required";

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
                    <label htmlFor="firstName" className="form-label">First Name<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={customer.firstName} onChange={handleChange} style={{ width: '50%' }} />
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={customer.lastName} onChange={handleChange} style={{ width: '50%' }} />
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email<span className="text-danger">*</span></label>
                    <input type="email" className="form-control " id="email" name="email" value={customer.email} onChange={handleChange} style={{ width: '50%' }} />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone<span className="text-danger">*</span></label>
                    <input type="text" className="form-control " id="phone" name="phone" value={customer.phone} onChange={handleChange} style={{ width: '50%' }} />
                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address<span className="text-danger">*</span></label>
                    <input type="text" className="form-control " id="address" name="address" value={customer.address} onChange={handleChange} style={{ width: '50%' }} />
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
};

export default CustomerForm;
