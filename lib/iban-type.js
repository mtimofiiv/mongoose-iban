'use strict';

var IBANLib = require('iban');
var util = require('util');

module.exports = function(mongoose) {
  var Parent = mongoose.SchemaTypes.String;

  function Iban(path, options) {
    Parent.call(this, path, options);
  }

  util.inherits(Iban, Parent);

  Iban.prototype.cast = function(value) {
    if (typeof value === 'string') {
      return IBANLib.isValid(value) ? value : new Error('IBAN entered is invalid');
    } else {
      return new Error('An IBAN needs to be a string of numbers and letters');
    }
  };

  return Iban;
};
