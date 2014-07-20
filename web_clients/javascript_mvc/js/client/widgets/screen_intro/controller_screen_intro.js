/***
	Intro Screen Controller
	Responsible for handling the intro screen controls
***/
define(['require', 'jsclass/min/core', '../../base/controller', '../../models/model_top_images', '../../configuration'], function (require) {
	'use strict';
	var Controller = require('../../base/controller'),
		ModelTopImages = require('../../models/model_top_images'),
		CONFIGURATION = require('../../configuration');
	
	return new JS.Class(Controller, {
		'initialize': function(parent_controller, view, page_model ) {
			this.callSuper();

			this.page_model = page_model;
		},

		'start': function() {
			this.callSuper();

			this.top_images_model = new ModelTopImages();
			this.top_images_model.loadFromServer( 0, CONFIGURATION.INTRO_TOP_X_IMAGES_COUNT );
			this.view.setTopImagesModel( this.top_images_model );
		},

		'onStartPressed': function() {
			this.page_model.changeScreen( "IN_GAME" );
		}
	});
});