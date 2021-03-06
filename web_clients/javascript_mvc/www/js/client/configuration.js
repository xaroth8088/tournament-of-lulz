/***
	Configuration
	A frozen object that tracks configuration constants
***/
define(function () {
	'use strict';

	return Object.freeze({
		'AJAX_DEFAULTS': {
			'accepts': 'application/json',
			'cache': false,
			'dataType': 'json',
			'timeout': 5000
		},
		'INTRO_TOP_X_IMAGES_COUNT': 10
	});
});