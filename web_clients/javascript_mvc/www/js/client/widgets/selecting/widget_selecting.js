/***
	Selecting Widget
	Gives the user two images in a match to pick a winner from
***/
define(['require', './controller_selecting', './view_selecting'], function (require) {
	'use strict';
	return {
		'controller': require('./controller_selecting'),
		'view': require('./view_selecting')
	};
});
