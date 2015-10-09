
var bunyan      = require('bunyan');
var restify     = require('restify');
var _           = require('underscore');
var common      = require('./common');
var resources   = common.requireFolder('./resources');

var METHODS = ['get', 'post', 'update', 'put'];

var server = restify.createServer( {
  name: 'WG REST API',
  version: '0.0.1',
  log: bunyan.createLogger( {name: 'wege-server'})
});

var log = server.log;
var baseUrl = '/api';
log.info( 'Configuring Restify server with at ' + baseUrl);

log.info( 'Registering resources');

for( var key in resources) {
  var resource = resources[key];
  var defaultAuthenticator = resource.authenticator;
  METHODS.forEach( registerResourceMethod(resource, defaultAuthenticator));
}

log.info( 'Configuration finished');

server.listen( 8080, function() {
  log.info( '%s listening at %s', server.name, server.url);
});

function registerResourceMethod( resource, defaultAuthenticator) {
  return function( method) {
    if( resource.hasOwnProperty( method)){
      var resourceMethod = resource[method];
      var handler;
      var authenticator;
      if( _.isFunction( resourceMethod)) {
        handler = resourceMethod;
      }else {
        handler = resourceMethod.handler;
        authenticator = defaultAuthenticator || resourceMethod.authenticator;
      }
      server[method]( baseUrl + resource.path,
                      defaultAuthenticator || authenticator,
                      handler);
      log.info( 'Registered ' + method + ' for ' + resource.path);
    }
  };
}
