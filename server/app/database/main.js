var pg = require('pg');
var conString = "postgres://wegeapi:wegeapi@localhost/wegeapi";
var tables = require('./tables');
var PgTableManager = require('./pg/tableManager');
var PgConnector = require('./pg/pgConnector');
var Schema = require('./schema');

var connector = new PgConnector('localhost', 'wegeapi', 'wegeapi', 'wegeapi');

var mngr = new PgTableManager( connector);
var wegeSchema = new Schema(tables);
/*
mngr.updateSchema(tables).then( function(){
  process.exit();
}, function(error) {
  console.log(error);
  process.exit();
});
*/
