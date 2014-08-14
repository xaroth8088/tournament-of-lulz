define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('WidgetScreenIntro.view', function() {
        var WidgetScreenIntro, MockWidget;

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

            injector.mock('client/widgets/image/controller_image', MockWidget.controller);
            injector.mock('client/widgets/image/view_image', MockWidget.view);

            injector.require(['client/widgets/screen_intro/widget_screen_intro'], function(widget_with_mocks) {
                WidgetScreenIntro = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.mock_controller = jasmine.createSpyObj('ControllerScreenIntro', ['onStartPressed']);
            this.view = new WidgetScreenIntro.view();
        });

        // Tests
        describe('#start', function() {
            it("should create a basic layout", function() {
                var mock_top_images;

                // Setup
                mock_top_images = new MockWidget.model();
                mock_top_images.images = [];

                // Preconditions
                expect(this.view.models.top_images_model).toBeNull();

                // Run Test
                this.view.start(this.mock_controller, {
                    'top_images_model': mock_top_images
                });

                // Postconditions
                expect(this.view.container.children('').length).toBe(1);
                expect(this.view.container.children('button').length).toBe(1);

                // Cleanup
            });
        });

        describe('#onModelUpdated', function() {
            var mock_top_images;

            beforeEach( function() {
                mock_top_images = new MockWidget.model();
                mock_top_images.images = [];

                this.view.start(this.mock_controller, {
                    'top_images_model': mock_top_images
                });
            });

            it("should create and add some image sub-widgets", function() {
                var i;

                // Setup

                // Because we're mocking the Image widget, the actual contents of the images is moot, but the quantity is important.
                for( i = 0; i < 4; i++ ) {
                    mock_top_images.images.push({});
                }

                // Preconditions

                // Run Test
                this.view.onModelUpdated();

                // Postconditions
                expect(this.view.container.children().length).toBe(5);
                expect(this.view.container.children('button').length).toBe(1);

                // Cleanup
            });

            it("should not have any image sub-widgets if model_top_images lacks them", function() {
                // Setup

                // Preconditions

                // Run Test
                this.view.onModelUpdated();

                // Postconditions
                expect(this.view.container.children('').length).toBe(1);
                expect(this.view.container.children('button').length).toBe(1);

                // Cleanup
            });

            it("should properly replace the existing sub-widgets and watchers", function() {
                var i;

                // Setup
                this.view.onModelUpdated();

                mock_top_images.images = [];
                // Because we're mocking the Image widget, the actual contents of the images is moot, but the quantity is important.
                for( i = 0; i < 10; i++ ) {
                    mock_top_images.images.push({});
                }

                // Preconditions

                // Run Test
                this.view.onModelUpdated();

                // Postconditions
                expect(this.view.container.children().length).toBe(11);
                expect(this.view.container.children('button').length).toBe(1);

                // Cleanup
            });
        });
    });
});