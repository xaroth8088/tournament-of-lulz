/***
	Loading Widget
	Show a loading spinner
***/
define(['require', './controller_loading', './view_loading'], function (require) {
	'use strict';
	return {
		'controller': require('./controller_loading'),
		'view': require('./view_loading')
	};
});
