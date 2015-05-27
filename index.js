/*
 * event-logger <http://gruntjs.com/event-logger>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');
var Emitter = require('events').EventEmitter;

function EventLogger() {
  Emitter.call(this);
}
util.inherits(EventLogger, Emitter);

EventLogger.prototype.log = function (name, message, context) {
  this.emit(name, message, context);
  return this;
};

EventLogger.prototype.create = function(name) {
  EventLogger.prototype[name] = function (message, context) {
    this.log(name, message, context);
  };
};

/**
 * Expose `EventLogger`
 */

module.exports = EventLogger;
