/***
	View base class.
	Exposes a number of convenience methods for views, especially around wiring to models.
***/
define(['require', 'jsclass/min/core'], function (require) {
	'use strict';

	return new JS.Class({
		'initialize': function( model_names ) {
			var i, len, name;

			this._controller = null;
			this._subwidgets = [];
			this.container = $("<div/>");
			this.models = {};
			this._started = false;
			this._destroyed = false;

			// Initialize the model names
			// It's ok for us to not get an array of models
			if( model_names !== undefined ) {
				for( i = 0, len = model_names.length; i < len; i++ ) {
					name = model_names[i];
					this.models[name] = null;
				}
			}
		},

		/* BEGIN: Methods that child classes probably want to override */
		'start': function( controller, models ) {
			if( this._started !== false ) {
				throw("Attempted to start this view (" + this.klass + ") a second time.");
			}
			this._started = true;
			
			this._controller = controller;
			this._watchModels(models);
			this._initTemplate();

            this._draw();
		},

		'_initTemplate': function() {
			this.container.empty();
		},

		'_draw': function() {
			// Intentionally do nothing - let the child class implement this.
		},
		/* END: Methods that child classes probably want to override */

		'_watchModels': function( models ) {
			var i, model;

			for( i in models ) {
				if( models.hasOwnProperty(i) ) {
					if( this.models.hasOwnProperty(i) === false ) {
						continue;
					}

					model = models[i];

					this.models[i] = model;
					this.models[i].watch( this );
				}
			}
		},

		'_unwatchModels': function() {
			var i;

			for( i in this.models ) {
				if( this.models.hasOwnProperty(i) ) {
					this.models[i].unwatch( this );
				}
			}
		},

		'addSubwidget': function(widget, parent_element) {
			var i, len, subwidget;
			// TODO: validate that 'parent_container' either is - or is a child of - this.container, to help prevent
			// separation of concerns violations

			// validate that the widget being added isn't already a subwidget
			for( i = 0, len = this._subwidgets.length; i < len; i++ ) {
				subwidget = this._subwidgets[i];
				if( widget === subwidget ) {
					throw("Attempted to re-add a subwidget.");
				}
			}

			// Actually add the subwidget
			parent_element.append( widget.view.container );
			this._subwidgets.push(widget);
			widget.start();
		},

		'removeSubwidget': function(widget) {
			var i, len, subwidget;

			if( widget === null ) {
				return;
			}

			for( i = 0, len = this._subwidgets.length; i < len; i++ ) {
				subwidget = this._subwidgets[i];
				if( widget === subwidget ) {
					subwidget.destroy();
					this._subwidgets.splice( i, 1 );
					return;
				}
			}

			throw( "Tried to remove a subwidget which doesn't exist" );
		},

		'destroy': function() {
			this._destroyed = true;
			this.removeAllSubwidgets();
			this._unwatchModels();
			this.models = {};

            // Explicit cleanup for jQuery
            this.container.children().removeData();
            this.container.removeData();

            // Kill the container
			this.container.remove();
		},

		'removeAllSubwidgets': function() {
			var i, len, subwidget;

			for( i = 0, len = this._subwidgets.length; i < len; i++ ) {
				subwidget = this._subwidgets[i];
				subwidget.destroy();
			}

			this._subwidgets = [];
		},

		'onModelUpdated': function() {
			if( this._destroyed === true ) {
				return;
			}

			this._draw();
		},

		'_startupDraw': function() {
			// We may have been destroyed before getting here
			if( this._destroyed === true ) {
				return;
			}

			this._draw();
		}
	});
});