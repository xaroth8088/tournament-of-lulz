/***
	Loading View
	Show a loading spinner.
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

			this.container.addClass( 'widget_loading' );
			this.container.html("<span></span><span></span><span></span><span></span>");
		}
	});
});