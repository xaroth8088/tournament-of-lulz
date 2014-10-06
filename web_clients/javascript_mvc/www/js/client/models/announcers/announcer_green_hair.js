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
            var avail_scripts, script, selected_script;

            avail_scripts = [
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

            selected_script = this._selectRandomScript(avail_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        },

        'getTitleScript': function (top_images) {
            var avail_scripts, script, selected_script;

            avail_scripts = [
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
                        'text': 'Did you know the images in the background here are the top 10 images ever?'
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

            selected_script = this._selectRandomScript(avail_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        },

        'getVersusScript': function (match) {
            var roll;

            // Decide what type of thing we're going to say:
            roll = Math.random();

            if (roll < 0.5) {
                // Say nothing, so as not to get too annoying?
                return false;
            } else if (roll < 0.56) {
                // Fluff?
                return this._getVersusFluff();
            } else if (roll < 0.68) {
                // Comment solely on player 1?
                return this._getVersusImageContent(match.player_1, 1);
            } else if (roll < 0.8) {
                // Comment solely on player 2?
                return this._getVersusImageContent(match.player_2, 2);
            } else {
                // Comment on both?
                return this._getVersusBoth(match);
            }
        },

        '_getVersusFluff': function () {
            var avail_scripts, script, selected_script;

            avail_scripts = [
                {
                    'weight': 100,
                    'script': {
                        'text': "Let's make this one a clean fight!",
                        'events': {
                            0: {
                                'mood': 'angry'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "Two will enter... Wait!  Only one gets out alive?",
                        'events': {
                            0: {
                                'mood': 'angry'
                            },
                            18: {
                                'text_speed': 1000
                            },
                            19: {
                                'text_speed': 50,
                                'mood': 'surprised'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "It's too bad they can't both be winners.",
                        'events': {
                            0: {
                                'mood': 'sad'
                            }
                        }
                    }
                }
            ];

            selected_script = this._selectRandomScript(avail_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        },

        '_getVersusImageContent': function (image, player_number) {
            var avail_scripts, script, selected_script;

            avail_scripts = [
                {
                    'weight': 100,
                    'script': {
                        'text': "Player " + player_number + " clocks in at " + Math.floor(image.rating) +
                            " points.  Let's see if that's enough to win!",
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
                        'text': "Can player " + player_number + " really win with " + Math.floor(image.rating) +
                            " points?",
                        'events': {
                            0: {
                                'mood': 'concerned'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "Player " + player_number + ", is \"" + this._shortenTitle(image.title) +
                            "\" really the best name you could come up with?",
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
                        'text': "You can do it, Player " + player_number + "!",
                        'events': {
                            0: {
                                'mood': 'happy'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "If it were me, I'd pick \"" + this._shortenTitle(image.title) + "\", but I'm weird that way.",
                        'events': {
                            0: {
                                'mood': 'happy'
                            }
                        }
                    }
                }
            ];

            selected_script = this._selectRandomScript(avail_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        },

        '_getVersusBoth': function (match) {
            var roll;

            if (match.player_1.rating - 200 > match.player_2.rating) {
                // If 1 is expected to win:
                roll = Math.random();
                if (roll < 0.5) {
                    // comment on 1?
                    return this._getVersusExpectedWinner(match.player_1, 1);
                } else {
                    // comment on 2?
                    return this._getVersusExpectedLoser(match.player_2, 2);
                }
            }

            if (match.player_2.rating - 200 > match.player_1.rating) {
                // If 2 is expected to win:
                roll = Math.random();
                if (roll < 0.5) {
                    // comment on 2?
                    return this._getVersusExpectedWinner(match.player_2, 2);
                } else {
                    // comment on 1?
                    return this._getVersusExpectedLoser(match.player_1, 1);
                }
            }

            if (match.player_1.rating < 1400 && match.player_2.rating < 1400) {
                roll = Math.random();

                // Sometimes fall through, so "it's a close match" can happen for any pairing
                if (roll > 0.6) {
                    // If both 1 & 2 have low ratings?
                    return this._getVersusBothLow(match);
                }
            }

            if (match.player_1.rating > 1600 && match.player_2.rating > 1600) {
                roll = Math.random();

                // Sometimes fall through, so "it's a close match" can happen for any pairing
                if (roll > 0.6) {
                    // If both 1 & 2 have high ratings?
                    return this._getVersusBothHigh(match);
                }
            }

            // Else if it's a close match?
            return this._getVersusBothClose(match);
        },

        '_getVersusExpectedWinner': function (image, player_number) {
            var avail_scripts, script, selected_script;

            avail_scripts = [
                {
                    'weight': 100,
                    'script': {
                        'text': "Come on! This isn't even close... of COURSE player " + player_number + " is gonna win!",
                        'events': {
                            0: {
                                'mood': 'angry'
                            },
                            34: {
                                'text_speed': 1000
                            },
                            35: {
                                'text_speed': 50,
                                'mood': 'embarrassed'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "Player " + player_number + " dominates with " + Math.floor(image.rating) +
                            " points, and is a shoe-in to win it this time.",
                        'events': {
                            0: {
                                'mood': 'happy'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "Do we really want a match-up that's so unbalanced in favor of player " + player_number + "?",
                        'events': {
                            0: {
                                'mood': 'concerned'
                            }
                        }
                    }
                }
            ];

            selected_script = this._selectRandomScript(avail_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        },

        '_getVersusExpectedLoser': function (image, player_number) {
            var avail_scripts, script, selected_script;

            avail_scripts = [
                {
                    'weight': 100,
                    'script': {
                        'text': "Don't you DARE pick a loser like player " + player_number + "!",
                        'events': {
                            0: {
                                'mood': 'angry'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "I'm rooting for the underdog. Come on player " + player_number + "!  You can do it!",
                        'events': {
                            0: {
                                'mood': 'neutral'
                            },
                            30: {
                                'text_speed': 500
                            },
                            31: {
                                'text_speed': 50,
                                'mood': 'happy'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "How does player " + player_number + " expect to even compete with only " + Math.floor(image.rating) + " points?",
                        'events': {
                            0: {
                                'mood': 'concerned'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "With a name like \"" + this._shortenTitle(image.title) +
                            "\", there's just no way player " + player_number + " is going to win.",
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
                        'text': "\"" + this._shortenTitle(image.title) +
                            "\" is such a cute title.  It's just a pity that player " + player_number + " can't compete on name alone.",
                        'events': {
                            0: {
                                'mood': 'sad'
                            }
                        }
                    }
                }
            ];

            selected_script = this._selectRandomScript(avail_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        },

        '_getVersusBothHigh': function (match) {
            var avail_scripts, script, selected_script;

            avail_scripts = [
                {
                    'weight': 100,
                    'script': {
                        'text': "Wow!  These are both so good it'll be hard to choose!",
                        'events': {
                            0: {
                                'mood': 'surprised'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "Even though they differ by " +
                            Math.abs(Math.floor(match.player_1.rating - match.player_2.rating)) +
                            " points, both players are strong contenders.",
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
                        'text': "Both players are so great!  I hope I don't say anything embarrassing around these two! D'oh!",
                        'events': {
                            0: {
                                'mood': 'surprised'
                            },
                            86: {
                                'text_speed': 1000
                            },
                            87: {
                                'text_speed': 50,
                                'mood': 'hurt'
                            }
                        }
                    }
                }
            ];

            selected_script = this._selectRandomScript(avail_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        },

        '_getVersusBothLow': function (match) {
            var avail_scripts, script, selected_script;

            avail_scripts = [
                {
                    'weight': 100,
                    'script': {
                        'text': "I can't believe we have to put up with contenders this bad sometimes.",
                        'events': {
                            0: {
                                'mood': 'sad'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "These two are TERRIBLE!",
                        'events': {
                            0: {
                                'mood': 'hurt'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "It's like the " + Math.abs(Math.floor(match.player_1.rating - match.player_2.rating)) +
                            " points that separate these two doesn't even matter - they're just both so BAD!",
                        'events': {
                            0: {
                                'mood': 'sad'
                            }
                        }
                    }
                }
            ];

            selected_script = this._selectRandomScript(avail_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        },

        '_getVersusBothClose': function (match) {
            var avail_scripts, script, selected_script;

            avail_scripts = [
                {
                    'weight': 100,
                    'script': {
                        'text': "This is gonna be a close one!",
                        'events': {
                            0: {
                                'mood': 'surprised'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "May as well just flip a coin - they're just too close together.",
                        'events': {
                            0: {
                                'mood': 'concerned'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "A match-up like this is hard to call. That's why I'm glad I don't have to do it!",
                        'events': {
                            0: {
                                'mood': 'neutral'
                            },
                            37: {
                                'text_speed': 750
                            },
                            38: {
                                'text_speed': 50,
                                'mood': 'embarrassed'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "Only " + Math.abs(Math.floor(match.player_1.rating - match.player_2.rating)) +
                            " points' difference?   Good luck picking a winner!",
                        'events': {
                            0: {
                                'mood': 'concerned'
                            },
                            28: {
                                'text_speed': 500
                            },
                            29: {
                                'text_speed': 50,
                                'mood': 'happy'
                            }
                        }
                    }
                }
            ];

            selected_script = this._selectRandomScript(avail_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        },

        'getWinnerScript': function () {
            return false;
        },

        'getGameOverScript': function (winner) {
            var avail_scripts, script, selected_script, len;

            avail_scripts = [
                {
                    'weight': 100,
                    'script': {
                        'text': "Congratulations to \"" + this._shortenTitle(winner.title) + "\"!",
                        'events': {
                            0: {
                                'mood': 'happy'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "I knew all along that \"" + this._shortenTitle(winner.title) + "\" would win.",
                        'events': {
                            0: {
                                'mood': 'happy'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "With a rating of " + Math.floor(winner.rating) + " points, was there ever any doubt?",
                        'events': {
                            0: {
                                'mood': 'happy'
                            }
                        }
                    }
                },
                {
                    'weight': 50,
                    'script': {
                        'text': "I can't believe \"" + this._shortenTitle(winner.title) + "\" won! I shouldn't have made that bet!",
                        'events': {
                            0: {
                                'mood': 'surprised'
                            }
                        }
                    }
                },
                {
                    'weight': 100,
                    'script': {
                        'text': "To the victor go the spoils! Wait, \"Victor\"? I thought the winner's name was \"" +
                            winner.title + "\"!",
                        'events': {
                            0: {
                                'mood': 'happy'
                            },
                            29: {
                                'text_speed': 1000
                            },
                            30: {
                                'text_speed': 50,
                                'mood': 'concerned'
                            },
                            45: {
                                'text_speed': 1000
                            },
                            46: {
                                'text_speed': 50,
                                'mood': 'surprised'
                            }
                        }
                    }
                }
            ];

            // Special for the one with the title in it
            len = this._shortenTitle(winner.title).length + 24;
            avail_scripts[3].script.events[len] = {
                'text_speed': 1000
            };
            avail_scripts[3].script.events[len + 1] = {
                'text_speed': 50,
                'mood': 'hurt'
            };

            selected_script = this._selectRandomScript(avail_scripts);
            if (selected_script === null) {
                return null;
            }

            script = $.extend(true, {}, this._getBaseScript(), selected_script);
            return script;
        }
    });
});