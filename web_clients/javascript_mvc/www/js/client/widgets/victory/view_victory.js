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
			this.container.append("<img class='winner' /><button class='goback'>Play Again!</button>");
			this.container.find('.goback').click($.proxy(this._controller.onPlayAgainPressed, this._controller));

            // Victory!
            victory = $("<div/>").addClass('victory_image');
            this.container.append(victory);
            victory.transition({
                scale: 20
            }).transition({
                scale: 1
            }, 1000, 'easeInQuad').transition({
                opacity: 0
            }, 3000, 'easeInQuad');
		},

		'_draw': function() {
			var winner;

			winner = this.models.tournament_model.getWinnerData();
			this.container.find('.winner').attr('src', winner.image_url);

            // Confetti!
            clearInterval(this.timer);

            this.timer = setInterval(function() {
                CONFETTIS_PER_SHAKE = 50;

                startConfetti();
            }, 1000);
		},

        'destroy': function() {
            clearInterval(this.timer);
            this.callSuper();
        }
	});
});