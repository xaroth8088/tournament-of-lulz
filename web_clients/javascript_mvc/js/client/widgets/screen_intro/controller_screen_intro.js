/***
	Intro Screen Controller
	Responsible for handling the intro screen controls
***/
var ControllerScreenIntro = new JS.Class(Controller, {
	'initialize': function(parent_controller, view, page_model ) {
		'use strict';
		this.callSuper();

		this.page_model = page_model;
	},

	'start': function() {
		'use strict';
		this.callSuper();

		this.top_images_model = new ModelTopImages();
		this.top_images_model.loadFromServer( 0, CONFIGURATION.INTRO_TOP_X_IMAGES_COUNT );
		this.view.setTopImagesModel( this.top_images_model );
	},

	'onStartPressed': function() {
		'use strict';

		this.page_model.changeScreen( "IN_GAME" );
	}
});