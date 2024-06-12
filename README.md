Customer Management System

Overview
The Customer Management System is a web application designed to manage customer data efficiently. It provides functionalities to add, edit, and delete customer records, as well as view a list of existing customers.

Setup Instructions
Follow these steps to set up the Customer Management System:

Clone the Repository:

bash
Copy code
git clone (https://github.com/Dhanyatha-Ramesh/customer-management-system.git)

Install Dependencies:

bash
Copy code
cd CustomerManagementSystem
npm install

Run the Application:

sql
Copy code
npm start

Accessing the Application
-------------------------

Before accessing the Customer Management System, ensure that the backend server is running. If you haven't set up the backend server yet, please follow the setup instructions provided in the backend repository.

Once the backend server is running, you can access the application by following these steps:

1. Open your web browser.
2. Navigate to https://localhost:7190 to access the Customer Management System.

Note: If there are any additional configurations or environment variables required for the backend server, make sure to set them up as per the backend setup instructions.

API Endpoints
The Customer Management System communicates with a backend server via RESTful API endpoints. Below are the available endpoints:

1.GET /api/customers

Description: Retrieve a list of all customers.
Method: GET
Endpoint: /api/customers

2.GET /api/customers/{id}

Description: Retrieve details of a specific customer by ID.
Method: GET
Endpoint: /api/customers/{id}

3.POST /api/customers

Description: Create a new customer record.
Method: POST
Endpoint: /api/customers
Request Body: JSON object representing the customer data.

4.PUT /api/customers/{id}

Description: Update an existing customer record by ID.
Method: PUT
Endpoint: /api/customers/{id}
Request Body: JSON object representing the updated customer data.
DELETE /api/customers/{id}

Description: Delete a customer record by ID.

5.Method: DELETE
Endpoint: /api/customers/{id}


Technologies Used

Frontend:

React.js
Axios for HTTP requests
Jest and React Testing Library for testing

Backend:

Asp.net core MVC
Testing:

Xunit for web API testing
