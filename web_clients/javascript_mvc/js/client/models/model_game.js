/***
	Game Model
	Responsible for tracking game state
***/
var ModelGame = new JS.Class(Model,{
	'initialize': function() {
		'use strict';
		this.callSuper();

		this.tournament = null;
	},

	'start': function() {
		'use strict';

		this.tournament = new ModelTournament();
	}
});
