/*
 * grunt-event-logger <http://gruntjs.com/grunt-event-logger>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');
var Emitter = require('events').EventEmitter;

function EventLogger() {
  Emitter.call(this);
  this.transforms = [];
}
util.inherits(EventLogger, Emitter);

EventLogger.prototype.transform = function(fn) {
  this.transforms.push(fn);
  return this;
};

EventLogger.prototype.emit = function () {
  var args = [].slice.call(arguments);
  this.transforms.forEach(function (fn) {
    fn.apply(this, args);
  }.bind(this));
  return Emitter.prototype.emit.apply(this, arguments);
};

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
