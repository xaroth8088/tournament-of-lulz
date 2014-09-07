/***
	Bracket Widget
	Show off the current position in the tournament
***/
define(['require', './controller_bracket', './view_bracket'], function (require) {
	'use strict';
	return {
		'controller': require('./controller_bracket'),
		'view': require('./view_bracket')
	};
});
