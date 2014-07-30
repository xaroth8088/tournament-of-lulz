/***
	Controller base class.
	Exposes a number of convenience methods for controllers, esp. around event propogation and widget parent/child relationships.
***/
define(['require', 'jsclass/min/core'], function (require) {
	'use strict';
	
	return new JS.Class({
		'initialize': function(parent_controller, view /*, model1, model2, ... */) {
			var args;

			args = Array.prototype.slice.apply(arguments);

			this.parent_controller = parent_controller;
			this.view = view;
			this.models = args.slice( 2 );
		},

		'start': function() {
			this.view.start( this, this.models );
		},

		'destroy': function() {
			this.view.destroy();
		}
	});
});