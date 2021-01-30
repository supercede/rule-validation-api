const request = require('supertest');
const app = require('../../index');

const server = request(app);

module.exports = server;
