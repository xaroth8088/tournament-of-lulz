/***
 Announcer Base Model
 Generates scripts for the RPGSay widget, based on game state
 ***/
define(['require', 'jsclass/min/core', 'client/base/model'], function (require) {
    'use strict';
    var Model = require('client/base/model');

    return new JS.Class(Model, {
        'initialize': function (announcer_name) {
            this.callSuper();
            this.announcer_name = announcer_name;
        },

        '_getBaseScript': function () {
            // Manages initial first-frame setup
            var script;

            script = {
                "text": "",
                "events": {
                    '0': {
                        'speaker': this.announcer_name,
                        'mood': 'neutral'
                    }
                }
            };

            return script;
        },

        'getWelcomeScript': function () {
            return false;
        },

        'getTitleScript': function () {
            return false;
        },

        'getVersusScript': function (match) {
            return false;
        },

        'getWinnerScript': function () {
            return false;
        },

        'getGameOverScript': function () {
            return false;
        },

        '_selectRandomScript': function( scripts ) {
            var total, i, len, roll;

            total = 0;
            for( i = 0, len = scripts.length; i < len; i++ ) {
                total += scripts[i].weight;
            }

            roll = Math.random() * total;
            total = 0;
            for( i = 0, len = scripts.length; i < len; i++ ) {
                total += scripts[i].weight;
                if( total > roll ) {
                    return scripts[i].script;
                }
            }

            return null;
        }
    });
});