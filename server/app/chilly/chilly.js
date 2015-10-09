var ChillyConfigurator = require('./chillyConfigurator');

var exports = module.exports = {};

var chilly = {};

chilly.resourceConfigurator = function( restifyServer) {
  var restifyServer = restify.createServer(options);
  return new ChillyConfigurator( restifyServer);
}
