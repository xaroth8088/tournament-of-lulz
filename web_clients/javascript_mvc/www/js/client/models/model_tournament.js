/***
	Tournament Model
	A representation of the server-side "tournament" object
***/
define(['require', 'jsclass/min/core', 'client/base/model', 'client/models/model_image', 'client/models/model_match'], function (require) {
	'use strict';
	var Model = require('client/base/model'),
		ModelImage = require('client/models/model_image'),
		ModelMatch = require('client/models/model_match');
	
	return new JS.Class(Model,{
		'initialize': function() {
			this.callSuper();

			this.tournament_id = null;
			this.images = [];
			this.state = this.CONSTANTS.INITIALIZED;
			this.round = null;
			this.total_rounds = null;
			this.bracket = null;
		},

		'startNewTournament': function( num_images, starting_image ) {
			var request, params;

			params = {};
			params.num_images = num_images;
			if( starting_image !== undefined ) {
				params.starting_image_id = starting_image.image_id;
			}

			request = {
				'method': 'POST',
				'url': '/api/tournament.json',
				'params': params,
				'context': this,
				'success': this.onLoadComplete,
				'error': this.onLoadFailure
			};
			this.ajax(request);

			this.state = this.CONSTANTS.LOADING;
			this.modelWasUpdated();
		},

		'onLoadComplete': function(data) {
			var i, len, images, image;

			if( this.state !== this.CONSTANTS.LOADING ) {
				throw("ModelTournament received data when in an invalid state.");
			}

			// TODO: never trust your server.  Check for malformed response data.

			this.tournament_id = data['tournament_id'];
			if( this.tournament_id === undefined ) {
				this.state = this.CONSTANTS.INITIALIZED;
				throw("Malformed response from server - no tournament_id");
			}

			images = data['images'];
			if( images === undefined || images.length === undefined || images.length <= 1 ) {
				this.state = this.CONSTANTS.INITIALIZED;
				throw("Cannot run a tournament with fewer than 2 images.");
			}

			for( i = 0, len = images.length; i < len; i++ ) {
				image = new ModelImage();
				image.loadFromObject(images[i]);
				this.images.push(image);
			}

			this.state = this.CONSTANTS.LOADED;
			this.round = 0;
			this.total_rounds = Math.pow( 2, Math.ceil( this._log2(images.length) ) ) - 1;
			this._populateBracket();

			this.modelWasUpdated();
		},

		'_log2': function(x) {
			return Math.log(x) / Math.log(2);
		},

		'_createEmptyBracket': function(num_participants) {
			var depth, j, num_rounds, tier, match, bracket, num_tiers, round;

			num_tiers = Math.ceil( this._log2(num_participants) );
			round = 0;

			bracket = [];
			for( depth = 0; depth < num_tiers; depth++ ) {
				tier = [];
				for( j = 0, num_rounds = Math.pow(2, num_tiers - depth - 1); j < num_rounds; j++ ) {
					match = new ModelMatch();
					match.round = round;

					tier.push(match);
					round++;
				}
				bracket[depth] = tier;
			}

			return bracket;
		},

		'_populateBracket': function() {
			var i, len;

			this.bracket = this._createEmptyBracket(this.images.length);

			// TODO: randomize the images received and evenly distribute byes.  Tests will need to be updated to be aware of this!

			// populate the first tier's matches
			for( i = 0, len = Math.ceil(this.images.length / 2); i < len; i++ ) {
				this.bracket[0][i].player_1 = this.images[i * 2];
				if( this.images[i * 2 + 1] ) {
					this.bracket[0][i].player_2 = this.images[i * 2 + 1];
				}
			}
		},

		'onLoadFailure': function(jqxhr, text_status, error_thrown) {
			console.log("Loading top images failed:" + text_status + " (" + error_thrown + ")" );
			this.state = this.CONSTANTS.ERROR;
			this.modelWasUpdated();
		},

		'getCurrentRoundData': function() {
			return this.getDataForRound(this.round);
		},

		'getDataForRound': function( round_num ) {
			var bracket_pos, match;

			bracket_pos = this._getBracketPositionForRound( round_num );
			match = this.bracket[bracket_pos.tier][bracket_pos.match];

			return match;
		},

		'_getBracketPositionForRound': function( round_num ) {
			var depth, num_tiers, retval;

			if( round_num < 0 || round_num >= this.total_rounds ) {
				throw("Invalid round_num given to _getBracketPositionForRound");
			}

			retval = {};

			num_tiers = Math.ceil(this._log2(this.images.length));

			for( depth = 0; depth < num_tiers; depth++ ) {
				round_num -= Math.pow(2, num_tiers - depth - 1);
				if( round_num < 0 ) {
					retval.tier = depth;
					retval.match = round_num + Math.pow(2, num_tiers - depth - 1);
					return retval;
				}
			}

		},

		'registerWinner': function( image_id ) {
			var match;

			if( this.state !== this.CONSTANTS.LOADED ) {
				throw( "Attempted to register a winner on a non-started tournament" );
			}

			// Get the current match
			match = this.getDataForRound(this.round);

			// NOTE: if there's a bye, there's no .image_id here either, so account for that
			if( ( match.player_1 === undefined || match.player_1.image_id !== image_id ) &&
				( match.player_2 === undefined || match.player_2.image_id !== image_id ) ) {
				throw("Attempted to register a winner that isn't in the current round");
			}

			// Set the winner for this round
			if( match.player_1.image_id === image_id ) {
				match.winner = match.player_1;
			} else {
				match.winner = match.player_2;
			}

			this._registerWinnerWithServer( match );

			// Populate the next tier, if there is one
			this._populateNextTier(match.winner);

			// Advance the round
			this.round++;
			this._skipPastByes();

			// Complete the tournament, if appropriate
			if( this.round >= this.total_rounds ) {
				this._finishTournament();
			}

			this.modelWasUpdated();
		},

		'_finishTournament': function() {
			this.state = this.CONSTANTS.COMPLETE;

			// Intentionally ignore both success and failure of this call.
			// If the data makes it to the server, great.  Otherwise, this is actually non-critical data,
			// and the server will expire the tournament on its own.
			this.ajax({
				'url': '/api/tournament/' + this.tournament_id + '.json',
				'method': 'DELETE'
			});
		},

		'_registerWinnerWithServer': function( match ) {
			var winner_id, loser_id;

			if( match.player_1 === undefined || match.player_2 === undefined ) {
				return;
			}

			winner_id = match.winner.image_id;
			if( match.player_1 === match.winner ) {
				loser_id = match.player_2.image_id;
			} else {
				loser_id = match.player_1.image_id;
			}

			// Intentionally ignore both success and failure of this call.
			// If the data makes it to the server, great.  Otherwise, this is actually non-critical data,
			// only used for global rankings of the images.
			this.ajax({
				'url': '/api/tournament/' + this.tournament_id + '/results.json',
				'method': 'POST',
				'data': {
					'winner_id': winner_id,
					'loser_id': loser_id
				}
			});
		},

		'_populateNextTier': function(winner) {
			var tier, next_match, tier_pos, bracket_pos;

			if( this.round >= this.total_rounds - 1) {
				return;
			}

			bracket_pos = this._getBracketPositionForRound(this.round);
			tier = bracket_pos.tier;
			tier++;

			tier_pos = Math.floor( bracket_pos.match / 2.0 );

			next_match = this.bracket[tier][tier_pos];

			if( bracket_pos.match % 2 === 0 ) {
				next_match.player_1 = winner;
			} else {
				next_match.player_2 = winner;
			}
		},

		'_skipPastByes': function() {
			var match;

			if( this.round >= this.total_rounds - 1 ) {
				return;
			}

			// Determine if the current round has a bye
			match = this.getDataForRound(this.round);
			if( match.player_1 !== null && match.player_2 !== null ) {
				return;
			}

			// If so, assign a winner...
			if( match.player_1 !== null ) {
				match.winner = match.player_1;
			} else {
				match.winner = match.player_2;	// it's ok if this is a bye again
			}

			// ...populate the next tier...
			this._populateNextTier(match.winner);

			// ...then advance to the next round and try again
			this.round++;
			this._skipPastByes();
		},

		'getWinnerData': function() {
			var match;

			if( this.state !== this.CONSTANTS.COMPLETE ) {
				return null;	// No winner yet
			}

			match = this.getDataForRound(this.total_rounds - 1);

			return match.winner;
		},

		'CONSTANTS': {
			'INITIALIZED': 'INITIALIZED',
			'LOADING': 'LOADING',
			'LOADED': 'LOADED',
			'COMPLETE': 'COMPLETE',
			'ERROR': 'ERROR'
		}
	});
});