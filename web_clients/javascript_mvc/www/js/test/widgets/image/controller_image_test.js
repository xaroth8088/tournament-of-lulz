define(['require', 'squire', 'jquery', 'jsclass/min/core'], function(require, Squire) {
    'use strict';
    describe('WidgetImage.controller', function() {
        var WidgetImage;

        // Mock dependencies and module loading
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
            this.mock_view = jasmine.createSpyObj('View', ['start']);
            this.controller = new WidgetImage.controller(null, this.mock_view, this.mock_model);
        });

        // Tests
        describe('#start', function() {
            it("should retain the image model and kick off its view", function() {
                // Setup

                // Preconditions
                expect(this.controller.image_model).toBeNull();
                expect(this.mock_view.start).not.toHaveBeenCalled();

                // Run Test
                this.controller.start();

                // Postconditions
                expect(this.mock_view.start).toHaveBeenCalled();
                expect(this.controller.image_model).toBe(this.mock_model);

                // Cleanup
            });
        });
    });
});