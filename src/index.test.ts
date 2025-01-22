const request = require('supertest'); // Importing supertest to make HTTP requests
const { app } = require('./app'); // Importing the Express app from the app module

describe('/hello', () => { // Grouping tests related to the /hello endpoint
  it('returns `Hello World!`', async () => { // Defining a test case
    const data = await request(app).get('/hello'); // Making a GET request to /hello
    expect(data.statusCode).toBe(200); // Asserting that the response status code is 200
    expect(data.body.message).toBe('Hello World!'); // Asserting that the response body contains the message 'Hello World!'
  });
});