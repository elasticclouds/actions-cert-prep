# Implementing Continuous Integration for Node.js Apps with GitHub Actions

Have you been building and deploying apps without putting Continuous Integration(CI) in place? Well, this is a sign to turn a new leaf.

As a developer, it is important to make sure that high-quality code is shipped at all times. As a result, CI is a must-have practice. It may drastically shorten the time it takes to deploy new features and updates while also boosting the software's integrity and stability.

In this article, we'll explore how to add Continuous Integration to a Node.js project with GitHub Actions.

### What exactly is Continuous Integration?
Continuous integration (CI) is the process of automatically building and testing code changes as soon as they are committed to the repository. This helps catch errors and bugs early on in the development process before they can cause bigger issues down the line.
Gitlab's Article on CI/CD sheds more light on this topic.

The following are some reasons why it's essential to use CI in software applications:

It provides faster feedback on code changes, allowing for issues to be caught and fixed earlier in the development process.
It improves the reliability of products by catching errors and bugs before they reach production.
It improves security by automatically running security tests and scans as part of the development process.

### What is GitHub Actions?
GitHub Actions provides a platform for automating software workflows, including Continuous Integration. It allows developers to create custom workflows that automate various tasks, including building, testing, and deploying code changes. These workflows are defined in YAML files and can be triggered by events such as code pushes, pull requests, and issue comments.

Some of the key features of GitHub Actions include:

Easy integration with GitHub repositories
Support for a wide range of programming languages and frameworks
Ability to run workflows on different operating systems and virtual environments
Support for custom actions and third-party integrations
Detailed logs and reporting to help diagnose issues and track progress

### Prerequisites
To follow through in this article, we need the following installed on our computer:

Node.js SDK
Git

### Creating our Node.js App
To demonstrate how to add Continuous Integration with GitHub Actions, we'll create a simple Node.js application. To do this, we'll follow these steps:

Initialize a Node.js project locally.
```
$ mkdir gh-actions-demo
$ cd gh-actions-demo
```
Initialize as a Node.js project and add necessary .dependencies
```
$ npm init
$ npm i express
$ npm i --save-dev jest supertest
Add/replace the following snippet in the package.json file.
  "scripts": {
    "test": "jest",
    "start": "node src/index.js"
  },
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": [
      "/node_modules/"
    ]
  },
  ```
Create a repository on GitHub.
New GitHub Repository

Link the local project to the GitHub repository
```
$ echo "# <REPOSITORY_NAME>" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPOSITORY_NAME>.git
git push -u origin main
```
Next, we'll be adding the following four files to the project.

src/app.js
This is the app object. We have separated it to be able to test it properly.

```
'use strict';
const express = require('express');

// App
const app = express();
app.get('/hello', (req, res) => {
  res.status(200).json({
    message: "Hello World!"
  });
});


module.exports = { app };
```

src/index.js
This is the entry point of the app. The server will be housed here.

```
const { app } = require('./app');

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
```

src/index.test.ts
This file contains a test. The purpose of this test is to make sure that our app works as it should.

```
const request = require('supertest');
const { app } = require('./app');

describe('/hello', () => {
  it('returns `Hello World!`', async () => {
    const data = await request(app).get('/hello');
    expect(data.statusCode).toBe(200);
    expect(data.body.message).toBe('Hello World!');
  });
});
```

.gitignore
Now we don't want to spend the whole day uploading node_modules to GitHub, do we? I didn't think so.

node_modules
We can also test that the app works by running npm start and/or npm test.

### Setting up GitHub Actions for our Node.js project
Now that we have our Node.js app, we can add GitHub Actions to our project. We'll create a new YAML file in the .github/workflows directory to define our workflow. Our workflow will consist of two jobs: building and testing our code and deploying our app to a staging environment.
To set up CI/CD for a Node.js project using GitHub Actions, follow these steps:

Create a .github/workflows directory in the project's root directory.
$ mkdir .github/workflows
Next, create main.yaml, a YAML file in the workflows directory to define the workflow. This workflow will specify the steps for building, testing, and deploying our code changes.

```
main.yml
name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js 14
      uses: actions/setup-node@v3
      with:
        node-version: 14
        cache: 'npm'

    - run: npm install
    - run: npm test
```
    
This workflow gets initiated whenever pull requests or commits are made to the main branch. It could also be modified to include more branches, or if the workflows for other branches are different, then we can create separate YAML files.

Push changes to GitHub to trigger the workflow. If all goes well, the workflow should run successfully. A green checkmark should appear beside the commit message on GitHub as shown below:
Workflow success

### Adding a workflow status badge
The next course of action is to add a workflow status badge to our repository. This can be done by adding the following link to our README.md:

If done properly, this adds a little badge to our README.md, like the one below:

| WorkFlow Name | Status |
|---------------|--------|
| Main Workflow | ![Main Workflow](https://github.com/elasticclouds/actions-cert-prep/actions/workflows/main.yml/badge.svg) |
| Create Workflow | ![Main Workflow](https://github.com/elasticclouds/actions-cert-prep/actions/workflows/main.yml/badge.svg) |
| Create Workflow | ![Main Workflow](https://github.com/elasticclouds/actions-cert-prep/actions/workflows/main.yml/badge.svg) |
| Create Workflow | ![Main Workflow](https://github.com/elasticclouds/actions-cert-prep/actions/workflows/main.yml/badge.svg) |
| Create Workflow | ![Main Workflow](https://github.com/elasticclouds/actions-cert-prep/actions/workflows/main.yml/badge.svg) |
| Create Workflow | ![Main Workflow](https://github.com/elasticclouds/actions-cert-prep/actions/workflows/main.yml/badge.svg) |
| Create Workflow | ![Main Workflow](https://github.com/elasticclouds/actions-cert-prep/actions/workflows/main.yml/badge.svg) |


### Conclusion
Implementing Continuous Integration for Node.js apps with GitHub Actions can help streamline development workflows, reduce errors, and increase efficiency.

With the steps outlined in this article, we can easily set up a basic CI pipeline for our Node.js app, automating our testing process and ensuring that our code is always up to par.

By using GitHub Actions, we can focus on writing high-quality code while the platform takes care of the rest. I hope I've been able to convince you to turn a new leaf today! 
