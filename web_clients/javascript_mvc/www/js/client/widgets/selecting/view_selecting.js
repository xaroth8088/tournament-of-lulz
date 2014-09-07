/***
	Selecting View
	Displays the choices for a given match-up, permitting the user to pick a winner
***/
define(['require', 'jsclass/min/core', 'client/base/view'], function (require) {
	'use strict';
	var View = require('client/base/view');
	
	return new JS.Class(View, {
		'initialize': function(callback) {
			this.callSuper(['tournament_model']);
			this.selected_callback = callback;
		},

		'_initTemplate': function() {
			this.callSuper();

			this.container.addClass( 'widget_selecting' );
			this.container.html("<img class='image_1' /><div class='versus'>VS</div><img class='image_2' />");
			this.container.find('.image_1').click($.proxy(this._onImage1Clicked, this));
			this.container.find('.image_2').click($.proxy(this._onImage2Clicked, this));
		},

		'_draw': function() {
			var image_1, image_2;

			image_1 = this.container.find('.image_1');
			image_2 = this.container.find('.image_2');

			this.match = this.models.tournament_model.getCurrentRoundData();

			image_1.attr('src', this.match.player_1.image_url );
			image_2.attr('src', this.match.player_2.image_url );
		},

		'_onImage1Clicked': function() {
			this.selected_callback(this.match.player_1.image_id);
		},

		'_onImage2Clicked': function() {
			this.selected_callback(this.match.player_2.image_id);
		}
	});
});