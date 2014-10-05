/***
 Green Hair Announcer
 Generates scripts for the RPGSay widget, based on game state
 A generally cheery, somewhat clueless personality.
 ***/
define(['require', 'jsclass/min/core', 'client/models/model_announcer'], function (require) {
    'use strict';
    var ModelAnnouncer = require('client/models/model_announcer');

    return new JS.Class(ModelAnnouncer, {
        'initialize': function () {
            this.callSuper('announcer_green_hair');
        },

        'getWelcomeScript': function () {
            var welcome_scripts, script, selected_script;

            welcome_scripts = [
                {
                    'weight': 100,
                    'script': {
                        'text': 'Welcome to Tournament of Lulz!',
                        'events': {
                            0: {
                                'mood': 'happy'
                            }
                        }
                    }
                },
                {
                    'weight': 10,
                    'script': {
                        'text': 'Long time no see!',
                        'events': {
                            0: {
                                'mood': 'neutral'
                            }
                        }
                    }
                },
                {
                    'weight': 50,
                    'script': {
                        'text': "It's good to see you again!",
                        'events': {
                            0: {
                                'mood': 'happy'
                            }
                        }
                    }
                }
            ];

            selected_script = this._selectRandomScript(welcome_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        },

        'getTitleScript': function (top_images) {
            var title_scripts, script, selected_script;

            title_scripts = [
                {
                    'weight': 10,
                    'script': {
                        'text': 'Did you know this whole thing was written by just one guy?',
                        'events': {
                            0: {
                                'mood': 'neutral'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': 'These are so much fun!',
                        'events': {
                            0: {
                                'mood': 'embarrassed'
                            }
                        }
                    }
                },
                {
                    'weight': 50,
                    'script': {
                        'text': 'One time, I saw a meme that slipped by the censors. It was the worst!',
                        'events': {
                            0: {
                                'mood': 'neutral'
                            },
                            51: {
                                'text_speed': 1000
                            },
                            52: {
                                'text_speed': 50,
                                'mood': 'surprised'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': 'Did you know the images in the background here are the top 10 images ever?',
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "The current best image is titled '" + top_images.images[0].title + "'."
                    }
                },
                {
                    'weight': 10,
                    'script': {
                        'text': "Someone once told me to 'fork this on GitHub'... but I don't know what that means.",
                        'events': {
                            0: {
                                'mood': 'sad'
                            },
                            25: {
                                'text_speed': 150,
                                'mood': 'hurt'
                            },
                            45: {
                                'text_speed': 50
                            },
                            48: {
                                'text_speed': 1000
                            },
                            49: {
                                'text_speed': 50,
                                'mood': 'embarrassed'
                            }
                        }
                    }
                }
            ];

            selected_script = this._selectRandomScript(title_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        },

        'getVersusScript': function (match) {
            var script;

            // TODO: randomize the script

            script = this._getBaseScript();
            script.text = match.player_1.rating + " vs " + match.player_2.rating;
            script.events[0].mood = 'angry';

            return script;
        },

        'getWinnerScript': function () {
            return false;
        },

        'getGameOverScript': function (winner) {
            var script;

            // TODO: randomize the script

            script = this._getBaseScript();
            script.text = "Winner:" + winner.title;
            script.events[0].mood = 'surprised';

            return script;
        }
    });
});