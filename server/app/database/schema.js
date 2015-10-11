var _ = require('underscore');

module.exports = Schema;

function Schema(tables) {
  this.tables = tables;
  var validateForeignKeys = _validateForeignKeys;
  var validated = validateForeignKeys( this.tables);

  if( !validated) {
    console.log( 'Error validating');
  }
}

Schema.prototype.getTable = function(name) {
  return _getTable(this.tables, name);
}

function _getTable( tables, name) {
  return _.find( tables, {name: name});
}

function _validateForeignKeys( tables) {
  var validated = true;
  var fkColumns = [];

  for( var i = 0; i < tables.length && validated; i++) {
    var table = tables[i];
    var tableForeignKeys = table.getForeignKeys();
    for( var j = 0; j < tableForeignKeys.length && validated; j++) {
      var column = tableForeignKeys[j];
      if( column.foreignKey.table !== table.name) {
        fkColumns.push( column);
      }else {
        validated = false;
      }
    }
  }

  if( !validated) {
    return validated;
  }
  for( var i = 0; i < fkColumns.length && validated; i++){
    var foreignKey = fkColumns[i].foreignKey;
    var table = _getTable( tables, foreignKey.table);
    if( table) {
      var referer = table.getColumn(foreignKey.column);
      if( referer === undefined || referer.type !== fkColumns[i].type) {
        validated = false;
      }
    }else {
      validated = false;
    }
  }
  return validated;
}
