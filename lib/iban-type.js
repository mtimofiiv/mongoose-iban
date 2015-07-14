'use strict';

var IBANLib = require('iban');

module.exports = function(mongoose) {
  var Parent = mongoose.SchemaTypes.String;

  function Iban(path, options) {
    Parent.call(this, path, options);

    function validateIban(value) {
      return IBANLib.isValid(value);
    }

    this.validate(validateIban, 'IBAN is invalid');
  }

  Iban.prototype.__proto__ = Parent.prototype;

  Iban.prototype.cast = function(value) {
    return value;
  };

  return Iban;
};
