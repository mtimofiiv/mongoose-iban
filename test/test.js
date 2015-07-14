'use strict';

var expect = require('chai').expect;

var mongoose = require('mongoose');
require('mockgoose')(mongoose);
mongoose.connect('mongodb://localhost/test');

var IbanModule = require('../index.js');
var IbanType = IbanModule.loadType(mongoose);

var Schema = mongoose.Schema;

describe('Module loads in a new type', function() {
  it('#loadType() function exists', function() {
    expect(IbanModule.loadType).to.be.a('function');
  });

  it('mongoose.Schema.Types now has an `Iban` type', function() {
    expect(Schema.Types).to.have.property('Iban');
  });
});

describe('On validation', function() {
  before(function(done) {
    mongoose.connect('mongodb://localhost/test');
    mongoose.connection.on('error', function(){});
    mongoose.connection.once('open', done);
  });

  after(function() {
    mongoose.connection.close();
  });

  var Iban = Schema.Types.Iban;
  var SampleSchema = new Schema({ iban: { type: Iban } });
  var SampleModel = mongoose.model('Sample', SampleSchema);

  it('throws an error when given a non-string', function() {
    var Model = new SampleModel({ iban: 22 });

    Model.save(function(err) {
      expect(err.errors.iban.message).to.equal('IBAN is invalid');
    });
  });

  it('throws an error when given an invalid IBAN', function() {
    var Model = new SampleModel({ iban: 'NLfff' });

    Model.save(function(err) {
      expect(err.errors.iban.message).to.equal('IBAN is invalid');
    });
  });

  it('does not complain when a proper IBAN is given', function() {
    var Model = new SampleModel({ iban: 'NL39 RABO 0300 0652 64' });

    Model.save(function(err) {
      expect(err).to.be.null;
    });
  });

  it('stores the proper IBAN value without any validation errors', function() {
    var Model = new SampleModel({ iban: 'NL39 RABO 0300 0652 64' });

    Model.save(function(err) {
      expect(err).to.be.null;
    });
  });
});

describe('On save', function() {
  before(function(done) {
		mongoose.connect('mongodb://localhost/test');
		mongoose.connection.on('error', function(){});
		mongoose.connection.once('open', done);
	});

	after(function() {
		mongoose.connection.close();
	});
});
