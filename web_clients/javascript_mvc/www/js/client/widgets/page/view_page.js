/***
	Main Page View
	Responsible for organizing which "screen" is presented to the user.
***/
define(['require', 'jsclass/min/core', 'client/base/view', 'client/widgets/screen_intro/widget_screen_intro', 'client/widgets/screen_in_game/widget_screen_in_game', 'client/models/model_top_images'], function (require) {
	'use strict';
	var View = require('client/base/view'),
		WidgetScreenIntro = require('client/widgets/screen_intro/widget_screen_intro'),
		WidgetScreenInGame = require('client/widgets/screen_in_game/widget_screen_in_game'),
		ModelTopImages = require('client/models/model_top_images');

	return new JS.Class(View, {
		'initialize': function() {
			this.callSuper(['page_model']);

			this.current_screen = null;
		},

		'_initTemplate': function() {
			this.callSuper();
			this.container.addClass('widget_page');

			this.container.append('\
				<div class="intro"></div>\
				<div class="in_game"></div>\
				<div class="share"></div>\
			');
		},

		'_draw': function() {
			var element, new_screen;

			// Decide which screen to show
			switch( this.models.page_model.current_screen ) {
				case this.models.page_model.CONSTANTS.SCREENS.INTRO:
					element = this.container.find(".intro");
					new_screen = new WidgetScreenIntro.controller( this._controller, new WidgetScreenIntro.view(), {
						'page_model': this.models.page_model,
						'top_images_model': new ModelTopImages()
					});
					break;
				case this.models.page_model.CONSTANTS.SCREENS.IN_GAME:
					element = this.container.find(".in_game");
					new_screen = new WidgetScreenInGame.controller( this._controller, new WidgetScreenInGame.view());
					break;
				// case this.models.page_model.CONSTANTS.SCREENS.SHARE:
				// 	element = this.container.find(".share");
				// 	new_screen = new WidgetScreenIntro.controller( this._controller, new WidgetScreenIntro.view(), this.models.page_model );
				// 	break;
				default:
					console.log("Invalid screen selected in model, ViewPage doesn't know what to display.");
					return;
			}

			// Destroy the previous screen, and create a new one in its place
			this.container.children().hide();

			this.removeSubwidget( this.current_screen );

			this.current_screen = new_screen;

			this.addSubwidget( this.current_screen, element );

			element.show();
		}
	});
});