var ChillyConfigurator = require('./chillyConfigurator');

var chilly = {};

chilly.resourceConfigurator = function( restifyServer) {
 return new ChillyConfigurator( restifyServer);
};

module.exports = chilly;