/***
	Victory View
	A brief celebration of the ultimate tournament winner
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

			this.container.addClass( 'victory' );
			this.container.html("victory");
		}
	});
});