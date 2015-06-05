var facade = require('grunt-legacy-log-facade');
var Log = require('grunt-legacy-log').Log;

function Grunt(options) {
  var log = new Log(options);
  this.log = facade.logMethodsToEvents();
  facade.logEventsToMethods(log, [this.log.event]);
}

var grunt = new Grunt({verbose: true});

grunt.log.header("Header line.");
grunt.log.subhead("Subhead line.");
grunt.log.write("Testing").write(" 123...").writeln("done!");
grunt.log.write("Verbose: ").verbose.write("YES").or.write("NO").always.write(", ");
grunt.log.notverbose.write("NO").or.write("YES").always.writeln("!");
grunt.log.warn("This is a warning.");
grunt.log.write("Doing something...").warn();
grunt.log.error("This is an error.");
grunt.log.write("Doing something...").error();
grunt.log.ok("This is ok.");
grunt.log.write("Doing something...").ok();
grunt.log.errorlns("This is a very long line in errorlns that should wrap eventually, given that it is a very long line.");
grunt.log.oklns("This is a very long line in oklns that should wrap eventually, given that it is a very long line.");
grunt.log.success("This is a success message.");
grunt.log.fail("This is a fail message.");
grunt.log.debug("This is a debug message.");

console.log()
console.log('VERBOSE: --------------------------------------')
console.log()

grunt.log.verbose.warn("This is a warning.");
grunt.log.verbose.write("Doing something...").warn();
grunt.log.verbose.error("This is an error.");
grunt.log.verbose.write("Doing something...").error();
grunt.log.verbose.ok("This is ok.");
grunt.log.verbose.write("Doing something...").ok();
grunt.log.verbose.errorlns("This is a very long line in errorlns that should wrap eventually, given that it is a very long line.");
grunt.log.verbose.oklns("This is a very long line in oklns that should wrap eventually, given that it is a very long line.");
grunt.log.verbose.success("This is a success message.");
grunt.log.verbose.fail("This is a fail message.");
grunt.log.verbose.debug("This is a debug message.");
