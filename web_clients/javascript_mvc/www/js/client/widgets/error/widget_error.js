/***
	Error Widget
	Displayed when something has gone wrong.
***/
define(['require', './controller_error', './view_error'], function (require) {
	'use strict';
	return {
		'controller': require('./controller_error'),
		'view': require('./view_error')
	};
});
