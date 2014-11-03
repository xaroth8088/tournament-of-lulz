define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('WidgetImage.view', function() {
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
            var injector;

            injector = new Squire();

            injector.require(['client/widgets/image/widget_image'], function(widget_with_mocks) {
                WidgetImage = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.view = new WidgetImage.view();
        });

        // Tests
        describe('#start', function() {
            it("should draw itself as visible with the background set to the image model's url", function(done) {
                var mock_model, self;

                // Setup
                mock_model = new MockWidget.model();
                mock_model.thumbnail_url = 'mock_url';

                // Preconditions
                expect(this.view.container.children().length).toBe(0);
                expect(this.view.container.css('background-image')).toBe('');

                // Run Test
                this.view.start(null, {
                    'image_model': mock_model
                });

                self = this;
                setTimeout(function() {
                    // Postconditions
                    expect(self.view.container.children().length).toBe(0);
                    expect(self.view.container.css('background-image')).not.toBe('');
                    expect(self.view.container.css('display')).not.toBe('none');

                    // Cleanup
                    done();
                }, 0);
            });
        });
    });
});