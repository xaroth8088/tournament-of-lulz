/***
	Image Controller
	Responsible for handling the intro screen controls
***/
define(['require', 'jsclass/min/core', '../../base/controller'], function (require) {
	'use strict';
	var Controller = require('../../base/controller');
	
	return new JS.Class(Controller, {
		'initialize': function(parent_controller, view, page_model ) {
			this.callSuper();

			this.image_model = null;
		},

		'start': function() {
			this.callSuper();

			this.image_model = this.models[0];
		}
	});
});
