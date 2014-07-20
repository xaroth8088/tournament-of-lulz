/***
	Bootstrap the application
***/
function main() {
	'use strict';
	var page_widget;

	page_widget = new ControllerPage( null, new ViewPage(), new ModelPage() );
	page_widget.start();
	$(document.body).append(page_widget.view.container);
}

$(document).ready( main );
