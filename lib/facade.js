/**
 * TEMPORARY: this code will be moved!
 */

'use strict';

var EventLogger = require('..');

var defaultModes = [
  'always',
  'notverbose',
  'verbose'
];

var defaultMethods = [
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

exports.logMethodsToEvents = function(methods, modes) {
  methods = methods || defaultMethods;
  modes = modes || defaultModes;
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
    var keys = Object.keys(emitter.methods);
    keys.forEach(function(method) {
      function listener(mode) {
        var args = [].slice.call(arguments, 1);
        var namespace = mode ? log[mode] : log;
        namespace[method].apply(namespace, args);
      }
      emitter.off(method);
      emitter.on(method, listener);
    });
  });
};
