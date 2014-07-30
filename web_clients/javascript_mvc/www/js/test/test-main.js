(function() {
	'use strict';

	var test_files, coverage_files;

	function pathToModule(path) {
		return path.replace(/^\/base\/js\//, '..\/').replace(/\.js$/, '');
	};

	// Configure require's paths
	require.config({
		baseUrl: '/base/js/vendor',

		paths: {
			jquery: 'jquery/jquery-2.1.1.min',
			squire: 'squire/Squire',
			client: '../client'
		}
	});

	// Ensure all client files are included for code coverage
	coverage_files = [];
	Object.keys(window.__karma__.files).forEach(function(file) {
		var regex;

		// Only pick up client files
		regex = /^\/base\/js\/client\//;
		if( !regex.test(file) ) {
			return;
		}

		// Don't pick up main.js - we only want the modules, not to actually start anything up.
		if( file === '/base/js/client/main.js' ) {
			return;
		}

		// Convert to a require path
		coverage_files.push(pathToModule(file));
	});

	// Actually get coverage to see the files
	require(coverage_files, function() {});


	// Find all test files to run in Jasmine
	test_files = [];

	Object.keys(window.__karma__.files).forEach(function(file) {
		var regex;

		regex = /_test\.js$/i;
		if (regex.test(file)) {
			// Normalize paths to RequireJS module names.
			test_files.push(pathToModule(file));
		}
	});

	// Kick off Jasmine
	// NOTE: this MUST NOT be run via deps+config, otherwise Squire will run the tests multiple times.
	require( test_files, window.__karma__.start );

})();
