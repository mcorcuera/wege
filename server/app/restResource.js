var common = require('./common');
var restify = require( 'restify');

module.exports = RestResource;

function RestResource() {
}

RestResource.authenticator = function( req, res, next) {

  return next();
};


RestResource.extend = common.extend;
