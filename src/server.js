const http = require('http');
const app = require('.');
require('dotenv').config();

const server = http.createServer(app);

const env = process.env.NODE_ENV;
const PORT = env === 'test' ? '11232' : process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.\nPress ctrl + c to stop`);
});
