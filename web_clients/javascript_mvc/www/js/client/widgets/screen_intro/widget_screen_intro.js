/***
	Intro Screen Widget
	Shows the top 10 images, and presents "start tournament" functionality
***/
define(['require', './controller_screen_intro', './view_screen_intro'], function (require) {
	'use strict';
	return {
		'controller': require('./controller_screen_intro'),
		'view': require('./view_screen_intro')
	};
});
