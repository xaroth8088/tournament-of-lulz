/***
	Intro Screen Controller
	Responsible for handling the intro screen controls
***/
define(['require', 'jsclass/min/core', 'client/base/controller', 'client/configuration'], function (require) {
	'use strict';
	var Controller = require('client/base/controller'),
		CONFIGURATION = require('client/configuration');
	
	return new JS.Class(Controller, {
		'initialize': function(parent_controller, view, models) {
			this.callSuper(parent_controller, view, models);
		},

		'start': function() {
			this.callSuper();

			this.models.top_images_model.loadFromServer( 0, CONFIGURATION.INTRO_TOP_X_IMAGES_COUNT );
		},

		'onStartPressed': function() {
			this.models.page_model.changeScreen( "IN_GAME" );
		}
	});
});