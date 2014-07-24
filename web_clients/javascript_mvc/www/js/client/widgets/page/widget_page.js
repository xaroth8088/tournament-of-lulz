/***
	Main Page Widget
	Responsible for organizing which "screen" is presented to the user.
***/
define(['require', './controller_page', './view_page', './model_page'], function (require) {
	'use strict';
	return {
		'controller': require('./controller_page'),
		'view': require('./view_page'),
		'model': require('./model_page')
	};
});
