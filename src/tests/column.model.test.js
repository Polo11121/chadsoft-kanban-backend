const mongoose = require('mongoose');

const mongoBD = 'mongodb+srv://root:zdIruBZ6AVnv3jlr@chadsoftkanban.sepk7.mongodb.net/csk?retryWrites=true&w=majority';
mongoose.connect(mongoBD);

const Column = require('../models/column');

describe('User model test', () => {
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

  describe('Get column', () => {
    it('Gets a column', async () => {
      const column = new Column({ color: '#ccc', name: 'To do', numberOfTasks: 20 });
      await column.save();

      const foundColumn = await Column.findOne({ name: 'To do' });
      const expected = 'To do';
      const actual = foundColumn.name;
      expect(actual).toEqual(expected);
    });
  });

  describe('Save column', () => {
    it('Save a column', async () => {
      const column = new Column({ color: '#ccc', name: 'To do', numberOfTasks: 20 });
      const savedColumn = await column.save();

      const expected = 'To do';
      const actual = savedColumn.name;
      expect(actual).toEqual(expected);
    });
  });

  describe('Update column', () => {
    it('Update a column', async () => {
      const column = new Column({ color: '#ccc', name: 'To do', numberOfTasks: 20 });
      await column.save();

      column.name = 'Backlog';
      const updateColumn = await column.save();
      const expected = 'Backlog';
      const actual = updateColumn.name;
      expect(actual).toEqual(expected);
    });
  });
});
