# QA Framework

This project is used for API/front-end testing of applications. It uses _Cypress Framework_ in order to simulate API/front-end tests, as per test specifications.

## How to use

Clone this repository using a git client as a first step, and further run <code>npm install</code> in the project root directory.

### Running Locally

- run on Cypress Playground:in VSC terminal run: npx cypress open
- after Cypress Playground opened,click the test script to run:(for Exp) weightWatch.js

If you wish to run as a docker image:

Please note that if the environment variable _SPEC_FILE_LOC_ is unavailable during runtime, all the specifications in the folder _cypress/integration/_ will be considered for the test. Also, _SPEC_FILE_LOC_ is relative to the path _cypress/integration/_ (e.g. \*notification-service/\** would run all specifications in *cypress/integration/notification-service\*).

- Run <code>./gradlew buildAppDockerImage</code> to build the docker image
- Run <code>docker run -it -e SPEC_FILE_LOC=[ specificationFileLocation ][ dockerimageid ]</code>

**Note**: For the below two options, please ensure that the npm package for cypress 3.2.0 is installed globally. You may do so by running the command <code>npm install -g cypress@3.2.0</code>

If you wish to run using command line:

- Run <code>npx cypress run --spec [ specificationFileLocation ]</code> to run the test specification

If you wish to run using cypress GUI interface:

- Run <code>npx cypress open</code> from the project root directory, to open the cypress GUI interface.
- Click on the appropriate test suite to start the test.

#### Downgrade cypress to 3.2.0

- This framework dark theme feature works with cypress 3.2.0 so far,if you run npm install and cypress version above this will cause problem.
- Windows pc: delete the 3.4.0 folder in :/Users/<username>/Library/Caches/Cypress and delete the folder in </project>\node_modules\cypress.
- run: npm install cypress@3.2.0

#### Generate HTML Report

- Run <code>npm run combine-reports</code>.
- Run <code>npm run generate-report</code> to generate the _html_ report using the _json_ file in the _results_ directory.

**Note**: The html test report is stored in the directory _cypress/results_.

### Push Image to ECR

You may use the gradle task <code>pushAppDockerImage</code> to push the docker image to the repository configured in _build.gradle_ file, if you have the permissions to do so.

### Json-sever

**Install JSON Server**

- npm install -g json-server
  Create a db.json file with some data
  {
  "posts": [
  { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
  { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
  }
  **Start JSON Server**
- json-server --watch db.json
  Now if you go to http://localhost:3000/posts/1, you'll get
  { "id": 1, "title": "json-server", "author": "typicode" }
