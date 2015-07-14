'use strict';

exports.loadType = function(mongoose) {
  var Iban = require('./iban-type')(mongoose);

  mongoose.Types.Iban = String;
  mongoose.SchemaTypes.Iban = Iban;

  return Iban;
}
