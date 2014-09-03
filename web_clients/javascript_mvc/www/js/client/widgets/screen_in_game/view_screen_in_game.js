/***
	InGame Screen View
	Manages in-game state
***/
define(['require', 'jsclass/min/core', 'client/base/view'], function (require) {
	'use strict';
	var View = require('client/base/view');
	
	return new JS.Class(View, {
		'initialize': function() {
			this.callSuper(['tournament_model']);
		},

		'_initTemplate': function() {
			this.callSuper();

			this.container.append('\
				<div class="in-game">In Game</div>\
			');
		}
	});
});