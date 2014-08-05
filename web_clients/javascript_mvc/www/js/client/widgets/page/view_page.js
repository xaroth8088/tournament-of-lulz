/***
	Main Page View
	Responsible for organizing which "screen" is presented to the user.
***/
define(['require', 'jsclass/min/core', 'client/base/view', 'client/widgets/screen_intro/widget_screen_intro', 'client/widgets/screen_in_game/widget_screen_in_game'], function (require) {
	'use strict';
	var View = require('client/base/view'),
		WidgetScreenIntro = require('client/widgets/screen_intro/widget_screen_intro'),
		WidgetScreenInGame = require('client/widgets/screen_in_game/widget_screen_in_game');

	return new JS.Class(View, {
		'initialize': function() {
			this.callSuper();

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

			// Decide which screen to show
			switch( this.page_model.current_screen ) {
				case this.page_model.CONSTANTS.SCREENS.INTRO:
					element = this.container.find(".intro");
					new_screen = new WidgetScreenIntro.controller( this.controller, new WidgetScreenIntro.view(), this.page_model );
					break;
				case this.page_model.CONSTANTS.SCREENS.IN_GAME:
					element = this.container.find(".in_game");
					new_screen = new WidgetScreenInGame.controller( this.controller, new WidgetScreenInGame.view() );
					break;
				// case this.page_model.CONSTANTS.SCREENS.SHARE:
				// 	element = this.container.find(".share");
				// 	new_screen = new WidgetScreenIntro.controller( this.controller, new WidgetScreenIntro.view(), this.page_model );
				// 	break;
				default:
					console.log("Invalid screen selected in model, ViewPage doesn't know what to display.");
					return;
			}

			// Destroy the previous screen, and create a new one in its place
			this.container.children().hide();

			this.removeSubwidget( this.current_screen );

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