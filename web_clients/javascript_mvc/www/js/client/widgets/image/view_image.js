/***
	Image View
	Show one of the game's "image" objects.
***/
define(['require', 'jsclass/min/core', 'client/base/view'], function (require) {
	'use strict';
	var View = require('client/base/view');
	
	return new JS.Class(View, {
		'initialize': function( controller ) {
			this.callSuper( controller );

			this.image_model = null;
		},

		'start': function(controller, models) {
			this.callSuper(controller, models);

			this.image_model = models[0];
			this._draw();
		},

		'_initTemplate': function() {
			this.callSuper();

			this.container.addClass( 'image' );
		},

		'_draw': function() {
			if( this.image_model === null ) {
				this.container.hide();
			}

			this.container.show();

			this.container.css({
				'background-image': "url('" + this.image_model.thumbnail_url + "')"
			});
		},

		'destroy': function() {
			this.callSuper();
		}
	});
});