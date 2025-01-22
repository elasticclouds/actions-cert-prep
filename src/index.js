const { app } = require('./app'); // Importing the Express app from the app module

const PORT = 8080; // Defining the port number

app.listen(PORT, () => { // Starting the server on port 8080
  console.log(`Server is running on port ${PORT}`); // Logging a message when the server starts
});