'use strict'; // Enforces strict mode, which helps catch common coding errors

const express = require('express'); // Imports the Express framework

// App
const app = express(); // Creates an instance of an Express application

// Defines a route handler for GET requests to the /hello endpoint
app.get('/hello', (req, res) => {
  res.status(200).json({ // Sends a JSON response with a status code of 200 (OK)
    message: "Hello World!" // The response body contains a message property with the value 'Hello World!'
  });
});

module.exports = { app }; // Exports the app instance for use in other files (e.g., for testing)