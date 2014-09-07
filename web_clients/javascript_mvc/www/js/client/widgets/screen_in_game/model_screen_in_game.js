/***
	InGame Screen Model
	Responsible for tracking which visible state is shown for the in-game screen
***/
define(['require', 'jsclass/min/core', 'client/base/model'], function (require) {
	'use strict';
	var Model = require('client/base/model');

	return new JS.Class(Model,{
		'initialize': function() {
			this.callSuper();

			this.state = this.CONSTANTS.STATES.BRACKET;
		},

		'setState': function( state ) {
			if( this.CONSTANTS.STATES[state] === undefined ) {
				throw( "Invalid state passed to ModelScreenInGame!" );
			}

			// Do nothing if we're not actually changing state
			if( this.state === state ) {
				return;
			}

			this.state = state;
			this.modelWasUpdated();
		},

		'CONSTANTS': {
			'STATES': {
				'SELECTING': 'SELECTING',
				'BRACKET': 'BRACKET',
				'VICTORY': 'VICTORY'
			}
		}
	});
});
