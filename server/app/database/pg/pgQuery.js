var Q = require('q');

module.exports = PgQueryRunner;

function PgQueryRunner(client, done) {
  this.client = client;
  this.done = done;
}

PgQueryRunner.prototype.run = function(query) {
  var self = this;
  return Q.Promise( function(resolve, reject, notify){
    self.client.query( query, function( error, result) {
      if(error){
        reject( new Error( 'Error making query ' + query + ':' + error));
      } else {
        resolve( result);
      }
    });
  });
};

PgQueryRunner.prototype.done = function() {
  return this.done();
}
