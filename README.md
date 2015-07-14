# mongoose-iban

Gives you the `Iban` type to use in your schemas, complete with validation using the excellent [arhs/iban](https://github.com/arhs/iban.js) library. An IBAN is a type of bank account number used extensively in Europe.

## Usage

Start with an `npm install --save mongoose-iban`

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-iban');

var Iban = mongoose.Types.Iban;

var BankAccountSchema = new Schema({
  accountNumber: { type: Iban }
});

var BankAccountModel = mongoose.model('BankAccount', BankAccountSchema);

var bankAccount = new BankAccountModel({
  accountNumber: 'NL39 RABO 0300 0652 64'
});
```

This type will validate the entry and return an error if a wrong value is given.
