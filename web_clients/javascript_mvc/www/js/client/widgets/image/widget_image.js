/***
	Image Widget
	Show one of the game's "image" objects.
***/
define(['require', './controller_image', './view_image'], function (require) {
	'use strict';
	return {
		'controller': require('./controller_image'),
		'view': require('./view_image')
	};
});
