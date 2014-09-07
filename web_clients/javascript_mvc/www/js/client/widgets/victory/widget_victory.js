/***
	Victory Widget
	A brief celebration of the ultimate tournament winner
***/
define(['require', './controller_victory', './view_victory'], function (require) {
	'use strict';
	return {
		'controller': require('./controller_victory'),
		'view': require('./view_victory')
	};
});
