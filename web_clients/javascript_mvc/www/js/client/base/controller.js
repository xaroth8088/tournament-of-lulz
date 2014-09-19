/***
	Controller base class.
	Exposes a number of convenience methods for controllers, esp. around event propogation and widget parent/child relationships.
***/
define(['require', 'jsclass/min/core'], function (require) {
	'use strict';
	
	return new JS.Class({
		'initialize': function(parent_controller, view, models) {
			this.parent_controller = parent_controller;
			this.view = view;

			this.models = {};
			if( models !== undefined ) {
				this.models = models;
			}

			this._started = false;
		},

		'start': function() {
			if( this._started !== false ) {
				throw("Attempted to start this controller (" + this.klass + ") a second time.");
			}
			this._started = true;

			this.view.start( this, this.models );
		},

		'destroy': function() {
			this.view.destroy();
		}
	});
});