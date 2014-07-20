/***
	Intro Screen View
	Shows the top 10 images, and presents "start tournament" functionality
***/
var ViewScreenIntro = new JS.Class(View, {
	'initialize': function( controller ) {
		'use strict';
		this.callSuper( controller );
		this.top_images_model = null;
	},

	'start': function(controller, models) {
		'use strict';
		this.callSuper(controller, models);

		this._draw();
	},

	'setTopImagesModel': function( top_images_model ) {
		'use strict';

		if( this.top_images_model !== null ) {
			this.top_images_model.unwatch( this );
		}

		this.top_images_model = top_images_model;
		this.top_images_model.watch( this );

		this.onModelUpdated();
	},

	'_initTemplate': function() {
		'use strict';
		this.callSuper();

		this.container.append('\
			<button>Start Tournament</button>\
		');

		this.container.find('button').click( $.proxy( this.controller.onStartPressed, this.controller ) );
	},

	'_draw': function() {
		'use strict';
		var i, len, image_widget;

		this.removeAllSubwidgets();

		if( this.top_images_model === null ) {
			return;
		}

		// Add image widgets for each one in the top_images_model
		for( i = 0, len = this.top_images_model.images.length; i < len; i++ ) {
			image_widget = new ControllerImage( this.controller, new ViewImage(), this.top_images_model.images[i] );
			this.addSubwidget( image_widget, this.container );
			image_widget.start();
			image_widget.view.container.delay( 500 * i ).animate( {
				'top': '100%'
			}, 3000
			);
		}
	},

	'destroy': function() {
		'use strict';
		this.callSuper();

		if( this.top_images_model !== null ) {
			this.top_images_model.unwatch( this );
		}
	}
});