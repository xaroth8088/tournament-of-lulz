/***
	InGame Screen Widget
	Manages in-game state
***/
define(['require', './controller_screen_in_game', './view_screen_in_game'], function (require) {
	'use strict';
	return {
		'controller': require('./controller_screen_in_game'),
		'view': require('./view_screen_in_game')
	};
});
