/***
	Green Hair Announcer
	Generates scripts for the RPGSay widget, based on game state
    This is a test announcer, who will probably be completely rewritten once the framework is functioning
***/
define(['require', 'jsclass/min/core', 'client/models/model_announcer'], function (require) {
	'use strict';
	var ModelAnnouncer = require('client/models/model_announcer');

	return new JS.Class(ModelAnnouncer,{
		'initialize': function() {
			this.callSuper('announcer_green_hair');
		},

        'getWelcomeScript': function() {
            var script;

            // TODO: randomize the script

            script = this._getBaseScript();
            script.text = "Welcome to Tournament of Lulz!  I'll be your announcer, Generic Green Hair Anime Portrait!";
            script.events[0].mood = 'happy';

            return script;
        },

        'getTitleScript': function() {
            var script;

            // TODO: randomize the script

            script = this._getBaseScript();
            script.text = "This is supposed to just work!";
            script.events[0].mood = 'angry';

            return script;
        },

        'getVersusScript': function(match) {
            var script;

            // TODO: randomize the script

            script = this._getBaseScript();
            script.text = match.player_1.rating + " vs " + match.player_2.rating;
            script.events[0].mood = 'angry';

            return script;
        },

        'getWinnerScript': function() {
            return false;
        },

        'getGameOverScript': function(winner) {
            var script;

            // TODO: randomize the script

            script = this._getBaseScript();
            script.text = "Winner:" + winner.title;
            script.events[0].mood = 'surprised';

            return script;
        }
	});
});