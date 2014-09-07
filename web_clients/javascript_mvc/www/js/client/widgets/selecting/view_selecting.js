/***
	Selecting View
	Displays the choices for a given match-up, permitting the user to pick a winner
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

			this.container.addClass( 'widget_selecting' );
			this.container.html("Selecting");
		}
	});
});