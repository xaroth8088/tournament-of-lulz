/***
	Main Page Model
	Responsible for tracking which "screen" is shown to the user.
***/
define(['require', 'jsclass/min/core', '../../base/model'], function (require) {
	'use strict';
	var Model = require('../../base/model'),
		ModelPage;

	ModelPage = new JS.Class(Model,{
		'initialize': function() {
			this.callSuper();

			this.current_screen = ModelPage.SCREENS.INTRO;
		},

		'changeScreen': function( screen_name ) {
			if( ModelPage.SCREENS[screen_name] === undefined ) {
				console.log( 'Tried to switch to non-existent screen: ' + screen_name );
				return;
			}

			if( this.current_screen === ModelPage.SCREENS[screen_name] ) {
				return;	// Intentionally do nothing
			}

			this.current_screen = ModelPage.SCREENS[screen_name];
			this.modelWasUpdated();
		}
	});

	ModelPage.SCREENS = {
		'INTRO': 0,
		'IN_GAME': 1,
		'SHARE': 2
	}
	
	return ModelPage;
});
