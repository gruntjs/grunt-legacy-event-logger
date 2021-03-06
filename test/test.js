'use strict';

/* deps: mocha */
require('should');
var assert = require('assert');
var EventLogger = require('..');
var logger;

describe('event logger', function () {
  describe('.log()', function () {
    beforeEach(function () {
      logger = new EventLogger();
    });

    it('should create a logger event with the given name:', function () {
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
    beforeEach(function () {
      logger = new EventLogger();
    });

    it('should add a custom log method to the EventLogger prototype:', function () {
      assert.equal('info' in logger, false);
      logger.create('info');
      assert.equal('info' in logger, true);

      assert.equal('warn' in logger, false);
      logger.create('warn');
      assert.equal('warn' in logger, true);
    });

    it('should add methods to the `methods` object:', function () {
      logger.create('a');
      logger.create('b');
      logger.create('c');
      Object.keys(logger.methods).should.eql(['a', 'b', 'c']);
    });

    it('should set methods to the `methods` object:', function () {
      logger.create('warn');
      logger.warn = function () {
        return 'foo';
      };
      assert.equal(logger.warn(), 'foo');
    });

    it('should emit events for custom log methods:', function () {
      var i = 0;
      logger.create('info');
      logger.on('info', function(mode, msg) {
        i++;
        assert.equal(msg, 'foo');
      });
      logger.info('foo');
      assert.equal(i, 1);
    });
  });

  describe('.mode', function () {
    beforeEach(function () {
      logger = new EventLogger();
    });

    it('should add a logging mode:', function () {
      logger.modes('foo');
      logger.should.have.property('foo');
    });

    it('should add multiple logging modes:', function () {
      logger.modes(['a', 'b', 'c']);
      logger.should.have.properties('a', 'b', 'c');
    });

    it('should chain logging methods with logging modes:', function () {
      logger.create('write');
      logger.modes('verbose');

      var modes = [];
      logger.on('write', function(mode, message) {
        modes.push(mode);
        message.should.equal('this is verbose');
      });

      logger.verbose.write('this is verbose');
      modes.should.eql(['verbose']);
    });

    it('should add an array of logging modes:', function () {
      logger.create('write');
      logger.modes(['verbose', 'notverbose', 'always', 'foo']);
      var result = [];

      logger.on('write', function(mode) {
        result.push(mode);
      });

      logger.notverbose.write('this is verbose');
      logger.verbose.write('this is verbose');
      logger.always.write('this is verbose');
      logger.foo.write('this is verbose');
      result.should.eql(['notverbose', 'verbose', 'always', 'foo']);
    });
  });

  describe('operators', function () {
    beforeEach(function () {
      logger = new EventLogger();
    });

    it('should support custom operator functions as getters:', function () {
      var modes = [];
      logger.on('write', function(mode) {
        modes.push(mode);
      });
      logger.create('write');
      logger.modes(['verbose', 'notverbose', 'always']);
      logger.operator('or', function () {
        if (this.previousMode === 'verbose') {
          return this.notverbose;
        }
        if (this.previousMode === 'notverbose') {
          return this.verbose;
        }
        return this.always;
      });
      logger.verbose.write('this is verbose').or.write('this is notverbose');
      logger.always.write('this is always written');
      modes.should.eql(['verbose', 'notverbose', 'always']);
    });
  });
});
