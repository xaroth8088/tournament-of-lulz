/***
	Main Page Widget
	Responsible for organizing which "screen" is presented to the user.
***/
define(['require', './mock_controller', './mock_view', './mock_model'], function (require) {
	'use strict';
	return {
		'controller': require('./mock_controller'),
		'view': require('./mock_view'),
		'model': require('./mock_model')
	};
});
