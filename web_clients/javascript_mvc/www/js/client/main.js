/***
	Bootstrap the application
***/
define(['require', 'jquery', './widgets/page/widget_page'], function (require) {
	'use strict';
	var WidgetPage = require( './widgets/page/widget_page');
	
	function main() {
		var page_widget;
		
		page_widget = new WidgetPage.controller( null, new WidgetPage.view(), new WidgetPage.model() );
		page_widget.start();
		$(document.body).append(page_widget.view.container);
	}

	$(document).ready( main );
});
