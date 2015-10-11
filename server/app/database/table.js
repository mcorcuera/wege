var T = require('./types');
var _ = require('underscore');

module.exports = Table;

function Table( name, config) {
  this.name = name;
  this.columns = [];

  if( config) {
    if( _.isArray( config.columns)) {
      config.columns.forEach( _addColumn(this.columns));
    }
  }else{
    console.error('Mierdon. TODO throw error');
  }
}

Table.prototype.containsColumn = function( name) {
  return this.getColumn(name) !== undefined;
}

Table.prototype.getColumn = function (name) {
  _.find( this.columns, {name: name});
}

Table.prototype.getForeignKeys = function() {
  return _.filter( this.columns, function(column) {
    return column.foreignKey !== undefined;
  });
}

function _validateColumn( column) {
  return _.isString( column.name) && _.contains(T, column.type);
}

function _addColumn( columns) {

  return function( column) {
    if( _validateColumn(column)) {
      _.defaults( column, columnDefaults);
      columns.push(column);
    }else{
      console.error('Invalid column', column);
    }
  };
}

var columnDefaults = {
  index: false,
  autoincrement: false,
  pk: false,
  nullable: true
};
