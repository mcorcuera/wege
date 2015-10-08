var expect = require("chai").expect;
var fs  = require('fs');
var common = require("../app/common.js");

describe("common", function() {
   describe(".extend()", function() {
       it("should copy parent properties into child's", function(){
           var Parent = function() {
           }
           Parent.value = 'parent';

           Parent.extend = common.extend;
           var Child = Parent.extend();

           expect( Child.value).to.equals('parent');
       }),
       it("should override parent properties with provided ones", function(){
           var Parent = function() {
           }
           Parent.value = 'parent';

           Parent.extend = common.extend;
           var Child = Parent.extend({value: 'child'});

           expect( Child.value).to.equals('child');
       })
   }),
   describe(".requireFolder()", function() {
       it("should load files relative to caller script", function(){
           var modules = common.requireFolder('testResources');
           expect(modules.a).to.equals('OK');
       }),
       it("should load all files in folder", function(){
          var modules = common.requireFolder('testResources');
          expect(modules.a).to.equals('OK');
          expect(modules.b).to.equals('OK');
       })
    })
});
