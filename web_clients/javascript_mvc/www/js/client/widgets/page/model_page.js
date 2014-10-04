/***
	Main Page Model
	Responsible for tracking which "screen" is shown to the user.  Also tracks the current announcer.
***/
define([
    'require',
    'jsclass/min/core',
    'client/base/model',
    'client/models/announcers/announcer_green_hair'
], function (require) {
	'use strict';
	var Model = require('client/base/model'),
        AnnouncerGreenHair = require('client/models/announcers/announcer_green_hair');

	return new JS.Class(Model,{
		'initialize': function() {
			this.callSuper();

			this.current_screen = this.CONSTANTS.SCREENS.INTRO;
            this.announcer = this._randomlySelectAnnouncer();
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

        '_randomlySelectAnnouncer': function() {
            var announcer;

            announcer = new AnnouncerGreenHair();
            return announcer;
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
