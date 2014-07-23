/***
	View base class.
	Exposes a number of convenience methods for views, especially around wiring to models.
***/
define(['require', 'jsclass/min/core'], function (require) {
	'use strict';
	
	return new JS.Class({
		'initialize': function() {
			this.controller = null;
			this.subwidgets = [];
			this.container = $("<div/>");
		},

		'start': function( controller, models ) {
			this.controller = controller;
			this._initTemplate();
		},

		/* BEGIN: Methods that child classes probably want to override */
		'_initTemplate': function() {
			this.container.empty();
		},

		'_draw': function() {
			// Intentionally do nothing - let the child class implement this.
		},
		/* END: Methods that child classes probably want to override */


		'addSubwidget': function(widget, parent_element) {
			parent_element.append( widget.view.container );
			this.subwidgets.push(widget);
		},

		'removeSubwidget': function(widget) {
			var i, len, subwidget;

			if( widget === null ) {
				return;
			}

			for( i = 0, len = this.subwidgets.length; i < len; i++ ) {
				subwidget = this.subwidgets[i];
				if( widget === subwidget ) {
					subwidget.destroy();
					this.subwidgets.splice( i, 1 );
					return;
				}
			}

			throw( "Tried to remove a subwidget which doesn't exist" );
		},

		'destroy': function() {
			this.removeAllSubwidgets();
			this.container.remove();
		},

		'removeAllSubwidgets': function() {
			var i, len, subwidget;

			for( i = 0, len = this.subwidgets.length; i < len; i++ ) {
				subwidget = this.subwidgets[i];
				subwidget.destroy();
			}

			this.subwidgets = [];
		},

		'onModelUpdated': function() {
			this._draw();
		}
	});
});