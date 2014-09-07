/***
	Bracket View
	Shows off the current position in the bracket
***/
define(['require', 'jsclass/min/core', 'jquery_gracket/jquery.gracket.min', 'client/base/view'], function (require) {
	'use strict';
	var View = require('client/base/view');

	return new JS.Class(View, {
		'initialize': function(callback) {
			this.callSuper(['tournament_model']);
			this.animation_complete_callback = callback;
			this.timeout = null;
		},

		'_initTemplate': function() {
			this.callSuper();

			this.container.addClass( 'widget_bracket' );
			this.container.html("<div class='bracket' />");
		},

		'_draw': function() {
			var bracket_data, bracket_container;

			bracket_container = this.container.children('.bracket');
			bracket_container.empty();

			bracket_data = this._getBracketData();

			bracket_container.gracket({
				src: bracket_data
			});

			if( this.timeout === null ) {
		        this.timeout = setTimeout( this.animation_complete_callback, 1000 );
			}
		},

		'_getBracketData': function() {
			var bracket, bracket_row, tier_index, num_tiers, tier, match_index, num_matches, match;

			bracket = [];

			for( tier_index = 0, num_tiers = this.models.tournament_model.bracket.length; tier_index < num_tiers; tier_index++ ) {
				tier = this.models.tournament_model.bracket[tier_index];
				bracket_row = [];

				for( match_index = 0, num_matches = tier.length; match_index < num_matches; match_index++ ) {
					match = tier[match_index];

					bracket_row.push( this._formatMatch(match) );
				}

				bracket.push(bracket_row);
			}

			// Include the final winner so that the whole bracket draws
			bracket.push([[this._formatPlayer(match.winner)]]);

			return bracket;
		},

		'_formatMatch': function( match ) {
			var player, result;

			result = [];
			result.push( this._formatPlayer( match.player_1 ) );
			result.push( this._formatPlayer( match.player_2 ) );

			return result;
		},

		'_formatPlayer': function( match_player ) {
			var player;

			player = {
				'name': '',
				'id': ''
			};

			if( match_player !== null ) {
				player.name = "<img src='" + match_player.thumbnail_url + "'/>";
				player.id = match_player.image_id;
			}

			return player;
		}
	});
});