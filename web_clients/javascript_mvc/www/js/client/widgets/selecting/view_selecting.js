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
    			<div class='img_holder'>\
	    		    <img class='image_1' />\
			    </div>\
			    <div class='versus'></div>\
			    <div class='img_holder'>\
		    	    <img class='image_2' />\
			    </div>\
            ");

            image_1 = this.container.find('.image_1');
			image_1.click($.proxy(this._onImage1Clicked, this));

			image_2 = this.container.find('.image_2');
            image_2.click($.proxy(this._onImage2Clicked, this));

            // Animations
            image_1.transition({
                opacity: 0
            }).transition({
                opacity: 1
            }, 100);

            image_2.transition({
                opacity: 0
            }).transition({
                opacity: 1
            }, 100);

            this.container.find('.versus').transition({
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
			var image_1, image_2;

			image_1 = this.container.find('.image_1');
			image_2 = this.container.find('.image_2');

			this.match = this.models.tournament_model.getCurrentRoundData();

			image_1.attr('src', this.match.player_1.image_url );
			image_2.attr('src', this.match.player_2.image_url );
		},

		'_onImage1Clicked': function() {
			this.selected_callback(this.match.player_1.image_id);
		},

		'_onImage2Clicked': function() {
			this.selected_callback(this.match.player_2.image_id);
		}
	});
});