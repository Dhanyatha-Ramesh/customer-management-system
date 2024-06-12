import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCustomers, deleteCustomer } from '../services/api';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        const result = await getCustomers();
        setCustomers(result.data);
    };

    const handleDelete = async (id) => {
        await deleteCustomer(id);
        loadCustomers();
    };

    return (
        <div className="container mt-5">
            <h2>Customer Management System</h2>
            <br></br>
            <br></br>

            <Link to="/add" className="btn btn-primary mb-3">Add Customer</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={customer.customerId}>
                            <td>{index + 1}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>
                                <Link to={`/edit/${customer.customerId}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                                <button onClick={() => handleDelete(customer.customerId)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>  
           
            
        </div>
    );
};

export default CustomerList;
