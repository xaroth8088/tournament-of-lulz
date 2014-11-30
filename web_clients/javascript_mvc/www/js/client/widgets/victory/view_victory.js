/***
	Victory View
	A brief celebration of the ultimate tournament winner
***/
define(['require', 'jsclass/min/core', 'client/base/view', 'confetti/confetti', 'jquery.transit/jquery.transit'], function (require) {
	'use strict';
	var View = require('client/base/view');
	
	return new JS.Class(View, {
		'initialize': function() {
			this.callSuper(['tournament_model']);
            this.timer = null;
		},

		'_initTemplate': function() {
            var victory;
			this.callSuper();

			this.container.addClass( 'widget_victory' );
			this.container.append("<button class='goback'>Play Again!</button><div class='winner'></div>");
			this.container.find('.goback').click($.proxy(this._controller.onPlayAgainPressed, this._controller));

            // Victory!
            victory = $("<div/>").addClass('victory_image');
            this.container.append(victory);
            victory.css({
                scale: 30,
                opacity: 0
            }).transition({
                scale: 1,
                opacity: 1
            }, 1000, 'easeInQuad').transition({
                opacity: 0
            }, 3000, 'easeInQuad', $.proxy(this._onVictoryAnimationComplete, this));
		},

        '_onVictoryAnimationComplete': function() {
            this.container.find('.victory_image').remove();
        },

		'_draw': function() {
			var winner;

			winner = this.models.tournament_model.getWinnerData();
			this.container.find('.winner').css({
                'background-image': 'url(' + winner.image_url + ')'
            });

            // Confetti!
            clearInterval(this.timer);

            this.timer = setInterval(function() {
                CONFETTIS_PER_SHAKE = 30;

                startConfetti();
            }, 2000);
		},

        'destroy': function() {
            clearInterval(this.timer);
            this.callSuper();
        }
	});
});