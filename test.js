'use strict';

/* deps: mocha */
var assert = require('assert');
var EventLogger = require('./');
var logger;

describe('event logger', function () {
  beforeEach(function () {
    logger = new EventLogger();
  });

  describe.only('.log()', function () {
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

  describe.only('.create()', function () {
    it('should add a custom log method to the EventLogger prototype:', function () {
      logger.create('info');
      assert.equal('info' in logger, true);
      assert.equal('foo' in logger, false);
      logger.create('foo');
      assert.equal('foo' in logger, true);
    });
  });
});
