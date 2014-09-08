/***
	InGame Screen View
	Manages in-game state
***/
define(['require', 'jsclass/min/core', 'client/base/view', 
	'client/widgets/loading/widget_loading',
	'client/widgets/bracket/widget_bracket',
	'client/widgets/selecting/widget_selecting',
	'client/widgets/victory/widget_victory',
	'client/widgets/error/widget_error'
	], function (require) {
	'use strict';
	var View = require('client/base/view'),
		WidgetLoading = require('client/widgets/loading/widget_loading'),
		WidgetBracket = require('client/widgets/bracket/widget_bracket'),
		WidgetSelecting = require('client/widgets/selecting/widget_selecting'),
		WidgetVictory = require('client/widgets/victory/widget_victory'),
		WidgetError = require('client/widgets/error/widget_error');
	
	return new JS.Class(View, {
		'initialize': function() {
			this.callSuper(['tournament_model', 'screen_in_game_model', 'page_model']);

			this.mode = null;
			this.active_widget = null;
			this._has_preloaded = false;
		},

		'_initTemplate': function() {
			this.callSuper();
			this.container.addClass('widget_screen_in_game');

			this.container.append('\
				<div class="loading"></div>\
				<div class="selecting"></div>\
				<div class="bracket"></div>\
				<div class="victory"></div>\
				<div class="error"></div>\
			');
		},

		'_draw': function() {
			switch( this.models.tournament_model.state ) {
				case this.models.tournament_model.CONSTANTS.LOADING:
				case this.models.tournament_model.CONSTANTS.INITIALIZED:
					this._changeMode(this.CONSTANTS.MODES.LOADING);
					return;
				case this.models.tournament_model.CONSTANTS.COMPLETE:
					this._changeMode(this.CONSTANTS.MODES.VICTORY);
					return;
				case this.models.tournament_model.CONSTANTS.ERROR:
					this._changeMode(this.CONSTANTS.MODES.ERROR);
					return;
			}

			this._preloadImages();

			switch( this.models.screen_in_game_model.state ) {
				case this.models.screen_in_game_model.CONSTANTS.STATES.SELECTING:
					this._changeMode(this.CONSTANTS.MODES.SELECTING);
					return;
					break;
				case this.models.screen_in_game_model.CONSTANTS.STATES.BRACKET:
					this._changeMode(this.CONSTANTS.MODES.BRACKET);
					return;
					break;
			}

			this._drawError();
		},

		'_preloadImages': function() {
			var images;

			// Because so much of the rest of the game relies on seeing the images we're using,
			// this is as good a place as any to go preload those images, to smooth out the experience
			// later on.
			if( this._has_preloaded === true ) {
				return;
			}
			this._has_preloaded = true;

			images = this.models.tournament_model.images;

		    $(images).each(function(){
		        $('<img/>')[0].src = this.image_url;
		        $('<img/>')[0].src = this.thumbnail_url;
		    });
		},

		'_changeMode': function( mode ) {
			if( this.mode === mode ) {
				return;
			}
			this.mode = mode;

			if( this.active_widget !== null ) {
				this.removeSubwidget( this.active_widget );
				this.active_widget = null;
			}

			this.container.children().hide();

			// NOTE: the _draw* functions below are responsible for setting this.active_widget and 
			// unhiding their piece of the layout

			switch( mode ) {
				case this.CONSTANTS.MODES.LOADING:
					this._drawLoading();
					break;
				case this.CONSTANTS.MODES.SELECTING:
					this._drawSelecting();
					break;
				case this.CONSTANTS.MODES.BRACKET:
					this._drawBracket();
					break;
				case this.CONSTANTS.MODES.VICTORY:
					this._drawVictory();
					break;
				default:
					this._drawError();
					break;
			}
		},

		'_drawLoading': function() {
			var loading_container;

			loading_container = this.container.find('.loading');

			this.active_widget = new WidgetLoading.controller( this._controller, new WidgetLoading.view() );
			this.addSubwidget( this.active_widget, loading_container );

			loading_container.show();
		},

		'_drawSelecting': function() {
			var selecting_container, selected_callback;

			selecting_container = this.container.find('.selecting');

			selected_callback = $.proxy(this._controller.onSelectionMade, this._controller);

			this.active_widget = new WidgetSelecting.controller( this._controller, new WidgetSelecting.view( selected_callback ), {
				'tournament_model': this.models.tournament_model
			} );
			this.addSubwidget( this.active_widget, selecting_container );

			selecting_container.show();
		},
		
		'_drawBracket': function() {
			var bracket_container, callback;

			callback = $.proxy(this._controller.advanceStateToSelection, this._controller);

			bracket_container = this.container.find('.bracket');

			this.active_widget = new WidgetBracket.controller( this._controller, new WidgetBracket.view( callback ), {
				'tournament_model': this.models.tournament_model
			} );
			this.addSubwidget( this.active_widget, bracket_container );

			bracket_container.show();
		},
		
		'_drawVictory': function() {
			var victory_container;

			victory_container = this.container.find('.victory');

			this.active_widget = new WidgetVictory.controller( this._controller, new WidgetVictory.view(), {
				'tournament_model': this.models.tournament_model,
				'page_model': this.models.page_model
			} );
			this.addSubwidget( this.active_widget, victory_container );

			victory_container.show();
		},
		
		'_drawError': function() {
			var error_container;

			error_container = this.container.find('.error');

			this.active_widget = new WidgetError.controller( this._controller, new WidgetError.view() );
			this.addSubwidget( this.active_widget, error_container );

			error_container.show();
		},

		'CONSTANTS': {
			'MODES': {
				'LOADING': 'LOADING',
				'SELECTING': 'SELECTING',
				'BRACKET': 'BRACKET',
				'VICTORY': 'VICTORY',
				'ERROR': 'ERROR'
			}
		}
	});
});