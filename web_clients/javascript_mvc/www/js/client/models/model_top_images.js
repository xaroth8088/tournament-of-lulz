/***
	Top Images Model
	Keeps track of the "top images", as reported by the server
***/
define(['require', 'jsclass/min/core', 'client/base/model', './model_image'], function (require) {
	'use strict';
	var Model = require('client/base/model'),
		ModelImage = require('./model_image');

	return new JS.Class(Model,{
		'initialize': function() {
			this.callSuper();

			this.images = [];
		},

		'loadFromServer': function( start, limit ) {
			var request;

			request = {
				'url': '/api/top_images.json',
				'params': {
					'start': start,
					'limit': limit
				},
				'context': this,
				'success': this.onLoadComplete,
				'error': this.onLoadFailure
			};
			this.ajax(request);
		},

		'onLoadComplete': function(data) {
			var i, len, images, image;

			// TODO: never trust your server.  Check for malformed response data.
			images = data['images'];
			for( i = 0, len = images.length; i < len; i++ ) {
				image = new ModelImage();
				image.loadFromObject(images[i]);
				this.images.push(image);
			}

			this.modelWasUpdated();
		},

		'onLoadFailure': function(jqxhr, text_status, error_thrown) {
			console.log("Loading top images failed:" + text_status + " (" + error_thrown + ")" );
		}
	});
});