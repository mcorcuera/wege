var Q = require('q');
var pg = require('pg');
var PgT = require('./pgTypes');
var QRunner = require('./pgQuery');

var _ = require('underscore');
module.exports = PgTableManager;

function PgTableManager(connector) {
  this.connector = connector;
}

PgTableManager.prototype.updateSchema = function(tables) {
  var self = this;
  return this.connector.connect()
  .then( function(result) {
    self.runner = new QRunner(result.client, result.done);
    return self.runner;
  })
  .then( function( runner) {
    return _getTableNames(runner);
  })
  .then( function(result){
    var promises = [];
    var existingTables = _.filter(tables, function( table) {
      return _.findWhere( result, {name: table.name});
    });

    var newTables = _.filter(tables, function( table) {
      return !_.findWhere( result, {name: table.name});
    });

    _.each(newTables, function( table) {
      promises.push( self.createTable(table));
    });

    return Q.all(promises);
  }).then( function() {
    self.runner.done();
    return;
  });
};

PgTableManager.prototype.updateTable = function( table) {

};

PgTableManager.prototype.createTable = function( table) {
  return this.runner.run( _getTableCerationQuery(table))
    .then( function( result) {
      return true;
    });
};

function _isUpdated(tableSpec, currentStatus) {
  return false;
}

function _getTableNames( runner) {
  return runner.run('select table_name as name from ' +
        'INFORMATION_SCHEMA.TABLES where table_schema = \'public\'')
    .then( function(result){
      console.log("Table names")
      return result.rows;

    });
}

function _getTableCerationQuery( table) {
  var columnQueries = [];
  table.columns.forEach( function( column) {
    columnQueries.push( _getColumnCreationQuery(column));
  });
  var query = 'CREATE TABLE ' + table.name + '(';
  query += columnQueries.join(',');
  query += ')';

  return query;
}

function _getColumnCreationQuery(column) {
  console.log( 'Add column', column);
  var terms = [];
  terms.push( column.name);
  terms.push( PgT[column.type]);
  if( column.pk){
    terms.push( 'PRIMARY KEY');
  }
  if(!column.nullable) {
    console.log(column.nullable);
  }

  return terms.join(' ');
}
