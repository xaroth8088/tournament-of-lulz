var allTestFiles = [];
var TEST_REGEXP = /_test\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\/js\//, '..\/').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  baseUrl: '/base/js/vendor',

  paths: {
    jquery: 'jquery/jquery-2.1.1.min',
    squire: 'squire/Squire',
    client: '../client'
  }
});

// Kick off Jasmine
// NOTE: this MUST NOT be run via deps+config, otherwise Squire will run the tests multiple times.
require( allTestFiles, window.__karma__.start );
