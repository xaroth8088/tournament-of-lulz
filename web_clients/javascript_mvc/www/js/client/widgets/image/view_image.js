/***
	Image View
	Show one of the game's "image" objects.
***/
define(['require', 'jsclass/min/core', 'client/base/view'], function (require) {
	'use strict';
	var View = require('client/base/view');
	
	return new JS.Class(View, {
		'initialize': function() {
			this.callSuper(['image_model']);

			this.models.image_model = null;
		},

		'_initTemplate': function() {
			this.callSuper();

			this.container.addClass( 'widget_image' );
		},

		'_draw': function() {
			this.container.css({
				'background-image': "url('" + this.models.image_model.thumbnail_url + "')"
			});
		}
	});
});