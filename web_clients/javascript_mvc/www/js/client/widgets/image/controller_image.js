/***
	Image Controller
	Responsible for handling the intro screen controls
***/
define(['require', 'jsclass/min/core', 'client/base/controller'], function (require) {
	'use strict';
	var Controller = require('client/base/controller');
	
	return new JS.Class(Controller, {
		'initialize': function(parent_controller, view, models) {
			this.callSuper(parent_controller, view, models);
		}
	});
});
