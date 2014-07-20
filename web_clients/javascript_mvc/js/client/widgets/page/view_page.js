/***
	Main Page View
	Responsible for organizing which "screen" is presented to the user.
***/
define(['require', 'jsclass/min/core', '../../base/view', './model_page', '../screen_intro/controller_screen_intro', '../screen_intro/view_screen_intro', '../screen_in_game/controller_screen_in_game', '../screen_in_game/view_screen_in_game'], function (require) {
	'use strict';
	var View = require('../../base/view'),
		ModelPage = require('./model_page'),
		ControllerScreenIntro = require('../screen_intro/controller_screen_intro'),
		ViewScreenIntro = require('../screen_intro/view_screen_intro'),
		ControllerScreenInGame = require('../screen_in_game/controller_screen_in_game'),
		ViewScreenInGame = require('../screen_in_game/view_screen_in_game');

	return new JS.Class(View, {
		'initialize': function( controller ) {
			this.callSuper( controller );

			this.page_model = null;
			this.current_screen = null;
		},

		'start': function( controller, models ) {
			this.callSuper( controller, models );

			this.page_model = models[0];
			this.page_model.watch(this);
			this._draw();
		},

		'_initTemplate': function() {
			this.callSuper();

			this.container.append('\
				<div class="intro"></div>\
				<div class="in_game"></div>\
				<div class="share"></div>\
			');
		},

		'_draw': function() {
			var element, new_screen;

			// Destroy the previous screen, and create a new one in its place
			this.removeSubwidget( this.current_screen );

			this.container.children().hide();

			switch( this.page_model.current_screen ) {
				case ModelPage.SCREENS.INTRO:
					element = this.container.find(".intro");
					new_screen = new ControllerScreenIntro( this.controller, new ViewScreenIntro(), this.page_model );
					break;
				case ModelPage.SCREENS.IN_GAME:
					element = this.container.find(".in_game");
					new_screen = new ControllerScreenInGame( this.controller, new ViewScreenInGame() );
					break;
				// case ModelPage.SCREENS.SHARE:
				// 	element = this.container.find(".share");
				// 	new_screen = new ControllerScreenIntro( this.controller, new ViewScreenIntro(), this.page_model );
				// 	break;
				default:
					return;
			}

			this.current_screen = new_screen;
			this.current_screen.start();

			this.addSubwidget( this.current_screen, element );

			element.show();
		},

		'destroy': function() {
			this.page_model.unwatch();

			this.callSuper();
		}
	});
});