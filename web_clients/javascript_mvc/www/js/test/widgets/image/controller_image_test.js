define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('WidgetImage.controller', function() {
        var WidgetImage, MockWidget;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector;

            injector = new Squire();

            injector.require(['test/mocks/widget/mock_widget'], function(mock_widget) {
                MockWidget = mock_widget;
                done();
            });
        });

        beforeEach(function(done) {
            var injector, mock_;

            injector = new Squire();

            injector.require(['client/widgets/image/widget_image'], function(widget_with_mocks) {
                WidgetImage = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.mock_model = {
                'thumbnail_url': 'mock_url'
            };

            this.mock_view = new MockWidget.view();
            spyOn( this.mock_view, 'start');

            this.controller = new WidgetImage.controller(null, this.mock_view, this.mock_model);
        });

        // Tests
        describe('#start', function() {
            it("should retain the image model and kick off its view", function() {
                // Setup

                // Preconditions
                expect(this.mock_view.start).not.toHaveBeenCalled();

                // Run Test
                this.controller.start();

                // Postconditions
                expect(this.mock_view.start).toHaveBeenCalled();

                // Cleanup
            });
        });
    });
});