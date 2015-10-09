var common = require('./common');

module.exports = RestResource;

function RestResource() {
}

RestResource.authenticator = function( req, res, next) {

  return next();
};


RestResource.extend = common.extend;
