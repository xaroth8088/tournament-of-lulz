/***
	Model base class.
	Exposes a number of convenience methods for models, especially around wiring to views.
***/
var Model = new JS.Class({
	'initialize': function(controller, model) {
		'use strict';

		this.watchers = [];
	},

	'modelWasUpdated': function() {
		'use strict';
		var i, len;

		for( i = 0, len = this.watchers.length; i < len; i++ ) {
			this.watchers[i].onModelUpdated();
		}
	},

	'watch': function(view) {
		'use strict';

		this.watchers.push(view);
	},

	'unwatch': function(view) {
		'use strict';
		var i, len, watcher;

		for( i = 0, len = this.watchers.length; i < len; i++ ) {
			watcher = this.watchers[i];
			if( watcher === view ) {
				this.watchers.splice( i, 1 );
				return;
			}
		}

		throw( "Attempted to remove a watcher that hadn't previously registered as a watcher." );
	},

	// A convenience wrapper around jQuery's .ajax, to help with merging default configuration, etc.
	'ajax': function(settings) {
		'use strict';
		var request;

		request = $.extend({}, settings, CONFIGURATION.AJAX_DEFAULTS);

		if( CONFIGURATION.DEBUG_HOST !== undefined ) {
			request.url = CONFIGURATION.DEBUG_HOST + request.url;
		}

		$.ajax( request );
	}
});