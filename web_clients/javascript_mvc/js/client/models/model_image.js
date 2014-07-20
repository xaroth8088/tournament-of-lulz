/***
	Model Image
	A representation of a server-side Image object
***/
define(['require', 'jsclass/min/core', '../base/model'], function (require) {
	'use strict';
	var Model = require('../base/model');
	
	return new JS.Class(Model,{
		'initialize': function() {
			this.callSuper();

			this.image_id = null;
			this.page_url = null;
			this.image_url = null;
			this.thumbnail_url = null;
			this.title = null;
			this.rating = null;
		},

		'loadFromObject': function( image_object ) {
			this.image_id = image_object.image_id;
			this.page_url = image_object.page_url;
			this.image_url = image_object.image_url;
			this.thumbnail_url = image_object.thumbnail_url;
			this.title = image_object.title;
			this.rating = image_object.rating;

			this.modelWasUpdated();
		}
	});
});