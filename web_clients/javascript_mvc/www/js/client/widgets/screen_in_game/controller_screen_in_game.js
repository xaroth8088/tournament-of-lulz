/***
	InGame Screen Controller
	Responsible for handling high-level in-game screen functionality.
***/
define(['require', 'jsclass/min/core', 'client/base/controller', 'client/models/model_game', './model_screen_in_game'], function (require) {
	'use strict';
	var Controller = require('client/base/controller'),
		ModelGame = require('client/models/model_game'),
		ModelScreenInGame = require('./model_screen_in_game');

	return new JS.Class(Controller, {
		'initialize': function(parent_controller, view, models ) {
			this.callSuper(parent_controller, view, models);
		},

		'start': function() {
			this.game_model = new ModelGame();
			this.game_model.startGame();

			this.models.tournament_model = this.game_model.tournament;
			this.models.screen_in_game_model = new ModelScreenInGame();

			this.callSuper();
		},

		'advanceStateToSelection': function() {
			this.models.screen_in_game_model.setState( this.models.screen_in_game_model.CONSTANTS.STATES.SELECTING );
		}
	});
});