const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const ArrayColumns = require('../models/arrayColumns');

describe('Array of Columns model test', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri(), { dbName: 'verifyMASTER' });
  });

  afterAll(async () => mongoose.disconnect());

  it('Has a model', () => {
    expect(ArrayColumns).toBeDefined();
  });

  describe('Check a model array of columns', () => {
    it('Create array of columns', async () => {
      const arrayColumns = new ArrayColumns({ idColumns: ['123'] });
      await arrayColumns.save();

      const foundArrayColumns = await ArrayColumns.findOne({ id: arrayColumns._id });

      const expectedArrayColumns = ['123'];
      const actualArrayColumns = foundArrayColumns.idColumns;
      expect(expectedArrayColumns).toEqual(actualArrayColumns);
    });
  });
});
