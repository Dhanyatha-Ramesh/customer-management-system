// src/setupTests.js
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a new instance of the mock adapter for axios
const mock = new MockAdapter(axios, { delayResponse: 200 });

// Mock any GET request to the customers API endpoint
mock.onGet('https://localhost:7190/api/customers').reply(200, {
    customers: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
    ]
});

// Mock any other requests as necessary
