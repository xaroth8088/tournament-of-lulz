/***
	InGame Screen Controller
	Responsible for handling high-level in-game screen functionality.
***/
var ControllerScreenInGame = new JS.Class(Controller, {
	'initialize': function(parent_controller, view, page_model ) {
		'use strict';
		this.callSuper();

		this.page_model = page_model;
	},

	'start': function() {
		'use strict';
		this.callSuper();

		this.game_model = new ModelGame();
		this.game_model.start();
	}
});