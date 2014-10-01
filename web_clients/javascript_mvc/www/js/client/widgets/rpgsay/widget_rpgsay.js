/***
	RPGSay Widget
	A fun way to show text
***/
define(['require', './controller_rpgsay', './view_rpgsay', './model_rpgsay'], function (require) {
	'use strict';
	return {
		'controller': require('./controller_rpgsay'),
		'view': require('./view_rpgsay'),
		'model': require('./model_rpgsay')
	};
});
