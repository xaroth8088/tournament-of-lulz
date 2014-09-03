/***
	Match Model
	A representation of a single match-up in a tournament
***/
define(['require', 'jsclass/min/core', 'client/base/model'], function (require) {
	'use strict';
	var Model = require('client/base/model');
	
	return new JS.Class(Model,{
		'initialize': function() {
			this.callSuper();

			this.round = null;
			this.player_1 = null;
			this.player_2 = null;
			this.winner = null;
		}
	});
});