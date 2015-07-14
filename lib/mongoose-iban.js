'use strict';

exports.loadType = function(mongoose) {
  var Iban = require('./iban-type')(mongoose);

  mongoose.Types.Iban = Iban;
  mongoose.SchemaTypes.Iban = Iban;
   
  return Iban;
}
