define(['require', 'squire', 'jquery', 'jsclass/min/core'], function(require, Squire) {
    'use strict';
    describe('WidgetImage.view', function() {
        var WidgetImage;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector;

            injector = new Squire();

            injector.require(['client/widgets/image/widget_image'], function(widget_with_mocks) {
                WidgetImage = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.view = new WidgetImage.view(null);
        });

        // Tests
        describe('#start', function() {
            it("should draw itself as visible with the background set to the image model's url", function() {
                var mock_model;

                // Setup
                mock_model = {
                    'thumbnail_url': 'mock_url'
                };

                // Preconditions
                expect(this.view.container.children().length).toBe(0);
                expect(this.view.container.css('background-image')).toBe('');

                // Run Test
                this.view.start(null, [mock_model]);

                // Postconditions
                expect(this.view.container.children().length).toBe(0);
                expect(this.view.container.css('background-image')).toBe('url(http://localhost:9876/mock_url)');
                expect(this.view.container.css('display')).not.toBe('none');

                // Cleanup
            });

            it("should be hidden when the model is null", function() {
                var mock_model;

                // Setup
                mock_model = null;

                // Preconditions
                expect(this.view.container.children().length).toBe(0);
                expect(this.view.container.css('background-image')).toBe('');

                // Run Test
                this.view.start(null, [mock_model]);

                // Postconditions
                expect(this.view.container.children().length).toBe(0);
                expect(this.view.container.css('background-image')).toBe('');
                expect(this.view.container.css('display')).toBe('none');

                // Cleanup
            });
        });
    });
});