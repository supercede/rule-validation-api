const app = require('../..');
const server = require('./setup');

describe('App setup and home route', () => {
  test('app should be a function', () => {
    expect(app).toEqual(expect.any(Function));
  });

  test('should return success on home route request', async () => {
    const response = await server.get('/');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'My Rule-Validation API');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('name', 'Sijuade Ajagunna');
    expect(Object.keys(response.body.data)).toEqual(
      expect.arrayContaining(['email', 'github', 'mobile', 'twitter'])
    );
  });

  test('error if an invalid route is requested', async (done) => {
    const response = await server.get('/invalid');

    expect(response.status).toBe(404);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('route not found.');
    done();
  });

  test('custom error if invalid JSON data is sent', async () => {
    const response = await server
      .post('/validate-rule')
      .send('{"invalid"}')
      .type('json');

    expect(400);
    expect(response.body).toEqual({
      message: 'Invalid JSON payload passed.',
      status: 'error',
      data: null,
    });
  });
});
