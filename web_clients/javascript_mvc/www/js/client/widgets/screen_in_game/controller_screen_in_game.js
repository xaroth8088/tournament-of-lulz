/***
	InGame Screen Controller
	Responsible for handling high-level in-game screen functionality.
***/
define(['require', 'jsclass/min/core', 'client/base/controller', 'client/models/model_game'], function (require) {
	'use strict';
	var Controller = require('client/base/controller'),
		ModelGame = require('client/models/model_game');

	return new JS.Class(Controller, {
		'initialize': function(parent_controller, view, models ) {
			this.callSuper(parent_controller, view, models);
		},

		'start': function() {
			this.callSuper();

			this.game_model = new ModelGame();
			this.game_model.start();
		}
	});
});