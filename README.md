User Management JavaScript Application:
  This application fetches user data from an API, displays it in a dynamic table and adds functionality to update and delete the users. 
  The table is created and manipulated completely using JavaScript API calls are made using Fetch API and async/awart

Features:
  Fetch user data from API.
  Dynamically create a table to display the user data Each row has an "Update' and 'Delete' button.
  "Update" prompts the user to enter new data and then updates the user on the server
  'Delete' will delete the user data from the server and the row from the table
  A "Add User" button is available on the top right corner.
  (It'd prompt to enter the Name, Department and Avatar URL of the user. This data would then be used to create a new user on the server.)

Code Structure:
  Singleton functionality is applied to the class.
  It follows Modular Design Pattern and OOPs concepts.
  No hard coding.
  It applies good coding practices using Modern JavaScript (ES6 and up).
  CSS Styling
  The table and buttons are styled with CSS to improve the appearance and user experience

Prerequisites:
  This application requires an API that supports the following endpoints:
  GET: To fetch users from the server.
  DELETE: To delete user data from the server.
  PATCH/PUT: To update user data on the server.
  POST: To add user data on the server.

Usage:
  Instantiate the 'UserTable' class with the API URL, and call 'renderTable' method on the instance
