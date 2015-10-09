var util = require('util');

module.exports = ChillyConfigurator;

function ChillyConfigurator( restifyServer) {
  this.restifyServer = restifyServer;
}

ChillyConfigurator.prototype.registerResources = function( resources) {
  if( !util.isArray( resources)) {
    resources = [resources];
  }
};
