define(['require', 'squire', 'jquery', 'jsclass/min/core'], function(require, Squire) {
    'use strict';
    describe('WidgetScreenIntro.view', function() {
        var WidgetScreenIntro;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector, mock_controller_image, mock_view_image;

            mock_view_image = new JS.Class({
                'initialize': function() {
                    this.container = $('<div/>')
                },
                'start': function() {}
            });

            mock_controller_image = new JS.Class({
                'initialize': function() {
                    this.view = new mock_view_image();
                },
                'start': function() {}
            });

            injector = new Squire();

            injector.mock('client/widgets/image/controller_image', mock_controller_image);
            injector.mock('client/widgets/image/view_image', mock_view_image);

            injector.require(['client/widgets/screen_intro/widget_screen_intro'], function(widget_with_mocks) {
                WidgetScreenIntro = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.mock_controller = jasmine.createSpyObj('ControllerScreenIntro', ['onStartPressed'])
            this.view = new WidgetScreenIntro.view();
        });

        // Tests
        describe('#start', function() {
            it("should create a basic layout", function() {
                // Setup

                // Preconditions
                expect(this.view.top_images_model).toBeNull();

                // Run Test
                this.view.start(this.mock_controller, []);

                // Postconditions
                expect(this.view.container.children('').length).toBe(1);
                expect(this.view.container.children('button').length).toBe(1);

                // Cleanup
            });
        });

        describe('#setTopImagesModel', function() {
            it("should create and add some image sub-widgets", function() {
                var mock_top_images, i;

                // Setup
                mock_top_images = jasmine.createSpyObj('ModelTopImages', ['watch']);
                mock_top_images.images = [];
                // Because we're mocking the Image widget, the actual contents of the images is moot, but the quantity is important.
                for( i = 0; i < 4; i++ ) {
                    mock_top_images.images.push({});
                }

                this.view.start(this.mock_controller, []);

                // Preconditions
                expect(this.view.top_images_model).toBeNull();

                // Run Test
                this.view.setTopImagesModel(mock_top_images);

                // Postconditions
                expect(this.view.container.children().length).toBe(5);
                expect(this.view.container.children('button').length).toBe(1);
                expect(mock_top_images.watch).toHaveBeenCalled();

                // Cleanup
            });

            it("should not have any image sub-widgets if model_top_images lacks them", function() {
                var mock_top_images;

                // Setup
                mock_top_images = jasmine.createSpyObj('ModelTopImages', ['watch']);
                mock_top_images.images = [];
                this.view.start(this.mock_controller, []);

                // Preconditions
                expect(this.view.top_images_model).toBeNull();

                // Run Test
                this.view.setTopImagesModel(mock_top_images);

                // Postconditions
                expect(this.view.container.children('').length).toBe(1);
                expect(this.view.container.children('button').length).toBe(1);
                expect(mock_top_images.watch).toHaveBeenCalled();

                // Cleanup
            });
        });
    });
});