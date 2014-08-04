/***
	Intro Screen View
	Shows the top 10 images, and presents "start tournament" functionality
***/
define(['require', 'jsclass/min/core', 'client/base/view', 'client/widgets/image/widget_image'], function (require) {
	'use strict';
	var View = require('client/base/view'),
		WidgetImage = require('client/widgets/image/widget_image');

	return new JS.Class(View, {
		'initialize': function() {
			this.callSuper();
			this.top_images_model = null;
		},

		'start': function(controller, models) {
			this.callSuper(controller, models);

			this._draw();
		},

		'setTopImagesModel': function( top_images_model ) {
			if( this.top_images_model !== null ) {
				this.top_images_model.unwatch( this );
			}

			this.top_images_model = top_images_model;
			this.top_images_model.watch( this );

			this.onModelUpdated();
		},

		'_initTemplate': function() {
			this.callSuper();

			this.container.append('\
				<button>Start Tournament</button>\
			');

			this.container.find('button').click( $.proxy( this._controller.onStartPressed, this._controller ) );
		},

		'_draw': function() {
			var i, len, image_widget;

			this.removeAllSubwidgets();

			if( this.top_images_model === null ) {
				return;
			}

			// Add image widgets for each one in the top_images_model
			for( i = 0, len = this.top_images_model.images.length; i < len; i++ ) {
				image_widget = new WidgetImage.controller( this._controller, new WidgetImage.view(), this.top_images_model.images[i] );
				this.addSubwidget( image_widget, this.container );
				image_widget.start();
				image_widget.view.container.delay( 500 * i ).animate( {
						'top': '100%'
					}, 3000
				);
			}
		},

		'destroy': function() {
			if( this.top_images_model !== null ) {
				this.top_images_model.unwatch( this );
			}

			this.callSuper();
		}
	});
});