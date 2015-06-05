/**
 * TEMPORARY: this code will be moved!
 */

'use strict';

var EventLogger = require('..');

var modes = [
  'always',
  'notverbose',
  'verbose'
];

var methods = [
  'debug',
  'error',
  'errorlns',
  'fail',
  'header',
  'ok',
  'oklns',
  'subhead',
  'success',
  'warn',
  'write',
  'writeflags',
  'writeln',
  'writelns',
  'writetableln'
];

/**
 * Make all `grunt.log` methods event emitters.
 */

exports.logMethodsToEvents = function() {
  var logger = new EventLogger();
  logger.event = logger;
  logger.modes(modes);
  methods.forEach(logger.create.bind(logger));
  logger.operator('or', function() {
    if (this.previousMode === 'verbose') {
      return this.notverbose;
    }
    if (this.previousMode === 'notverbose') {
      return this.verbose;
    }
    return this.always;
  });
  return logger;
};

/**
 * Toggle listeners based on mode.
 */

exports.logEventsToMethods = function(log, emitters) {
  emitters.forEach(function(emitter) {
    methods.forEach(function(method) {
      function listener() {
        var namespace = emitter.mode ? log[emitter.mode] : log;
        namespace[method].apply(namespace, arguments);
      }
      emitter.off(method);
      emitter.on(method, listener);
    });
  });
};
