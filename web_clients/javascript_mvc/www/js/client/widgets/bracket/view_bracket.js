/***
	Bracket View
	Shows off the current position in the bracket
***/
define(['require', 'jsclass/min/core', 'client/base/view'], function (require) {
	'use strict';
	var View = require('client/base/view');
	
	return new JS.Class(View, {
		'initialize': function() {
			this.callSuper();
		},

		'_initTemplate': function() {
			this.callSuper();

			this.container.addClass( 'bracket' );
			this.container.html("bracket");
		}
	});
});