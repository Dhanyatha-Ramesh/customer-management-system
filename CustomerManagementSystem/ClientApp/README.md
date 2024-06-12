Customer Management System
Overview
The Customer Management System is a web application designed to manage customer data efficiently. It provides functionalities to add, edit, and delete customer records, as well as view a list of existing customers.

Setup Instructions
Follow these steps to set up the Customer Management System:

Clone the Repository:

bash
Copy code
git clone <repository-url>
Install Dependencies:

bash
Copy code
cd CustomerManagementSystem
npm install
Run the Application:

sql
Copy code
npm start
Access the Application:
Open your web browser and navigate to https://localhost:7190 to access the Customer Management System.

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