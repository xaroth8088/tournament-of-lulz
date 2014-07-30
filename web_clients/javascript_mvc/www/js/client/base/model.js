/***
	Model base class.
	Exposes a number of convenience methods for models, especially around wiring to views.
***/
define(['require', 'jquery', 'jsclass/min/core', 'client/configuration'], function (require) {
	'use strict';
	var CONFIGURATION = require('client/configuration');

	return new JS.Class({
		'initialize': function(controller, model) {
			this._watchers = [];
		},

		'modelWasUpdated': function() {
			var i, len;

			for( i = 0, len = this._watchers.length; i < len; i++ ) {
				this._watchers[i].onModelUpdated();
			}
		},

		// TODO: This should be named "addWatcher"
		'watch': function(view) {
			this._watchers.push(view);
		},

		// TODO: This should be named "removeWatcher"
		'unwatch': function(view) {
			var i, len, watcher;

			for( i = 0, len = this._watchers.length; i < len; i++ ) {
				watcher = this._watchers[i];
				if( watcher === view ) {
					this._watchers.splice( i, 1 );
					return;
				}
			}

			throw( "Attempted to remove a watcher that hadn't previously registered as a watcher." );
		},

		// A convenience wrapper around jQuery's .ajax, to help with merging default configuration, etc.
		'ajax': function(settings) {
			var request;

			request = $.extend({}, settings, CONFIGURATION.AJAX_DEFAULTS);

			if( CONFIGURATION.DEBUG_HOST !== undefined ) {
				request.url = CONFIGURATION.DEBUG_HOST + request.url;
			}

			$.ajax( request );
		}
	});
});