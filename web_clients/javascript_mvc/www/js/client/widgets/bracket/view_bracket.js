/***
 Bracket View
 Shows off the current position in the bracket
 ***/
define(['require', 'jsclass/min/core', 'client/lib/simplebracket/simplebracket', 'client/base/view'], function (require) {
    'use strict';
    var View = require('client/base/view');

    return new JS.Class(View, {
        'initialize': function (callback) {
            this.callSuper(['tournament_model']);
            this.animation_complete_callback = callback;
            this.timeout = null;
        },

        '_initTemplate': function () {
            this.callSuper();

            this.container.addClass('widget_bracket');
            this.container.html("<div class='bracket' />");
        },

        '_draw': function () {
            var bracket_data, bracket_container;

            bracket_container = this.container.children('.bracket');
            bracket_container.empty();

            bracket_data = this._getBracketData();
            bracket_container.simpleBracket(bracket_data);

            if (this.timeout === null) {
		        this.timeout = setTimeout( this.animation_complete_callback, 5000 );
            }
        },

        '_getBracketData': function () {
            var bracket_data, match_index, len, match, tier_index, num_tiers, tier, participant_ids, player_1_index, player_2_index;

            bracket_data = {
                'participants': [],
                'seeds': [],
                'winners': []
            };

            participant_ids = {};
            for( match_index = 0, len = this.models.tournament_model.bracket[0].length; match_index < len; match_index++ ) {
                match = this.models.tournament_model.bracket[0][match_index];

                participant_ids[match.player_1.image_id] = match_index * 2;
                participant_ids[match.player_2.image_id] = match_index * 2 + 1;

                bracket_data.participants.push(this._formatPlayer(match.player_1));
                bracket_data.participants.push(this._formatPlayer(match.player_2));
            }

            for( tier_index = 0, num_tiers = this.models.tournament_model.bracket.length; tier_index < num_tiers; tier_index++ ) {
                tier = this.models.tournament_model.bracket[tier_index];
                bracket_data.seeds[tier_index] = [];
                bracket_data.winners[tier_index] = [];

                for( match_index = 0, len = tier.length; match_index < len; match_index++ ) {
                    match = tier[match_index];

                    player_1_index = null;
                    if( match.player_1 !== null ) {
                        player_1_index = participant_ids[match.player_1.image_id];
                    }

                    player_2_index = null;
                    if( match.player_2 !== null ) {
                        player_2_index = participant_ids[match.player_2.image_id];
                    }

                    bracket_data.seeds[tier_index].push([
                        player_1_index,
                        player_2_index
                    ]);

                    if( match.winner === null ) {
                        bracket_data.winners[tier_index].push(null);
                    } else if( match.winner.image_id === match.player_1.image_id ) {
                        bracket_data.winners[tier_index].push(0);
                    } else if( match.winner.image_id === match.player_2.image_id ) {
                        bracket_data.winners[tier_index].push(1);
                    }
                }
            }

            return bracket_data;
        },

        '_formatPlayer': function (match_player) {
            var player;

            player = $("<img src='" + match_player.thumbnail_url + "'/>");

            return player;
        }
    });
});