/*
 * event-logger <http://gruntjs.com/event-logger>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');
var Emitter = require('events').EventEmitter;

/**
 * Create an instance of `EventLogger`
 *
 * @api public
 */

function EventLogger() {
  Emitter.call(this);
}
util.inherits(EventLogger, Emitter);

/**
 * Emit a log event.
 *
 * @param  {String} `name` the name of the log event to emit
 * @param  {String} `message` Message intended to be logged to the console.
 * @return {Object} `EventLogger` for chaining
 * @api public
 */

EventLogger.prototype.log = function (name, message) {
  this.emit(name, message);
  return this;
};

/**
 * Create a logger with the given `name`.
 *
 * @param  {String} `name` the name of the log event to emit
 * @return {Object} `EventLogger` for chaining
 * @api public
 */

EventLogger.prototype.create = function(name) {
  EventLogger.prototype[name] = function (message) {
    this.log(name, message);
  };
};

/**
 * Expose `EventLogger`
 */

module.exports = EventLogger;
