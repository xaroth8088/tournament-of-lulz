/***
	Selecting View
	Displays the choices for a given match-up, permitting the user to pick a winner
***/
define([
    'require',
    'jsclass/min/core',
    'client/base/view',
    'velocity'
], function (require) {
	'use strict';
	var View = require('client/base/view');

	return new JS.Class(View, {
		'initialize': function(callback) {
			this.callSuper(['tournament_model']);
			this.selected_callback = callback;
		},

		'_initTemplate': function() {
            var image_1, image_2, versus;
			this.callSuper();

			this.container.addClass( 'widget_selecting' );
			this.container.html("\
			    <div class='images'>\
                    <div class='img_holder'>\
                        <div class='image image_1'></div>\
                        <div class='title title_1'></div>\
                    </div>\
                    <div class='score_tag player_1'></div>\
                    <div class='versus'></div>\
                    <div class='score_tag player_2'></div>\
                    <div class='img_holder'>\
                        <div class='image image_2'></div>\
                        <div class='title title_2'></div>\
                    </div>\
			    </div>\
            ");

            image_1 = this.container.find('.image_1');
			image_1.click($.proxy(this._onImage1Clicked, this));

			image_2 = this.container.find('.image_2');
            image_2.click($.proxy(this._onImage2Clicked, this));

            // Animations
            image_1.css({
                "opacity": 0
            });
            image_1.velocity({
                "opacity": 1
            }, {
                "duration": 300
            });

            image_2.css({
                "opacity": 0
            });
            image_2.velocity({
                "opacity": 1
            }, {
                "duration": 300
            });

            versus = this.container.find('.versus');
            $.Velocity.hook(versus, "scale", 9);
            versus.velocity({
                "scale": 1
            }, {
                "duration": 250,
                "easing": "easeInCubic",
                "complete": function() {
                    image_1.velocity({
                        "rotateZ": "1deg"
                    }, {
                        "duration": 5,
                        "delay": 5
                    }).velocity({
                        "rotateZ": "-1deg"
                    }, {
                        "duration": 5
                    }).velocity({
                        "rotateZ": "1deg"
                    }, {
                        "duration": 5
                    }).velocity({
                        "rotateZ": "-1deg"
                    }, {
                        "duration": 5
                    }).velocity({
                        "rotateZ": "0deg"
                    }, {
                        "duration": 5
                    });

                    image_2.velocity({
                        "rotateZ": "1deg"
                    }, {
                        "duration": 5,
                        "delay": 5
                    }).velocity({
                        "rotateZ": "-1deg"
                    }, {
                        "duration": 5
                    }).velocity({
                        "rotateZ": "1deg"
                    }, {
                        "duration": 5
                    }).velocity({
                        "rotateZ": "-1deg"
                    }, {
                        "duration": 5
                    }).velocity({
                        "rotateZ": "0deg"
                    }, {
                        "duration": 5
                    });
                }
            });
		},

		'_draw': function() {
			var image_1, image_2, player_1_score, player_2_score;

			image_1 = this.container.find('.image_1');
			image_2 = this.container.find('.image_2');

			this.match = this.models.tournament_model.getCurrentRoundData();

            image_1.css({
                'background-image': 'url(' + this.match.player_1.image_url + ')'
            });
            image_2.css({
                'background-image': 'url(' + this.match.player_2.image_url + ')'
            });

            this.container.find('.title_1').text(this.match.player_1.title);
            this.container.find('.title_2').text(this.match.player_2.title);

            player_1_score = (Math.floor(this.match.player_1.rating) + '').split('').join('<br/>');
            player_2_score = (Math.floor(this.match.player_2.rating) + '').split('').join('<br/>');
            this.container.find('.player_1').html(player_1_score);
            this.container.find('.player_2').html(player_2_score);
		},

		'_onImage1Clicked': function() {
			this.selected_callback(this.match.player_1.image_id);
		},

		'_onImage2Clicked': function() {
			this.selected_callback(this.match.player_2.image_id);
		}
	});
});