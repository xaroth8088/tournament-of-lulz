/***
	Image Controller
	Responsible for handling the intro screen controls
***/
var ControllerImage = new JS.Class(Controller, {
	'initialize': function(parent_controller, view, page_model ) {
		'use strict';
		this.callSuper();

		this.image_model = null;
	},

	'start': function() {
		'use strict';
		this.callSuper();

		this.image_model = this.models[0];
	}
});