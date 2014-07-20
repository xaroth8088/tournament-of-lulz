/***
	Game Model
	Responsible for tracking game state
***/
define(['require', 'jsclass/min/core', '../base/model', './model_tournament'], function (require) {
	'use strict';
	var Model = require('../base/model'),
		ModelTournament = require('./model_tournament');
	
	return new JS.Class(Model,{
		'initialize': function() {
			this.callSuper();

			this.tournament = null;
		},

		'start': function() {
			this.tournament = new ModelTournament();
		}
	});
});