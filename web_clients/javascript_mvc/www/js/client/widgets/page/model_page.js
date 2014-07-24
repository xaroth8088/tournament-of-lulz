/***
	Main Page Model
	Responsible for tracking which "screen" is shown to the user.
***/
define(['require', 'jsclass/min/core', 'client/base/model'], function (require) {
	'use strict';
	var Model = require('client/base/model');

	return new JS.Class(Model,{
		'initialize': function() {
			this.callSuper();

			this.current_screen = this.CONSTANTS.SCREENS.INTRO;
		},

		'changeScreen': function( screen_name ) {
			if( this.CONSTANTS.SCREENS[screen_name] === undefined ) {
				console.log( 'Tried to switch to non-existent screen: ' + screen_name );
				return;
			}

			if( this.current_screen === this.CONSTANTS.SCREENS[screen_name] ) {
				return;	// Intentionally do nothing
			}

			this.current_screen = this.CONSTANTS.SCREENS[screen_name];
			this.modelWasUpdated();
		},

		'CONSTANTS': {
			'SCREENS': {
				'INTRO': 0,
				'IN_GAME': 1,
				'SHARE': 2
			}
		}
	});
});
