'use strict';

/* deps: mocha */
var assert = require('assert');
var EventLogger = require('./');
var logger;

describe('event logger', function () {
  beforeEach(function () {
    logger = new EventLogger();
  });

  describe('.log()', function () {
    it('should log an event:', function () {
      var i = 0;
      logger.on('a', function (msg) {
        i++;
        assert.equal(msg, 'this is foo.');
      });

      logger.log('a', 'this is foo.');
      assert.equal(i, 1);
    });
  });

  describe('.create()', function () {
    it('should add a custom log method to the EventLogger prototype:', function () {
      logger.create('info');
      assert.equal('info' in logger, true);
      assert.equal('foo' in logger, false);
      logger.create('foo');
      assert.equal('foo' in logger, true);
    });
  });

  describe('.transform()', function () {
    it('should run transform functions on events:', function () {
      logger.transform(function (name, msg) {
        console.log(msg);
      });

      logger.on('a', function (msg) {
        assert.equal(msg, 'this is foo.');
      });

      logger.on('b', function (msg) {
        assert.equal(msg, 'this is bar.');
      });

      logger.log('a', 'this is foo.', {x: 'y'});
      logger.log('b', 'this is bar.', {x: 'y'});
    });
  });
});
