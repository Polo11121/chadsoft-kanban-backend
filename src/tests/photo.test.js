const request = require('supertest');
const app = require('../app');

describe('Photos endpoint', () => {
  test('should return hello world object', async () => {
    const response = await request(app).get('/api/test');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('pass!');
  });
});
