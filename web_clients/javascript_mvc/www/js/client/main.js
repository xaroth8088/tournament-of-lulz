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
            var page_view;

            loading_spinner.remove();
            loading_text.remove();

            // Even though it's out of the normal flow, ensure the page view is attached to the DOM before starting
            // to help reduce problems with layout later.
            page_view = new WidgetPage.view();
            $(document.body).append(page_view.container);

            page_widget = new WidgetPage.controller( null, page_view, {
                'page_model': new WidgetPage.model()
            });
            page_widget.start();
        });
	}

	$(document).ready( main );
});
