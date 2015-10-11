var Table = require('./table');
var T = require('./types');

var test1 = new Table( 'test1', {
  columns: [
    {
      name: 'id',
      type: T.INTEGER,
      autoincrement: true,
      pk: true,
      index: true
    },
    {
      name: 'name',
      type: T.TEXT,
      pk: false,
      nullable: false
    },
    {
      name: 'test2_id',
      type: T.INTEGER,
      foreignKey: {
        table: 'test2',
        column: 'id'
      }
    }
  ]
});

var test2 = new Table( 'test2', {
  columns: [
    {
      name: 'id',
      type: T.INTEGER,
      autoincrement: true,
      pk: true,
      index: true
    },
    {
      name: 'name',
      type: T.TEXT,
      pk: false,
      nullable: false
    }
  ]
});

module.exports = [test1, test2];
