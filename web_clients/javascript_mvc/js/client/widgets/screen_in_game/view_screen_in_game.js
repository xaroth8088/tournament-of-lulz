/***
	InGame Screen View
	Manages in-game state
***/
define(['require', 'jsclass/min/core', '../../base/view'], function (require) {
	'use strict';
	var View = require('../../base/view');
	
	return new JS.Class(View, {
		'initialize': function( controller ) {
			this.callSuper( controller );
		},

		'start': function(controller, models) {
			this.callSuper(controller, models);
		},

		'_initTemplate': function() {
			this.callSuper();

			this.container.append('\
				<div class="in-game">In Game</div>\
			');
		},

		'_draw': function() {
		},

		'destroy': function() {
			this.callSuper();
		}
	});
});