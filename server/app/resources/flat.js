var RestResource = require( '../restResource');

var FlatResource = RestResource.extend( {
  path: '/echo/:name',

  get: {
    handler: function( req, res, next) {
      res.send( req.params);
      return next();
    }
  }
});

module.exports = FlatResource;
