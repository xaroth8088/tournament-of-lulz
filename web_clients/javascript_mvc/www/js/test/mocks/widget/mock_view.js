/***
	Mock View
***/
define(['require', 'jsclass/min/core', 'client/base/view'], function (require) {
	'use strict';
	var View = require('client/base/view');

	return new JS.Class(View, {
		'initialize': function() {
			this.callSuper();
		}
	});
});