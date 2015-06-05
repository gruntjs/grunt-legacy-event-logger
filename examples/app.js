// colors
var red = require('ansi-red');
var cyan = require('ansi-cyan');
var yellow = require('ansi-yellow');
var green = require('ansi-green');

// event logger
var EventLogger = require('../');

/**
 * Example application
 */

function App(options) {
  this.options = options || {};
  this.log = new EventLogger(this.options);
}

App.prototype.isDisabled = function(mode) {
  return this.log.mode === mode
    && this.log.mode !== null
    && this.options[mode] !== true;
};

App.prototype.write = function(mode, msg) {
  if (this.isDisabled(mode)) return;
  process.stdout.write(msg);
};

App.prototype.writeln = function(mode, msg) {
  if (this.isDisabled(mode)) return;
  console.log(msg);
};

App.prototype.info = function(mode, msg) {
  if (this.isDisabled(mode)) return;
  var args = [].slice.call(arguments, 2);
  msg = cyan(msg);
  console.log.apply(console, [msg].concat(args));
};

App.prototype.warn = function(mode, msg) {
  if (this.isDisabled(mode)) return;
  var args = [].slice.call(arguments, 2);
  msg = yellow(msg);
  console.log.apply(console, [msg].concat(args));
};

App.prototype.error = function(mode, msg) {
  if (this.isDisabled(mode)) return;
  var args = [].slice.call(arguments, 2);
  msg = red(msg);
  console.log.apply(console, [msg].concat(args));
};


/**
 * Example usage
 */

var app = new App({verbose: false});

// logger modes
app.log.modes(['always', 'verbose', 'notverbose']);

// logger methods
app.log.create('info');
app.log.create('warn');
app.log.create('error');
app.log.create('write');
app.log.create('writeln');

// setup listeners
Object.keys(app.log.methods).forEach(function (method) {
  app.log.on(method, app[method].bind(app));
});

// actual logging examples
app.log.info('this is info');
app.log.warn('this is warn');
app.log.error('this is error');
app.log.write('this is write');
app.log.writeln('this is writeln');

app.log.verbose.info('this is info');
app.log.verbose.warn('this is warn');
app.log.verbose.error('this is error');
app.log.verbose.write('this is write');
app.log.verbose.writeln('this is writeln');

