/***
	Main Page Controller
	Responsible for controlling which "screen" is shown to the user.
***/
define(['require', 'jsclass/min/core', '../../base/controller'], function (require) {
	'use strict';
	var Controller = require('../../base/controller');
	
	return new JS.Class(Controller, {
		'initialize': function(parent_controller, view) {
			this.callSuper();
		}
	});
});
