var extend = require('extend');
var callsite = require('callsite');
var path = require('path');
var fs = require('fs');

module.exports = {
  requireFolder : _requireFolder,
  extend : _extend
};

function _requireFolder( folder) {
  var namespace = {};
  var requesterPath = path.dirname( callsite()[1].getFileName());
  var relativePath = requesterPath + '/' + folder;

  fs.readdirSync(relativePath).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        namespace[file.split('.')[0]] = require(relativePath + '/' + file);
    }
  });
  return namespace;
}
/**
  Handy extend function
*/
function _extend( protoProps) {
  var parent = this;
  var child = {};
  extend( child, parent, protoProps);
  return child;
}
