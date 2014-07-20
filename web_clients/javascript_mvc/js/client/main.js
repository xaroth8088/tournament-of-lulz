/***
	Bootstrap the application
***/
define(['require', 'jquery', './widgets/page/controller_page', './widgets/page/view_page', './widgets/page/model_page'], function (require) {
	'use strict';
	var ControllerPage = require( './widgets/page/controller_page'),
		ViewPage = require('./widgets/page/view_page'),
		ModelPage = require('./widgets/page/model_page');
	
	function main() {
		var page_widget;
		
		page_widget = new ControllerPage( null, new ViewPage(), new ModelPage() );
		page_widget.start();
		$(document.body).append(page_widget.view.container);
	}

	$(document).ready( main );	
});
