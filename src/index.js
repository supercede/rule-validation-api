const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use('/', routes);

app.get('/', (request, response) => {
  response.status(200).json({
    status: 'success',
    message: 'Welcome',
  });
});

app.all('*', (request, response) => {
  response.status(404).json({
    message: 'Route not found.',
    status: 'error',
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}. \nPress ctrl + c to stop`);
});
