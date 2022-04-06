const mongoose = require('mongoose');

const request = require('supertest');
const app = require('../bootstrap');

const Column = require('../models/column');

describe('Column test', () => {
  beforeAll(async () => {
    await Column.deleteMany({});
  });

  afterEach(async () => {
    await Column.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Has a module', () => {
    expect(Column).toBeDefined();
  });

  it('Should save column to database', async (done) => {
    const res = await request(app).post('/api/columns').send({ color: '#ccc', name: 'To do', numberOfTasks: 20 });

    // Searches the user in the database
    const column = await Column.findOne({ name: 'To do' });

    done();
  });
});
