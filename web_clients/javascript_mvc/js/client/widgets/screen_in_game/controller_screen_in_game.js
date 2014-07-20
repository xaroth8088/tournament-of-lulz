/***
	InGame Screen Controller
	Responsible for handling high-level in-game screen functionality.
***/
define(['require', 'jsclass/min/core', '../../base/controller', '../../models/model_game'], function (require) {
	'use strict';
	var Controller = require('../../base/controller'),
		ModelGame = require('../../models/model_game');

	return new JS.Class(Controller, {
		'initialize': function(parent_controller, view, page_model ) {
			this.callSuper();

			this.page_model = page_model;
		},

		'start': function() {
			this.callSuper();

			this.game_model = new ModelGame();
			this.game_model.start();
		}
	});
});