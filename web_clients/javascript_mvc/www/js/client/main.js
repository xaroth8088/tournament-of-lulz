/***
	Bootstrap the application
***/
define(['require', 'jquery', './widgets/page/widget_page'], function (require) {
	'use strict';
	var WidgetPage = require('./widgets/page/widget_page');
	
	function main() {
		var page_widget, loading_spinner, loading_text;

        // Remove the loading spinner
        loading_spinner = $('.spinner');
        loading_text = $('.initial_loading_text');

        loading_spinner.animate({
            opacity: 0
        }, 500);
        loading_text.animate({
            opacity: 0
        }, 500, function(){
            loading_spinner.remove();
            loading_text.remove();
            page_widget = new WidgetPage.controller( null, new WidgetPage.view(), {
                'page_model': new WidgetPage.model()
            });
            page_widget.start();
            $(document.body).append(page_widget.view.container);
        });
	}

	$(document).ready( main );
});
