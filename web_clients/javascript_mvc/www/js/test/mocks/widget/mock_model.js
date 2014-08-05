/***
	Mock Model
***/
define(['require', 'jsclass/min/core', 'client/base/model'], function (require) {
	'use strict';
	var Model = require('client/base/model');

	return new JS.Class(Model,{
		'initialize': function() {
			this.callSuper();
		}
	});
});