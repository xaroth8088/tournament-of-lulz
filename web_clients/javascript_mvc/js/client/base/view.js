/***
	View base class.
	Exposes a number of convenience methods for views, especially around wiring to models.
***/
var View = new JS.Class({
	'initialize': function() {
		'use strict';

		this.controller = null;
		this.subwidgets = [];
		this.container = $("<div/>");
	},

	'start': function( controller, models ) {
		'use strict';

		this.controller = controller;
		this._initTemplate();
	},

	/* BEGIN: Methods that child classes probably want to override */
	'_initTemplate': function() {
		'use strict';

		this.container.empty();
	},

	'_draw': function() {
		'use strict';

		// Intentionally do nothing - let the child class implement this.
	},
	/* END: Methods that child classes probably want to override */


	'addSubwidget': function(widget, parent_element) {
		'use strict';

		parent_element.append( widget.view.container );
		this.subwidgets.push(widget);
	},

	'removeSubwidget': function(widget) {
		'use strict';
		var i, len, subwidget;

		if( widget === null ) {
			console.log("Tried to remove a non-existent widget.");
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
		'use strict';

		this.removeAllSubwidgets();
		this.container.remove();
	},

	'removeAllSubwidgets': function() {
		'use strict';
		var i, len, subwidget;

		for( i = 0, len = this.subwidgets.length; i < len; i++ ) {
			subwidget = this.subwidgets[i];
			subwidget.destroy();
		}

		this.subwidgets = [];
	},

	'onModelUpdated': function() {
		'use strict';

		this._draw();
	}
});