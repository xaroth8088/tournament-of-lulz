/***
	Victory View
	A brief celebration of the ultimate tournament winner
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

			this.container.addClass( 'widget_victory' );
			this.container.append("<div class='victory_text'>THE WINNER!</div><img class='winner' /><button class='goback'>Play Again!</button>");
			this.container.find('.goback').click($.proxy(this._controller.onPlayAgainPressed, this._controller));
		},

		'_draw': function() {
			var winner;

			winner = this.models.tournament_model.getWinnerData();
			this.container.find('.winner').attr('src', winner.image_url);
		}
	});
});