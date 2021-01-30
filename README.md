# Rule-validation-api

A repository to validate a request data according to provided rules, created for the Flutterwave Fulltime Backend Developer Assessment.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f5781aa883d5f1486df9)

### Prerequisites

Install the following in your computer if you don't have them:

- [NodeJS](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop) (Optional)

### Technologies Used

- [NodeJS](https://nodejs.org/en/download/) - A cross-platform JavaScript runtime
- [ExpressJS](https://expressjs.com/) - NodeJS application framework

### Project Links

- [Hosted API](https://flw-validation-api.herokuapp.com)

- [API Documentation](https://documenter.getpostman.com/view/9950313/TW6xp8vH)

### Installing/Running locally

- Clone or fork repo

```bash
  - git clone https://github.com/supercede/rule-validation-api.git
  - cd rule-validation-api
```

- Create/configure `.env` environment with your credentials. A sample `.env.example` file has been provided. Make a duplicate of `.env.example` and rename to `.env`, then configure your credentials (ensure to provide the correct details)
- To run as a Docker container, run `docker build -t app-name` to build an image and `docker run -d -p computer-port:app-port app-name` to launch a container. Otherwise, run `npm install` and then `npm run dev` to start the server and watch for changes.

### Testing

Test specs are implemented using [_jest_](https://jestjs.io/).

- To test or consume the API locally, you can make use of [_Postman_](https://www.getpostman.com) to simulate a front-end client.
- There is also a test script that you can fire up by running `docker exec -it app-name npm run test` (or `npm run test`) which performs a single full test suite run.

## HTTP Requests

#### API Routes

| URI                         | HTTP Method | Description              |
| --------------------------- | ----------- | ------------------------ |
| <code>/</code>              | `GET`       | Fetch author Information |
| <code>/validate-rule</code> | `POST`      | Validate data            |

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `400` `Bad Request` Validation error/Malformed Request
- `404` `Not Found` Visited route not found
- `500` `Internal Server Error`An error occurred in the server

## Documentation

- [Postman](https://documenter.getpostman.com/view/9950313/TW6xp8vH)
