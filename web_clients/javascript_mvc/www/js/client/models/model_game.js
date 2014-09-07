/***
	Game Model
	Responsible for tracking game state
***/
define(['require', 'jsclass/min/core', 'client/base/model', './model_tournament'], function (require) {
	'use strict';
	var Model = require('client/base/model'),
		ModelTournament = require('./model_tournament');
	
	return new JS.Class(Model,{
		'initialize': function() {
			this.callSuper();

			this.tournament = null;
		},

		'startGame': function() {
			this.tournament = new ModelTournament();
			this.tournament.startNewTournament();
		}
	});
});