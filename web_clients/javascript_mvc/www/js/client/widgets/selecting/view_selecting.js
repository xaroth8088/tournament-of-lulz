/***
	Selecting View
	Displays the choices for a given match-up, permitting the user to pick a winner
***/
define([
    'require',
    'jsclass/min/core',
    'client/base/view'
], function (require) {
	'use strict';
	var View = require('client/base/view');

	return new JS.Class(View, {
		'initialize': function(callback) {
			this.callSuper(['tournament_model']);
			this.selected_callback = callback;
		},

		'_initTemplate': function() {
            var image_1, image_2;
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
                opacity: 0
            }).transition({
                opacity: 1
            }, 100);

            image_2.css({
                opacity: 0
            }).transition({
                opacity: 1
            }, 100);

            this.container.find('.versus').css({
                scale: 9
            }).transition({
                scale: 1
            }, 250, 'easeInCubic', function() {
                image_1.transition({
                    rotate: '1deg',
                    delay: 5
                }, 5).transition({
                    rotate: '-1deg'
                }, 5).transition({
                    rotate: '1deg'
                }, 5).transition({
                    rotate: '-1deg'
                }, 5).transition({
                    rotate: '0deg'
                }, 5);

                image_2.transition({
                    rotate: '-1deg',
                    delay: 4
                }, 5).transition({
                    rotate: '1deg'
                }, 5).transition({
                    rotate: '-1deg'
                }, 5).transition({
                    rotate: '1deg'
                }, 5).transition({
                    rotate: '0deg'
                }, 5);
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