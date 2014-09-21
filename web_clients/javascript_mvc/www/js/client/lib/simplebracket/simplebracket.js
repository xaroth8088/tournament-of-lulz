/***
 * jQuery simpleBracket library
 * MIT license
 *
 * Skeleton for AMD / non-AMD instantiation thanks to code found at
 * http://stackoverflow.com/questions/10918063/how-to-make-a-jquery-plugin-loadable-with-requirejs
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define(['jquery'], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    var num_tiers;

    $.fn.simpleBracket = function (tournament_data) {
        num_tiers = Math.ceil(_log2(tournament_data.participants.length));

        _drawBrackets(this, tournament_data);
    };

    function _drawBrackets(container, data) {

        container.empty();
        container.addClass('sb-container');

        _constructBrackets(container, data);
    }

    function _constructBrackets(container, tournament_data) {
        var i;

        for (i = 0; i < num_tiers - 1; i++) {
            container.append(_constructMatchesColumn(tournament_data, i));
            container.append(_constructBracketColumn(i));
        }
        container.append(_constructMatchesColumn(tournament_data, i));
    }

    function _log2(x) {
        return Math.log(x) / Math.log(2);
    }

    function _constructMatchesColumn(tournament_data, tier) {
        var column, num_matches_in_tier, match_num;

        num_matches_in_tier = Math.pow(2, (num_tiers - tier - 1));

        column = $("<div/>").addClass('sb-col_matches');

        for (match_num = 0; match_num < num_matches_in_tier; match_num++) {
            column.append(_constructMatch(tournament_data, tier, match_num));
        }

        return column;
    }

    function _constructBracketColumn(tier) {
        var column, num_braces_in_tier, i;

        column = $("<div/>").addClass('sb-col_brackets');

        num_braces_in_tier = Math.pow(2, (num_tiers - tier - 2));
        for (i = 0; i < num_braces_in_tier; i++) {
            column.append(_constructBrace());
        }

        return column;
    }

    function _constructMatch(tournament_data, tier, match_num) {
        var match, player_1, player_2, label, player_1_index, player_2_index;

        match = $("<div/>").addClass('sb-match');

        player_1_index = tournament_data.seeds[tier][match_num][0];
        player_2_index = tournament_data.seeds[tier][match_num][1];

        player_1 = $("<div/>").addClass('sb-player_1');
        label = $("<div/>").addClass('sb-match_label');

        if (player_1_index !== undefined && player_1_index !== null) {
            label.append(tournament_data.participants[player_1_index].clone());
            if (tournament_data.winners[tier][match_num] === 0) {
                label.addClass('sb-match_won');
            } else if (tournament_data.winners[tier][match_num] === 1) {
                label.addClass('sb-match_lost');
            }
        }

        player_1.append(label);

        player_2 = $("<div/>").addClass('sb-player_2');
        label = $("<div/>").addClass('sb-match_label');

        if (player_2_index !== undefined && player_2_index !== null) {
            label.append(tournament_data.participants[player_2_index].clone());
            if (tournament_data.winners[tier][match_num] === 1) {
                label.addClass('sb-match_won');
            } else if (tournament_data.winners[tier][match_num] === 0) {
                label.addClass('sb-match_lost');
            }
        }

        player_2.append(label);

        match.append(player_1);
        match.append(player_2);

        return match;
    }

    function _constructBrace() {
        var brace_container, brace, brace_spacer;

        brace_container = $("<div/>").addClass('sb-brace_container');

        brace_spacer = $("<div/>").addClass('sb-brace_spacer');
        brace_container.append(brace_spacer);
        brace = $("<div/>").addClass('sb-brace');
        brace_container.append(brace);
        brace_spacer = $("<div/>").addClass('sb-brace_spacer');
        brace_container.append(brace_spacer);

        return brace_container;
    }
}));
