/***
	Intro Screen Controller
	Responsible for handling the intro screen controls
***/
define(['require', 'jsclass/min/core', 'client/base/controller', 'client/models/model_top_images', 'client/configuration'], function (require) {
	'use strict';
	var Controller = require('client/base/controller'),
		ModelTopImages = require('client/models/model_top_images'),
		CONFIGURATION = require('client/configuration');
	
	return new JS.Class(Controller, {
		'initialize': function(parent_controller, view) {
			this.callSuper();
		},

		'start': function() {
			this.callSuper();

			this.page_model = this.models[0];

			this.top_images_model = new ModelTopImages();
			this.top_images_model.loadFromServer( 0, CONFIGURATION.INTRO_TOP_X_IMAGES_COUNT );
			this.view.setTopImagesModel( this.top_images_model );
		},

		'onStartPressed': function() {
			this.page_model.changeScreen( "IN_GAME" );
		}
	});
});