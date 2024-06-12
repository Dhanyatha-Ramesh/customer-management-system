import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Remove BrowserRouter as Router
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<CustomerList />} />
                <Route path="/add" element={<CustomerForm />} />
                <Route path="/edit/:id" element={<CustomerForm />} />
            </Routes>
        </div>
    );
}

export default App;
