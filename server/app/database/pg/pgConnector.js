var pg = require('pg');
var Q = require('q');

module.exports = PgConnector;

function PgConnector(host, db, username, password, options) {
  this.host = host;
  this.db = db;
  this.username = username;
  this.password = password;
  this.connectionUrl = 'postgres://' + username + ':' + password +
                        '@' + host + '/' + db;
  console.log(this.connectionUrl);
}

PgConnector.prototype.connect = function() {
  var self = this;
  return Q.promise( function(resolve, reject, notify) {
    pg.connect( self.connectionUrl, function(error, client, done) {
      if( error) {
        reject( new Error( 'Error connecting to ' + self.connectionUrl));
      }else {
        resolve({client: client, done: done});
      }
    });
  });
}
